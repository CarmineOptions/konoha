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
use konoha::upgrades::IUpgradesDispatcher;
use konoha::upgrades::IUpgradesDispatcherTrait;
use openzeppelin::token::erc20::interface::IERC20;
use openzeppelin::token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
use snforge_std::{
    BlockId, declare, ContractClassTrait, ContractClass, start_prank, start_warp, CheatTarget
};
use starknet::ContractAddress;
use starknet::get_block_timestamp;
use super::staking_tests::set_floating_token_address;

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

fn check_if_healthy(gov_contract_addr: ContractAddress) -> bool {
    // TODO
    let dispatcher = IProposalsDispatcher { contract_address: gov_contract_addr };
    dispatcher.get_proposal_status(0);
    let prop_details = dispatcher.get_proposal_details(0);
    (prop_details.payload + prop_details.to_upgrade) != 0
}
