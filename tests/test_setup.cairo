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
    BlockId, declare, ContractClassTrait, ContractClass, start_prank, start_warp, CheatTarget,
    prank, CheatSpan
};
use starknet::ContractAddress;

use starknet::get_block_timestamp;

use super::setup::{
    admin_addr, first_address, second_address, deploy_governance, deploy_and_distribute_gov_tokens,
    deploy_governance_and_both_tokens, test_vote_upgrade_root, check_if_healthy
};
use super::staking_tests::{set_staking_curve, stake_all, stake_half};

#[test]
fn test_healthy_upgrade() {
    // Step 1: Deploy governance and tokens
    let (gov, _voting, floating) = deploy_governance_and_both_tokens();
    set_staking_curve(gov.contract_address);
    let gov_contract_addr = gov.contract_address;

    // Initialize the dispatcher for proposals
    let proposals_dispatcher = IProposalsDispatcher { contract_address: gov_contract_addr };

    // Step 2: Stake tokens
    stake_all(gov.contract_address, floating, admin_addr.try_into().unwrap());

    // Simulate transactions as admin
    start_prank(CheatTarget::One(gov_contract_addr), admin_addr.try_into().unwrap());

    //submit_proposal(payload, type)

    // Step 3: Submit an initial proposal
    let prop_id_1: u128 = proposals_dispatcher.submit_proposal(42, 1).try_into().unwrap();

    // Retrieve the details of the initial proposal
    let initial_proposal_details = proposals_dispatcher
        .get_proposal_details(prop_id_1.try_into().unwrap());
    assert!(initial_proposal_details.payload == 42, "Initial proposal payload mismatch");
    assert_eq!(prop_id_1, 0, "Unexpected prop ID 1: {}", prop_id_1);

    //new proposal in the governance

    let prop_id_2: u128 = proposals_dispatcher.submit_proposal(43, 1).try_into().unwrap();
    let update_proposal_details = proposals_dispatcher
        .get_proposal_details(prop_id_2.try_into().unwrap());
    assert!(update_proposal_details.payload == 43, "Update proposal payload mismatch");
    assert_eq!(prop_id_2, 1, "Unexpected prop ID 2: {}", prop_id_1);

    let is_healthy = check_if_healthy(gov_contract_addr);
    assert!(is_healthy, "unhealthy gov state");
}

#[test]
fn test_unhealthy_type() {
    // Step 1: Deploy governance and tokens
    let (gov, _voting, floating) = deploy_governance_and_both_tokens();
    set_staking_curve(gov.contract_address);
    let gov_contract_addr = gov.contract_address;
    let proposals_dispatcher = IProposalsDispatcher { contract_address: gov_contract_addr };
    stake_all(gov.contract_address, floating, admin_addr.try_into().unwrap());

    start_prank(CheatTarget::One(gov_contract_addr), admin_addr.try_into().unwrap());

    //submit_proposal(payload, type)

    let prop_id_1: u128 = proposals_dispatcher.submit_proposal(42, 1).try_into().unwrap();
    assert_eq!(prop_id_1, 0, "Unexpected prop ID 1: {}", prop_id_1);

    let initial_proposal_details = proposals_dispatcher
        .get_proposal_details(prop_id_1.try_into().unwrap());
    assert!(initial_proposal_details.payload == 42, "Initial proposal payload mismatch");

    //new proposal in the governance

    let prop_id_2: u128 = proposals_dispatcher.submit_proposal(43, 3).try_into().unwrap();
    let update_proposal_details = proposals_dispatcher
        .get_proposal_details(prop_id_2.try_into().unwrap());
    assert!(update_proposal_details.payload == 43, "Update proposal payload mismatch");
    assert_eq!(prop_id_2, 1, "Unexpected prop ID 2: {}", prop_id_1);

    let live_proposals = proposals_dispatcher.get_live_proposals();
    assert!(live_proposals.len() == 2, "Unexpected number of live proposals: {}", live_proposals.len());
    
    let is_healthy = check_if_healthy(gov_contract_addr);
    assert!(!is_healthy, "shld be unhealthy gov state - type");
}

#[test]
fn test_unhealthy_version() {
    let (gov, _voting, floating) = deploy_governance_and_both_tokens();
    set_staking_curve(gov.contract_address);
    let gov_contract_addr = gov.contract_address;
    let proposals_dispatcher = IProposalsDispatcher { contract_address: gov_contract_addr };
    stake_all(gov.contract_address, floating, admin_addr.try_into().unwrap());

    start_prank(CheatTarget::One(gov_contract_addr), admin_addr.try_into().unwrap());

    // Submit the first proposal (valid version)
    let prop_id_1: u128 = proposals_dispatcher.submit_proposal(42, 1).try_into().unwrap();
    assert_eq!(prop_id_1, 0, "Unexpected prop ID 1: {}", prop_id_1);

    let initial_proposal_details = proposals_dispatcher
        .get_proposal_details(prop_id_1.try_into().unwrap());
    assert!(initial_proposal_details.payload == 42, "Initial proposal payload mismatch");
    
    // Submit the second proposal with a lower version (unhealthy)
    let prop_id_2: u128 = proposals_dispatcher.submit_proposal(41, 1).try_into().unwrap();
    let update_proposal_details = proposals_dispatcher
        .get_proposal_details(prop_id_2.try_into().unwrap());
    assert!(update_proposal_details.payload == 41, "Update proposal payload mismatch");
    assert_eq!(prop_id_2, 1, "Unexpected prop ID 2: {}", prop_id_2);

    // Check the status of both proposals
    let status_1 = proposals_dispatcher.get_proposal_status(prop_id_1.into());
    let status_2 = proposals_dispatcher.get_proposal_status(prop_id_2.into());

    // Assuming that '1' represents a passed proposal status
    let proposal_passed_status = 1;
    assert_eq!(status_1, proposal_passed_status, "Proposal 1 should have passed, but did not.");
    assert_eq!(status_2, proposal_passed_status, "Proposal 2 should have passed, but did not.");

    // Now check if the governance state is healthy (it should not be, due to the invalid version proposal)
    let is_healthy = check_if_healthy(gov_contract_addr);
    assert!(!is_healthy, "Governance state should be unhealthy due to version downgrade.");
}
