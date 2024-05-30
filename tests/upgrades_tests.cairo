use traits::Into;
use traits::TryInto;

use starknet::{ContractAddress, storage_access::storage_address_from_base};

use konoha::contract::IGovernanceDispatcher;
use konoha::contract::IGovernanceDispatcherTrait;
use konoha::proposals::IProposalsDispatcher;
use konoha::proposals::IProposalsDispatcherTrait;
use konoha::upgrades::IUpgradesDispatcher;
use konoha::upgrades::IUpgradesDispatcherTrait;
use konoha::constants;

use snforge_std as snf;
use snforge_std::{CheatTarget, ContractClassTrait};

use super::setup::{admin_addr, deploy_governance, deploy_and_distribute_gov_tokens,};


#[test]
fn test_apply_a_passed_proposal() {
    let token_contract = deploy_and_distribute_gov_tokens(admin_addr.try_into().unwrap());
    let gov_contract = deploy_governance(token_contract.contract_address);
    let gov_contract_addr = gov_contract.contract_address;
    let dispatcher = IProposalsDispatcher { contract_address: gov_contract_addr };
    let class_hash: felt252 = snf::get_class_hash(token_contract.contract_address)
        .try_into()
        .unwrap();

    assert!(
        snf::get_class_hash(gov_contract_addr).try_into().unwrap() != class_hash,
        "Wrong initial class hash"
    );

    snf::start_prank(CheatTarget::One(gov_contract_addr), admin_addr.try_into().unwrap());
    let prop_id = dispatcher.submit_proposal(class_hash, 1); // class hash update
    dispatcher.vote(prop_id, 1);

    IUpgradesDispatcher { contract_address: gov_contract_addr }.apply_passed_proposal(prop_id);

    assert_eq!(
        snf::get_class_hash(gov_contract_addr).try_into().unwrap(),
        class_hash,
        "Worng classhash after upgrade"
    );
    snf::stop_prank(CheatTarget::One(gov_contract_addr));
}

#[test]
#[should_panic(expected: ('Proposal already applied',))]
fn test_apply_an_already_passed_proposal() {
    let token_contract = deploy_and_distribute_gov_tokens(admin_addr.try_into().unwrap());
    let gov_contract = deploy_governance(token_contract.contract_address);
    let gov_contract_addr = gov_contract.contract_address;
    let dispatcher = IProposalsDispatcher { contract_address: gov_contract_addr };

    snf::start_prank(CheatTarget::One(gov_contract_addr), admin_addr.try_into().unwrap());
    let prop_id = dispatcher.submit_proposal(42, 4); // no op
    dispatcher.vote(prop_id, 1);

    IUpgradesDispatcher { contract_address: gov_contract_addr }.apply_passed_proposal(prop_id);

    // try to reapply the same proposal
    IUpgradesDispatcher { contract_address: gov_contract_addr }.apply_passed_proposal(prop_id);
    snf::stop_prank(CheatTarget::One(gov_contract_addr));
}

#[test]
#[should_panic]
fn test_apply_a_failed_proposal() {
    assert_eq!(1, 1, "TODO");
}

#[test]
#[should_panic]
fn test_apply_a_non_existent_proposal() {
    assert_eq!(1, 1, "TODO");
}


#[test]
fn test_successfull_contract_upgrade() {
    assert_eq!(1, 0, "TODO");
}

#[test]
fn test_upgrade_with_custom_proposal_execution() {
    assert_eq!(1, 0, "TODO");
}

#[test]
fn test_multiple_contract_upgrades() {
    assert_eq!(1, 0, "TODO");
}

#[test]
fn test_event_with_failed_upgrade_attempts() {
    assert_eq!(1, 0, "TODO");
}
