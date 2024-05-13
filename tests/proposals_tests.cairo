use array::ArrayTrait;
use core::traits::TryInto;
use debug::PrintTrait;
use starknet::ContractAddress;
use openzeppelin::token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
use snforge_std::{
    BlockId, declare, ContractClassTrait, ContractClass, start_prank, start_warp, CheatTarget
};

mod setup;
use setup::{
    deploy_governance, deploy_and_distribute_gov_tokens, test_vote_upgrade_root, check_if_healthy
};
use governance::contract::IGovernanceDispatcher;
use governance::contract::IGovernanceDispatcherTrait;
use governance::proposals::IProposalsDispatcher;
use governance::proposals::IProposalsDispatcherTrait;
use governance::upgrades::IUpgradesDispatcher;
use governance::upgrades::IUpgradesDispatcherTrait;
use governance::constants;
use starknet::get_block_timestamp;


const GOV_TOKEN_INITIAL_SUPPLY: felt252 = 1000000000000000000;

const first_address: ContractAddress = 0x1.try_into().unwrap();
const second_address: ContractAddress = 0x2.try_into().unwrap();
const admin_addr: ContractAddress = 0x3.try_into().unwrap();


fn test_express_proposal() {
    let gov_contract = deploy_governance();
    let gov_contract_addr = gov_contract.contract_address;
    let token_contract = deploy_and_distribute_gov_tokens(admin_addr);

    let dispatcher = IProposalsDispatcher { contract_address: gov_contract_addr };

    start_prank(CheatTarget::One(gov_contract_addr), admin_addr);
    let prop_id = dispatcher.submit_proposal(42, 1);

    start_prank(CheatTarget::One(gov_contract_addr), admin_addr);
    dispatcher.vote(prop_id, 1);

    assert(dispatcher.get_proposal_status(prop_id) == 1, "proposal not passed!");
}

#[should_panic]
fn test_proposal_expiry() {
    let gov_contract = deploy_governance();
    let gov_contract_addr = gov_contract.contract_address;
    let token_contract = deploy_and_distribute_gov_tokens(admin_addr);

    let dispatcher = IProposalsDispatcher { contract_address: gov_contract_addr };

    start_prank(CheatTarget::One(gov_contract_addr), admin_addr);
    let prop_id = dispatcher.submit_proposal(42, 1);

    //simulate passage of time
    let current_timestamp = get_block_timestamp();
    let end_timestamp = current_timestamp + constants::PROPOSAL_VOTING_SECONDS;
    start_warp(end_timestamp + 1, gov_contract_addr.into());

    let status = dispatcher.get_proposal_status(prop_id);
}

#[should_panic]
fn test_vote_on_expired_proposal() {
    let gov_contract = deploy_governance();
    let gov_contract_addr = gov_contract.contract_address;
    let token_contract = deploy_and_distribute_gov_tokens(admin_addr);

    let dispatcher = IProposalsDispatcher { contract_address: gov_contract_addr };

    start_prank(CheatTarget::One(gov_contract_addr), admin_addr);
    let prop_id = dispatcher.submit_proposal(42, 1);

    //simulate passage of time
    let current_timestamp = get_block_timestamp();
    let end_timestamp = current_timestamp + constants::PROPOSAL_VOTING_SECONDS;
    start_warp(end_timestamp + 1, gov_contract_addr.into());

    start_prank(CheatTarget::One(gov_contract_addr), first_address);
    dispatcher.vote(prop_id, 1);
}

