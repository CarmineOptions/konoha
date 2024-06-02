use array::ArrayTrait;
use core::traits::TryInto;
use debug::PrintTrait;
use starknet::ContractAddress;
use openzeppelin::token::erc20::interface::{
    IERC20Dispatcher, IERC20DispatcherTrait, IERC20CamelOnlyDispatcher,
    IERC20CamelOnlyDispatcherTrait
};
use snforge_std::{
    BlockId, declare, ContractClassTrait, ContractClass, start_prank, start_warp, CheatTarget,
    prank, CheatSpan
};

use super::setup::{
    admin_addr, first_address, second_address, deploy_governance, deploy_and_distribute_gov_tokens,
    test_vote_upgrade_root, check_if_healthy
};
use konoha::contract::IGovernanceDispatcher;
use konoha::contract::IGovernanceDispatcherTrait;
use konoha::proposals::IProposalsDispatcher;
use konoha::proposals::IProposalsDispatcherTrait;
use konoha::upgrades::IUpgradesDispatcher;
use konoha::upgrades::IUpgradesDispatcherTrait;
use konoha::constants;
use starknet::get_block_timestamp;


const GOV_TOKEN_INITIAL_SUPPLY: felt252 = 1000000000000000000;


fn test_express_proposal() {
    let token_contract = deploy_and_distribute_gov_tokens(admin_addr.try_into().unwrap());
    let gov_contract = deploy_governance(token_contract.contract_address);
    let gov_contract_addr = gov_contract.contract_address;

    let dispatcher = IProposalsDispatcher { contract_address: gov_contract_addr };

    start_prank(CheatTarget::One(gov_contract_addr), admin_addr.try_into().unwrap());
    let prop_id = dispatcher.submit_proposal(42, 1);

    start_prank(CheatTarget::One(gov_contract_addr), admin_addr.try_into().unwrap());
    dispatcher.vote(prop_id, 1);

    assert!(dispatcher.get_proposal_status(prop_id) == 1, "proposal not passed!");
}

#[test]
fn test_proposal_expiry() {
    let token_contract = deploy_and_distribute_gov_tokens(admin_addr.try_into().unwrap());
    let gov_contract = deploy_governance(token_contract.contract_address);
    let gov_contract_addr = gov_contract.contract_address;

    let dispatcher = IProposalsDispatcher { contract_address: gov_contract_addr };

    start_prank(CheatTarget::One(gov_contract_addr), admin_addr.try_into().unwrap());
    let prop_id = dispatcher.submit_proposal(42, 1);

    //simulate passage of time
    let current_timestamp = get_block_timestamp();
    let end_timestamp = current_timestamp + constants::PROPOSAL_VOTING_SECONDS;
    start_warp(CheatTarget::One(gov_contract_addr), end_timestamp + 1);

    let status = dispatcher.get_proposal_status(prop_id);
    assert!(status == constants::MINUS_ONE, "proposal not expired!");
}

#[test]
#[should_panic(expected: ('voting concluded',))]
fn test_vote_on_expired_proposal() {
    let token_contract = deploy_and_distribute_gov_tokens(admin_addr.try_into().unwrap());
    let gov_contract = deploy_governance(token_contract.contract_address);
    let gov_contract_addr = gov_contract.contract_address;

    let dispatcher = IProposalsDispatcher { contract_address: gov_contract_addr };

    start_prank(CheatTarget::One(gov_contract_addr), admin_addr.try_into().unwrap());
    let prop_id = dispatcher.submit_proposal(42, 1);

    //simulate passage of time
    let current_timestamp = get_block_timestamp();
    let end_timestamp = current_timestamp + constants::PROPOSAL_VOTING_SECONDS;
    start_warp(CheatTarget::One(gov_contract_addr), end_timestamp + 1);

    prank(
        CheatTarget::One(token_contract.contract_address),
        admin_addr.try_into().unwrap(),
        CheatSpan::TargetCalls(1)
    );
    token_contract.transfer(first_address.try_into().unwrap(), 100000.try_into().unwrap());
    start_prank(CheatTarget::One(gov_contract_addr), first_address.try_into().unwrap());
    dispatcher.vote(prop_id, 1);
}

#[test]
fn test_vote_on_quorum_not_met() {
    let token_contract = deploy_and_distribute_gov_tokens(admin_addr.try_into().unwrap());
    let gov_contract = deploy_governance(token_contract.contract_address);
    let gov_contract_addr = gov_contract.contract_address;

    let dispatcher = IProposalsDispatcher { contract_address: gov_contract_addr };

    prank(
        CheatTarget::One(gov_contract_addr),
        admin_addr.try_into().unwrap(),
        CheatSpan::TargetCalls(1)
    );
    let prop_id = dispatcher.submit_proposal(42, 1);

    prank(
        CheatTarget::One(token_contract.contract_address),
        admin_addr.try_into().unwrap(),
        CheatSpan::TargetCalls(1)
    );
    token_contract.transfer(first_address.try_into().unwrap(), 100000.try_into().unwrap());

    prank(
        CheatTarget::One(gov_contract_addr),
        first_address.try_into().unwrap(),
        CheatSpan::TargetCalls(1)
    );
    dispatcher.vote(prop_id, 1);

    let (yay_votes, nay_votes) = dispatcher.get_vote_counts(prop_id);
    let total_votes = yay_votes + nay_votes;
    let total_eligible_votes: u128 = IERC20CamelOnlyDispatcher {
        contract_address: token_contract.contract_address
    }
        .totalSupply()
        .low;
    let quorum_threshold = total_eligible_votes * constants::QUORUM / 100;

    assert(total_votes < quorum_threshold, 'Total votes >= quorum threshold');
    let current_timestamp = get_block_timestamp();
    let end_timestamp = current_timestamp + constants::PROPOSAL_VOTING_SECONDS;
    start_warp(CheatTarget::One(gov_contract_addr), end_timestamp + 1);
    assert(
        dispatcher.get_proposal_status(prop_id) == constants::MINUS_ONE,
        'Proposal pass & quorum not met'
    );
}

#[test]
#[should_panic(expected: ('not enough tokens to submit',))]
fn test_submit_proposal_under_quorum() {
    let token_contract = deploy_and_distribute_gov_tokens(admin_addr.try_into().unwrap());
    let gov_contract = deploy_governance(token_contract.contract_address);
    let gov_contract_addr = gov_contract.contract_address;

    let dispatcher = IProposalsDispatcher { contract_address: gov_contract_addr };

    prank(
        CheatTarget::One(token_contract.contract_address),
        admin_addr.try_into().unwrap(),
        CheatSpan::TargetCalls(1)
    );
    token_contract.transfer(first_address.try_into().unwrap(), 100000.try_into().unwrap());

    prank(
        CheatTarget::One(gov_contract_addr),
        first_address.try_into().unwrap(),
        CheatSpan::TargetCalls(1)
    );
    dispatcher.submit_proposal(42, 1);
}

#[test]
#[should_panic(expected: ('incorrect delegate list',))]
fn test_delegate_vote_with_incorrect_calldata() {
    let token_contract = deploy_and_distribute_gov_tokens(admin_addr.try_into().unwrap());
    let gov_contract = deploy_governance(token_contract.contract_address);
    let gov_contract_addr = gov_contract.contract_address;

    let dispatcher = IProposalsDispatcher { contract_address: gov_contract_addr };

    start_prank(CheatTarget::One(gov_contract_addr), admin_addr.try_into().unwrap());
    let mut calldata: Array<(ContractAddress, u128)> = ArrayTrait::new();
    let addr: felt252 = 0x4;
    calldata.append((addr.try_into().unwrap(), 50000));
    dispatcher
        .delegate_vote(first_address.try_into().unwrap(), calldata, 50000.try_into().unwrap());
}

