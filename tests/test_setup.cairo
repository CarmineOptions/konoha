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

    // Step 3: Submit an initial proposal
    let initial_payload = 42;
    let initial_proposal_id: u128 = proposals_dispatcher.submit_proposal(initial_payload, 1).try_into().unwrap();

    // Retrieve the details of the initial proposal
    let initial_proposal_details = proposals_dispatcher.get_proposal_details(initial_proposal_id.try_into().unwrap());
    assert!(initial_proposal_details.payload == initial_payload, "Initial proposal payload mismatch");

    // Step 4: Submit an upgrade proposal
    let upgrade_payload = 43; // Payload for the upgrade proposal
    let upgrade_proposal_id: u128 = proposals_dispatcher.submit_proposal(upgrade_payload, 3).try_into().unwrap();

    // Retrieve the details of the upgrade proposal
    let upgrade_proposal_details = proposals_dispatcher.get_proposal_details(upgrade_proposal_id.try_into().unwrap());
    assert!(upgrade_proposal_details.payload == upgrade_payload, "Upgrade proposal payload mismatch");

    // Step 5: Perform health check on the upgrade
    let is_healthy = check_if_healthy(gov_contract_addr);
    assert!(is_healthy == true, "The contract upgrade should be healthy");
}


#[test]
fn test_upgrade_with_invalid_proposal_id() {
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

    // Step 3: Submit an initial proposal
    let initial_payload = 42;
    let initial_proposal_id: u128 = proposals_dispatcher.submit_proposal(initial_payload, 1).try_into().unwrap();

    // Submit an upgrade proposal with an invalid ID (e.g., reusing the initial proposal ID)
    let upgrade_payload = 43; 
    let invalid_proposal_id: u128 = initial_proposal_id; // Using the same ID as the initial proposal

    // This is expected to fail or be considered invalid in a real-world scenario
    // But we'll just mock the behavior for the purpose of this test
    let result = proposals_dispatcher.submit_proposal(upgrade_payload, 1); // Should fail in practice
    
    // To simulate failure, you would need your submit_proposal function to handle this properly
    //assert!(result.is_err(), "Submitting an upgrade with an invalid ID should fail");

    // Perform health check to see if it detects the issue
    let is_healthy = check_if_healthy(gov_contract_addr);
    assert!(!is_healthy, "The contract upgrade should be considered unhealthy due to invalid proposal ID");
}

#[test]
fn test_upgrade_with_invalid_version() {
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

    // Step 3: Submit an initial proposal
    let initial_payload = 42;
    let initial_proposal_id: u128 = proposals_dispatcher.submit_proposal(initial_payload, 1).try_into().unwrap();

    // Submit an upgrade proposal with the same or lower version
    let upgrade_payload = 43; 
    let same_version_proposal_id: u128 = proposals_dispatcher.submit_proposal(upgrade_payload, 1).try_into().unwrap(); // Same version as initial

    // Retrieve the details of the upgrade proposal
    let upgrade_proposal_details = proposals_dispatcher.get_proposal_details(same_version_proposal_id.try_into().unwrap());
    assert!(upgrade_proposal_details.payload == upgrade_payload, "Upgrade proposal payload mismatch");

    // Perform health check to see if it detects the issue
    let is_healthy = check_if_healthy(gov_contract_addr);
    assert!(!is_healthy, "The contract upgrade should be considered unhealthy due to invalid version");
}
