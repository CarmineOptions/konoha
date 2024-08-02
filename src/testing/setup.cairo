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
use konoha::upgrades::IUpgradesDispatcher;
use konoha::upgrades::IUpgradesDispatcherTrait;
use openzeppelin::token::erc20::interface::IERC20;
use openzeppelin::token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
use snforge_std::{
    BlockId, declare, ContractClassTrait, ContractClass, start_prank, start_warp, CheatTarget
};
use starknet::ContractAddress;
use starknet::get_block_timestamp;


const GOV_TOKEN_INITIAL_SUPPLY: felt252 = 1000000000000000000;

const first_address: felt252 = 0x1;
const second_address: felt252 = 0x2;
const admin_addr: felt252 = 0x3;

fn deploy_governance(token_address: ContractAddress) -> IGovernanceDispatcher {
    let gov_contract = declare("Governance").expect('unable to declare governance');
    let mut args: Array<felt252> = ArrayTrait::new();
    args.append(token_address.into());
    let (address, _) = gov_contract.deploy(@args).expect('unable to deploy governance');
    IGovernanceDispatcher { contract_address: address }
}


fn deploy_and_distribute_gov_tokens(recipient: ContractAddress) -> IERC20Dispatcher {
    let mut calldata = ArrayTrait::new();
    calldata.append(GOV_TOKEN_INITIAL_SUPPLY);
    calldata.append(recipient.into());

    let gov_token_contract = declare("FloatingToken").expect('unable to declare FloatingToken');
    let (token_addr, _) = gov_token_contract
        .deploy(@calldata)
        .expect('unable to deploy FloatingToken');
    let token: IERC20Dispatcher = IERC20Dispatcher { contract_address: token_addr };

    start_prank(CheatTarget::One(token_addr), admin_addr.try_into().unwrap());

    token.transfer(first_address.try_into().unwrap(), 100000);
    token.transfer(second_address.try_into().unwrap(), 100000);
    token
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
    let dispatcher = IProposalsDispatcher { contract_address: gov_contract_addr };

    // Get all live proposals
    let live_proposals = dispatcher.get_live_proposals();
    
    // Find the highest proposal ID
    let mut latest_proposal_id: felt252 = 0;
    for prop_id in live_proposals.iter() {
        if *prop_id > latest_proposal_id {
            latest_proposal_id = *prop_id;
        }
    }

    // If no proposals found, return false
    if latest_proposal_id == 0 {
        return false;
    }

    // Retrieve the details of the latest proposal
    let latest_proposal_details = dispatcher.get_proposal_details(latest_proposal_id);
    if latest_proposal_details.to_upgrade == 0 || latest_proposal_details.to_upgrade == 2 || latest_proposal_details.to_upgrade > 6 {
        return false;
    }

    // Get the previous proposal ID
    let previous_proposal_id = latest_proposal_id - 1;
    
    // Retrieve the details of the previous proposal
    let previous_proposal_details = dispatcher.get_proposal_details(previous_proposal_id);

    // Ensure it's a new version number
    if latest_proposal_details.payload <= previous_proposal_details.payload {
        return false;
    }

    true
}