use core::option::OptionTrait;
use core::traits::TryInto;
//use tests::basic::submit_44_signal_proposals;

use governance::traits::IAMM;
use governance::contract::IGovernanceDispatcher;
use governance::contract::IGovernanceDispatcherTrait;
use governance::traits::{
    IAMMDispatcher, IAMMDispatcherTrait, IERC20Dispatcher, IERC20DispatcherTrait
};
use governance::constants::TRADE_SIDE_LONG;

use starknet::{ContractAddress, ClassHash, get_block_timestamp};

use snforge_std::{declare, ContractClassTrait, ContractClass, start_prank, start_warp, CheatTarget};
use cubit::f128::types::{Fixed, FixedTrait};

use debug::PrintTrait;

#[test]
#[fork("MAINNET")]
fn test_deploy_amm() {
    let gov_contract_addr: ContractAddress =
        0x001405ab78ab6ec90fba09e6116f373cda53b0ba557789a4578d8c1ec374ba0f
        .try_into()
        .unwrap();
    let dispatcher = IGovernanceDispatcher { contract_address: gov_contract_addr };
    let marek_address: ContractAddress =
        0x0011d341c6e841426448ff39aa443a6dbb428914e05ba2259463c18308b86233
        .try_into()
        .unwrap();
    let gov_contract: ContractClass = declare('Governance');
    //let new_contract_class_hash: felt252 = 0x00bc6231e9e138a712e583fd1cd35a90a483ad6d603382435d1ac6c7dc2487e8;
    //let new_contract: ClassHash = new_contract_class_hash.try_into().unwrap();
    let new_contract: ClassHash = gov_contract.class_hash.into();
    start_prank(CheatTarget::One(gov_contract_addr), marek_address);
    let ret = dispatcher.submit_proposal(new_contract.into(), 1);
    dispatcher.vote(ret, 1);
    let curr_timestamp = get_block_timestamp();
    let warped_timestamp = curr_timestamp + consteval_int!(60 * 60 * 24 * 7) + 420;
    start_warp(CheatTarget::One(gov_contract_addr), warped_timestamp);
    let status = dispatcher.get_proposal_status(ret);
    dispatcher.apply_passed_proposal(ret);
    dispatcher.deploy_new_amm();
    let amm_addr = dispatcher.get_amm_address();
    let USDC_addr: felt252 = 0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8;
    let ETH_addr: felt252 = 0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7;
    let quote_token_address: ContractAddress = USDC_addr.try_into().unwrap();
    let base_token_address: ContractAddress = ETH_addr.try_into().unwrap();

    deposit(amm_addr, 1, quote_token_address, base_token_address, 0x0583a9d956d65628f806386ab5b12dccd74236a3c6b930ded9cf3c54efc722a1.try_into().unwrap());
    
    //trade_option(1705017599, marek_address, amm_addr, FixedTrait::from_unscaled_felt(2200));
}

fn deposit(amm: ContractAddress, amt: u256, quote: ContractAddress, base: ContractAddress, from: ContractAddress) {
    let eth = IERC20Dispatcher { contract_address: base };
    start_prank(CheatTarget::One(base), from);
    eth.approve(amm, amt + 1);
    let allowance = eth.allowance(from, amm);
    assert(allowance == amt + 1, 'approve unsuccessful?');
    start_prank(CheatTarget::One(amm), from);
    let amm = IAMMDispatcher { contract_address: amm };
    amm.deposit_liquidity(
        base,
        quote,
        base,
        TRADE_SIDE_LONG,
        amt //4000908584712648
    );
}

// buys 0.01 long eth/usdc call
fn trade_option(
    maturity: u64, trader: ContractAddress, amm_addr: ContractAddress, strike_price: Fixed
) {
    let amm = IAMMDispatcher { contract_address: amm_addr };
    start_prank(CheatTarget::One(amm_addr), trader);
    let amt = 4000008584712648;
    let USDC_addr: felt252 = 0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8;
    let ETH_addr: felt252 = 0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7;
    let quote_token_address = USDC_addr.try_into().unwrap();
    let base_token_address = ETH_addr.try_into().unwrap();
    let curr_timestamp = get_block_timestamp();
    let eth = IERC20Dispatcher { contract_address: base_token_address };
    start_prank(CheatTarget::One(base_token_address), trader);
    eth.approve(amm_addr, amt + amt);
    amm
        .trade_open(
            0,
            strike_price,
            maturity.into(),
            0,
            amt.low.into(),
            quote_token_address,
            base_token_address,
            FixedTrait::ONE(),
            (curr_timestamp + 420).into()
        );
}
