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
use konoha::staking::{IStakingDispatcher, IStakingDispatcherTrait};
use konoha::types::ContractType;
use konoha::upgrades::{IUpgradesDispatcher, IUpgradesDispatcherTrait};
use openzeppelin::token::erc20::interface::{
    IERC20Dispatcher, IERC20DispatcherTrait, IERC20CamelOnlyDispatcher,
    IERC20CamelOnlyDispatcherTrait
};

use snforge_std::{
    BlockId, declare, ContractClassTrait, ContractClass, start_prank, start_warp, CheatTarget,
    prank, CheatSpan, get_class_hash
};
use starknet::ContractAddress;

use starknet::get_block_timestamp;

use super::setup::check_if_healthy;

use super::setup::{
    admin_addr, first_address, second_address, deploy_governance, deploy_and_distribute_gov_tokens,
    deploy_governance_and_both_tokens, test_vote_upgrade_root
};
use super::staking_tests::{set_staking_curve, stake_all, stake_half};

#[test]
fn test_healthy_upgrade() {
    let (gov, _voting, floating) = deploy_governance_and_both_tokens();
    set_staking_curve(gov.contract_address);
    stake_all(gov.contract_address, floating, admin_addr.try_into().unwrap());

    let proposals_dispatcher = IProposalsDispatcher { contract_address: gov.contract_address };
    let upgrades_dispatcher = IUpgradesDispatcher { contract_address: gov.contract_address };

    // Submit first proposal
    start_prank(CheatTarget::One(gov.contract_address), admin_addr.try_into().unwrap());
    let prop_id = proposals_dispatcher.submit_proposal(42, 3);

    // Vote on the first proposal
    start_prank(CheatTarget::One(gov.contract_address), admin_addr.try_into().unwrap());
    proposals_dispatcher.vote(prop_id, 1);

    // Check the status of the first proposal
    assert_eq!(proposals_dispatcher.get_proposal_status(prop_id), 1, "Proposal not passed!");

    let is_healthy = check_if_healthy(gov.contract_address);
    assert!(is_healthy, "1Governance should be healthy bc empty");

    upgrades_dispatcher.apply_passed_proposal(prop_id);

    // Submit second proposal
    start_prank(CheatTarget::One(gov.contract_address), admin_addr.try_into().unwrap());
    let prop_id1 = proposals_dispatcher.submit_proposal(43, 3);

    // Vote on the second proposal
    start_prank(CheatTarget::One(gov.contract_address), admin_addr.try_into().unwrap());
    proposals_dispatcher.vote(prop_id1, 1);

    // Check the status of the second proposal
    assert_eq!(
        proposals_dispatcher.get_proposal_status(prop_id1), 1, "second Proposal not passed!"
    );

    let is_healthy_after = check_if_healthy(gov.contract_address);
    assert!(
        is_healthy_after, "2-Governance should be healthy after same type to type (3) upgrade."
    );

    upgrades_dispatcher.apply_passed_proposal(prop_id1);
}
#[test]
fn test_unhealthy_upgrade() {
    // Deploy governance and tokens
    let (gov, _voting, floating) = deploy_governance_and_both_tokens();
    let gov_address = gov.contract_address;

    // Print the governance address for debugging
    println!("Governance contract address: {:?}", gov_address);

    // Initialize staking curve
    set_staking_curve(gov_address);

    // Stake tokens
    stake_all(gov_address, floating, admin_addr.try_into().unwrap());

    // Dispatcher for proposals
    let dispatcher = IProposalsDispatcher { contract_address: gov_address };

    // Submit first proposal
    start_prank(CheatTarget::One(gov_address), admin_addr.try_into().unwrap());
    let prop_id = dispatcher.submit_proposal(42, 3);
    dispatcher.vote(prop_id, 1);
    assert_eq!(dispatcher.get_proposal_status(prop_id), 1, "First proposal not passed!");

    // Check health (should be healthy)
    let is_healthy = check_if_healthy(gov_address);
    println!("After first proposal, is_healthy: {}", is_healthy);
    assert!(is_healthy, "Governance should be healthy after first proposal");

    // Apply the first proposal
    IUpgradesDispatcher { contract_address: gov_address }.apply_passed_proposal(prop_id);

    // Submit second proposal (different type)
    start_prank(CheatTarget::One(gov_address), admin_addr.try_into().unwrap());
    let prop_id2 = dispatcher.submit_proposal(43, 5);
    dispatcher.vote(prop_id2, 1);
    assert_eq!(dispatcher.get_proposal_status(prop_id2), 1, "Second proposal not passed!");

    // Print details for debugging
    let proposals_dispatcher = IProposalsDispatcher { contract_address: gov_address };
    let upgrades_dispatcher = IUpgradesDispatcher { contract_address: gov_address };

    let (_, last_upgrade_type) = upgrades_dispatcher.get_latest_upgrade();
    let current_prop_id = proposals_dispatcher.get_latest_proposal_id();
    let current_prop_details = proposals_dispatcher.get_proposal_details(current_prop_id);

    println!("Governance Type: {:?}", last_upgrade_type);
    println!("Upgrading Type: {:?}", current_prop_details.to_upgrade);

    // Check health after the second proposal
    let is_healthy_after = check_if_healthy(gov_address);
    println!("After second proposal, is_healthy: {}", is_healthy_after);
    assert!(!is_healthy_after, "Governance should not be healthy after the second proposal");

    // Apply the second proposal
    IUpgradesDispatcher { contract_address: gov_address }.apply_passed_proposal(prop_id2);
}
