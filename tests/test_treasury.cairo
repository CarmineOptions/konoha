use array::ArrayTrait;
use core::byte_array::ByteArray;
use core::option::OptionTrait;

use core::result::ResultTrait;
use core::serde::Serde;
use core::traits::{TryInto, Into};
use debug::PrintTrait;
use konoha::contract::Governance;
use konoha::contract::{IGovernanceDispatcher, IGovernanceDispatcherTrait};
use konoha::traits::{IERC20Dispatcher, IERC20DispatcherTrait};
use konoha::traits::{IGovernanceTokenDispatcher, IGovernanceTokenDispatcherTrait};
use konoha::treasury::{ITreasuryDispatcher, ITreasuryDispatcherTrait};
use konoha::treasury_types::carmine::{IAMMDispatcher, IAMMDispatcherTrait};
use konoha::treasury_types::zklend::interfaces::{IMarketDispatcher, IMarketDispatcherTrait};
use openzeppelin::access::ownable::interface::{
    IOwnableTwoStep, IOwnableTwoStepDispatcherTrait, IOwnableTwoStepDispatcher
};
use openzeppelin::upgrades::interface::{IUpgradeableDispatcher, IUpgradeableDispatcherTrait};
use snforge_std::{
    BlockId, declare, ContractClassTrait, ContractClass, prank, CheatSpan, CheatTarget, roll,
    start_warp
};
use starknet::{ContractAddress, get_block_number, ClassHash};
use super::setup::{deploy_governance_and_both_tokens};

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
    let mut calldata = ArrayTrait::new();
    gov_contract_address.serialize(ref calldata);
    AMM_contract_address.serialize(ref calldata);
    zklend_market_contract_address.serialize(ref calldata);

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
        Result::Err(_) => 0x04c990da03da72bdfb10db5c04e8aaa9d5404a07fe454037facb7744c132d42c
            .try_into()
            .unwrap()
    };

    return (
        gov_contract_address, AMM_contract_address, treasury_address, zklend_market_contract_address
    );
}

#[test]
#[fork("MAINNET")]
fn test_transfer_stream() {
    let (gov_contract_address, _, treasury_contract_address, _) = get_important_addresses();
    let eth_addr: ContractAddress =
        0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7
        .try_into()
        .unwrap();
    let random_whale: ContractAddress =
        0x4267ae838da77a52384283f3321a0746557023d24cb823115d2da5c8c4f1a42
        .try_into()
        .unwrap();
    let eth_dispatcher = IERC20Dispatcher { contract_address: eth_addr };
    let treasury_dispatcher = ITreasuryDispatcher { contract_address: treasury_contract_address };

    // Transfer eth from random whale to Treasury contract
    prank(CheatTarget::One(eth_addr), random_whale, CheatSpan::TargetCalls(1));
    let deposit_amt = 200000;
    eth_dispatcher.transfer(treasury_contract_address, deposit_amt);
    let initial_treasury_bal = eth_dispatcher.balance_of(treasury_contract_address);
    assert(initial_treasury_bal >= deposit_amt, 'eth bal too low');
    println!("Initial Treasury Balance {}:", initial_treasury_bal);

    let recipient: ContractAddress = 0x2.try_into().unwrap();
    let start_time: u64 = 100;
    let end_time: u64 = 200;
    let total_amount: u128 = 2000;
    let is_minting: bool = false;
    let token_address: ContractAddress =
        0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7
        .try_into()
        .unwrap();

    // Add new stream
    prank(
        CheatTarget::One(treasury_contract_address), gov_contract_address, CheatSpan::TargetCalls(1)
    );
    treasury_dispatcher
        .add_new_stream(recipient, start_time, end_time, total_amount, is_minting, token_address);

    let (claimed, total, is_minting_stored, token_stored) = treasury_dispatcher
        .get_stream_info(recipient, start_time, end_time);
    assert(claimed == 0, 'Initial claim should be 0');
    assert(total == total_amount, 'Total amount mismatch');
    assert(is_minting_stored == is_minting, 'Is minting mismatch');
    assert(token_stored == token_address, 'Token address mismatch');

    start_warp(CheatTarget::One(treasury_contract_address), 150);
    prank(CheatTarget::One(treasury_contract_address), recipient, CheatSpan::TargetCalls(1));
    treasury_dispatcher.claim_stream(recipient, start_time, end_time);

    // Verify claimed amount
    let (claimed_midway, _, _, _) = treasury_dispatcher
        .get_stream_info(recipient, start_time, end_time);
    let recipient_balance_after = eth_dispatcher.balance_of(recipient);

    assert(claimed_midway > 0 && claimed_midway < total_amount, 'Midway claim incorrect');
    println!("recipient balance after {}:", recipient_balance_after); //is 1000 

    let recipient_balance_before_cancel = eth_dispatcher.balance_of(recipient);
    prank(
        CheatTarget::One(treasury_contract_address), gov_contract_address, CheatSpan::TargetCalls(1)
    );
    treasury_dispatcher.cancel_stream(recipient, start_time, end_time);

    // Verify stream is cancelled and remaining tokens transferred
    let (claimed_final, total_final, _, _) = treasury_dispatcher
        .get_stream_info(recipient, start_time, end_time);
    let recipient_balance_after_cancel = eth_dispatcher.balance_of(recipient);
    assert(claimed_final == 0 && total_final == 0, 'Stream not properly cancelled');
    assert(recipient_balance_after_cancel > recipient_balance_before_cancel, 'Remaining tokens');
}

#[test]
fn test_mint_stream() {
    let (_, _, _, _) = get_important_addresses(); // Assuming treasury address is not used
    let (gov, _, _) = deploy_governance_and_both_tokens();
    let recipient = 0x2.try_into().unwrap();
    let start_time: u64 = 100;
    let end_time: u64 = 200;
    let total_amount: u128 = 100000;
    let expected_claimed_amount = (total_amount * 50 / 100); // 50% claimed since middle of stream
    let is_minting = true;

    let treasury_dispatcher = ITreasuryDispatcher { contract_address: gov.contract_address };
    let erc20 = IERC20Dispatcher {
        contract_address: IGovernanceDispatcher { contract_address: gov.contract_address }
            .get_governance_token_address()
    };
    let governance_token_address = IGovernanceDispatcher { contract_address: gov.contract_address }
        .get_governance_token_address();

    // Test with minting
    treasury_dispatcher
        .add_new_stream(
            recipient, start_time, end_time, total_amount, is_minting, governance_token_address
        );

    let (claimed_amount, stored_total_amount, is_minting, token_address) = treasury_dispatcher
        .get_stream_info(recipient, start_time, end_time);
    assert_eq!(claimed_amount, 0, "Incorrect claimed amount after stream creation (minting)");
    assert_eq!(stored_total_amount, total_amount, "Incorrect total amount stored (minting)");
    assert_eq!(is_minting, true, "Stream should be set to minting");
    println!("Streaming: {:?} token", token_address);

    // Test claim with minting
    start_warp(CheatTarget::One(gov.contract_address), 150);
    treasury_dispatcher.claim_stream(recipient, start_time, end_time);

    let (claimed_amount, stored_total_amount, _, _) = treasury_dispatcher
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

    let recipient_balance = erc20.balance_of(recipient);
    assert_eq!(
        recipient_balance,
        expected_claimed_amount.into(),
        "Recipient balance should match the expected claimed amount (minting)"
    ); //50000

    println!("recipinet balance before cancel: {}", recipient_balance);
    // Test cancel with minting
    treasury_dispatcher.cancel_stream(recipient, start_time, end_time);

    let (cancelled_claimed_amount, stored_total_amount, _, _) = treasury_dispatcher
        .get_stream_info(recipient, start_time, end_time);
    assert_eq!(
        cancelled_claimed_amount,
        0,
        "Claimed amount should be 0 after canceling the stream (minting)"
    );
    assert_eq!(
        stored_total_amount, 0, "Total amount should be 0 after canceling the stream (minting)"
    );

    // Verify recipient's balance after cancellation
    let recipient_balance_after_cancel = erc20.balance_of(recipient);
    assert_eq!(
        recipient_balance_after_cancel,
        total_amount.into(),
        "Recipient balance should match the claimed amount after cancellation (minting)"
    );
}

#[test]
#[fork("SEPOLIA")]
fn test_transfer_token() {
    let (gov_contract_address, _AMM_contract_address, treasury_contract_address, _) =
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
    let (_gov_contract_address, _AMM_contract_address, treasury_contract_address, _) =
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
    let (gov_contract_address, _AMM_contract_address, treasury_contract_address, _) =
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
    let (_gov_contract_address, _AMM_contract_address, treasury_contract_address, _) =
        get_important_addresses();
    let user2: ContractAddress = '0xUser2'.try_into().unwrap();
    let new_AMM_contract: ContractAddress = '0xnewAMMcontract'.try_into().unwrap();

    prank(CheatTarget::One(treasury_contract_address), user2, CheatSpan::TargetCalls(1));
    ITreasuryDispatcher { contract_address: treasury_contract_address }
        .update_AMM_address(new_AMM_contract);
}

#[test]
fn test_ownership_transfer() {
    let (gov_contract_address, _AMM_contract_address, treasury_contract_address, _) =
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
    let (gov_contract_address, _AMM_contract_address, treasury_contract_address, _) =
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
    let (gov_contract_address, _AMM_contract_address, treasury_contract_address, _) =
        get_important_addresses();
    let eth_addr: ContractAddress =
        0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7
        .try_into()
        .unwrap();
    let sequencer_address: ContractAddress =
        0x01176a1bd84444c89232ec27754698e5d2e7e1a7f1539f12027f28b23ec9f3d8
        .try_into()
        .unwrap(); // random whale

    prank(CheatTarget::One(eth_addr), sequencer_address, CheatSpan::TargetCalls(1));
    let transfer_dispatcher = IERC20Dispatcher { contract_address: eth_addr };
    let oneeth = 1000000000000000000;
    let to_deposit = 900000000000000000;
    transfer_dispatcher.transfer(treasury_contract_address, oneeth);
    assert(
        transfer_dispatcher.balanceOf(treasury_contract_address) >= to_deposit, 'balance too low??'
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
    treasury_dispatcher
        .withdraw_liquidity(
            eth_addr, usdc_addr, eth_addr, 0, (to_deposit - 100000000000000000).into()
        );
    assert(
        transfer_dispatcher.balanceOf(treasury_contract_address) >= to_deposit, 'balance too low??'
    );
}


#[test]
#[fork("MAINNET")]
fn test_deposit_withdraw_zklend() {
    let (gov_contract_address, _, treasury_contract_address, _) = get_important_addresses();
    let usdc_addr: ContractAddress =
        0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8
        .try_into()
        .unwrap();
    let random_whale: ContractAddress =
        0x4267ae838da77a52384283f3321a0746557023d24cb823115d2da5c8c4f1a42
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
    let (gov_contract_address, _, treasury_contract_address, _) = get_important_addresses();
    let usdc_addr: ContractAddress =
        0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8
        .try_into()
        .unwrap();
    let random_whale: ContractAddress =
        0x4267ae838da77a52384283f3321a0746557023d24cb823115d2da5c8c4f1a42
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
    let (gov_contract_address, _, treasury_contract_address, _) = get_important_addresses();
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
