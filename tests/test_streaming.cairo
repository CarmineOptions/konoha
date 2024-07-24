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

use super::setup::{deploy_governance_and_both_tokens};

#[test]
fn test_streaming_flow() {
    // Deploy governance contract and tokens
    let (gov, _, _) = deploy_governance_and_both_tokens();
    // Initialize the IStreamingDispatcher with the contract address
    let streaming = IStreamingDispatcher { contract_address: gov.contract_address };

    let streamer = get_caller_address();
    let recipient: ContractAddress = 0x2.try_into().unwrap();
    let start_time: u64 = 100;
    let end_time: u64 = 200;
    let total_amount: u128 = 100000;
    let is_minted = true;

    // Test adding a new stream
    prank(CheatTarget::One(gov.contract_address), gov.contract_address, CheatSpan::TargetCalls(4));
    streaming.add_new_stream(streamer, recipient, start_time, end_time, total_amount, is_minted);

    // Verify stream creation
    let (currently_claimable, stored_total_amount, is_minting) = streaming.get_stream_info(streamer, recipient, start_time, end_time);
    assert_eq!(currently_claimable, 0, "Incorrect claimed amount after stream creation");
    assert_eq!(stored_total_amount, total_amount, "Incorrect total amount stored");
    assert_eq!(is_minting, true, "not true");

    // Warp to the middle of the stream duration
    start_warp(CheatTarget::One(gov.contract_address), 150);

    // Claim the stream
    streaming.claim_stream(streamer, recipient, start_time, end_time);

    // Verify the claiming
    let expected_claimed_amount = (total_amount * 50 / 100); // 50% since middle of the stream
    let (claimable_amount, _, _) = streaming.get_stream_info(streamer, recipient, start_time, end_time);
    let self_dsp = IGovernanceDispatcher { contract_address: gov.contract_address };
    let token_address = self_dsp.get_governance_token_address();
    let erc20 = IERC20Dispatcher { contract_address: token_address };

    let balance = erc20.balance_of(recipient);
    assert_eq!(claimable_amount, 0, "Incorrect claimable amount after claiming the stream");
    assert_eq!(balance, expected_claimed_amount.into(), "Balance should match the expected claimed amount");

    // Cancel the stream
    prank(CheatTarget::One(gov.contract_address), gov.contract_address, CheatSpan::TargetCalls(1));
    streaming.cancel_stream(recipient, start_time, end_time);

    // Assert after cancellation
    let (claimed_amount, stored_total_amount, _): (u128, u128, bool) = streaming.get_stream_info(streamer, recipient, start_time, end_time);
    assert_eq!(claimed_amount, 0, "Claimed amount should be 0 after canceling the stream");
    assert_eq!(stored_total_amount, 0, "Total amount should be 0 after canceling the stream");

    // Check the balance of the contract (gov)
    let unclaimed_amount: u128 = total_amount - expected_claimed_amount;
    let gov_balance = erc20.balance_of(gov.contract_address);
    assert_eq!(gov_balance, unclaimed_amount.into(), "Treasury balance should match the unclaimed amount");
}
