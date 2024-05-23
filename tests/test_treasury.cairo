mod testStorage {
    use core::traits::TryInto;
    use starknet::ContractAddress;
    const zero_address: felt252 = 0;
    const GOV_CONTRACT_ADDRESS: felt252 =
        0x0304256e5fade73a6fc8f49ed7c1c43ac34e6867426601b01204e1f7ba05b53d;
    const AMM_CONTRACT_ADDRESS: felt252 =
        0x018890b58b08f341acd1292e8f67edfb01f539c835ef4a2176946a995fe794a5;
}

use core::result::ResultTrait;
use core::serde::Serde;
use core::option::OptionTrait;
use core::traits::{TryInto, Into};
use core::byte_array::ByteArray;
use array::ArrayTrait;
use debug::PrintTrait;
use starknet::ContractAddress;
use snforge_std::{
    BlockId, declare, ContractClassTrait, ContractClass, prank, CheatSpan, CheatTarget, start_roll,
    stop_roll,
};
use konoha::treasury::{ITreasuryDispatcher, ITreasuryDispatcherTrait};
use konoha::treasury_types::carmine::{IAMMDispatcher, IAMMDispatcherTrait};
use konoha::traits::{IERC20Dispatcher, IERC20DispatcherTrait};
use openzeppelin::access::ownable::interface::{
    IOwnableTwoStep, IOwnableTwoStepDispatcherTrait, IOwnableTwoStepDispatcher
};


fn get_important_addresses() -> (ContractAddress, ContractAddress, ContractAddress) {
    let gov_contract_address: ContractAddress = testStorage::GOV_CONTRACT_ADDRESS
        .try_into()
        .unwrap();
    let AMM_contract_address: ContractAddress = testStorage::AMM_CONTRACT_ADDRESS
        .try_into()
        .unwrap();
    let contract = declare("Treasury").expect('unable to declare');
    let mut calldata = ArrayTrait::new();
    gov_contract_address.serialize(ref calldata);
    AMM_contract_address.serialize(ref calldata);

    // Precalculate the address to obtain the contract address before the constructor call (deploy) itself
    let contract_address = contract.precalculate_address(@calldata);

    prank(CheatTarget::One(contract_address), gov_contract_address, CheatSpan::TargetCalls(1));
    let (deployed_contract, _) = contract.deploy(@calldata).unwrap();

    return (gov_contract_address, AMM_contract_address, deployed_contract,);
}


#[test]
#[fork("SEPOLIA")]
fn test_transfer_token() {
    let (gov_contract_address, _AMM_contract_address, treasury_contract_address) =
        get_important_addresses();
    let user1: ContractAddress = 0x06730c211d67bb7c463190f10baa95529c82de2e32d79dd4cb3b185b6d0ddf86
        .try_into()
        .unwrap();
    let user2: ContractAddress = '0xUser2'.try_into().unwrap();
    let token: ContractAddress = 0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7
        .try_into()
        .unwrap();
    let decimal: u256 = 1_000000000000000000;

    prank(CheatTarget::One(token), user1, CheatSpan::TargetCalls(1));
    IERC20Dispatcher { contract_address: token }.transfer(treasury_contract_address, 1 * decimal);

    let user2_bal_before_transfer = IERC20Dispatcher { contract_address: token }.balanceOf(user2);

    prank(
        CheatTarget::One(treasury_contract_address), gov_contract_address, CheatSpan::TargetCalls(1)
    );
    ITreasuryDispatcher { contract_address: treasury_contract_address }
        .send_tokens_to_address(user2, 1 * decimal, token);

    let user2_bal_after_transfer = IERC20Dispatcher { contract_address: token }.balanceOf(user2);

    assert(user2_bal_before_transfer != user2_bal_after_transfer, 'token transfer Error');
    assert(user2_bal_after_transfer == 1 * decimal, 'Transfer calculation error');
}

#[test]
#[should_panic(expected: ('Caller is not the owner',))]
#[fork("SEPOLIA")]
fn test_send_tokens_to_address_by_unauthorized_caller() {
    let (_gov_contract_address, _AMM_contract_address, treasury_contract_address) =
        get_important_addresses();
    let user1: ContractAddress = 0x06730c211d67bb7c463190f10baa95529c82de2e32d79dd4cb3b185b6d0ddf86
        .try_into()
        .unwrap();
    let user2: ContractAddress = '0xUser2'.try_into().unwrap();
    let token: ContractAddress = 0x049D36570D4e46f48e99674bd3fcc84644DdD6b96F7C741B1562B82f9e004dC7
        .try_into()
        .unwrap();
    let decimal: u256 = 1_000000000000000000;

    prank(CheatTarget::One(token), user1, CheatSpan::TargetCalls(1));
    IERC20Dispatcher { contract_address: token }.transfer(treasury_contract_address, 1 * decimal);

    let user2_bal_before_transfer = IERC20Dispatcher { contract_address: token }.balanceOf(user2);

    prank(CheatTarget::One(treasury_contract_address), user1, CheatSpan::TargetCalls(1));
    ITreasuryDispatcher { contract_address: treasury_contract_address }
        .send_tokens_to_address(user2, 1 * decimal, token);

    let user2_bal_after_transfer = IERC20Dispatcher { contract_address: token }.balanceOf(user2);

    assert(user2_bal_before_transfer != user2_bal_after_transfer, 'token transfer Error');
    assert(user2_bal_after_transfer == 1 * decimal, 'Transfer calculation error');
}

#[test]
fn test_update_AMM_contract() {
    let (gov_contract_address, _AMM_contract_address, treasury_contract_address) =
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
    let (_gov_contract_address, _AMM_contract_address, treasury_contract_address) =
        get_important_addresses();
    let user2: ContractAddress = '0xUser2'.try_into().unwrap();
    let new_AMM_contract: ContractAddress = '0xnewAMMcontract'.try_into().unwrap();

    prank(CheatTarget::One(treasury_contract_address), user2, CheatSpan::TargetCalls(1));
    ITreasuryDispatcher { contract_address: treasury_contract_address }
        .update_AMM_address(new_AMM_contract);
}

#[test]
fn test_ownership_transfer() {
    let (gov_contract_address, _AMM_contract_address, treasury_contract_address) =
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

