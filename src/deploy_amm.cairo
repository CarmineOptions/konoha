mod Deploy_AMM {
    use core::starknet::SyscallResultTrait;
    use cubit::f128::types::{Fixed, FixedTrait};
#[starknet::interface]
    trait IAMM<TContractState> {
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
    }

    use starknet::syscalls::deploy_syscall;
    use starknet::{ClassHash, ContractAddress};
    use starknet::info::get_contract_address;
    use array::ArrayTrait;
    use integer::BoundedInt;

    

    use governance::amm_types::basic::{OptionType, OptionSide};
    use governance::contract::Governance;
    use governance::contract::Governance::proposal_initializer_runContractMemberStateTrait;
    use governance::contract::Governance::amm_addressContractMemberStateTrait;
    

    // Deploys new AMM, sets AMM address storage var to new AMM, adds lptokens, etc etc etc
    fn deploy_amm() {
        
        let amm_class: ClassHash = 0x01.try_into().unwrap(); // TODO
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

        // TODO set trading halt permission
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
        let voladj_new = voladjspd;
        amm.add_lptoken(quote_token_address, base_token_address, option_type, lpt_addr, voladj_new, BoundedInt::max());

        lpt_addr
    }
}
