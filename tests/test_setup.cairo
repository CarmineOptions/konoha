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
    stake_all(gov.contract_address, floating, admin_addr.try_into().unwrap());
    let dispatcher = IProposalsDispatcher { contract_address: gov.contract_address };

    start_prank(CheatTarget::One(gov.contract_address), admin_addr.try_into().unwrap());
    let prop_id = dispatcher.submit_proposal(42, 1);

    start_prank(CheatTarget::One(gov.contract_address), admin_addr.try_into().unwrap());
    dispatcher.vote(prop_id, 1);

    assert_eq!(dispatcher.get_proposal_status(prop_id), 1, "Proposal not passed!");
    //proposal ID is 0 and payload is 42

    let upgrade_dispatcher = IUpgradesDispatcher { contract_address: gov.contract_address };
    upgrade_dispatcher.apply_passed_proposal(0);

    let live_proposals = dispatcher.get_live_proposals();
    let live_count = live_proposals.len();
    assert_eq!(live_count, 1, "Unexpected number of live proposals: {}", live_count);

    // Check if the governance is healthy
    //assert!(check_if_healthy(gov.contract_address), "New governance state is not healthy");
}


