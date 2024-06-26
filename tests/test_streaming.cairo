use array::ArrayTrait;
use core::option::OptionTrait;
use core::result::ResultTrait;
use core::traits::TryInto;
use debug::PrintTrait;

use konoha::vesting::{IVestingDispatcher, IVestingDispatcherTrait, IVesting};
use konoha::streaming::{IStreamingDispatcher, IStreamingDispatcherTrait, IStreaming};

use openzeppelin::token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
use snforge_std::{
    BlockId, declare, ContractClassTrait, ContractClass, start_prank, start_warp, CheatTarget
};

use starknet::ContractAddress;
use super::setup::deploy_governance;
use super::setup::deploy_and_distribute_gov_tokens;

const GOV_TOKEN_INITIAL_SUPPLY: u256 = 1000000000000000000;
const first_address: felt252 = 0x1;
const second_address: felt252 = 0x2;
const admin_addr: felt252 = 0x3;
const governance_address: felt252 = 0x99999;

// returns gov addr, token addr

fn test_setup() -> (ContractAddress, ContractAddress) {
    // Deploy governance contract
    let gov_dispatcher = deploy_governance(governance_address.try_into().unwrap());
    let gov_address = gov_dispatcher.contract_address;

    // Deploy and distribute governance tokens
    let token_dispatcher = deploy_and_distribute_gov_tokens(admin_addr.try_into().unwrap());
    let token_address = token_dispatcher.contract_address;

    (gov_address, token_address)
}

#[test]
fn test_add_new_stream() {
    // Setup phase: Deploy governance and distribute tokens
    let (gov_address, _) = test_setup();

    // Interaction phase: Use the deployed contracts
    let streaming_dispatcher = IStreamingDispatcher { contract_address: gov_address };

    // Simulate a contract function call with correct parameters
    let recipient: ContractAddress = 0x2.try_into().unwrap(); // Example recipient address
    let start_time: u64 = 100; // Example start time
    let end_time: u64 = 200; // Example end time
    let total_amount: u128 = 100000; // Example total amount

    // Call the add_new_stream function of the streaming contract
    streaming_dispatcher.add_new_stream(recipient, start_time, end_time, total_amount);
}



