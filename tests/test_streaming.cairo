use array::ArrayTrait;
use core::option::OptionTrait;
use core::result::ResultTrait;
use core::traits::TryInto;
use debug::PrintTrait;

use konoha::staking::{IStakingDispatcher, IStakingDispatcherTrait};
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

use super::setup::{admin_addr, deploy_governance_and_both_tokens};

#[test]
fn test_streaming_mint() {
    // Deploy governance contract and tokens
    let (gov, _, _) = deploy_governance_and_both_tokens();
    // Initialize the IStreamingDispatcher with the contract address
    let streaming = IStreamingDispatcher { contract_address: gov.contract_address };

    let streamer = get_caller_address();
    let recipient: ContractAddress = 0x2.try_into().unwrap();
    let start_time: u64 = 100;
    let end_time: u64 = 200;
    let total_amount: u128 = 100000;
    let is_minting = true;

    // Test adding a new stream
    prank(CheatTarget::One(gov.contract_address), gov.contract_address, CheatSpan::TargetCalls(4));
    streaming.add_new_stream(streamer, recipient, start_time, end_time, total_amount, is_minting);

    // Verify stream creation
    let (currently_claimable, stored_total_amount, is_minting) = streaming.get_stream_info(streamer, recipient, start_time, end_time);
    assert_eq!(currently_claimable, 0, "Incorrect claimed amount after stream creation");
    assert_eq!(stored_total_amount, total_amount, "Incorrect total amount stored");
    assert_eq!(is_minting, true, "should create with mint");

    // Warp to the middle of the stream duration
    start_warp(CheatTarget::One(gov.contract_address), 150);
    // Claim the stream
    streaming.claim_stream(streamer, recipient, start_time, end_time, is_minting);

    // Verify the claiming
    let expected_claimed_amount = (total_amount * 50 / 100); // 50% since middle of the stream
    let (claimable_amount, _, _) = streaming.get_stream_info(streamer, recipient, start_time, end_time);

    let self_dsp = IGovernanceDispatcher { contract_address: gov.contract_address };
    let floating_token = self_dsp.get_governance_token_address();
    let erc20 = IERC20Dispatcher { contract_address: floating_token };

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
    //assert_eq!(is_minting, true, "should have minted back");

    // Check the balance of the contract (gov)
    let unclaimed_amount: u128 = total_amount - expected_claimed_amount;
    let gov_balance = erc20.balance_of(gov.contract_address);
    assert_eq!(gov_balance, unclaimed_amount.into(), "Treasury balance should match the unclaimed amount");
}

#[test]
fn test_streaming_transfer_with_minting() {
    // Deploy governance contract and tokens
    let (gov, _, _) = deploy_governance_and_both_tokens();
    
    // Initialize the IStreamingDispatcher with the contract address
    let streaming = IStreamingDispatcher { contract_address: gov.contract_address };

    // Define test parameters
    let streamer = get_caller_address();
    let recipient: ContractAddress = 0x2.try_into().unwrap();
    let start_time: u64 = 100;
    let end_time: u64 = 200;
    let total_amount: u128 = 100000;
    let is_minting = true; // We're testing transfer, not minting

    // Get the governance token address
    let self_dsp = IGovernanceDispatcher { contract_address: gov.contract_address };
    let governance_token_address = self_dsp.get_governance_token_address();
    let governance_token = IGovernanceTokenDispatcher { contract_address: governance_token_address };
    let erc20 = IERC20Dispatcher { contract_address: governance_token_address };

    // Mint tokens to the governance contract
    let mint_amount: u128 = 1000000000000000000000; // A large amount to ensure sufficient balance
    prank(CheatTarget::One(governance_token_address), gov.contract_address, CheatSpan::TargetCalls(1));
    governance_token.mint(gov.contract_address, mint_amount.into());

    // Verify the governance contract's balance
    let gov_initial_balance = erc20.balance_of(gov.contract_address);
    assert_eq!(gov_initial_balance, mint_amount.into(), "Governance contract should have the minted amount");

    // Test adding a new stream
    prank(CheatTarget::One(gov.contract_address), gov.contract_address, CheatSpan::TargetCalls(1));
    streaming.add_new_stream(streamer, recipient, start_time, end_time, total_amount, is_minting);

    // Verify stream creation
    let (currently_claimable, stored_total_amount, stored_is_minting) = streaming.get_stream_info(streamer, recipient, start_time, end_time);
    assert_eq!(currently_claimable, 0, "Incorrect claimed amount after stream creation");
    assert_eq!(stored_total_amount, total_amount, "Incorrect total amount stored");
    assert_eq!(stored_is_minting, false, "should create to transfer");

    // Warp to the middle of the stream duration
    start_warp(CheatTarget::One(gov.contract_address), 150);
    
    // Claim the stream
    prank(CheatTarget::One(gov.contract_address), gov.contract_address, CheatSpan::TargetCalls(1));
    streaming.claim_stream(streamer, recipient, start_time, end_time, is_minting);

    // Verify the claiming
    let expected_claimed_amount = (total_amount * 50 / 100); // 50% since middle of the stream
    let (claimable_amount, _, _) = streaming.get_stream_info(streamer, recipient, start_time, end_time);

    let recipient_balance = erc20.balance_of(recipient);
    assert_eq!(claimable_amount, expected_claimed_amount, "Incorrect claimable amount after claiming the stream");
    assert_eq!(recipient_balance, expected_claimed_amount.into(), "Recipient balance should match the expected claimed amount");

    // Check the remaining balance of the governance contract
    let gov_balance_after_claim = erc20.balance_of(gov.contract_address);
    assert_eq!(gov_balance_after_claim, (mint_amount - expected_claimed_amount).into(), "Governance contract balance should be reduced by the claimed amount");

    // Cancel the stream
    prank(CheatTarget::One(gov.contract_address), gov.contract_address, CheatSpan::TargetCalls(1));
    streaming.cancel_stream(recipient, start_time, end_time);

    // Assert after cancellation
    let (claimed_amount, stored_total_amount, _) = streaming.get_stream_info(streamer, recipient, start_time, end_time);
    assert_eq!(claimed_amount, 0, "Claimed amount should be 0 after canceling the stream");
    assert_eq!(stored_total_amount, 0, "Total amount should be 0 after canceling the stream");

    // Check the final balances
    let final_recipient_balance = erc20.balance_of(recipient);
    let final_gov_balance = erc20.balance_of(gov.contract_address);
    assert_eq!(final_recipient_balance, expected_claimed_amount.into(), "Recipient's final balance should match the claimed amount");
    assert_eq!(final_gov_balance, (mint_amount - expected_claimed_amount).into(), "Governance contract's final balance should be the initial minted amount minus claimed amount");
}