use starknet::ContractAddress;
use super::setup::{
    admin_addr, first_address, second_address, deploy_governance_and_both_tokens, check_if_healthy
};
use openzeppelin::token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};

use snforge_std::{
    BlockId, declare, ContractClassTrait, ContractClass, CheatTarget,
    prank, CheatSpan
};
use konoha::staking::{IStakingDispatcher, IStakingDispatcherTrait};
use debug::PrintTrait;

const ONE_MONTH: u64 = 2629743;

fn set_staking_curve(gov: ContractAddress) {
    // simulate calling this from a proposal
    prank(
        CheatTarget::One(gov),
        gov,
        CheatSpan::TargetCalls(1)
    );

    let staking = IStakingDispatcher { contract_address: gov };
    staking.set_curve_point(ONE_MONTH, 100); // 1 KONOHA = 1 veKONOHA if staked for 1 month
}

fn set_floating_token_address(gov: ContractAddress, floating_token_address: ContractAddress) {
    // simulate calling this from a proposal
    prank(
        CheatTarget::One(gov),
        gov,
        CheatSpan::TargetCalls(1)
    );

    let staking = IStakingDispatcher { contract_address: gov };
    staking.set_floating_token_address(floating_token_address);
}

fn stake_all(gov: ContractAddress, floating: IERC20Dispatcher, staker: ContractAddress) {
    let staking = IStakingDispatcher { contract_address: gov };

    let balance_of_staker = floating.balance_of(staker).low;
    prank(
        CheatTarget::One(floating.contract_address),
        staker,
        CheatSpan::TargetCalls(1)
    );
    floating.approve(gov, balance_of_staker.into());
    prank(
        CheatTarget::One(gov),
        staker,
        CheatSpan::TargetCalls(1)
    );
    staking.stake(ONE_MONTH, balance_of_staker);
    println!("staked");
}