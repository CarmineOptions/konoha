use array::ArrayTrait;
use core::ResultTrait;
use core::traits::Into;
use core::traits::TryInto;
use debug::PrintTrait;
use konoha::constants;
use konoha::contract::IGovernanceDispatcher;
use konoha::contract::IGovernanceDispatcherTrait;
use konoha::proposals::IProposalsDispatcher;
use konoha::proposals::IProposalsDispatcherTrait;
use konoha::staking::{IStakingDispatcher, IStakingDispatcherTrait};

use konoha::types::ContractType;
use konoha::upgrades::IUpgradesDispatcher;
use konoha::upgrades::IUpgradesDispatcherTrait;
use openzeppelin::token::erc20::interface::IERC20;
use openzeppelin::token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
use snforge_std::{
    BlockId, declare, ContractClassTrait, ContractClass, start_prank, start_warp, CheatTarget
};
use starknet::ContractAddress;
use starknet::{get_block_timestamp};
//use super::staking_tests::set_floating_token_address;

const GOV_TOKEN_INITIAL_SUPPLY: u256 = 1000000000000000000;

const first_address: felt252 = 0x1;
const second_address: felt252 = 0x2;
const admin_addr: felt252 = 0x3;

const governance_address: felt252 = 0x99999;

// DEPRECATED, use deploy_governance_and_both_tokens instead
fn deploy_governance(token_address: ContractAddress) -> IGovernanceDispatcher {
    let gov_contract = declare("Governance").expect('unable to declare governance');
    let mut args: Array<felt252> = ArrayTrait::new();
    args.append(token_address.into());
    let (address, _) = gov_contract.deploy(@args).expect('unable to deploy governance');
    IGovernanceDispatcher { contract_address: address }
}

// return governance, voting token, floating token.
// by default, all floating tokens are minted to admin address.
fn deploy_governance_and_both_tokens() -> (
    IGovernanceDispatcher, IERC20Dispatcher, IERC20Dispatcher
) {
    let gov_contract = declare("Governance").expect('unable to declare governance');
    let floating_token_class = declare("FloatingToken").expect('unable to declare FloatingToken');
    let voting_token_class = declare("VotingToken").expect('unable to declare VotingToken');
    let mut args: Array<felt252> = ArrayTrait::new();
    args.append(voting_token_class.class_hash.into());
    args.append(floating_token_class.class_hash.into());
    args.append(admin_addr);
    gov_contract
        .deploy_at(@args, governance_address.try_into().unwrap())
        .expect('unable to deploy governance');
    let gov_dispatcher = IGovernanceDispatcher {
        contract_address: governance_address.try_into().unwrap()
    };
    let staking = IStakingDispatcher { contract_address: governance_address.try_into().unwrap() };

    let voting_token_dispatcher = IERC20Dispatcher {
        contract_address: gov_dispatcher.get_governance_token_address()
    };

    let floating_token_dispatcher = IERC20Dispatcher {
        contract_address: staking.get_floating_token_address()
    };

    (gov_dispatcher, voting_token_dispatcher, floating_token_dispatcher)
}

// DEPRECATED, use deploy_governance_and_both_tokens instead
fn deploy_and_distribute_gov_tokens(recipient: ContractAddress) -> IERC20Dispatcher {
    let mut calldata = ArrayTrait::new();
    calldata.append(GOV_TOKEN_INITIAL_SUPPLY.low.into());
    calldata.append(GOV_TOKEN_INITIAL_SUPPLY.high.into());
    calldata.append(recipient.into());

    let gov_token_contract = declare("FloatingToken").expect('unable to declare FloatingToken');
    let (token_addr, _) = gov_token_contract
        .deploy(@calldata)
        .expect('unable to deploy FloatingToken');
    IERC20Dispatcher { contract_address: token_addr }
}


fn test_vote_upgrade_root(new_merkle_root: felt252) {
    let token_contract = deploy_and_distribute_gov_tokens(admin_addr.try_into().unwrap());
    let gov_contract = deploy_governance(token_contract.contract_address);
    let gov_contract_addr = gov_contract.contract_address;

    let dispatcher = IProposalsDispatcher { contract_address: gov_contract_addr };

    start_prank(CheatTarget::One(gov_contract_addr), admin_addr.try_into().unwrap());
    let prop_id = dispatcher.submit_proposal(new_merkle_root, 3);

    start_prank(CheatTarget::One(gov_contract_addr), first_address.try_into().unwrap());
    dispatcher.vote(prop_id, 1);
    start_prank(CheatTarget::One(gov_contract_addr), second_address.try_into().unwrap());
    dispatcher.vote(prop_id, 1);
    start_prank(CheatTarget::One(gov_contract_addr), admin_addr.try_into().unwrap());
    dispatcher.vote(prop_id, 1);

    assert(dispatcher.get_proposal_status(prop_id) == 1, 'proposal not passed!');

    let upgrade_dispatcher = IUpgradesDispatcher { contract_address: gov_contract_addr };
    upgrade_dispatcher.apply_passed_proposal(prop_id);
    assert(check_if_healthy(gov_contract_addr), 'new gov not healthy');
}

fn check_if_healthy(gov_address: ContractAddress) -> bool {
    println!("Health contract address: {:?}", gov_address);

    let proposals_dispatcher = IProposalsDispatcher { contract_address: gov_address };
    let upgrades_dispatcher = IUpgradesDispatcher { contract_address: gov_address };

    // Check if there are no proposals
    let current_prop_id = proposals_dispatcher.get_latest_proposal_id();
    if current_prop_id == 0 {
        return true;
    }
    // Retrieve current proposal details
    let current_prop_details = proposals_dispatcher.get_proposal_details(current_prop_id);

    // Check if the latest upgrade type matches the proposal's upgrade type
    let (_, last_upgrade_type) = upgrades_dispatcher.get_latest_upgrade();

    // Ensure that the type of the new proposal matches the required contract type
    assert_correct_contract_type(current_prop_details.to_upgrade, last_upgrade_type.into());

    if last_upgrade_type.into() != current_prop_details.to_upgrade {
        return false;
    }

    // Check the governance state
    let gov_token_addr = IGovernanceDispatcher { contract_address: gov_address }
        .get_governance_token_address();
    let total_eligible_votes_u256: u256 = IERC20Dispatcher { contract_address: gov_token_addr }
        .total_supply();
    assert(total_eligible_votes_u256.high == 0, 'unable to check quorum');
    let total_eligible_votes: u128 = total_eligible_votes_u256.low;
    assert(total_eligible_votes > 0, 'No eligible votes');

    return true;
}

fn assert_correct_contract_type(
    proposed_contract_type: felt252, previous_contract_type: u64
) -> bool {
    // Check if the proposed contract type is compatible with the previous contract type
    if proposed_contract_type == 1 && previous_contract_type == 1 {
        // Generic contract upgrade is allowed
        return true;
    } else if proposed_contract_type == 3 && previous_contract_type == 3 {
        // Airdrop upgrade is allowed
        return true;
    } else if proposed_contract_type == 5 && previous_contract_type == 5 {
        // Custom proposal is allowed
        return true;
    } else if proposed_contract_type == 6 && previous_contract_type == 6 {
        // Arbitrary proposal is allowed
        return true;
    } else if (proposed_contract_type == 0 && previous_contract_type == 0)
        || (proposed_contract_type == 2 && previous_contract_type == 2) {
        return false;
    //panic!("Carmine Options AMM and CARM upgrades are not supported, use custom proposals");
    } else {
        return false;
    //panic!("Proposed contract type is not compatible with the current governance state");
    }
}
