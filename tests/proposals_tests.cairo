use array::ArrayTrait;
use core::traits::Into;
use core::traits::TryInto;
use debug::PrintTrait;
use konoha::constants;
use konoha::contract::IGovernanceDispatcher;
use konoha::contract::IGovernanceDispatcherTrait;
use konoha::discussion::IDiscussionDispatcher;
use konoha::discussion::IDiscussionDispatcherTrait;
use konoha::proposals::IProposalsDispatcher;
use konoha::proposals::IProposalsDispatcherTrait;
use konoha::upgrades::IUpgradesDispatcher;
use konoha::upgrades::IUpgradesDispatcherTrait;
use openzeppelin::token::erc20::interface::{
    IERC20Dispatcher, IERC20DispatcherTrait, IERC20CamelOnlyDispatcher,
    IERC20CamelOnlyDispatcherTrait
};
use snforge_std::{
    BlockId, declare, ContractClassTrait, ContractClass, start_cheat_caller_address, start_cheat_block_timestamp, CheatTarget,
    prank, CheatSpan
};
use starknet::ContractAddress;

use starknet::get_block_timestamp;

use super::setup::{
    admin_addr, first_address, second_address, deploy_governance, deploy_and_distribute_gov_tokens,
    deploy_governance_and_both_tokens, test_vote_upgrade_root, check_if_healthy
};
use super::staking_tests::{set_staking_curve, stake_all, stake_half};


const GOV_TOKEN_INITIAL_SUPPLY: felt252 = 1000000000000000000;


#[test]
fn test_express_proposal() {
    let (gov, _voting, floating) = deploy_governance_and_both_tokens();
    set_staking_curve(gov.contract_address);
    stake_all(gov.contract_address, floating, admin_addr.try_into().unwrap());

    let dispatcher = IProposalsDispatcher { contract_address: gov.contract_address };

    start_cheat_caller_address(CheatTarget::One(gov.contract_address), admin_addr.try_into().unwrap());
    let prop_id = dispatcher.submit_proposal(42, 1);

    start_cheat_caller_address(CheatTarget::One(gov.contract_address), admin_addr.try_into().unwrap());
    dispatcher.vote(prop_id, 1);

    assert!(dispatcher.get_proposal_status(prop_id) == 1, "proposal not passed!");
}

#[test]
fn test_proposal_expiry() {
    let (gov, _voting, floating) = deploy_governance_and_both_tokens();
    set_staking_curve(gov.contract_address);
    stake_all(gov.contract_address, floating, admin_addr.try_into().unwrap());
    let dispatcher = IProposalsDispatcher { contract_address: gov.contract_address };

    start_cheat_caller_address(CheatTarget::One(gov.contract_address), admin_addr.try_into().unwrap());
    let prop_id = dispatcher.submit_proposal(42, 1);

    //simulate passage of time
    let current_timestamp = get_block_timestamp();
    let end_timestamp = current_timestamp + constants::PROPOSAL_VOTING_SECONDS;
    start_cheat_block_timestamp(CheatTarget::One(gov.contract_address), end_timestamp + 1);

    let status = dispatcher.get_proposal_status(prop_id);
    assert!(status == constants::MINUS_ONE, "proposal not expired!");
}

#[test]
#[should_panic(expected: ('voting concluded',))]
fn test_vote_on_expired_proposal() {
    let (gov, _voting, floating) = deploy_governance_and_both_tokens();
    set_staking_curve(gov.contract_address);
    stake_all(gov.contract_address, floating, admin_addr.try_into().unwrap());

    let dispatcher = IProposalsDispatcher { contract_address: gov.contract_address };

    prank(
        CheatTarget::One(gov.contract_address),
        admin_addr.try_into().unwrap(),
        CheatSpan::TargetCalls(1)
    );
    let prop_id = dispatcher.submit_proposal(42, 1);

    //simulate passage of time
    let current_timestamp = get_block_timestamp();
    let end_timestamp = current_timestamp + constants::PROPOSAL_VOTING_SECONDS;
    start_cheat_block_timestamp(CheatTarget::One(gov.contract_address), end_timestamp + 1);

    prank(
        CheatTarget::One(gov.contract_address),
        admin_addr.try_into().unwrap(),
        CheatSpan::TargetCalls(1)
    );
    dispatcher.vote(prop_id, 1);
}


#[test]
fn test_vote_on_quorum_not_met() {
    let (gov, voting, floating) = deploy_governance_and_both_tokens();
    set_staking_curve(gov.contract_address);
    stake_half(gov.contract_address, floating, admin_addr.try_into().unwrap());
    let gov_contract_addr = gov.contract_address;

    let dispatcher = IProposalsDispatcher { contract_address: gov_contract_addr };

    prank(
        CheatTarget::One(gov_contract_addr),
        admin_addr.try_into().unwrap(),
        CheatSpan::TargetCalls(1)
    );
    let prop_id = dispatcher.submit_proposal(42, 1);

    prank(
        CheatTarget::One(floating.contract_address),
        admin_addr.try_into().unwrap(),
        CheatSpan::TargetCalls(1)
    );
    floating.transfer(first_address.try_into().unwrap(), 100000.try_into().unwrap());
    stake_half(gov.contract_address, floating, first_address.try_into().unwrap());

    prank(
        CheatTarget::One(gov_contract_addr),
        first_address.try_into().unwrap(),
        CheatSpan::TargetCalls(1)
    );
    dispatcher.vote(prop_id, 1);

    let (yay_votes, nay_votes) = dispatcher.get_vote_counts(prop_id);
    let total_votes = yay_votes + nay_votes;
    let total_eligible_votes: u128 = IERC20CamelOnlyDispatcher {
        contract_address: voting.contract_address
    }
        .totalSupply()
        .low;
    let quorum_threshold = total_eligible_votes * constants::QUORUM / 100;

    assert(total_votes < quorum_threshold, 'Total votes >= quorum threshold');
    let current_timestamp = get_block_timestamp();
    let end_timestamp = current_timestamp + constants::PROPOSAL_VOTING_SECONDS;
    start_cheat_block_timestamp(CheatTarget::One(gov_contract_addr), end_timestamp + 1);
    assert(
        dispatcher.get_proposal_status(prop_id) == constants::MINUS_ONE,
        'Proposal pass & quorum not met'
    );
}

#[test]
#[should_panic(expected: ('not enough tokens to submit',))]
fn test_submit_proposal_under_quorum() {
    let (gov, _voting, floating) = deploy_governance_and_both_tokens();
    set_staking_curve(gov.contract_address);
    let gov_contract_addr = gov.contract_address;

    let dispatcher = IProposalsDispatcher { contract_address: gov_contract_addr };

    prank(
        CheatTarget::One(floating.contract_address),
        admin_addr.try_into().unwrap(),
        CheatSpan::TargetCalls(1)
    );
    floating.transfer(first_address.try_into().unwrap(), 100000.try_into().unwrap());
    stake_all(gov.contract_address, floating, first_address.try_into().unwrap());
    stake_all(gov.contract_address, floating, admin_addr.try_into().unwrap());

    prank(
        CheatTarget::One(gov_contract_addr),
        first_address.try_into().unwrap(),
        CheatSpan::TargetCalls(1)
    );
    dispatcher.submit_proposal(42, 1);
}

#[test]
#[should_panic(expected: ('Not enough funds',))]
fn test_multiple_delegations_with_insufficient_balance() {
    let (gov, _voting, floating) = deploy_governance_and_both_tokens();
    set_staking_curve(gov.contract_address);
    let gov_contract_addr = gov.contract_address;

    let dispatcher = IProposalsDispatcher { contract_address: gov_contract_addr };

    prank(
        CheatTarget::One(floating.contract_address),
        admin_addr.try_into().unwrap(),
        CheatSpan::TargetCalls(1)
    );
    floating.transfer(first_address.try_into().unwrap(), 1000.try_into().unwrap());
    stake_all(gov.contract_address, floating, first_address.try_into().unwrap());

    prank(
        CheatTarget::One(gov_contract_addr),
        first_address.try_into().unwrap(),
        CheatSpan::TargetCalls(1)
    );
    let calldata: Array<(ContractAddress, u128)> = ArrayTrait::new();
    dispatcher.delegate_vote(second_address.try_into().unwrap(), calldata, 500.try_into().unwrap());

    prank(
        CheatTarget::One(gov_contract_addr),
        first_address.try_into().unwrap(),
        CheatSpan::TargetCalls(1)
    );
    let mut calldata: Array<(ContractAddress, u128)> = ArrayTrait::new();
    calldata.append((second_address.try_into().unwrap(), 500));
    let addr: felt252 = 0x4;
    dispatcher.delegate_vote(addr.try_into().unwrap(), calldata, 6000.try_into().unwrap());
}

#[test]
#[should_panic(expected: ('incorrect delegate list',))]
fn test_delegate_vote_with_incorrect_calldata() {
    let (gov, _voting, _floating) = deploy_governance_and_both_tokens();
    set_staking_curve(gov.contract_address);
    let gov_contract_addr = gov.contract_address;

    let dispatcher = IProposalsDispatcher { contract_address: gov_contract_addr };

    start_cheat_caller_address(CheatTarget::One(gov_contract_addr), admin_addr.try_into().unwrap());
    let mut calldata: Array<(ContractAddress, u128)> = ArrayTrait::new();
    let addr: felt252 = 0x4;
    calldata.append((addr.try_into().unwrap(), 50000.try_into().unwrap()));
    dispatcher
        .delegate_vote(first_address.try_into().unwrap(), calldata, 50000.try_into().unwrap());
}

#[test]
#[should_panic(expected: ('incorrect delegate list',))]
fn test_withdraw_delegation_with_incorrect_calldata() {
    let (gov, _voting, floating) = deploy_governance_and_both_tokens();
    set_staking_curve(gov.contract_address);
    let gov_contract_addr = gov.contract_address;

    let dispatcher = IProposalsDispatcher { contract_address: gov_contract_addr };

    stake_all(gov.contract_address, floating, admin_addr.try_into().unwrap());
    start_cheat_caller_address(CheatTarget::One(gov_contract_addr), admin_addr.try_into().unwrap());
    let prop_id = dispatcher.submit_proposal(42, 1);

    start_cheat_caller_address(CheatTarget::One(gov_contract_addr), first_address.try_into().unwrap());
    let mut calldata: Array<(ContractAddress, u128)> = ArrayTrait::new();
    calldata.append((second_address.try_into().unwrap(), 50000.try_into().unwrap()));
    dispatcher
        .withdraw_delegation(
            second_address.try_into().unwrap(), calldata, 50000.try_into().unwrap(), prop_id
        );
}

#[test]
fn test_multiple_delegations() {
    let (gov, _voting, floating) = deploy_governance_and_both_tokens();
    set_staking_curve(gov.contract_address);
    let gov_contract_addr = gov.contract_address;

    let dispatcher = IProposalsDispatcher { contract_address: gov_contract_addr };

    prank(
        CheatTarget::One(floating.contract_address),
        admin_addr.try_into().unwrap(),
        CheatSpan::TargetCalls(1)
    );
    floating.transfer(first_address.try_into().unwrap(), 1000.try_into().unwrap());
    stake_all(gov.contract_address, floating, first_address.try_into().unwrap());

    prank(
        CheatTarget::One(gov_contract_addr),
        first_address.try_into().unwrap(),
        CheatSpan::TargetCalls(1)
    );
    let calldata: Array<(ContractAddress, u128)> = ArrayTrait::new();
    dispatcher.delegate_vote(second_address.try_into().unwrap(), calldata, 500.try_into().unwrap());

    prank(
        CheatTarget::One(gov_contract_addr),
        first_address.try_into().unwrap(),
        CheatSpan::TargetCalls(1)
    );
    let mut calldata: Array<(ContractAddress, u128)> = ArrayTrait::new();
    calldata.append((second_address.try_into().unwrap(), 500));
    dispatcher.delegate_vote(second_address.try_into().unwrap(), calldata, 100.try_into().unwrap());

    assert!(
        dispatcher.get_total_delegated_to(second_address.try_into().unwrap()) == 600,
        "Incorrect amount delegated!"
    );
}

#[test]
#[should_panic(expected: ('user already voted',))]
fn test_delegate_vote_and_delegation_withdrawal() {
    let (gov, _voting, floating) = deploy_governance_and_both_tokens();
    set_staking_curve(gov.contract_address);
    let gov_contract_addr = gov.contract_address;

    let dispatcher = IProposalsDispatcher { contract_address: gov_contract_addr };

    prank(
        CheatTarget::One(floating.contract_address),
        admin_addr.try_into().unwrap(),
        CheatSpan::TargetCalls(1)
    );
    floating.transfer(first_address.try_into().unwrap(), 1000.try_into().unwrap());
    stake_all(gov.contract_address, floating, first_address.try_into().unwrap());

    prank(
        CheatTarget::One(floating.contract_address),
        admin_addr.try_into().unwrap(),
        CheatSpan::TargetCalls(1)
    );
    floating.transfer(second_address.try_into().unwrap(), 1000.try_into().unwrap());
    stake_all(gov.contract_address, floating, second_address.try_into().unwrap());

    prank(
        CheatTarget::One(gov_contract_addr),
        first_address.try_into().unwrap(),
        CheatSpan::TargetCalls(1)
    );
    let calldata: Array<(ContractAddress, u128)> = ArrayTrait::new();
    dispatcher.delegate_vote(second_address.try_into().unwrap(), calldata, 1);

    stake_all(gov.contract_address, floating, admin_addr.try_into().unwrap());
    start_cheat_caller_address(CheatTarget::One(gov_contract_addr), admin_addr.try_into().unwrap());
    let prop_id = dispatcher.submit_proposal(42, 1);

    start_cheat_caller_address(CheatTarget::One(gov_contract_addr), second_address.try_into().unwrap());
    dispatcher.vote(prop_id, 1);

    prank(
        CheatTarget::One(gov_contract_addr),
        first_address.try_into().unwrap(),
        CheatSpan::TargetCalls(1)
    );
    let mut calldata: Array<(ContractAddress, u128)> = ArrayTrait::new();
    calldata.append((second_address.try_into().unwrap(), 1));
    dispatcher.withdraw_delegation(second_address.try_into().unwrap(), calldata, 1, prop_id);
}

#[test]
#[should_panic(expected: ('amount has to be lower',))]
fn test_withdraw_more_than_delegated_amount() {
    let (gov, _voting, floating) = deploy_governance_and_both_tokens();
    set_staking_curve(gov.contract_address);
    let gov_contract_addr = gov.contract_address;

    let dispatcher = IProposalsDispatcher { contract_address: gov_contract_addr };

    prank(
        CheatTarget::One(floating.contract_address),
        admin_addr.try_into().unwrap(),
        CheatSpan::TargetCalls(1)
    );
    floating.transfer(first_address.try_into().unwrap(), 1000.try_into().unwrap());
    stake_all(gov.contract_address, floating, first_address.try_into().unwrap());
    stake_all(gov.contract_address, floating, admin_addr.try_into().unwrap());

    prank(
        CheatTarget::One(gov_contract_addr),
        first_address.try_into().unwrap(),
        CheatSpan::TargetCalls(1)
    );
    let calldata: Array<(ContractAddress, u128)> = ArrayTrait::new();
    dispatcher.delegate_vote(second_address.try_into().unwrap(), calldata, 10.try_into().unwrap());

    start_cheat_caller_address(CheatTarget::One(gov_contract_addr), admin_addr.try_into().unwrap());
    let prop_id = dispatcher.submit_proposal(42, 1);

    prank(
        CheatTarget::One(gov_contract_addr),
        first_address.try_into().unwrap(),
        CheatSpan::TargetCalls(1)
    );
    let mut calldata: Array<(ContractAddress, u128)> = ArrayTrait::new();
    calldata.append((second_address.try_into().unwrap(), 10));
    dispatcher.withdraw_delegation(second_address.try_into().unwrap(), calldata, 20, prop_id);
}

#[test]
#[should_panic(expected: ('voting token balance is zero',))]
fn test_full_withdraw_and_vote() {
    let (gov, _voting, floating) = deploy_governance_and_both_tokens();
    set_staking_curve(gov.contract_address);
    let gov_contract_addr = gov.contract_address;

    let dispatcher = IProposalsDispatcher { contract_address: gov_contract_addr };

    prank(
        CheatTarget::One(floating.contract_address),
        admin_addr.try_into().unwrap(),
        CheatSpan::TargetCalls(1)
    );
    floating.transfer(first_address.try_into().unwrap(), 1000.try_into().unwrap());
    stake_all(gov.contract_address, floating, first_address.try_into().unwrap());

    prank(
        CheatTarget::One(gov_contract_addr),
        first_address.try_into().unwrap(),
        CheatSpan::TargetCalls(1)
    );
    let calldata: Array<(ContractAddress, u128)> = ArrayTrait::new();
    dispatcher.delegate_vote(second_address.try_into().unwrap(), calldata, 10.try_into().unwrap());

    stake_all(gov.contract_address, floating, admin_addr.try_into().unwrap());
    start_cheat_caller_address(CheatTarget::One(gov_contract_addr), admin_addr.try_into().unwrap());
    let prop_id = dispatcher.submit_proposal(42, 1);

    prank(
        CheatTarget::One(gov_contract_addr),
        first_address.try_into().unwrap(),
        CheatSpan::TargetCalls(1)
    );
    let mut calldata: Array<(ContractAddress, u128)> = ArrayTrait::new();
    calldata.append((second_address.try_into().unwrap(), 10));
    dispatcher.withdraw_delegation(second_address.try_into().unwrap(), calldata, 10, prop_id);

    start_cheat_caller_address(CheatTarget::One(gov_contract_addr), second_address.try_into().unwrap());
    dispatcher.vote(prop_id, 1);
}

#[test]
fn test_successful_proposal_submission() {
    let (gov, _voting, floating) = deploy_governance_and_both_tokens();
    set_staking_curve(gov.contract_address);
    let gov_contract_addr = gov.contract_address;

    let dispatcher = IProposalsDispatcher { contract_address: gov_contract_addr };
    stake_all(gov.contract_address, floating, admin_addr.try_into().unwrap());
    start_cheat_caller_address(CheatTarget::One(gov_contract_addr), admin_addr.try_into().unwrap());
    let prop_id_1: u128 = dispatcher.submit_proposal(42, 1).try_into().unwrap();
    let prop_id_2: u128 = dispatcher.submit_proposal(43, 1).try_into().unwrap();

    assert!(prop_id_1 < prop_id_2, "Proposals should have unique ids");

    let prop_details_1 = dispatcher.get_proposal_details(prop_id_1.try_into().unwrap());
    let prop_details_2 = dispatcher.get_proposal_details(prop_id_2.try_into().unwrap());

    assert!(prop_details_1.payload == 42, "wrong payload first proposal");
    assert!(prop_details_2.payload == 43, "wrong payload second proposal");
}


#[test]
#[should_panic(expected: ('Proposal is not live!',))]
fn test_add_comment_on_non_live_proposal() {
    let (gov, _voting, floating) = deploy_governance_and_both_tokens();
    set_staking_curve(gov.contract_address);
    let gov_contract_addr = gov.contract_address;
    let ipfs_hash: ByteArray = "QmTFMPrNQiJ6o5dfyMn4PPjbQhDrJ6Mu93qe2yMvgnJYM6";

    let dispatcher = IProposalsDispatcher { contract_address: gov_contract_addr };

    stake_all(gov.contract_address, floating, admin_addr.try_into().unwrap());
    prank(
        CheatTarget::One(gov_contract_addr),
        admin_addr.try_into().unwrap(),
        CheatSpan::TargetCalls(3)
    );
    let prop_id = dispatcher.submit_proposal(42, 1);

    //simulate passage of time
    let current_timestamp = get_block_timestamp();
    let end_timestamp = current_timestamp + constants::PROPOSAL_VOTING_SECONDS;
    start_cheat_block_timestamp(CheatTarget::One(gov_contract_addr), end_timestamp + 1);

    IDiscussionDispatcher { contract_address: gov_contract_addr }
        .add_comment(prop_id.try_into().unwrap(), ipfs_hash);
}

#[test]
#[should_panic(expected: ('Govtoken balance is zero',))]
fn test_add_comment_when_token_balance_is_zero() {
    let (gov, _voting, floating) = deploy_governance_and_both_tokens();
    set_staking_curve(gov.contract_address);
    let gov_contract_addr = gov.contract_address;
    let ipfs_hash: ByteArray = "QmTFMPrNQiJ6o5dfyMn4PPjbQhDrJ6Mu93qe2yMvgnJYM6";

    let dispatcher = IProposalsDispatcher { contract_address: gov_contract_addr };

    stake_all(gov.contract_address, floating, admin_addr.try_into().unwrap());
    prank(
        CheatTarget::One(gov_contract_addr),
        admin_addr.try_into().unwrap(),
        CheatSpan::TargetCalls(1)
    );
    let prop_id = dispatcher.submit_proposal(42, 1);

    prank(
        CheatTarget::One(gov_contract_addr),
        first_address.try_into().unwrap(),
        CheatSpan::TargetCalls(1)
    );

    IDiscussionDispatcher { contract_address: gov_contract_addr }
        .add_comment(prop_id.try_into().unwrap(), ipfs_hash);
}

#[test]
fn test_add_comment() {
    let (gov, _voting, floating) = deploy_governance_and_both_tokens();
    set_staking_curve(gov.contract_address);
    let gov_contract_addr = gov.contract_address;
    let ipfs_hash: ByteArray = "QmTFMPrNQiJ6o5dfyMn4PPjbQhDrJ6Mu93qe2yMvgnJYM6";

    let dispatcher = IProposalsDispatcher { contract_address: gov_contract_addr };

    stake_half(gov.contract_address, floating, admin_addr.try_into().unwrap());
    prank(
        CheatTarget::One(gov_contract_addr),
        admin_addr.try_into().unwrap(),
        CheatSpan::TargetCalls(1)
    );
    let prop_id = dispatcher.submit_proposal(42, 1);

    prank(
        CheatTarget::One(floating.contract_address),
        admin_addr.try_into().unwrap(),
        CheatSpan::TargetCalls(1)
    );
    floating.transfer(first_address.try_into().unwrap(), 100000.try_into().unwrap());

    stake_all(gov.contract_address, floating, first_address.try_into().unwrap());
    prank(
        CheatTarget::One(gov_contract_addr),
        first_address.try_into().unwrap(),
        CheatSpan::TargetCalls(1)
    );

    IDiscussionDispatcher { contract_address: gov_contract_addr }
        .add_comment(prop_id.try_into().unwrap(), ipfs_hash);
}

#[test]
fn test_get_comments() {
    let (gov, _voting, floating) = deploy_governance_and_both_tokens();
    set_staking_curve(gov.contract_address);
    let gov_contract_addr = gov.contract_address;
    let ipfs_hash_1: ByteArray = "QmTFMPrNQiJ6o5dfyMn4PPjbQhDrJ6Mu93qe2yMvgnJYM6";
    let ipfs_hash_2: ByteArray = "Uinienu2G54J6o5dfyMn4PPjbQhDrJ6Mu93qbhwjni2ijnf";
    let ipfs_hash_3: ByteArray = "MPrNQiJbdik6o5dfyMn4Pjnislnenoen7hHSU8Ii82jdB56";

    let dispatcher = IProposalsDispatcher { contract_address: gov_contract_addr };

    stake_half(gov.contract_address, floating, admin_addr.try_into().unwrap());
    prank(
        CheatTarget::One(gov_contract_addr),
        admin_addr.try_into().unwrap(),
        CheatSpan::TargetCalls(1)
    );
    let prop_id = dispatcher.submit_proposal(42, 1);

    prank(
        CheatTarget::One(floating.contract_address),
        admin_addr.try_into().unwrap(),
        CheatSpan::TargetCalls(1)
    );
    floating.transfer(first_address.try_into().unwrap(), 100000.try_into().unwrap());
    stake_all(gov.contract_address, floating, first_address.try_into().unwrap());

    prank(
        CheatTarget::One(gov_contract_addr),
        first_address.try_into().unwrap(),
        CheatSpan::TargetCalls(7)
    );

    let discussion_dispatcher = IDiscussionDispatcher { contract_address: gov_contract_addr };

    discussion_dispatcher.add_comment(prop_id.try_into().unwrap(), ipfs_hash_1.clone());
    discussion_dispatcher.add_comment(prop_id.try_into().unwrap(), ipfs_hash_2.clone());
    discussion_dispatcher.add_comment(prop_id.try_into().unwrap(), ipfs_hash_3.clone());

    let res = discussion_dispatcher.get_comments(prop_id.try_into().unwrap());

    let res_span = res.span();

    assert_eq!(*res_span.at(0).user, first_address.try_into().unwrap());
    assert_eq!(res_span.at(0).ipfs_hash.clone(), ipfs_hash_1);

    assert_eq!(*res_span.at(1).user, first_address.try_into().unwrap());
    assert_eq!(res_span.at(1).ipfs_hash.clone(), ipfs_hash_2);

    assert_eq!(*res_span.at(2).user, first_address.try_into().unwrap());
    assert_eq!(res_span.at(2).ipfs_hash.clone(), ipfs_hash_3);
}

