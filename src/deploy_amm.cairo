mod Deploy_AMM {
    use core::starknet::SyscallResultTrait;
#[starknet::interface]
    trait IAMM<TContractState> {
        fn trade_open(
            ref self: TContractState,
            option_type: OptionType,
            strike_price: Fixed,
            maturity: u64,
            option_side: OptionSide,
            option_size: u128,
            quote_token_address: ContractAddress,
            base_token_address: ContractAddress,
            limit_total_premia: Fixed,
            tx_deadline: u64,
        ) -> Fixed;
        fn trade_close(
            ref self: TContractState,
            option_type: OptionType,
            strike_price: Fixed,
            maturity: u64,
            option_side: OptionSide,
            option_size: u128,
            quote_token_address: ContractAddress,
            base_token_address: ContractAddress,
            limit_total_premia: Fixed,
            tx_deadline: u64,
        ) -> Fixed;
        fn trade_settle(
            ref self: TContractState,
            option_type: OptionType,
            strike_price: Fixed,
            maturity: u64,
            option_side: OptionSide,
            option_size: u128,
            quote_token_address: ContractAddress,
            base_token_address: ContractAddress,
        );
        fn is_option_available(
            self: @TContractState,
            lptoken_address: ContractAddress,
            option_side: OptionSide,
            strike_price: Fixed,
            maturity: u64,
        ) -> bool;
        fn set_trading_halt(ref self: TContractState, new_status: bool);
        fn get_trading_halt(self: @TContractState) -> bool;
        fn set_trading_halt_permission(
            ref self: TContractState, address: ContractAddress, permission: bool
        );
        fn get_trading_halt_permission(self: @TContractState, address: ContractAddress) -> bool;
        fn add_lptoken(
            ref self: TContractState,
            quote_token_address: ContractAddress,
            base_token_address: ContractAddress,
            option_type: OptionType,
            lptoken_address: ContractAddress,
            volatility_adjustment_speed: Fixed,
            max_lpool_bal: u256,
        );
        fn add_option_both_sides(
            ref self: TContractState,
            maturity: u64,
            strike_price: Fixed,
            quote_token_address: ContractAddress,
            base_token_address: ContractAddress,
            option_type: OptionType,
            lptoken_address: ContractAddress,
            option_token_address_long: ContractAddress,
            option_token_address_short: ContractAddress,
            initial_volatility: Fixed
        );

        fn get_option_token_address(
            self: @TContractState,
            lptoken_address: ContractAddress,
            option_side: OptionSide,
            maturity: u64,
            strike_price: Fixed,
        ) -> ContractAddress;
        fn get_lptokens_for_underlying(
            self: @TContractState, pooled_token_addr: ContractAddress, underlying_amt: u256,
        ) -> u256;
        fn get_underlying_for_lptokens(
            self: @TContractState, lptoken_addr: ContractAddress, lpt_amt: u256
        ) -> u256;
        fn get_available_lptoken_addresses(
            self: @TContractState, order_i: felt252
        ) -> ContractAddress;
        fn get_all_lptoken_addresses(self: @TContractState,) -> Array<ContractAddress>;
        fn get_value_of_pool_position(
            self: @TContractState, lptoken_address: ContractAddress
        ) -> Fixed;

        fn get_value_of_pool_expired_position(
            self: @TContractState, lptoken_address: ContractAddress
        ) -> Fixed;
        fn get_value_of_pool_non_expired_position(
            self: @TContractState, lptoken_address: ContractAddress
        ) -> Fixed;

        fn deposit_liquidity(
            ref self: TContractState,
            pooled_token_addr: ContractAddress,
            quote_token_address: ContractAddress,
            base_token_address: ContractAddress,
            option_type: OptionType,
            amount: u256,
        );
        fn withdraw_liquidity(
            ref self: TContractState,
            pooled_token_addr: ContractAddress,
            quote_token_address: ContractAddress,
            base_token_address: ContractAddress,
            option_type: OptionType,
            lp_token_amount: u256,
        );
        fn get_unlocked_capital(self: @TContractState, lptoken_address: ContractAddress) -> u256;
        fn expire_option_token_for_pool(
            ref self: TContractState,
            lptoken_address: ContractAddress,
            option_side: OptionSide,
            strike_price: Fixed,
            maturity: u64,
        );
        fn set_max_option_size_percent_of_voladjspd(
            ref self: TContractState, max_opt_size_as_perc_of_vol_adjspd: u128
        );
        fn get_max_option_size_percent_of_voladjspd(self: @TContractState) -> u128;
        fn get_lpool_balance(self: @TContractState, lptoken_address: ContractAddress) -> u256;
        fn get_max_lpool_balance(self: @TContractState, lpt_addr: ContractAddress) -> u256;
        fn set_max_lpool_balance(
            ref self: TContractState, lpt_addr: ContractAddress, max_lpool_bal: u256
        );
        fn get_pool_locked_capital(self: @TContractState, lptoken_address: ContractAddress) -> u256;

        fn get_lptoken_address_for_given_option(
            self: @TContractState,
            quote_token_address: ContractAddress,
            base_token_address: ContractAddress,
            option_type: OptionType,
        ) -> ContractAddress;
        fn get_option_volatility(
            self: @TContractState,
            lptoken_address: ContractAddress,
            maturity: u64,
            strike_price: Fixed,
        ) -> Fixed;
        fn get_underlying_token_address(
            self: @TContractState, lptoken_address: ContractAddress
        ) -> ContractAddress;
        fn get_available_lptoken_addresses_usable_index(
            self: @TContractState, starting_index: felt252
        ) -> felt252;
        fn get_pool_volatility_adjustment_speed(
            self: @TContractState, lptoken_address: ContractAddress
        ) -> Fixed;
        fn set_pool_volatility_adjustment_speed(
            ref self: TContractState, lptoken_address: ContractAddress, new_speed: Fixed
        );
        fn get_option_position(
            self: @TContractState,
            lptoken_address: ContractAddress,
            option_side: OptionSide,
            maturity: u64,
            strike_price: Fixed
        ) -> u128;

        fn black_scholes(
            self: @TContractState,
            sigma: Fixed,
            time_till_maturity_annualized: Fixed,
            strike_price: Fixed,
            underlying_price: Fixed,
            risk_free_rate_annualized: Fixed,
            is_for_trade: bool, // bool
        ) -> (Fixed, Fixed, bool);
        fn get_current_price(
            self: @TContractState,
            quote_token_address: ContractAddress,
            base_token_address: ContractAddress
        ) -> Fixed;
        fn get_terminal_price(
            self: @TContractState,
            quote_token_address: ContractAddress,
            base_token_address: ContractAddress,
            maturity: u64
        ) -> Fixed;

        fn set_pragma_checkpoint(ref self: TContractState, key: felt252);
        fn set_pragma_required_checkpoints(ref self: TContractState);
        fn upgrade(ref self: TContractState, new_implementation: ClassHash);
    }
 
    use starknet::syscalls::deploy_syscall;
    use starknet::{ClassHash, ContractAddress};
    use starknet::info::get_contract_address;
    use array::ArrayTrait;
    use integer::BoundedInt;

    use cubit::f128::types::{Fixed, FixedTrait};

    use governance::amm_types::basic::{OptionType, OptionSide};
    use governance::contract::Governance;
    use governance::contract::Governance::proposal_initializer_runContractMemberStateTrait;
    use governance::contract::Governance::amm_addressContractMemberStateTrait;
    

    // Deploys new AMM, sets AMM address storage var to new AMM, adds lptokens, etc etc etc
    fn deploy_amm() {
        
        let amm_class: ClassHash = 0x0.try_into().unwrap(); // TODO
        let voladjspd_eth_call_lpt: felt252 = 15; // TODO check, no increase??
        let voladjspd_eth_put_lpt: felt252 = 25000; // TODO check, no increase?? // also BTC put pool
        // 1 BTC voladjspd for btc call pool

        let mut state = Governance::unsafe_new_contract_state();
        assert(!state.proposal_initializer_run.read(45), 'prop already initialized');
        state.proposal_initializer_run.write(45, true);

        let governance_addr = get_contract_address();
        let usdc_addr: ContractAddress = 0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8.try_into().unwrap();
        let eth_addr: ContractAddress = 0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7.try_into().unwrap();
        let btc_addr: ContractAddress = 0x03fe2b97c1fd336e750087d68b9b867997fd64a2661ff3ca5a7c771641e8e7ac.try_into().unwrap();

        let mut amm_calldata = ArrayTrait::<felt252>::new();
        amm_calldata.append(governance_addr.into());
        let amm_deploy_retval = deploy_syscall(amm_class, 42, amm_calldata.span(), false);
        let (amm_addr, _) = amm_deploy_retval.unwrap_syscall();
        state.amm_address.write(amm_addr);
        let amm = IAMMDispatcher{ contract_address: amm_addr };

        
        let eth_call_lpt_addr = deploy_lptoken(amm, 'Carmine ETH/USDC call pool', 'C-ETHUSDC-C', usdc_addr, eth_addr, 0, FixedTrait::from_unscaled_felt(voladjspd_eth_call_lpt));
        let eth_put_lpt_addr = deploy_lptoken(amm, 'Carmine ETH/USDC put pool', 'C-ETHUSDC-P', usdc_addr, eth_addr, 1, FixedTrait::from_unscaled_felt(voladjspd_eth_put_lpt));
        let btc_call_lpt_addr = deploy_lptoken(amm, 'Carmine BTC/USDC call pool', 'C-BTCUSDC-C', usdc_addr, btc_addr, 0, FixedTrait::ONE());
        let btc_put_lpt_addr = deploy_lptoken(amm, 'Carmine BTC/USDC put pool', 'C-BTCUSDC-P', usdc_addr, btc_addr, 1, FixedTrait::from_unscaled_felt(voladjspd_eth_put_lpt));


    }

    fn deploy_lptoken(amm: IAMMDispatcher, name: felt252, symbol: felt252, quote_token_address: ContractAddress, base_token_address: ContractAddress, option_type: OptionType, voladjspd: Fixed) -> ContractAddress {
        let lptoken_class: ClassHash = 0x0.try_into().unwrap(); // TODO
        let mut lpt_calldata: Array<felt252> = ArrayTrait::<felt252>::new();
        lpt_calldata.append('Carmine ETH/USDC call pool');
        lpt_calldata.append('C-ETHUSDC-C');
        let governance_addr = get_contract_address();
        lpt_calldata.append(governance_addr.into());
        let deploy_retval = deploy_syscall(lptoken_class, 0, lpt_calldata.span(), false);
        let (lpt_addr, _) = deploy_retval.unwrap_syscall();
        amm.add_lptoken(quote_token_address, base_token_address, option_type, lpt_addr, voladjspd, BoundedInt::max());

        lpt_addr
    }
}
