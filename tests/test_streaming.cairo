use array::ArrayTrait;
use core::option::OptionTrait;
use core::result::ResultTrait;
use core::traits::TryInto;
use debug::PrintTrait;

use konoha::contract::Governance;
use konoha::contract::{IGovernanceDispatcher, IGovernanceDispatcherTrait};
use konoha::streaming::{IStreamingDispatcher, IStreamingDispatcherTrait};
use konoha::traits::{IGovernanceTokenDispatcher, IGovernanceTokenDispatcherTrait};
use konoha::treasury::{ITreasuryDispatcher, ITreasuryDispatcherTrait};
use openzeppelin::token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
use snforge_std::{
    BlockId, declare, ContractClassTrait, ContractClass, start_prank, start_warp, CheatTarget,
    prank, CheatSpan
};
use starknet::ContractAddress;

use starknet::contract_address_const;
use starknet::{get_block_timestamp, get_caller_address, get_contract_address};

use super::setup::{deploy_governance_and_both_tokens};

mod testStorage {
    use core::traits::TryInto;
    use starknet::ContractAddress;
    const zero_address: felt252 = 0;
    const GOV_CONTRACT_ADDRESS: felt252 =
        0x0304256e5fade73a6fc8f49ed7c1c43ac34e6867426601b01204e1f7ba05b53d;
    const CARMINE_AMM_CONTRACT_ADDRESS: felt252 =
        0x047472e6755afc57ada9550b6a3ac93129cc4b5f98f51c73e0644d129fd208d9;
    const ZKLEND_MARKET_C0NTRACT_ADDRESS: felt252 =
        0x04c0a5193d58f74fbace4b74dcf65481e734ed1714121bdc571da345540efa05;
}

fn get_important_addresses() -> (
    ContractAddress, ContractAddress, ContractAddress, ContractAddress
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
    let contract = declare("Treasury").expect('unable to declare');
    let mut calldata = ArrayTrait::new();
    gov_contract_address.serialize(ref calldata);
    AMM_contract_address.serialize(ref calldata);
    zklend_market_contract_address.serialize(ref calldata);

    // Precalculate the address to obtain the contract address before the constructor call (deploy) itself
    let contract_address = contract.precalculate_address(@calldata);

    prank(CheatTarget::One(contract_address), gov_contract_address, CheatSpan::TargetCalls(1));
    let (deployed_contract, _) = contract.deploy(@calldata).unwrap();

    return (
        gov_contract_address,
        AMM_contract_address,
        deployed_contract,
        zklend_market_contract_address
    );
}

fn start_stream(
    gov: ContractAddress,
    recipient: ContractAddress,
    start_time: u64,
    end_time: u64,
    total_amount: u128,
    is_minting: bool,
    token_address: ContractAddress
) {
    prank(CheatTarget::One(gov), gov, CheatSpan::TargetCalls(4));
    let streaming = IStreamingDispatcher { contract_address: gov };
    streaming
        .add_new_stream(recipient, start_time, end_time, total_amount, is_minting, token_address);
}

#[test]
#[fork("SEPOLIA")]
fn greppy() {
    // Get addresses of already deployed contracts
    let (gov_contract_address, _AMM_contract_address, treasury_contract_address, _) =
        get_important_addresses();

    // Set up users and token
    let user1: ContractAddress = 0x06730c211d67bb7c463190f10baa95529c82de2e32d79dd4cb3b185b6d0ddf86
        .try_into()
        .unwrap();
    let recipient: ContractAddress = '0xRecipient'.try_into().unwrap();
    let token: ContractAddress = 0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7
        .try_into()
        .unwrap();

    // Set up streaming parameters
    let start_time: u64 = 100;
    let end_time: u64 = 200;
    let total_amount: u128 = 100000;
    let expected_claimed_amount = (total_amount * 50 / 100); // 50% claimed since middle of stream

    // Get interfaces
    let streaming = IStreamingDispatcher { contract_address: gov_contract_address };
    let treasury = ITreasuryDispatcher { contract_address: treasury_contract_address };
    let erc20 = IERC20Dispatcher { contract_address: token };

    // Fund the treasury
    prank(CheatTarget::One(token), user1, CheatSpan::TargetCalls(1));
    erc20.transfer(treasury_contract_address, total_amount.into());

    // Set treasury address in streaming contract
    prank(CheatTarget::One(gov_contract_address), user1, CheatSpan::TargetCalls(1));
    streaming.set_treasury_address(treasury_contract_address);

    // Start stream
    prank(CheatTarget::One(gov_contract_address), user1, CheatSpan::TargetCalls(1));
    start_stream(gov_contract_address, recipient, start_time, end_time, total_amount, false, token);

    // Verify stream creation
    let (claimed_amount, stored_total_amount, is_minting, stream_token) = streaming
        .get_stream_info(recipient, start_time, end_time);
    assert(claimed_amount == 0, 'Initial claimed should be 0');
    assert(stored_total_amount == total_amount, 'Incorrect total amount');
    assert(!is_minting, 'Should not be minting');
    assert(stream_token == token, 'Incorrect token address');

    // Advance time and claim the stream
    start_warp(CheatTarget::One(gov_contract_address), 150);
    prank(CheatTarget::One(gov_contract_address), recipient, CheatSpan::TargetCalls(1));
    streaming.claim_stream(recipient, start_time, end_time);

    // Verify claiming
    let (claimed_amount, _, _, _) = streaming.get_stream_info(recipient, start_time, end_time);
    let recipient_balance = erc20.balance_of(recipient);
    assert(claimed_amount == expected_claimed_amount, 'Incorrect claimed amount');
    assert(recipient_balance == expected_claimed_amount.into(), 'Incorrect recipient balance');

    // Test cancel
    prank(CheatTarget::One(gov_contract_address), user1, CheatSpan::TargetCalls(1));
    streaming.cancel_stream(recipient, start_time, end_time);

    // Verify cancellation
    let (cancelled_claimed_amount, cancelled_total_amount, _, _) = streaming
        .get_stream_info(recipient, start_time, end_time);
    assert(cancelled_claimed_amount == 0, 'Claimed amount 0 after cancel');
    assert(cancelled_total_amount == 0, 'Total amount 0 after cancel');

    let treasury_balance_after = erc20.balance_of(treasury_contract_address);
    let expected_treasury_balance = total_amount - expected_claimed_amount;
    assert(treasury_balance_after == expected_treasury_balance.into(), 'Incorrect treasury bal');
}

#[test]
fn test_transfer_actions() {
    // Deploy contracts and initialize interfaces
    let (gov, _, treasury) = deploy_governance_and_both_tokens();
    let recipient: ContractAddress = 0x2.try_into().unwrap();
    let start_time: u64 = 100;
    let end_time: u64 = 200;
    let total_amount: u128 = 100000;
    let expected_claimed_amount = (total_amount * 50 / 100); // 50% claimed since middle of stream

    // Get streaming contract and governance token interface
    let streaming = IStreamingDispatcher { contract_address: gov.contract_address };
    let governance_token_address = IGovernanceDispatcher { contract_address: gov.contract_address }
        .get_governance_token_address();
    let governance_token = IERC20Dispatcher { contract_address: governance_token_address };

    // Mint tokens to the streaming contract and recipient
    let mint_amount: u128 = 200000; // Mint more than total_amount
    let initial_recipient_funds: u128 = 10000; // Allocate 10,000 tokens to recipient

    let governance_token_minter = IGovernanceTokenDispatcher {
        contract_address: governance_token_address
    };
    prank(
        CheatTarget::One(governance_token_address), gov.contract_address, CheatSpan::TargetCalls(2)
    );
    governance_token_minter.mint(gov.contract_address, mint_amount.into());
    governance_token_minter.mint(recipient, initial_recipient_funds.into());

    // Verify that the streaming contract's balance is sufficient
    let streaming_initial_balance = governance_token.balance_of(gov.contract_address);
    let recipient_initial_balance = governance_token.balance_of(recipient);
    println!("Streaming contract address: {:?}", gov.contract_address);
    println!("Amount minted to streaming contract: {}", mint_amount);
    println!("Streaming contract balance after minting: {}", streaming_initial_balance);
    println!("Recipient initial balance after minting: {}", recipient_initial_balance);

    // Start stream with is_minting set to false
    start_stream(
        gov.contract_address,
        recipient,
        start_time,
        end_time,
        total_amount,
        false,
        governance_token_address
    );

    // Verify the stream creation
    let (claimed_amount, stored_total_amount, is_minting, token_address) = streaming
        .get_stream_info(recipient, start_time, end_time);
    println!("Stream created with recipient: {:?}", recipient);
    println!("Stream total amount: {}", stored_total_amount);
    println!("Streaming: {:?} token", token_address);
    println!("Stream is minting: {}", is_minting);
    println!("Claimed amount before claiming: {}", claimed_amount);

    // Advance time and claim the stream
    start_warp(CheatTarget::One(gov.contract_address), 150);

    // Approve the treasury to spend tokens on behalf of the streaming contract
    prank(CheatTarget::One(gov.contract_address), gov.contract_address, CheatSpan::TargetCalls(1));
    governance_token.approve(treasury.contract_address, expected_claimed_amount.into());

    // Claim the stream using send_tokens_to_address
    prank(CheatTarget::One(gov.contract_address), gov.contract_address, CheatSpan::TargetCalls(1));
    streaming.claim_stream(recipient, start_time, end_time);

    // Verify claiming
    let (claimed_amount, _, _, _) = streaming.get_stream_info(recipient, start_time, end_time);
    let recipient_balance = governance_token.balance_of(recipient);
    println!("Amount claimed by recipient: {}", claimed_amount);
    println!("Recipient address: {:?}", recipient);
    println!("Recipient balance after claiming: {}", recipient_balance);

    // Test cancel with transferring using send_tokens_to_address
    streaming.cancel_stream(recipient, start_time, end_time);

    // Verify cancellation
    let (cancelled_claimed_amount, stored_total_amount, _, _) = streaming
        .get_stream_info(recipient, start_time, end_time);
    let streaming_balance_after = governance_token.balance_of(gov.contract_address);
    let unclaimed_amount = mint_amount - expected_claimed_amount;
    println!("Stream canceled.");
    println!("Claimed amount after cancel: {}", cancelled_claimed_amount);
    println!("Total amount after cancel: {}", stored_total_amount);
    println!("Streaming contract balance after cancel: {}", streaming_balance_after);
    println!("Expected remaining balance in streaming contract: {}", unclaimed_amount);

    // Assertions
    assert_eq!(
        claimed_amount,
        expected_claimed_amount,
        "Incorrect claimed amount after claiming the stream (transfer)"
    );
    assert_eq!(
        stored_total_amount,
        total_amount,
        "Incorrect total amount after claiming the stream (transfer)"
    );
    assert_eq!(
        recipient_balance,
        expected_claimed_amount.into() + initial_recipient_funds.into(),
        "Recipient balance should match the expected claimed amount plus initial funds (transfer)"
    );
    assert_eq!(
        cancelled_claimed_amount,
        0,
        "Claimed amount should be 0 after canceling the stream (transfer)"
    );
    assert_eq!(
        stored_total_amount, 0, "Total amount should be 0 after canceling the stream (transfer)"
    );
    assert_eq!(
        streaming_balance_after,
        unclaimed_amount.into(),
        "Balance should reflect the unclaimed amount after cancellation (transfer)"
    );
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
    let erc20 = IERC20Dispatcher {
        contract_address: IGovernanceDispatcher { contract_address: gov.contract_address }
            .get_governance_token_address()
    };
    let governance_token_address = IGovernanceDispatcher { contract_address: gov.contract_address }
        .get_governance_token_address();

    // Test with minting
    start_stream(
        gov.contract_address,
        recipient,
        start_time,
        end_time,
        total_amount,
        true,
        governance_token_address
    );

    let (claimed_amount, stored_total_amount, is_minting, token_address) = streaming
        .get_stream_info(recipient, start_time, end_time);
    assert_eq!(claimed_amount, 0, "Incorrect claimed amount after stream creation (minting)");
    assert_eq!(stored_total_amount, total_amount, "Incorrect total amount stored (minting)");
    assert_eq!(is_minting, true, "Stream should be set to minting");
    println!("Streaming: {:?} token", token_address);

    // Test claim with minting
    start_warp(CheatTarget::One(gov.contract_address), 150);
    streaming.claim_stream(recipient, start_time, end_time);

    let (claimed_amount, stored_total_amount, _, _) = streaming
        .get_stream_info(recipient, start_time, end_time);
    assert_eq!(
        stored_total_amount,
        total_amount,
        "Incorrect total amount after claiming the stream (minting)"
    );
    assert_eq!(
        claimed_amount,
        expected_claimed_amount,
        "Incorrect claimed amount after claiming the stream (minting)"
    );

    let balance = erc20.balance_of(recipient);
    assert_eq!(
        balance,
        expected_claimed_amount.into(),
        "Balance should match the expected claimed amount (minting)"
    );

    // Test cancel with minting
    streaming.cancel_stream(recipient, start_time, end_time);

    let (cancelled_claimed_amount, stored_total_amount, _, _) = streaming
        .get_stream_info(recipient, start_time, end_time);
    assert_eq!(
        cancelled_claimed_amount,
        0,
        "Claimed amount should be 0 after canceling the stream (minting)"
    );
    assert_eq!(
        stored_total_amount, 0, "Total amount should be 0 after canceling the stream (minting)"
    );

    let unclaimed_amount: u256 = total_amount.into() - expected_claimed_amount.into(); // 50000
    let balance = erc20.balance_of(get_contract_address());
    assert_eq!(
        unclaimed_amount.into(), 50000, "Unclaimed amount should be reclaimed correctly (minting)"
    );
    assert_eq!(balance, 50000, "Balance should be 100000 after cancellation (minting)");
}
