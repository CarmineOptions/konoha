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

// returns gov addr, token addr
fn test_setup() -> (ContractAddress, ContractAddress) {
    let new_gov_contract: ContractClass = declare("Governance")
        .expect('unable to declare Governance');
    let new_token_contract: ContractClass = declare("FloatingToken").expect('unable to declare FloatingToken');
    let new_gov_addr: ContractAddress =
        0x001405ab78ab6ec90fba09e6116f373cda53b0ba557789a4578d8c1ec374ba0f
        .try_into()
        .unwrap();
    let mut token_constructor = ArrayTrait::new();
    token_constructor.append(new_gov_addr.into()); // Owner
    let (token_address, _) = new_token_contract
        .deploy(@token_constructor)
        .expect('unable to deploy token');
    let mut gov_constructor: Array<felt252> = ArrayTrait::new();
    gov_constructor.append(token_address.into());
    let (gov_address, _) = new_gov_contract
        .deploy_at(@gov_constructor, new_gov_addr)
        .expect('unable to deploy gov');

    (gov_address, token_address)
}

#[test]
fn test_add_new_stream() {
    let (gov_address, _) = test_setup();

    let streaming = IStreamingDispatcher { contract_address: gov_address };

    start_warp(CheatTarget::All, 1);

    let recipient: ContractAddress = 0x2.try_into().unwrap();
    let start_time: u64 = 100;
    let end_time: u64 = 200;
    let total_amount: u128 = 100000;
    
    streaming.add_new_stream(recipient, start_time, end_time, total_amount);
}







