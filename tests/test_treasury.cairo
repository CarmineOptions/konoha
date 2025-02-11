use array::ArrayTrait;
use core::array::SpanTrait;
use core::byte_array::ByteArray;
use core::option::OptionTrait;

use core::result::ResultTrait;
use core::serde::Serde;
use core::traits::{TryInto, Into};
use debug::PrintTrait;
use konoha::traits::{IERC20Dispatcher, IERC20DispatcherTrait};
use konoha::treasury::Treasury::InternalFunctionsTrait;
use konoha::treasury::Treasury::InternalTrait;
use konoha::treasury::{ITreasury, Treasury};
use konoha::treasury::{ITreasuryDispatcher, ITreasuryDispatcherTrait};
use konoha::treasury_types::carmine::{IAMMDispatcher, IAMMDispatcherTrait};
use konoha::treasury_types::zklend::interfaces::{IMarketDispatcher, IMarketDispatcherTrait};
use konoha::types::{Transfer, TransferStatus};
use openzeppelin::access::ownable::interface::{
    IOwnableTwoStep, IOwnableTwoStepDispatcherTrait, IOwnableTwoStepDispatcher
};
use openzeppelin::upgrades::interface::{IUpgradeableDispatcher, IUpgradeableDispatcherTrait};
use snforge_std::{
    BlockId, declare, get_class_hash, ContractClassTrait, ContractClass, prank, CheatSpan,
    CheatTarget, roll, warp
};
use starknet::{ContractAddress, get_block_number, get_block_timestamp, ClassHash};
mod testStorage {
    use core::traits::TryInto;
    use starknet::ContractAddress;
    const zero_address: felt252 = 0;
    const GOV_CONTRACT_ADDRESS: felt252 =
        0x57dfabb5a506bfd1937062562a1adf45c7c4c62d0377ccfc59a0b42d7ab3212;
    const CARMINE_AMM_CONTRACT_ADDRESS: felt252 =
        0x047472e6755afc57ada9550b6a3ac93129cc4b5f98f51c73e0644d129fd208d9;
    const ZKLEND_MARKET_C0NTRACT_ADDRESS: felt252 =
        0x04c0a5193d58f74fbace4b74dcf65481e734ed1714121bdc571da345540efa05;
    const GUARDIAN_ADDRESS: felt252 = 0x0123;
}

fn get_important_addresses() -> (
    ContractAddress, ContractAddress, ContractAddress, ContractAddress, ContractAddress
) {
    let gov_contract_address: ContractAddress = testStorage::GOV_CONTRACT_ADDRESS
        .try_into()
        .unwrap();
    let AMM_contract_address: ContractAddress = testStorage::CARMINE_AMM_CONTRACT_ADDRESS
        .try_into()
        .unwrap();
    let zklend_market_contract_address: ContractAddress =
        testStorage::ZKLEND_MARKET_C0NTRACT_ADDRESS
        .try_into()
        .unwrap();
    let first_guardian_address: ContractAddress = testStorage::GUARDIAN_ADDRESS.try_into().unwrap();

    let mut calldata = ArrayTrait::new();
    gov_contract_address.serialize(ref calldata);
    AMM_contract_address.serialize(ref calldata);
    zklend_market_contract_address.serialize(ref calldata);
    first_guardian_address.serialize(ref calldata);

    //let contract = declare("Treasury").expect('unable to declare');
    let treasury_address: ContractAddress = match declare("Treasury") {
        Result::Ok(r) => {
            let contract_address = r.precalculate_address(@calldata);
            prank(
                CheatTarget::One(contract_address), gov_contract_address, CheatSpan::TargetCalls(1)
            );
            let (deployed_contract, _) = r.deploy(@calldata).unwrap();
            deployed_contract
        },
        // FIXME – this is suboptimal, but afaik no way to get this in current snforge version?
        Result::Err(_) => { // already declared. we should 'only' deploy //0x04c990da03da72bdfb10db5c04e8aaa9d5404a07fe454037facb7744c132d42c.try_into().unwrap()
            let r = ContractClass {
                class_hash: 0x035ef05673259eca09f55fce176a195d110bdbc6b145c08811d0e252ea8adadb
                    .try_into()
                    .unwrap()
            };
            let contract_address = r.precalculate_address(@calldata);
            prank(
                CheatTarget::One(contract_address), gov_contract_address, CheatSpan::TargetCalls(1)
            );
            let (deployed_contract, _) = r.deploy(@calldata).unwrap();
            deployed_contract
        }
    };

    return (
        gov_contract_address,
        AMM_contract_address,
        treasury_address,
        zklend_market_contract_address,
        first_guardian_address
    );
}

fn get_and_mint_token(owner: felt252, recipient: felt252, amount: felt252) -> ContractAddress {
    let token_contract = declare("FloatingToken").expect('Could not declare token');
    let (token_address, _) = token_contract
        .deploy(@array![amount, 0, recipient, owner])
        .expect('Could not deploy token');
    token_address
}

#[test]
fn test_add_transfer() {
    let (
        gov_contract_address,
        _AMM_contract_address,
        treasury_contract_address,
        _zklend_market_contract_address,
        _
    ) =
        get_important_addresses();

    let user1: felt252 = 0x06730c211d67bb7c463190f10baa95529c82de2e32d79dd4cb3b185b6d0ddf86;
    let token_address = get_and_mint_token(
        user1, treasury_contract_address.try_into().unwrap(), 10000000000
    );
    let user1: ContractAddress = user1.try_into().unwrap();

    let treasury_dispatcher = ITreasuryDispatcher { contract_address: treasury_contract_address };

    prank(
        CheatTarget::One(treasury_contract_address), gov_contract_address, CheatSpan::TargetCalls(2)
    );
    let new_transfer = treasury_dispatcher.add_transfer(user1, 3500000, token_address);
    treasury_dispatcher.add_transfer(user1, 34543566, token_address);

    let live_transfers = treasury_dispatcher.get_live_transfers();

    assert(live_transfers.len() == 2, 'transfers not added');
    assert(new_transfer.status == TransferStatus::PENDING, 'status is incorrect');
}

#[test]
#[should_panic(expected: 'Insufficient token balance')]
fn test_add_transfer_insufficient_funds() {
    let (
        gov_contract_address,
        _AMM_contract_address,
        treasury_contract_address,
        _zklend_market_contract_address,
        _
    ) =
        get_important_addresses();
    let user2: felt252 = '0xUser2';
    let token_address = get_and_mint_token(user2, treasury_contract_address.try_into().unwrap(), 0);
    let user2: ContractAddress = user2.try_into().unwrap();

    let treasury_dispatcher = ITreasuryDispatcher { contract_address: treasury_contract_address };

    prank(
        CheatTarget::One(treasury_contract_address), gov_contract_address, CheatSpan::TargetCalls(1)
    );
    treasury_dispatcher.add_transfer(user2, 3500000, token_address);
}

#[test]
#[should_panic(expected: 'Caller is not the owner')]
fn test_add_transfer_by_unauthorized_caller() {
    let (
        _gov_contract_address,
        _AMM_contract_address,
        treasury_contract_address,
        _zklend_market_contract_address,
        _
    ) =
        get_important_addresses();

    let user1: felt252 = 0x06730c211d67bb7c463190f10baa95529c82de2e32d79dd4cb3b185b6d0ddf86;
    let token_address = get_and_mint_token(
        user1, treasury_contract_address.try_into().unwrap(), 100000000
    );
    let user1: ContractAddress = user1.try_into().unwrap();

    let treasury_dispatcher = ITreasuryDispatcher { contract_address: treasury_contract_address };

    prank(CheatTarget::One(token_address), user1, CheatSpan::TargetCalls(1));
    treasury_dispatcher.add_transfer(user1, 3500000, token_address);
}

#[test]
fn test_cancel_transfer() {
    let (
        gov_contract_address, _AMM_contract_address, treasury_contract_address, _, guardian_address
    ) =
        get_important_addresses();
    let user1: felt252 = 0x06730c211d67bb7c463190f10baa95529c82de2e32d79dd4cb3b185b6d0ddf86;
    let token_address = get_and_mint_token(
        user1, treasury_contract_address.try_into().unwrap(), 100000000
    );
    let user1: ContractAddress = user1.try_into().unwrap();

    let treasury_dispatcher = ITreasuryDispatcher { contract_address: treasury_contract_address };

    prank(
        CheatTarget::One(treasury_contract_address), gov_contract_address, CheatSpan::TargetCalls(3)
    );
    treasury_dispatcher.add_transfer(user1, 200000, token_address);
    let added_transfer_id = treasury_dispatcher.add_transfer(user1, 300000, token_address).id;
    treasury_dispatcher.add_transfer(user1, 3400000, token_address);
    // treasury_dispatcher.add_guardian(user1);

    prank(CheatTarget::One(treasury_contract_address), guardian_address, CheatSpan::TargetCalls(1));
    treasury_dispatcher.cancel_transfer(added_transfer_id);

    let canceled_transfer = treasury_dispatcher.get_transfer_by_id(added_transfer_id);

    assert(canceled_transfer.status == TransferStatus::CANCELLED, 'status is incorrect');
    assert(canceled_transfer.amount == 0, 'amount is not zero');
}

#[test]
#[should_panic(expected: 'You are not a guardian')]
fn test_cancel_transfer_by_unauthorized_caller() {
    let (gov_contract_address, _AMM_contract_address, treasury_contract_address, _, _) =
        get_important_addresses();
    let user1: felt252 = 0x06730c211d67bb7c463190f10baa95529c82de2e32d79dd4cb3b185b6d0ddf86;
    let token_address = get_and_mint_token(
        user1, treasury_contract_address.try_into().unwrap(), 1000000
    );
    let user1: ContractAddress = user1.try_into().unwrap();

    let treasury_dispatcher = ITreasuryDispatcher { contract_address: treasury_contract_address };

    prank(
        CheatTarget::One(treasury_contract_address), gov_contract_address, CheatSpan::TargetCalls(1)
    );
    let new_transfer_id = treasury_dispatcher.add_transfer(user1, 200000, token_address).id;

    treasury_dispatcher.cancel_transfer(new_transfer_id);
}

#[test]
#[should_panic(expected: 'Invalid id provided')]
fn test_cancel_transfer_invalid_id() {
    let (
        gov_contract_address, _AMM_contract_address, treasury_contract_address, _, guardian_address
    ) =
        get_important_addresses();
    let user1: felt252 = 0x06730c211d67bb7c463190f10baa95529c82de2e32d79dd4cb3b185b6d0ddf86;
    let token_address = get_and_mint_token(
        user1, treasury_contract_address.try_into().unwrap(), 1000000
    );
    let user1: ContractAddress = user1.try_into().unwrap();

    let treasury_dispatcher = ITreasuryDispatcher { contract_address: treasury_contract_address };

    prank(
        CheatTarget::One(treasury_contract_address), gov_contract_address, CheatSpan::TargetCalls(1)
    );
    // treasury_dispatcher.add_guardian(user1);
    treasury_dispatcher.add_transfer(user1, 200000, token_address);

    prank(CheatTarget::One(treasury_contract_address), guardian_address, CheatSpan::TargetCalls(1));
    treasury_dispatcher.cancel_transfer(999);
}

#[test]
#[should_panic(expected: 'Transfer need to be pending')]
fn test_cancel_transfer_not_pending() {
    let (
        gov_contract_address, _AMM_contract_address, treasury_contract_address, _, guardian_address
    ) =
        get_important_addresses();
    let user1: felt252 = 0x06730c211d67bb7c463190f10baa95529c82de2e32d79dd4cb3b185b6d0ddf86;
    let token_address = get_and_mint_token(
        user1, treasury_contract_address.try_into().unwrap(), 10000000
    );
    let user1: ContractAddress = user1.try_into().unwrap();

    let treasury_dispatcher = ITreasuryDispatcher { contract_address: treasury_contract_address };

    prank(
        CheatTarget::One(treasury_contract_address), gov_contract_address, CheatSpan::TargetCalls(1)
    );
    // treasury_dispatcher.add_guardian(user1);
    treasury_dispatcher.add_transfer(user1, 200000, token_address);

    prank(CheatTarget::One(treasury_contract_address), guardian_address, CheatSpan::TargetCalls(2));
    treasury_dispatcher.cancel_transfer(0);
    treasury_dispatcher.cancel_transfer(0);
}

#[test]
fn test_get_next_pending_valid() {
    let (
        gov_contract_address,
        _AMM_contract_address,
        treasury_contract_address,
        _zklend_market_contract_address,
        _
    ) =
        get_important_addresses();
    let user1: felt252 = 0x06730c211d67bb7c463190f10baa95529c82de2e32d79dd4cb3b185b6d0ddf86;
    let token_address = get_and_mint_token(
        user1, treasury_contract_address.try_into().unwrap(), 1000000
    );
    let user1: ContractAddress = user1.try_into().unwrap();

    let treasury_dispatcher = ITreasuryDispatcher { contract_address: treasury_contract_address };

    prank(
        CheatTarget::One(treasury_contract_address), gov_contract_address, CheatSpan::TargetCalls(2)
    );
    let added_transfer = treasury_dispatcher.add_transfer(user1, 200000, token_address);
    warp(
        CheatTarget::One(treasury_contract_address),
        added_transfer.cooldown_end,
        CheatSpan::TargetCalls(1)
    );
    treasury_dispatcher.add_transfer(user1, 300000, token_address);

    let mut next_pending = treasury_dispatcher.get_next_pending().unwrap();
    assert(next_pending.id == 0, 'invalid transfer fetched');

    warp(
        CheatTarget::One(treasury_contract_address),
        next_pending.cooldown_end,
        CheatSpan::TargetCalls(1)
    );
    let mut next_pending = treasury_dispatcher.get_next_pending().unwrap();
    assert(next_pending.id == 1, 'invalid transfer fetched');
}

#[test]
fn test_get_next_pending_no_transfers() {
    let (
        gov_contract_address,
        _AMM_contract_address,
        treasury_contract_address,
        _zklend_market_contract_address,
        _
    ) =
        get_important_addresses();
    let user1: felt252 = 0x06730c211d67bb7c463190f10baa95529c82de2e32d79dd4cb3b185b6d0ddf86;
    let token_address = get_and_mint_token(
        user1, treasury_contract_address.try_into().unwrap(), 10000000
    );
    let user1: ContractAddress = user1.try_into().unwrap();

    let treasury_dispatcher = ITreasuryDispatcher { contract_address: treasury_contract_address };

    assert(treasury_dispatcher.get_next_pending().is_none(), 'transfer not expected');

    prank(
        CheatTarget::One(treasury_contract_address), gov_contract_address, CheatSpan::TargetCalls(1)
    );
    let added_transfer = treasury_dispatcher.add_transfer(user1, 300000, token_address);

    warp(
        CheatTarget::One(treasury_contract_address),
        added_transfer.cooldown_end + 10,
        CheatSpan::TargetCalls(1)
    );
    assert(treasury_dispatcher.get_next_pending().is_none(), 'transfer not expected');
}

#[test]
fn test_execute_pending_by_id_valid() {
    let (
        gov_contract_address,
        _AMM_contract_address,
        treasury_contract_address,
        _zklend_market_contract_address,
        _
    ) =
        get_important_addresses();

    let user1: felt252 = 0x06730c211d67bb7c463190f10baa95529c82de2e32d79dd4cb3b185b6d0ddf86;
    let token_address = get_and_mint_token(
        user1, treasury_contract_address.try_into().unwrap(), 100000000
    );
    let user1: ContractAddress = user1.try_into().unwrap();

    let treasury_dispatcher = ITreasuryDispatcher { contract_address: treasury_contract_address };

    prank(
        CheatTarget::One(treasury_contract_address), gov_contract_address, CheatSpan::TargetCalls(2)
    );
    treasury_dispatcher.add_transfer(user1, 200000, token_address);
    treasury_dispatcher.add_transfer(user1, 300000, token_address);

    let mut next_pending = treasury_dispatcher.get_next_pending().unwrap();
    warp(
        CheatTarget::One(treasury_contract_address),
        next_pending.cooldown_end,
        CheatSpan::TargetCalls(1)
    );
    treasury_dispatcher.execute_pending_by_id(next_pending.id);

    next_pending = treasury_dispatcher.get_next_pending().unwrap();
    warp(
        CheatTarget::One(treasury_contract_address),
        next_pending.cooldown_end,
        CheatSpan::TargetCalls(1)
    );
    treasury_dispatcher.execute_pending_by_id(next_pending.id);
}

#[test]
#[should_panic(expected: 'Invalid id provided')]
fn test_execute_pending_by_id_invalid_id() {
    let (
        _gov_contract_address,
        _AMM_contract_address,
        treasury_contract_address,
        _zklend_market_contract_address,
        _
    ) =
        get_important_addresses();

    let treasury_dispatcher = ITreasuryDispatcher { contract_address: treasury_contract_address };

    treasury_dispatcher.execute_pending_by_id(0);
}

#[test]
#[should_panic(expected: 'Cooldown time has not passed')]
fn test_execute_pending_by_id_too_early() {
    let (
        gov_contract_address,
        _AMM_contract_address,
        treasury_contract_address,
        _zklend_market_contract_address,
        _
    ) =
        get_important_addresses();
    let user1: felt252 = 0x06730c211d67bb7c463190f10baa95529c82de2e32d79dd4cb3b185b6d0ddf86;
    let token_address = get_and_mint_token(
        user1, treasury_contract_address.try_into().unwrap(), 100000000
    );
    let user1: ContractAddress = user1.try_into().unwrap();

    let treasury_dispatcher = ITreasuryDispatcher { contract_address: treasury_contract_address };

    prank(
        CheatTarget::One(treasury_contract_address), gov_contract_address, CheatSpan::TargetCalls(1)
    );
    treasury_dispatcher.add_transfer(user1, 200000, token_address);

    treasury_dispatcher.execute_pending_by_id(0);
}

#[test]
#[should_panic(expected: 'Insufficient token balance')]
fn test_execute_pending_by_id_insufficient_funds() {
    let (
        gov_contract_address,
        _AMM_contract_address,
        treasury_contract_address,
        _zklend_market_contract_address,
        _
    ) =
        get_important_addresses();
    let user1: felt252 = 0x06730c211d67bb7c463190f10baa95529c82de2e32d79dd4cb3b185b6d0ddf86;
    let balance: u256 = 1_0000000000;
    let token_address = get_and_mint_token(
        user1, treasury_contract_address.try_into().unwrap(), 1_0000000000
    );
    let user1: ContractAddress = user1.try_into().unwrap();

    let treasury_dispatcher = ITreasuryDispatcher { contract_address: treasury_contract_address };

    prank(
        CheatTarget::One(treasury_contract_address), gov_contract_address, CheatSpan::TargetCalls(1)
    );
    let added_transfer = treasury_dispatcher.add_transfer(user1, balance, token_address);

    prank(CheatTarget::One(token_address), treasury_contract_address, CheatSpan::TargetCalls(1));
    IERC20Dispatcher { contract_address: token_address }.transfer(user1, 999);

    warp(
        CheatTarget::One(treasury_contract_address),
        added_transfer.cooldown_end,
        CheatSpan::TargetCalls(1)
    );
    treasury_dispatcher.execute_pending_by_id(added_transfer.id);
}

#[test]
#[should_panic(expected: 'Invalid range')]
fn test_get_transfers_by_status_outside_range() {
    let state = Treasury::contract_state_for_testing();
    state.get_transfers_by_status(TransferStatus::PENDING, 0, 1);
}

#[test]
#[should_panic(expected: 'Invalid range')]
fn test_get_transfers_by_status_invalid_range() {
    let state = Treasury::contract_state_for_testing();
    state.get_transfers_by_status(TransferStatus::PENDING, 2, 0);
}

#[test]
fn test_get_unprocessed_transfers_pending_present() {
    let (
        gov_contract_address,
        _AMM_contract_address,
        treasury_contract_address,
        _zklend_market_contract_address,
        _
    ) =
        get_important_addresses();
    let user1: felt252 = 0x06730c211d67bb7c463190f10baa95529c82de2e32d79dd4cb3b185b6d0ddf86;
    let token_address = get_and_mint_token(
        user1, treasury_contract_address.try_into().unwrap(), 100000000
    );
    let user1: ContractAddress = user1.try_into().unwrap();

    let treasury_dispatcher = ITreasuryDispatcher { contract_address: treasury_contract_address };

    prank(
        CheatTarget::One(treasury_contract_address), gov_contract_address, CheatSpan::TargetCalls(3)
    );

    treasury_dispatcher.add_transfer(user1, 200000, token_address);
    let last_added = treasury_dispatcher.add_transfer(user1, 300000, token_address);

    warp(
        CheatTarget::One(treasury_contract_address),
        last_added.cooldown_end,
        CheatSpan::TargetCalls(2)
    );
    treasury_dispatcher.add_transfer(user1, 100000, token_address);

    let failed_transfers = treasury_dispatcher.get_unprocessed_transfers();

    let failed_transfers_count = failed_transfers.len();
    assert(failed_transfers_count == 2, 'invalid transfers number');
    let mut i = 0;
    while i < failed_transfers_count {
        assert(*failed_transfers.at(i).status == TransferStatus::PENDING, 'invalid status');
        i += 1;
    }
}

#[test]
fn test_get_unprocessed_transfers_no_pending() {
    let (
        gov_contract_address,
        _AMM_contract_address,
        treasury_contract_address,
        _zklend_market_contract_address,
        _
    ) =
        get_important_addresses();
    let user1: felt252 = 0x06730c211d67bb7c463190f10baa95529c82de2e32d79dd4cb3b185b6d0ddf86;
    let token_address = get_and_mint_token(
        user1, treasury_contract_address.try_into().unwrap(), 100000000
    );
    let user1: ContractAddress = user1.try_into().unwrap();

    let treasury_dispatcher = ITreasuryDispatcher { contract_address: treasury_contract_address };

    prank(
        CheatTarget::One(treasury_contract_address), gov_contract_address, CheatSpan::TargetCalls(3)
    );

    treasury_dispatcher.add_transfer(user1, 200000, token_address);
    let last_added = treasury_dispatcher.add_transfer(user1, 300000, token_address);

    warp(
        CheatTarget::One(treasury_contract_address),
        last_added.cooldown_end,
        CheatSpan::TargetCalls(1)
    );

    let failed_transfers = treasury_dispatcher.get_unprocessed_transfers();

    let failed_transfers_count = failed_transfers.len();
    assert(failed_transfers_count == 2, 'invalid transfers number');
    let mut i = 0;
    while i < failed_transfers_count {
        assert(*failed_transfers.at(i).status == TransferStatus::PENDING, 'invalid status');
        i += 1;
    }
}

#[test]
fn test_get_live_transfers_pending_present() {
    let (
        gov_contract_address,
        _AMM_contract_address,
        treasury_contract_address,
        _zklend_market_contract_address,
        _
    ) =
        get_important_addresses();
    let user1: felt252 = 0x06730c211d67bb7c463190f10baa95529c82de2e32d79dd4cb3b185b6d0ddf86;
    let token_address = get_and_mint_token(
        user1, treasury_contract_address.try_into().unwrap(), 100000000
    );
    let user1: ContractAddress = user1.try_into().unwrap();

    let treasury_dispatcher = ITreasuryDispatcher { contract_address: treasury_contract_address };

    prank(
        CheatTarget::One(treasury_contract_address), gov_contract_address, CheatSpan::TargetCalls(2)
    );

    treasury_dispatcher.add_transfer(user1, 200000, token_address);
    treasury_dispatcher.add_transfer(user1, 300000, token_address);

    let live_transfers = treasury_dispatcher.get_live_transfers();
    let live_transfers_count = live_transfers.len();
    assert(live_transfers_count == 2, 'invalid transfers number');

    let mut i = 0;
    while i < live_transfers_count {
        assert(*live_transfers.at(i).status == TransferStatus::PENDING, 'invalid status');
        i += 1;
    }
}

#[test]
fn test_get_live_transfers_no_pending() {
    let (
        gov_contract_address,
        _AMM_contract_address,
        treasury_contract_address,
        _zklend_market_contract_address,
        _
    ) =
        get_important_addresses();
    let user1: felt252 = 0x06730c211d67bb7c463190f10baa95529c82de2e32d79dd4cb3b185b6d0ddf86;
    let token_address = get_and_mint_token(
        user1, treasury_contract_address.try_into().unwrap(), 100000000
    );
    let user1: ContractAddress = user1.try_into().unwrap();

    let treasury_dispatcher = ITreasuryDispatcher { contract_address: treasury_contract_address };

    prank(
        CheatTarget::One(treasury_contract_address), gov_contract_address, CheatSpan::TargetCalls(2)
    );

    let cooldown_end = treasury_dispatcher.add_transfer(user1, 200000, token_address).cooldown_end;
    warp(CheatTarget::One(treasury_contract_address), cooldown_end, CheatSpan::TargetCalls(1));
    let transfers = treasury_dispatcher.get_live_transfers();
    assert(transfers.is_empty(), 'No pending should be present');
}

#[test]
fn test_get_cancelled_transfers() {
    let (
        gov_contract_address,
        _AMM_contract_address,
        treasury_contract_address,
        _zklend_market_contract_address,
        guardian_address
    ) =
        get_important_addresses();
    let user1: felt252 = 0x06730c211d67bb7c463190f10baa95529c82de2e32d79dd4cb3b185b6d0ddf86;
    let token_address = get_and_mint_token(
        user1, treasury_contract_address.try_into().unwrap(), 100000000
    );
    let user1: ContractAddress = user1.try_into().unwrap();

    let treasury_dispatcher = ITreasuryDispatcher { contract_address: treasury_contract_address };

    prank(
        CheatTarget::One(treasury_contract_address), gov_contract_address, CheatSpan::TargetCalls(3)
    );

    treasury_dispatcher.add_transfer(user1, 200000, token_address);
    let to_cancel_id = treasury_dispatcher.add_transfer(user1, 300000, token_address).id;
    treasury_dispatcher.add_transfer(user1, 300000, token_address);
    // treasury_dispatcher.add_guardian(user1);

    prank(CheatTarget::One(treasury_contract_address), guardian_address, CheatSpan::TargetCalls(1));
    treasury_dispatcher.cancel_transfer(to_cancel_id);

    let cancelled_transfers = treasury_dispatcher.get_cancelled_transfers();
    assert(cancelled_transfers.len() == 1, 'invalid transfers number');

    assert(*cancelled_transfers.at(0).status == TransferStatus::CANCELLED, 'invalid status');
}

#[test]
fn test_get_finished_transfers_pending_present() {
    let (
        gov_contract_address,
        _AMM_contract_address,
        treasury_contract_address,
        _zklend_market_contract_address,
        _
    ) =
        get_important_addresses();
    let user1: felt252 = 0x06730c211d67bb7c463190f10baa95529c82de2e32d79dd4cb3b185b6d0ddf86;
    let token_address = get_and_mint_token(
        user1, treasury_contract_address.try_into().unwrap(), 100000000
    );
    let user1: ContractAddress = user1.try_into().unwrap();

    let treasury_dispatcher = ITreasuryDispatcher { contract_address: treasury_contract_address };

    prank(
        CheatTarget::One(treasury_contract_address), gov_contract_address, CheatSpan::TargetCalls(3)
    );

    treasury_dispatcher.add_transfer(user1, 200000, token_address);
    let second_transfer_cooldown = treasury_dispatcher
        .add_transfer(user1, 300000, token_address)
        .cooldown_end;

    treasury_dispatcher.add_transfer(user1, 300000, token_address);

    warp(
        CheatTarget::One(treasury_contract_address),
        second_transfer_cooldown + 10,
        CheatSpan::TargetCalls(3)
    );

    treasury_dispatcher.execute_pending_by_id(0);
    treasury_dispatcher.execute_pending_by_id(1);

    let finished_transfers = treasury_dispatcher.get_finished_transfers();
    let finished_transfers_count = finished_transfers.len();
    assert(finished_transfers_count == 2, 'invalid transfers number');

    let mut i = 0;
    while i < finished_transfers_count {
        assert(*finished_transfers.at(i).status == TransferStatus::FINISHED, 'invalid status');
        i += 1;
    }
}

#[test]
fn test_get_finished_transfers_no_pending() {
    let (
        gov_contract_address,
        _AMM_contract_address,
        treasury_contract_address,
        _zklend_market_contract_address,
        _
    ) =
        get_important_addresses();
    let user1: felt252 = 0x06730c211d67bb7c463190f10baa95529c82de2e32d79dd4cb3b185b6d0ddf86;
    let token_address = get_and_mint_token(
        user1, treasury_contract_address.try_into().unwrap(), 100000000
    );
    let user1: ContractAddress = user1.try_into().unwrap();

    let treasury_dispatcher = ITreasuryDispatcher { contract_address: treasury_contract_address };

    prank(
        CheatTarget::One(treasury_contract_address), gov_contract_address, CheatSpan::TargetCalls(2)
    );

    treasury_dispatcher.add_transfer(user1, 200000, token_address);
    let second_transfer_cooldown = treasury_dispatcher
        .add_transfer(user1, 300000, token_address)
        .cooldown_end;

    warp(
        CheatTarget::One(treasury_contract_address),
        second_transfer_cooldown + 10,
        CheatSpan::TargetCalls(3)
    );

    treasury_dispatcher.execute_pending_by_id(0);
    treasury_dispatcher.execute_pending_by_id(1);

    let finished_transfers = treasury_dispatcher.get_finished_transfers();
    let finished_transfers_count = finished_transfers.len();
    assert(finished_transfers_count == 2, 'invalid transfers number');

    let mut i = 0;
    while i < finished_transfers_count {
        assert(*finished_transfers.at(i).status == TransferStatus::FINISHED, 'invalid status');
        i += 1;
    }
}

#[test]
fn test_update_AMM_contract() {
    let (gov_contract_address, _AMM_contract_address, treasury_contract_address, _, _) =
        get_important_addresses();
    let new_AMM_contract: ContractAddress = '0xnewAMMcontract'.try_into().unwrap();

    prank(
        CheatTarget::One(treasury_contract_address), gov_contract_address, CheatSpan::TargetCalls(1)
    );
    ITreasuryDispatcher { contract_address: treasury_contract_address }
        .update_AMM_address(new_AMM_contract);

    let recorded_AMM_addr = ITreasuryDispatcher { contract_address: treasury_contract_address }
        .get_amm_address();
    assert(new_AMM_contract == recorded_AMM_addr, 'Error updating AMM address');
}

#[test]
#[should_panic(expected: ('Caller is not the owner',))]
fn test_update_AMM_contract_by_unauthorized_caller() {
    let (_gov_contract_address, _AMM_contract_address, treasury_contract_address, _, _) =
        get_important_addresses();
    let user2: ContractAddress = '0xUser2'.try_into().unwrap();
    let new_AMM_contract: ContractAddress = '0xnewAMMcontract'.try_into().unwrap();

    prank(CheatTarget::One(treasury_contract_address), user2, CheatSpan::TargetCalls(1));
    ITreasuryDispatcher { contract_address: treasury_contract_address }
        .update_AMM_address(new_AMM_contract);
}

#[test]
fn test_ownership_transfer() {
    let (gov_contract_address, _AMM_contract_address, treasury_contract_address, _, _) =
        get_important_addresses();
    let user2: ContractAddress = '0xUser2'.try_into().unwrap();

    prank(
        CheatTarget::One(treasury_contract_address), gov_contract_address, CheatSpan::TargetCalls(1)
    );
    IOwnableTwoStepDispatcher { contract_address: treasury_contract_address }
        .transfer_ownership(user2);
    assert(
        IOwnableTwoStepDispatcher { contract_address: treasury_contract_address }
            .pending_owner() == user2,
        'Pending transfer failed'
    );

    prank(CheatTarget::One(treasury_contract_address), user2, CheatSpan::TargetCalls(1));
    IOwnableTwoStepDispatcher { contract_address: treasury_contract_address }.accept_ownership();
    assert(
        IOwnableTwoStepDispatcher { contract_address: treasury_contract_address }.owner() == user2,
        'Ownership transfer failed'
    );
}

#[test]
#[should_panic(expected: ('Caller is not the pending owner',))]
fn test_revoked_ownership_transfer() {
    let (gov_contract_address, _AMM_contract_address, treasury_contract_address, _, _) =
        get_important_addresses();
    let user2: ContractAddress = '0xUser2'.try_into().unwrap();

    prank(
        CheatTarget::One(treasury_contract_address), gov_contract_address, CheatSpan::TargetCalls(1)
    );
    IOwnableTwoStepDispatcher { contract_address: treasury_contract_address }
        .transfer_ownership(user2);
    assert(
        IOwnableTwoStepDispatcher { contract_address: treasury_contract_address }
            .pending_owner() == user2,
        'Pending transfer failed'
    );

    // governance transfers ownership back to itself
    prank(
        CheatTarget::One(treasury_contract_address), gov_contract_address, CheatSpan::TargetCalls(1)
    );
    IOwnableTwoStepDispatcher { contract_address: treasury_contract_address }
        .transfer_ownership(gov_contract_address);
    assert(
        IOwnableTwoStepDispatcher { contract_address: treasury_contract_address }
            .owner() == gov_contract_address,
        'owner transferred but shouldnt'
    );

    // user2 tries to accept but can't
    prank(CheatTarget::One(treasury_contract_address), user2, CheatSpan::TargetCalls(1));
    IOwnableTwoStepDispatcher { contract_address: treasury_contract_address }.accept_ownership();
}

#[test]
#[fork("MAINNET")]
fn test_deposit_withdraw_carmine() {
    let (gov_contract_address, _AMM_contract_address, treasury_contract_address, _, _) =
        get_important_addresses();
    let eth_addr: ContractAddress =
        0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7
        .try_into()
        .unwrap();
    let sequencer_address: ContractAddress =
        0x01176a1bd84444c89232ec27754698e5d2e7e1a7f1539f12027f28b23ec9f3d8 // 0x00000005dd3d2f4429af886cd1a3b08289dbcea99a294197e9eb43b0e0325b4b
        .try_into()
        .unwrap(); // random whale

    let transfer_dispatcher = IERC20Dispatcher { contract_address: eth_addr };
    prank(CheatTarget::One(eth_addr), sequencer_address, CheatSpan::TargetCalls(2));
    let oneeth = 1000000000000000000;
    let to_deposit = 900000000000000000;
    transfer_dispatcher.transfer(treasury_contract_address, oneeth);
    assert(
        transfer_dispatcher.balanceOf(treasury_contract_address) >= to_deposit,
        'balance after tx too low??'
    );
    prank(
        CheatTarget::One(treasury_contract_address), gov_contract_address, CheatSpan::TargetCalls(1)
    );

    transfer_dispatcher.approve(treasury_contract_address, to_deposit);
    let treasury_dispatcher = ITreasuryDispatcher { contract_address: treasury_contract_address };
    prank(
        CheatTarget::One(treasury_contract_address), gov_contract_address, CheatSpan::TargetCalls(2)
    );
    let usdc_addr: ContractAddress =
        0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8
        .try_into()
        .unwrap();
    treasury_dispatcher
        .provide_liquidity_to_carm_AMM(eth_addr, usdc_addr, eth_addr, 0, to_deposit.into());

    roll(
        CheatTarget::All, get_block_number() + 1, CheatSpan::Indefinite
    ); // to bypass sandwich guard
    let carm_AMM: IAMMDispatcher = IAMMDispatcher {
        contract_address: _AMM_contract_address
    };
    let lp_token_addr = carm_AMM.get_lptoken_address_for_given_option(
        usdc_addr, eth_addr, 0
    );
    let lp_token: IERC20Dispatcher = IERC20Dispatcher { contract_address: lp_token_addr };
    let lpt_amt = lp_token.balanceOf(treasury_contract_address);
    treasury_dispatcher.withdraw_liquidity(eth_addr, usdc_addr, eth_addr, 0, lpt_amt);
    assert(
        transfer_dispatcher.balanceOf(treasury_contract_address) >= to_deposit, 'balance too low??'
    );
}


#[test]
#[fork("MAINNET")]
fn test_deposit_withdraw_zklend() {
    let (gov_contract_address, _, treasury_contract_address, _, _) = get_important_addresses();
    let usdc_addr: ContractAddress =
        0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8
        .try_into()
        .unwrap();
    let random_whale: ContractAddress =
        0x00000005dd3d2f4429af886cd1a3b08289dbcea99a294197e9eb43b0e0325b4b // ekubo core
        .try_into()
        .unwrap();
    let usdc_dispatcher = IERC20Dispatcher { contract_address: usdc_addr };
    let treasury_dispatcher = ITreasuryDispatcher { contract_address: treasury_contract_address };

    // Transfer USDC from random whale to Treasury contract
    prank(CheatTarget::One(usdc_addr), random_whale, CheatSpan::TargetCalls(1));
    let deposit_amt = 2000000; // 2 USDC
    usdc_dispatcher.transfer(treasury_contract_address, deposit_amt);
    assert(usdc_dispatcher.balanceOf(treasury_contract_address) >= deposit_amt, 'usdc bal too low');
    // Deposit to ZKLend Market
    let bal_before_deposit = usdc_dispatcher.balanceOf(treasury_contract_address);
    prank(
        CheatTarget::One(treasury_contract_address), gov_contract_address, CheatSpan::TargetCalls(2)
    );
    treasury_dispatcher.deposit_to_zklend(usdc_addr, deposit_amt);

    let bal_after_deposit = usdc_dispatcher.balanceOf(treasury_contract_address);

    assert(bal_before_deposit == bal_after_deposit + deposit_amt, 'deposit to zklend failed');

    roll(
        CheatTarget::All, get_block_number() + 1, CheatSpan::Indefinite
    ); // to bypass sandwich guard

    // Withdraw from ZKLend Market
    let bal_before_withdraw = usdc_dispatcher.balanceOf(treasury_contract_address);

    treasury_dispatcher.withdraw_from_zklend(usdc_addr, deposit_amt);

    let bal_after_withdraw = usdc_dispatcher.balanceOf(treasury_contract_address);

    assert(bal_before_withdraw == bal_after_withdraw - deposit_amt, 'deposit to zklend failed');
}

#[test]
#[fork("MAINNET")]
fn test_deposit_withdraw_nostra_lending_pool() {
    let (gov_contract_address, _, treasury_contract_address, _, _) = get_important_addresses();
    let usdc_addr: ContractAddress =
        0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8
        .try_into()
        .unwrap();
    let random_whale: ContractAddress =
        0x00000005dd3d2f4429af886cd1a3b08289dbcea99a294197e9eb43b0e0325b4b // ekubo core
        .try_into()
        .unwrap();
    let usdc_dispatcher = IERC20Dispatcher { contract_address: usdc_addr };
    let treasury_dispatcher = ITreasuryDispatcher { contract_address: treasury_contract_address };

    let nostraUsdcToken: ContractAddress =
        0x002fc2d4b41cc1f03d185e6681cbd40cced61915d4891517a042658d61cba3b1
        .try_into()
        .unwrap();

    // Transfer USDC from random whale to Treasury contract
    prank(CheatTarget::One(usdc_addr), random_whale, CheatSpan::TargetCalls(1));
    let deposit_amt = 2000000; // 2 USDC
    usdc_dispatcher.transfer(treasury_contract_address, deposit_amt);
    assert(usdc_dispatcher.balanceOf(treasury_contract_address) >= deposit_amt, 'usdc bal too low');

    // Deposit to Nostra lending pool
    let bal_before_deposit = usdc_dispatcher.balanceOf(treasury_contract_address);
    prank(
        CheatTarget::One(treasury_contract_address), gov_contract_address, CheatSpan::TargetCalls(2)
    );
    treasury_dispatcher
        .deposit_to_nostra_lending_pool(
            usdc_addr, nostraUsdcToken, deposit_amt.try_into().unwrap()
        );

    let bal_after_deposit = usdc_dispatcher.balanceOf(treasury_contract_address);

    assert(bal_before_deposit == bal_after_deposit + deposit_amt, 'deposit to nostra failed');

    // Withdraw from Nostra lending pool
    let bal_before_withdraw = usdc_dispatcher.balanceOf(treasury_contract_address);

    treasury_dispatcher
        .withdraw_from_nostra_lending_pool(nostraUsdcToken, deposit_amt.try_into().unwrap());

    let bal_after_withdraw = usdc_dispatcher.balanceOf(treasury_contract_address);

    assert(
        bal_before_withdraw == bal_after_withdraw - deposit_amt, 'withdrawal from nostra failed'
    );
}
#[test]
#[should_panic(expected: ('Insufficient Pooled balance',))]
#[fork("MAINNET")]
fn test_deposit_nostra_lending_pool_with_insufficient_balance() {
    let (gov_contract_address, _, treasury_contract_address, _, _) = get_important_addresses();
    let usdc_addr: ContractAddress =
        0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8
        .try_into()
        .unwrap();

    let treasury_dispatcher = ITreasuryDispatcher { contract_address: treasury_contract_address };

    let nostraUsdcToken: ContractAddress =
        0x002fc2d4b41cc1f03d185e6681cbd40cced61915d4891517a042658d61cba3b1
        .try_into()
        .unwrap();

    let deposit_amt = 2000000; // 2 USDC

    prank(
        CheatTarget::One(treasury_contract_address), gov_contract_address, CheatSpan::TargetCalls(1)
    );
    treasury_dispatcher
        .deposit_to_nostra_lending_pool(
            usdc_addr, nostraUsdcToken, deposit_amt.try_into().unwrap()
        );
}
