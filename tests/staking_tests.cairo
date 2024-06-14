use starknet::{ContractAddress, get_block_timestamp};
use super::setup::{admin_addr, first_address, second_address, deploy_governance_and_both_tokens};
use openzeppelin::token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};

use snforge_std::{
    BlockId, declare, ContractClassTrait, ContractClass, CheatTarget, prank, CheatSpan, start_warp,
    stop_warp
};
use konoha::staking::{IStakingDispatcher, IStakingDispatcherTrait};
use debug::PrintTrait;

const ONE_MONTH: u64 = 2629743; // 30.44 days
const ONE_YEAR: u64 = 31536000; // 365 days

fn set_staking_curve(gov: ContractAddress) {
    // simulate calling this from a proposal
    prank(CheatTarget::One(gov), gov, CheatSpan::TargetCalls(4));

    let staking = IStakingDispatcher { contract_address: gov };
    let THREE_MONTHS = ONE_MONTH * 3;
    let SIX_MONTHS = ONE_MONTH * 6;
    staking.set_curve_point(ONE_MONTH, 100); // 1 KONOHA = 1 veKONOHA if staked for 1 month
    staking.set_curve_point(THREE_MONTHS, 120);
    staking.set_curve_point(SIX_MONTHS, 160);
    staking.set_curve_point(ONE_YEAR, 250);
}

fn set_floating_token_address(gov: ContractAddress, floating_token_address: ContractAddress) {
    // simulate calling this from a proposal
    prank(CheatTarget::One(gov), gov, CheatSpan::TargetCalls(1));

    let staking = IStakingDispatcher { contract_address: gov };
    staking.set_floating_token_address(floating_token_address);
}

fn stake_all(gov: ContractAddress, floating: IERC20Dispatcher, staker: ContractAddress) {
    let staking = IStakingDispatcher { contract_address: gov };

    let balance_of_staker = floating.balance_of(staker).low;
    prank(CheatTarget::One(floating.contract_address), staker, CheatSpan::TargetCalls(1));
    floating.approve(gov, balance_of_staker.into());
    prank(CheatTarget::One(gov), staker, CheatSpan::TargetCalls(1));
    staking.stake(ONE_MONTH, balance_of_staker);
}

fn stake_half(gov: ContractAddress, floating: IERC20Dispatcher, staker: ContractAddress) {
    let staking = IStakingDispatcher { contract_address: gov };

    let balance_of_staker = floating.balance_of(staker).low;
    prank(CheatTarget::One(floating.contract_address), staker, CheatSpan::TargetCalls(1));
    floating.approve(gov, balance_of_staker.into());
    prank(CheatTarget::One(gov), staker, CheatSpan::TargetCalls(1));
    staking.stake(ONE_MONTH, balance_of_staker / 2);
}


#[test]
fn test_basic_stake_unstake() {
    let (gov, _voting, floating) = deploy_governance_and_both_tokens();
    set_staking_curve(gov.contract_address);
    let staking = IStakingDispatcher { contract_address: gov.contract_address };
    let admin: ContractAddress = admin_addr.try_into().unwrap();
    assert(
        staking.get_floating_token_address() == floating.contract_address, 'floating token addr !='
    );
    let balance_of_staker: u128 = 10000000;
    prank(CheatTarget::One(floating.contract_address), admin, CheatSpan::TargetCalls(1));
    floating.approve(gov.contract_address, balance_of_staker.into());
    prank(CheatTarget::One(gov.contract_address), admin, CheatSpan::TargetCalls(3));
    let stake_id = staking.stake(ONE_MONTH, balance_of_staker);

    let current_timestamp = get_block_timestamp();
    start_warp(CheatTarget::One(gov.contract_address), current_timestamp + ONE_MONTH + 1);
    staking.unstake(stake_id);
    stop_warp(CheatTarget::One(gov.contract_address));
}

#[test]
fn test_multiple_overlapping_stake_unstake() {
    let (gov, voting, floating) = deploy_governance_and_both_tokens();
    set_staking_curve(gov.contract_address);
    let staking = IStakingDispatcher { contract_address: gov.contract_address };
    let admin: ContractAddress = admin_addr.try_into().unwrap();
    let time_zero = get_block_timestamp();
    let initial_floating_balance = floating.balance_of(admin);

    prank(CheatTarget::One(floating.contract_address), admin, CheatSpan::TargetCalls(1));
    floating.approve(gov.contract_address, 420);
    prank(CheatTarget::One(gov.contract_address), admin, CheatSpan::TargetCalls(1));
    let stake_id_month_one = staking.stake(ONE_MONTH, 420);
    assert(voting.balance_of(admin) == 420, 'wrong bal stakeid monthone');
    assert(staking.get_total_voting_power(admin) == 420, 'voting power bad');

    prank(CheatTarget::One(floating.contract_address), admin, CheatSpan::TargetCalls(1));
    floating.approve(gov.contract_address, 937); // not-nice prime number to check rounding
    prank(CheatTarget::One(gov.contract_address), admin, CheatSpan::TargetCalls(1));
    let stake_id_year = staking.stake(ONE_YEAR, 937);
    assert(voting.balance_of(admin) == 420 + 2342, 'wrong bal yearone+monthone');
    assert(staking.get_total_voting_power(admin) == 420 + 2342, 'voting power baad');

    start_warp(CheatTarget::One(gov.contract_address), time_zero + ONE_MONTH + 1);
    assert(staking.get_total_voting_power(admin) == 2342, 'voting power baaad');
    prank(CheatTarget::One(gov.contract_address), admin, CheatSpan::TargetCalls(1));
    staking.unstake(stake_id_month_one);
    assert(voting.balance_of(admin) == 2342, 'wrong bal yearone+monthone');
    assert(staking.get_total_voting_power(admin) == 2342, 'voting power baaaad');

    prank(CheatTarget::One(floating.contract_address), admin, CheatSpan::TargetCalls(1));
    floating.approve(gov.contract_address, 101);
    prank(CheatTarget::One(gov.contract_address), admin, CheatSpan::TargetCalls(1));
    let stake_id_month_one_three_months = staking.stake(ONE_MONTH * 3, 101);
    assert(voting.balance_of(admin) == 2342 + 121, 'wrong bal yearone+monthtwo');
    stop_warp(CheatTarget::One(gov.contract_address));

    start_warp(CheatTarget::One(gov.contract_address), time_zero + ONE_YEAR * 4 + 1);
    assert(staking.get_total_voting_power(admin) == 0, 'voting power baaaaad');
    prank(CheatTarget::One(gov.contract_address), admin, CheatSpan::TargetCalls(1));
    staking.unstake(stake_id_year);
    assert!(voting.balance_of(admin) == 121, "wrong bal after unstaking yearone but not monthtwo");
    assert(
        floating.balance_of(admin) == (initial_floating_balance - 101), 'floating tokens gon'
    ); // 101 still in stake_id_month_one_three_months
    prank(CheatTarget::One(gov.contract_address), admin, CheatSpan::TargetCalls(1));
    staking.unstake(stake_id_month_one_three_months);
    assert(floating.balance_of(admin) == initial_floating_balance, 'floating tokens gone');
    assert(voting.balance_of(admin) == 0, 'nonzero bal after all');
    assert(staking.get_total_voting_power(admin) == 0, 'admin voting power nonzero');
}

#[test]
#[should_panic(expected: ('unlock time not yet reached',))]
fn test_unstake_before_unlock(mut amount_to_stake: u16, duration_seed: u8) {
    let (gov, _voting, floating) = deploy_governance_and_both_tokens();
    set_staking_curve(gov.contract_address);
    let staking = IStakingDispatcher { contract_address: gov.contract_address };
    let admin: ContractAddress = admin_addr.try_into().unwrap();

    let duration_mod = duration_seed % 2;
    let duration = if(duration_mod == 0){ONE_MONTH}else{ONE_YEAR};
    if(amount_to_stake == 0) {
        amount_to_stake += 1;
    }
    prank(CheatTarget::One(floating.contract_address), admin, CheatSpan::TargetCalls(1));
    floating.approve(gov.contract_address, amount_to_stake.into());
    prank(CheatTarget::One(gov.contract_address), admin, CheatSpan::TargetCalls(3));
    let stake_id = staking.stake(duration, amount_to_stake.into());

    staking.unstake(stake_id);
}
