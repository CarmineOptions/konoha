use debug::PrintTrait;
use core::traits::Into;
use konoha::staking::{IStakingDispatcher, IStakingDispatcherTrait};
use konoha::treasury::{ITreasuryDispatcher, ITreasuryDispatcherTrait};
use konoha::upgrades::IUpgradesDispatcher;
use konoha::upgrades::IUpgradesDispatcherTrait;
use openzeppelin::upgrades::interface::{IUpgradeableDispatcher, IUpgradeableDispatcherTrait};
use openzeppelin::token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
use snforge_std::{
    BlockId, declare, ContractClassTrait, ContractClass, CheatTarget, prank, CheatSpan, start_warp,
    stop_warp, start_prank, roll
};
use starknet::{ClassHash, ContractAddress, get_block_timestamp, get_caller_address, get_contract_address};
use super::setup::{admin_addr, first_address, second_address, deploy_governance_and_both_tokens};

use core::num::traits::Zero;
use konoha::airdrop::{IAirdropDispatcher, IAirdropDispatcherTrait};
use konoha::contract::IGovernanceDispatcher;
use konoha::contract::IGovernanceDispatcherTrait;
use konoha::proposals::IProposalsDispatcher;
use konoha::proposals::IProposalsDispatcherTrait;

const ONE_MONTH: u64 = 2629743; // 30.44 days
const ONE_YEAR: u64 = 31536000; // 365 days
const FOUR_YEAR: u64 = 126144000; //4

fn setup_staking(gov: ContractAddress, floating_token: ContractAddress, voting_token: ContractAddress) {
    let caller = get_caller_address();
    let initial_balance = 10000000000000000000; // 19 zeros

    // Approve the staking contract to transfer tokens
    let floating_token_dispatcher = IERC20Dispatcher { contract_address: floating_token };
    prank(CheatTarget::One(caller), caller, CheatSpan::TargetCalls(1));
    floating_token_dispatcher.approve(gov, initial_balance);
}

#[test]
fn test_create_lock() {
    let (gov, voting_token, floating_token) = deploy_governance_and_both_tokens();
    
    // Get the admin address
    let admin = admin_addr.try_into().unwrap();
    let floating_token_dispatcher = IERC20Dispatcher { contract_address: floating_token.contract_address };

    // Check admin's initial balance
    let admin_balance = floating_token_dispatcher.balance_of(admin);
    assert!(admin_balance > 0, "Admin doesn't have any tokens");

    setup_staking(gov.contract_address, floating_token.contract_address, voting_token.contract_address);
    let staking = IStakingDispatcher { contract_address: gov.contract_address };

    // Set floating token address in staking contract
    prank(CheatTarget::One(gov.contract_address), gov.contract_address, CheatSpan::TargetCalls(1));
    staking.set_floating_token_address(floating_token.contract_address);

    // Define amount and lock duration
    let amount: u128 = 4000; 
    let lock_duration = FOUR_YEAR;

    // Approve staking contract to spend admin's tokens
    prank(CheatTarget::One(floating_token.contract_address), admin, CheatSpan::TargetCalls(1));
    floating_token_dispatcher.approve(gov.contract_address, amount.into());

    // Create the lock
    prank(CheatTarget::One(gov.contract_address), admin, CheatSpan::TargetCalls(1));
    staking.create_lock(admin, amount, lock_duration);

    // Assert locked amount and unlock date
    let unlock_date = get_block_timestamp() + lock_duration;
    let (locked_amount, locked_end) = staking.get_locked_balance(admin);
    assert_eq!(locked_amount, amount, "Locked amount should be 4000 tokens");
    assert_eq!(locked_end, unlock_date, "Unlock time should be 4 years from now");

    // Check admin's balance after locking
    let admin_balance_after = floating_token_dispatcher.balance_of(admin);
    assert_eq!(admin_balance_after, admin_balance - amount.into(), "Incorrect balance after locking");

    // Define amount to increase
    let increase_amount: u128 = 2000;

    prank(CheatTarget::One(floating_token.contract_address), admin, CheatSpan::TargetCalls(1));
    floating_token_dispatcher.approve(gov.contract_address, increase_amount.into());

    // Increase the lock amount
    prank(CheatTarget::One(gov.contract_address), admin, CheatSpan::TargetCalls(1));
    staking.increase_amount(admin, increase_amount);
    // Assert locked amount
    let (locked_amount, locked_end) = staking.get_locked_balance(admin);
    assert_eq!(locked_amount, amount + increase_amount, "Locked amount should be 6000 tokens");
    assert_eq!(locked_end, 126144000, "4 years");
    // Check admin's balance after increasing the lock amount
    let admin_balance_after = floating_token_dispatcher.balance_of(admin);
    assert_eq!(admin_balance_after, admin_balance - (amount.into() + increase_amount.into()), "Incorrect balance after increasing lock");

    // Check and print initial lock ending time
    let (initial_locked_amount, initial_locked_end) = staking.get_locked_balance(admin);
    println!("Initial lock ending time: {}", initial_locked_end);
    assert_eq!(initial_locked_amount, amount, "Locked amount should be 4000 tokens");
    assert_eq!(initial_locked_end, get_block_timestamp() + lock_duration, "Unlock time should be 1 year from now");

    // Extend the lock duration
    let extended_duration = ONE_YEAR; // Extend by another year
    let new_unlock_date = get_block_timestamp() + lock_duration + extended_duration;

    println!("Extending lock duration...");
    prank(CheatTarget::One(gov.contract_address), admin, CheatSpan::TargetCalls(1));
    staking.extend_unlock_date(new_unlock_date);
    println!("Lock duration extended");

    // Assert new unlock date and print the new lock ending time
    let (locked_amount, locked_end) = staking.get_locked_balance(admin);
    println!("New lock ending time: {}", locked_end);
    assert_eq!(locked_amount, amount, "Locked amount should remain the same");
    assert_eq!(locked_end, new_unlock_date, "Unlock time should be extended by 1 year");

    // Check admin's balance remains unchanged after extending lock duration
    let admin_balance_after = floating_token_dispatcher.balance_of(admin);
    assert_eq!(admin_balance_after, admin_balance - amount.into(), "Balance should remain the same after extending lock duration");
}

#[test]
fn test_increase_amount() {
    let (gov, voting_token, floating_token) = deploy_governance_and_both_tokens();
    
    let admin = admin_addr.try_into().unwrap();
    let floating_token_dispatcher = IERC20Dispatcher { contract_address: floating_token.contract_address };

    let admin_balance = floating_token_dispatcher.balance_of(admin);
    assert!(admin_balance > 0, "Admin doesn't have any tokens");

    setup_staking(gov.contract_address, floating_token.contract_address, voting_token.contract_address);
    let staking = IStakingDispatcher { contract_address: gov.contract_address };

    prank(CheatTarget::One(gov.contract_address), gov.contract_address, CheatSpan::TargetCalls(1));
    staking.set_floating_token_address(floating_token.contract_address);

    let amount: u128 = 4000;
    let lock_duration = FOUR_YEAR;

    prank(CheatTarget::One(floating_token.contract_address), admin, CheatSpan::TargetCalls(1));
    floating_token_dispatcher.approve(gov.contract_address, amount.into());
    prank(CheatTarget::One(gov.contract_address), admin, CheatSpan::TargetCalls(1));
    staking.create_lock(admin, amount, lock_duration);

    // Define amount to increase
    let increase_amount: u128 = 2000;

    prank(CheatTarget::One(floating_token.contract_address), admin, CheatSpan::TargetCalls(1));
    floating_token_dispatcher.approve(gov.contract_address, increase_amount.into());

    // Increase the lock amount
    prank(CheatTarget::One(gov.contract_address), admin, CheatSpan::TargetCalls(1));
    staking.increase_amount(admin, increase_amount);
    // Assert locked amount
    let (locked_amount, locked_end) = staking.get_locked_balance(admin);
    assert_eq!(locked_amount, amount + increase_amount, "Locked amount should be 6000 tokens");
    assert_eq!(locked_end, 126144000, "4 years");
    // Check admin's balance after increasing the lock amount
    let admin_balance_after = floating_token_dispatcher.balance_of(admin);
    assert_eq!(admin_balance_after, admin_balance - (amount.into() + increase_amount.into()), "Incorrect balance after increasing lock");
}

#[test]
fn test_extend_unlock_date() {
    let (gov, voting_token, floating_token) = deploy_governance_and_both_tokens();

    let admin= admin_addr.try_into().unwrap();
    let floating_token_dispatcher = IERC20Dispatcher { contract_address: floating_token.contract_address };

    let admin_balance = floating_token_dispatcher.balance_of(admin);
    println!("Admin's initial balance: {}", admin_balance);
    assert!(admin_balance > 0, "Admin doesn't have any tokens");

    setup_staking(gov.contract_address, floating_token.contract_address, voting_token.contract_address);
    let staking = IStakingDispatcher { contract_address: gov.contract_address };

    prank(CheatTarget::One(gov.contract_address), gov.contract_address, CheatSpan::TargetCalls(1));
    staking.set_floating_token_address(floating_token.contract_address);

    let amount: u128 = 4000; 
    let lock_duration = ONE_YEAR;

    prank(CheatTarget::One(floating_token.contract_address), admin, CheatSpan::TargetCalls(1));
    floating_token_dispatcher.approve(gov.contract_address, amount.into());

    prank(CheatTarget::One(gov.contract_address), admin, CheatSpan::TargetCalls(1));
    staking.create_lock(admin, amount, lock_duration);

    // Check and print initial lock ending time
    let (initial_locked_amount, initial_locked_end) = staking.get_locked_balance(admin);
    println!("Initial lock ending time: {}", initial_locked_end);
    assert_eq!(initial_locked_amount, amount, "Locked amount should be 4000 tokens");
    assert_eq!(initial_locked_end, get_block_timestamp() + lock_duration, "Unlock time should be 1 year from now");

    // Extend the lock duration
    let extended_duration = ONE_YEAR; // Extend by another year
    let new_unlock_date = get_block_timestamp() + lock_duration + extended_duration;

    println!("Extending lock duration...");
    prank(CheatTarget::One(gov.contract_address), admin, CheatSpan::TargetCalls(1));
    staking.extend_unlock_date(new_unlock_date);
    println!("Lock duration extended");

    // Assert new unlock date and print the new lock ending time
    let (locked_amount, locked_end) = staking.get_locked_balance(admin);
    println!("New lock ending time: {}", locked_end);
    assert_eq!(locked_amount, amount, "Locked amount should remain the same");
    assert_eq!(locked_end, new_unlock_date, "Unlock time should be extended by 1 year");

    // Check admin's balance remains unchanged after extending lock duration
    let admin_balance_after = floating_token_dispatcher.balance_of(admin);
    assert_eq!(admin_balance_after, admin_balance - amount.into(), "Balance should remain the same after extending lock duration");
}
