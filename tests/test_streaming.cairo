use starknet::ContractAddress;
use array::ArrayTrait;
use core::option::OptionTrait;
use core::result::ResultTrait;
use core::traits::TryInto;
use debug::PrintTrait;

use konoha::contract::Governance;
use konoha::contract::{IGovernanceDispatcher, IGovernanceDispatcherTrait};
use konoha::streaming::{IStreamingDispatcher, IStreamingDispatcherTrait};
use konoha::traits::{IGovernanceTokenDispatcher, IGovernanceTokenDispatcherTrait};
use openzeppelin::token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
use snforge_std::{
    BlockId, declare, ContractClassTrait, ContractClass, start_prank, start_warp, CheatTarget,
    prank, CheatSpan
};
use starknet::{get_block_timestamp, get_caller_address, get_contract_address};

use super::setup::{deploy_governance_and_both_tokens};

fn start_stream(gov: ContractAddress, recipient: ContractAddress, start_time: u64, end_time: u64, total_amount: u128, is_minting: bool) {
    prank(CheatTarget::One(gov), gov, CheatSpan::TargetCalls(4));
    let streaming = IStreamingDispatcher { contract_address: gov };
    streaming.add_new_stream(recipient, start_time, end_time, total_amount, is_minting);
}

#[test]
fn test_transfer_actions() {
    let (gov, _, _) = deploy_governance_and_both_tokens();
    let recipient = 0x2.try_into().unwrap();
    let start_time: u64 = 100;
    let end_time: u64 = 200;
    let total_amount: u128 = 100000;
    let expected_claimed_amount = (total_amount * 50 / 100); // 50% claimed since middle of stream

    let streaming = IStreamingDispatcher { contract_address: gov.contract_address };
    let erc20 = IERC20Dispatcher { contract_address: IGovernanceDispatcher { contract_address: gov.contract_address }.get_governance_token_address() };

    // Test with non-minting (i.e., transferring ERC20 tokens)
    start_stream(gov.contract_address, recipient, start_time, end_time, total_amount, false);

    let (claimed_amount, stored_total_amount, is_minting) = streaming.get_stream_info(recipient, start_time, end_time);
    assert_eq!(claimed_amount, 0, "Incorrect claimed amount after stream creation (non-minting)");
    assert_eq!(stored_total_amount, total_amount, "Incorrect total amount stored (non-minting)");
    assert_eq!(is_minting, false, "Stream should be set to not minting");

    // Test claim with non-minting (i.e., transferring ERC20 tokens)
    start_warp(CheatTarget::One(gov.contract_address), 150);
    streaming.claim_stream(recipient, start_time, end_time);

    let (claimed_amount, stored_total_amount, _) = streaming.get_stream_info(recipient, start_time, end_time);
    assert_eq!(stored_total_amount, total_amount, "Incorrect total amount after claiming the stream (non-minting)");
    assert_eq!(claimed_amount, expected_claimed_amount, "Incorrect claimed amount after claiming the stream (non-minting)");

    let recipient_balance = erc20.balance_of(recipient);
    assert_eq!(recipient_balance, expected_claimed_amount.into(), "Recipient balance should match the expected claimed amount (non-minting)");

    // Test cancel with non-minting (i.e., transferring ERC20 tokens)
    streaming.cancel_stream(recipient, start_time, end_time);

    let (cancelled_claimed_amount, stored_total_amount, _) = streaming.get_stream_info(recipient, start_time, end_time);
    assert_eq!(cancelled_claimed_amount, 0, "Claimed amount should be 0 after canceling the stream (non-minting)");
    assert_eq!(stored_total_amount, 0, "Total amount should be 0 after canceling the stream (non-minting)");

    let unclaimed_amount: u256 = total_amount.into() - expected_claimed_amount.into(); // 50000
    let contract_balance = erc20.balance_of(get_contract_address());
    assert_eq!(contract_balance, unclaimed_amount.into(), "Unclaimed amount should be reclaimed correctly (non-minting)");
}



#[test]
fn test_mint_actions() {
    let (gov, _, _) = deploy_governance_and_both_tokens();
    let recipient = 0x2.try_into().unwrap();
    let start_time: u64 = 100;
    let end_time: u64 = 200;
    let total_amount: u128 = 100000;
    let expected_claimed_amount = (total_amount * 50 / 100); // 50% claimed since middle of stream

    let streaming = IStreamingDispatcher { contract_address: gov.contract_address };
    let erc20 = IERC20Dispatcher { contract_address: IGovernanceDispatcher { contract_address: gov.contract_address }.get_governance_token_address() };

    // Test with minting
    start_stream(gov.contract_address, recipient, start_time, end_time, total_amount, true);

    let (claimed_amount, stored_total_amount, is_minting) = streaming.get_stream_info(recipient, start_time, end_time);
    assert_eq!(claimed_amount, 0, "Incorrect claimed amount after stream creation (minting)");
    assert_eq!(stored_total_amount, total_amount, "Incorrect total amount stored (minting)");
    assert_eq!(is_minting, true, "Stream should be set to minting");

    // Test claim with minting
    start_warp(CheatTarget::One(gov.contract_address), 150);
    streaming.claim_stream(recipient, start_time, end_time);

    let (claimed_amount, stored_total_amount, _) = streaming.get_stream_info(recipient, start_time, end_time);
    assert_eq!(stored_total_amount, total_amount, "Incorrect total amount after claiming the stream (minting)");
    assert_eq!(claimed_amount, expected_claimed_amount, "Incorrect claimed amount after claiming the stream (minting)");

    let balance = erc20.balance_of(recipient);
    assert_eq!(balance, expected_claimed_amount.into(), "Balance should match the expected claimed amount (minting)");

    // Test cancel with minting
    streaming.cancel_stream(recipient, start_time, end_time);

    let (cancelled_claimed_amount, stored_total_amount, _) = streaming.get_stream_info(recipient, start_time, end_time);
    assert_eq!(cancelled_claimed_amount, 0, "Claimed amount should be 0 after canceling the stream (minting)");
    assert_eq!(stored_total_amount, 0, "Total amount should be 0 after canceling the stream (minting)");

    let unclaimed_amount: u256 = total_amount.into() - expected_claimed_amount.into(); // 50000
    let balance = erc20.balance_of(get_contract_address());
    assert_eq!(unclaimed_amount.into(), 50000, "Unclaimed amount should be reclaimed correctly (minting)");
    assert_eq!(balance, 50000, "Balance should be 100000 after cancellation (minting)");
}
