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
use starknet::{ClassHash, ContractAddress, get_block_timestamp, get_caller_address, get_contract_address, get_block_number};
use super::setup::{admin_addr, first_address, second_address, deploy_governance_and_both_tokens};

use core::num::traits::Zero;
use konoha::airdrop::{IAirdropDispatcher, IAirdropDispatcherTrait};
use konoha::contract::IGovernanceDispatcher;
use konoha::contract::IGovernanceDispatcherTrait;
use konoha::proposals::IProposalsDispatcher;
use konoha::proposals::IProposalsDispatcherTrait;

const ONE_WEEK: u64 = 604800;
const ONE_MONTH: u64 = 2629743; // 30.44 days
const ONE_YEAR: u64 = 31536000;
const TWO_YEARS: u64 = 31536000+31536000;
const FOUR_YEAR: u64 = 126144000;

fn setup_staking(gov: ContractAddress, floating_token: ContractAddress, voting_token: ContractAddress) {
    let caller = get_caller_address();
    let initial_balance = 10000000000000000000; 

    let floating_token_dispatcher = IERC20Dispatcher { contract_address: floating_token };
    prank(CheatTarget::One(caller), caller, CheatSpan::TargetCalls(1));
    floating_token_dispatcher.approve(gov, initial_balance);
}

//creates a lock with 4000 stakes for a year, then increases it by 2000 and then increases
//by another year for a total of 6000 for 2 years. (Lock goes from (4k, 1 year) - > (6k, 2 years))
//then withdraw so its 0. just testing operations, this has no linear decay
#[test]
fn test_locking_sequence() {
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
    let lock_duration = ONE_YEAR;

    // Approve staking contract to spend admin's tokens
    prank(CheatTarget::One(floating_token.contract_address), admin, CheatSpan::TargetCalls(1));
    floating_token_dispatcher.approve(gov.contract_address, amount.into());

    // Create the lock
    prank(CheatTarget::One(gov.contract_address), admin, CheatSpan::TargetCalls(1));

    println!("Creating Lock...");
    println!("");

    staking.create_lock(admin, amount, lock_duration);

    // Assert locked amount and unlock date
    let unlock_date = get_block_timestamp() + lock_duration;
    let (locked_amount, locked_end) = staking.get_locked_balance(admin);
    assert_eq!(locked_amount, amount, "Locked amount should be 4000 tokens");
    assert_eq!(locked_end, unlock_date, "Unlock time should be 4 years from now");

    // Check admin's balance after locking
    let admin_balance_after = floating_token_dispatcher.balance_of(admin);
    assert_eq!(admin_balance_after, admin_balance - amount.into(), "Incorrect balance after locking");

    println!("Lock successfully created");
    println!("Locked Amount {}, Lock Time {}", locked_amount, locked_end);
    println!("");

    // Define amount to increase
    let increase_amount: u128 = 2000;

    prank(CheatTarget::One(floating_token.contract_address), admin, CheatSpan::TargetCalls(1));
    floating_token_dispatcher.approve(gov.contract_address, increase_amount.into());

    // Increase the lock amount
    prank(CheatTarget::One(gov.contract_address), admin, CheatSpan::TargetCalls(1));

    println!("Increasing stake amount...");
    println!("");

    staking.increase_amount(admin, increase_amount);
    // Assert locked amount
    let (new_locked_amount, locked_end) = staking.get_locked_balance(admin);
    assert_eq!(new_locked_amount, amount + increase_amount, "Locked amount should be 6000 tokens");
    assert_eq!(locked_end, 31536000, "1 years");
    // Check admin's balance after increasing the lock amount
    let admin_balance_after = floating_token_dispatcher.balance_of(admin);
    assert_eq!(admin_balance_after, admin_balance - (amount.into() + increase_amount.into()), "Incorrect balance after increasing lock");

    println!("Stake amount Increased");
    println!("Locked Amount {}, Lock Time {}", new_locked_amount, locked_end);
    println!("");


    // Check and print initial lock ending time
    let (new_locked_amount, initial_locked_end) = staking.get_locked_balance(admin);
    assert_eq!(new_locked_amount, amount + increase_amount, "Locked amount should be 6000 tokens");
    assert_eq!(initial_locked_end, get_block_timestamp() + lock_duration, "Unlock time should be 1 year from now");

    // Extend the lock duration
    let extended_duration = ONE_YEAR; // Extend by another year
    let new_unlock_date = get_block_timestamp() + lock_duration + extended_duration;

    prank(CheatTarget::One(gov.contract_address), admin, CheatSpan::TargetCalls(1));

    println!("Extending the lock date...");
    println!("");

    staking.extend_unlock_date(new_unlock_date);

    println!("Lock date Extended");
    println!("Locked Amount {}, Lock Time {}", new_locked_amount, new_unlock_date);
    println!("");

    // Assert new unlock date and print the new lock ending time
    let (new_locked_amount, new_locked_end) = staking.get_locked_balance(admin);
    assert_eq!(new_locked_amount, amount + increase_amount, "Locked amount should remain the same (6k)");
    assert_eq!(new_locked_end, new_unlock_date, "Unlock time should be extended by 1 year");

    // Check admin's balance remains unchanged after extending lock duration
    let admin_balance_after = floating_token_dispatcher.balance_of(admin);
    assert_eq!(admin_balance_after, admin_balance - (amount.into() + increase_amount.into()), "Balance should remain the same after extending lock duration");

    start_warp(CheatTarget::One(gov.contract_address), new_unlock_date + 1); // Warp time to just after the new unlock date
    println!("Withdrawing Balance");
    println!("");

    prank(CheatTarget::One(gov.contract_address), admin, CheatSpan::TargetCalls(1));
    staking.withdraw(admin);

    // Check final locked balance
     let (final_locked_amount, final_locked_end) = staking.get_locked_balance(admin);
     assert_eq!(final_locked_amount, 0, "Final locked amount should be 0 after withdrawal");
     assert_eq!(final_locked_end, 0, "Final locked end should be 0 after withdrawal");
 
     // Check admin's balance after withdrawal
     let admin_balance_after_withdraw = floating_token_dispatcher.balance_of(admin);
     assert_eq!(admin_balance_after_withdraw, admin_balance, "Balance should be restored after withdrawal");
 
     println!("Withdrawal successful");
     println!("Final Amount {}, Final Lock Time {}", final_locked_amount, final_locked_end);
     println!("");

}

#[test]
fn test_linear_decay() {
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

    
    println!("Creating Lock...");
    println!("");

    let initial_timestamp = 0_u64;
    staking.create_lock(admin, amount, lock_duration);

    // Assert locked amount and unlock date
    let unlock_date = initial_timestamp + lock_duration;
    let (locked_amount, locked_end) = staking.get_locked_balance(admin);
    assert_eq!(locked_amount, amount, "Locked amount should be 4000 tokens");
    assert_eq!(locked_end, unlock_date, "Unlock time should be 2 years from now");

    // ... (other assertions remain the same)

    println!("Lock successfully created");
    println!("Locked Amount {}, Lock Time {}", locked_amount, locked_end);
    println!("");

    // Simulate time passage of one year
    let one_year_seconds = 365 * 24 * 60 * 60; // 365 days in seconds
    let timestamp_after_one_year = initial_timestamp + one_year_seconds;

    println!("Simulating passage of one year...");
    println!("Timestamp after one year: {}", timestamp_after_one_year);

    // Check the balance after one year
    let balance_after_one_year = staking.get_balance_of(admin, timestamp_after_one_year);
    println!("Balance after one year: {}", balance_after_one_year);

    //let (post_locked_amount, post_locked_end) = staking.get_locked_balance(admin);
    //println!("Locked Amount {}, Lock Time {}", post_locked_amount, post_locked_end);

    // Expected balance after one year should be 2000 tokens
    let expected_balance_after_one_year = 3000;
    assert_eq!(balance_after_one_year, expected_balance_after_one_year, "Balance after one year should be 3000 tokens");

    println!("Expected balance after one year: {}", expected_balance_after_one_year);
    println!("");

    let timestamp_after_week_year = timestamp_after_one_year + 604800;
    println!("Simulating passage of another year...");
    println!("Timestamp after another week: {}", timestamp_after_week_year);

    let balance_after_week_year = staking.get_balance_of(admin, timestamp_after_week_year);
    println!("Balance after another week: {}", balance_after_week_year);

    //let (last_locked_amount, last_locked_end) = staking.get_locked_balance(admin);
    //println!("Locked Amount {}, Lock Time {}", last_locked_amount, last_locked_end);

    // Expected balance after one year should be 2000 tokens
    let expected_balance_after_week_year = 2980;
    assert_eq!(balance_after_week_year, expected_balance_after_week_year, "Balance after one year should be 2000 tokens");

    println!("Expected balance after another week: {}", expected_balance_after_week_year);
    println!("");
}

#[test]
fn test_total_supply() {
    let (gov, voting_token, floating_token) = deploy_governance_and_both_tokens();
    
    // Get the admin address
    let admin = admin_addr.try_into().unwrap();
    let user1 = 0x2.try_into().unwrap();  // Create a new user address
    let user2 = 0x8.try_into().unwrap();  // Create a new user address

    let floating_token_dispatcher = IERC20Dispatcher { contract_address: floating_token.contract_address };
    
    setup_staking(gov.contract_address, floating_token.contract_address, voting_token.contract_address);
    let staking = IStakingDispatcher { contract_address: gov.contract_address };
    
    // Set floating token address in staking contract
    prank(CheatTarget::One(gov.contract_address), gov.contract_address, CheatSpan::TargetCalls(1));
    staking.set_floating_token_address(floating_token.contract_address);
    
    // Define amount and lock duration
    let amount: u128 = 4000;
    let user1_amount: u128 = 4000;
    let user2_amount: u128 = 1000;
    let lock_duration = FOUR_YEAR;
    

    prank(CheatTarget::One(floating_token.contract_address), admin, CheatSpan::TargetCalls(2));
    floating_token_dispatcher.transfer(user1, user1_amount.into());
    floating_token_dispatcher.transfer(user2, user2_amount.into());
    
    // Approve staking contract to spend tokens for admin and user1
    prank(CheatTarget::One(floating_token.contract_address), admin, CheatSpan::TargetCalls(1));
    floating_token_dispatcher.approve(gov.contract_address, amount.into());
    prank(CheatTarget::One(floating_token.contract_address), user1, CheatSpan::TargetCalls(1));
    floating_token_dispatcher.approve(gov.contract_address, user1_amount.into());
    
    // Create lock for admin
    prank(CheatTarget::One(gov.contract_address), admin, CheatSpan::TargetCalls(1));
    staking.create_lock(admin, amount, lock_duration);
    
    // Create lock for user1
    prank(CheatTarget::One(gov.contract_address), user1, CheatSpan::TargetCalls(1));
    staking.create_lock(user1, user1_amount, lock_duration);
    
    println!("Locks created");

    let current_time = get_block_timestamp();
    // Check initial total supply
    let initial_supply = staking.get_current_supply(current_time);
    let expected_initial_supply = amount + user1_amount;
    assert_eq!(initial_supply, expected_initial_supply, "Initial total supply should be equal to locked amounts");
    println!("Initial total supply: {}", initial_supply);
    
    // Simulate time passage of one year
    let one_year_seconds = 365 * 24 * 60 * 60; // 365 days in seconds
    let timestamp_after_year = current_time + one_year_seconds;
    
    println!("Simulating passage of year...");
    println!("Timestamp after year: {}", timestamp_after_year);
    
    // Check total supply after one year
    let supply_after_year = staking.get_current_supply(timestamp_after_year);
    let balance_after_one_year_admin = staking.get_balance_of(admin, timestamp_after_year);
    let balance_after_one_year_user1 = staking.get_balance_of(user1, timestamp_after_year);
    
    println!("Balance after one year (admin): {}", balance_after_one_year_admin);
    println!("Balance after one year (user1): {}", balance_after_one_year_user1);

    println!("Total supply after year: {}", supply_after_year);
    
    // Expected supply after one year (rough estimate)
    let expected_supply_year = (amount / 4) * 3 + (user1_amount / 4) * 3;
    assert_eq!(supply_after_year, expected_supply_year, "Supply after year should match expected supply");
    
    prank(CheatTarget::One(floating_token.contract_address), user2, CheatSpan::TargetCalls(1));
    floating_token_dispatcher.approve(gov.contract_address, user2_amount.into());
    prank(CheatTarget::One(gov.contract_address), user2, CheatSpan::TargetCalls(1));

    staking.create_lock(user2, user2_amount, ONE_YEAR);

    let timestamp_after_week_year = ONE_YEAR + 604800;
    println!("Simulating passage of a week...");

    let balance_after_one_year_admin = staking.get_balance_of(admin, timestamp_after_week_year);
    let balance_after_one_year_user1 = staking.get_balance_of(user1, timestamp_after_week_year);
    let balance_after_one_year_user2 = staking.get_balance_of(user2, 604800);
    
    println!("Balance after another week (admin): {}", balance_after_one_year_admin);
    println!("Balance after another week (user1): {}", balance_after_one_year_user1);
    println!("Balance after another week (user2): {}", balance_after_one_year_user2);

    let final_supply = staking.get_current_supply(timestamp_after_week_year);

    let expected_final_supply = 6940;
    assert_eq!(final_supply + 980, expected_final_supply, "Supply after year should match expected supply");

    println!("Total supply after year: {}", final_supply);
}
