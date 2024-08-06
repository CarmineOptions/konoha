use array::ArrayTrait;
use core::traits::TryInto;
use debug::PrintTrait;
use konoha::constants;

use konoha::contract::{IGovernanceDispatcher, IGovernanceDispatcherTrait};
use konoha::proposals::{IProposalsDispatcher, IProposalsDispatcherTrait};
use konoha::upgrades::IUpgradesDispatcher;
use konoha::upgrades::IUpgradesDispatcherTrait;
use snforge_std::{
    BlockId, declare, ContractClassTrait, ContractClass, start_cheat_caller_address, CheatTarget, start_cheat_block_timestamp
};
use starknet::{ContractAddress, get_block_timestamp};


// This proposes upgrading the current mainnet Carmine governance to the one in master, votes on it with multiple wallets and passes the upgrade turbo.
#[test]
#[fork("MAINNET")]
fn test_upgrade_mainnet_to_master() {
    let gov_contract_addr: ContractAddress =
        0x001405ab78ab6ec90fba09e6116f373cda53b0ba557789a4578d8c1ec374ba0f
        .try_into()
        .unwrap();
    let dispatcher = IProposalsDispatcher { contract_address: gov_contract_addr };

    let mut top_carm_holders = ArrayTrait::new();
    let marek_address: ContractAddress =
        0x0011d341c6e841426448ff39aa443a6dbb428914e05ba2259463c18308b86233
        .try_into()
        .unwrap();
    top_carm_holders.append(marek_address);
    let ondrej_address: ContractAddress =
        0x0583a9d956d65628f806386ab5b12dccd74236a3c6b930ded9cf3c54efc722a1
        .try_into()
        .unwrap();
    top_carm_holders.append(ondrej_address);
    let team1_address: ContractAddress =
        0x06e2c2a5da2e5478b1103d452486afba8378e91f32a124f0712f09edd3ccd923
        .try_into()
        .unwrap();
    top_carm_holders.append(team1_address);
    let team2_address: ContractAddress =
        0x00d79a15d84f5820310db21f953a0fae92c95e25d93cb983cc0c27fc4c52273c
        .try_into()
        .unwrap();
    top_carm_holders.append(team2_address);
    let madman_address: ContractAddress =
        0x06717eaf502baac2b6b2c6ee3ac39b34a52e726a73905ed586e757158270a0af
        .try_into()
        .unwrap();
    top_carm_holders.append(madman_address);

    // declare current and submit proposal
    let new_contract: ContractClass = declare("Governance").expect('unable to declare governance');
    start_cheat_caller_address(CheatTarget::One(gov_contract_addr), team1_address);
    let new_prop_id = dispatcher.submit_proposal(new_contract.class_hash.into(), 1);
    loop {
        match top_carm_holders.pop_front() {
            Option::Some(holder) => {
                start_cheat_caller_address(CheatTarget::One(gov_contract_addr), holder);
                dispatcher.vote(new_prop_id, 1);
            },
            Option::None(()) => { break (); },
        }
    };

    //simulate passage of time
    let current_timestamp = get_block_timestamp();
    let end_timestamp = current_timestamp + constants::PROPOSAL_VOTING_SECONDS;
    start_cheat_block_timestamp(CheatTarget::One(gov_contract_addr), end_timestamp + 1);

    assert(dispatcher.get_proposal_status(new_prop_id) == 1, 'proposal not passed!');

    let upgrade_dispatcher = IUpgradesDispatcher { contract_address: gov_contract_addr };
    upgrade_dispatcher.apply_passed_proposal(new_prop_id);
    assert(check_if_healthy(gov_contract_addr), 'new gov not healthy');
}


fn check_if_healthy(gov_contract_addr: ContractAddress) -> bool {
    // TODO
    let dispatcher = IProposalsDispatcher { contract_address: gov_contract_addr };
    dispatcher.get_proposal_status(0);
    let prop_details = dispatcher.get_proposal_details(0);
    (prop_details.payload + prop_details.to_upgrade) != 0
}
