use array::ArrayTrait;
use core::option::OptionTrait;
use core::result::ResultTrait;
use core::traits::TryInto;
use debug::PrintTrait;

use konoha::contract::Governance;
use konoha::contract::{IGovernanceDispatcher, IGovernanceDispatcherTrait};
use konoha::traits::{IGovernanceTokenDispatcher, IGovernanceTokenDispatcherTrait};
use starknet::{get_block_timestamp, get_caller_address, get_contract_address, ContractAddress};
use konoha::vesting::{IVestingDispatcher, IVestingDispatcherTrait, IVesting};
use konoha::streaming::{IStreamingDispatcher, IStreamingDispatcherTrait, IStreaming};

use openzeppelin::token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
use snforge_std::{
    BlockId, declare, ContractClassTrait, ContractClass, start_prank, start_warp, CheatTarget,
    prank, CheatSpan
};

use super::setup::{admin_addr, governance_address, deploy_governance, deploy_governance_and_both_tokens, deploy_and_distribute_gov_tokens};

fn start_stream(gov: ContractAddress){
    prank(CheatTarget::One(gov), gov, CheatSpan::TargetCalls(4));
    let streaming = IStreamingDispatcher { contract_address: gov };
    streaming.add_new_stream(get_caller_address(), 0x2.try_into().unwrap(), 100, 200, 100000);
}

#[test]
fn test_add_new_stream() {
    let (gov, _, _) = deploy_governance_and_both_tokens();
    start_stream(gov.contract_address);
    let streaming = IStreamingDispatcher { contract_address: gov.contract_address };

    let streamer = get_caller_address();
    let recipient = 0x2.try_into().unwrap();
    let start_time: u64 = 100;
    let end_time: u64 = 200;
    let total_amount: u128 = 100000;
    
    streaming.add_new_stream(streamer, recipient, start_time, end_time, total_amount);
    
    //let key = (get_caller_address(), recipient, end_time, start_time);

    let (claimed_amount, stored_total_amount) = streaming.get_stream_info(
        streamer, 
        recipient,
        start_time,
        end_time,
    );

    assert_eq!(claimed_amount, 0, "Incorrect claimed amount after stream creation");
    assert_eq!(stored_total_amount, total_amount, "Incorrect total amount stored");
}

