mod DeployAMM {
    use core::traits::TryInto;
    use core::starknet::SyscallResultTrait;
    use cubit::f128::types::{Fixed, FixedTrait};

    use governance::traits::{IAMMDispatcher, IAMMDispatcherTrait};

    use starknet::syscalls::deploy_syscall;
    use starknet::{ClassHash, ContractAddress};
    use starknet::info::get_contract_address;
    use array::ArrayTrait;
    use integer::BoundedInt;


    use governance::amm_types::basic::{OptionType, OptionSide};
    use governance::contract::Governance;
    use governance::contract::Governance::proposal_initializer_runContractMemberStateTrait;
    use governance::contract::Governance::amm_addressContractMemberStateTrait;
    use governance::options::Options;
    use governance::constants::{
        AMM_CLASS_HASH, LP_TOKEN_CLASS_HASH, ETH_ADDRESS, USDC_ADDRESS, BTC_ADDRESS
    };


    // Deploys new AMM, sets AMM address storage var to new AMM, adds lptokens, etc etc etc
    fn deploy_amm() {
        let amm_class: ClassHash = AMM_CLASS_HASH.try_into().unwrap();
        let voladjspd_eth_call_lpt: felt252 = 15; // TODO check, no increase??
        let voladjspd_eth_put_lpt: felt252 =
            25000; // also BTC put pool
        let voladjspd_btc_call_lpt: Fixed = FixedTrait::ONE() / FixedTrait::from_unscaled_felt(2); // 0.5 BTC voladjspd for btc call pool

        let mut state = Governance::unsafe_new_contract_state();
        assert(!state.proposal_initializer_run.read(45), 'prop already initialized');
        state.proposal_initializer_run.write(45, true);

        let governance_addr = get_contract_address();
        let usdc_addr: ContractAddress = USDC_ADDRESS.try_into().unwrap();
        let eth_addr: ContractAddress = ETH_ADDRESS.try_into().unwrap();
        let btc_addr: ContractAddress = BTC_ADDRESS.try_into().unwrap();

        let mut amm_calldata = ArrayTrait::<felt252>::new();
        amm_calldata.append(governance_addr.into());
        let amm_deploy_retval = deploy_syscall(amm_class, 42, amm_calldata.span(), false);
        let (amm_addr, _) = amm_deploy_retval.unwrap_syscall();
        state.amm_address.write(amm_addr);
        let amm = IAMMDispatcher { contract_address: amm_addr };

        let eth_call_lpt_addr = deploy_lptoken(
            amm,
            'Carmine ETH/USDC call pool',
            'C-ETHUSDC-C',
            usdc_addr,
            eth_addr,
            0,
            FixedTrait::from_unscaled_felt(voladjspd_eth_call_lpt)
        );
        let eth_put_lpt_addr = deploy_lptoken(
            amm,
            'Carmine ETH/USDC put pool',
            'C-ETHUSDC-P',
            usdc_addr,
            eth_addr,
            1,
            FixedTrait::from_unscaled_felt(voladjspd_eth_put_lpt)
        );
        let btc_call_lpt_addr = deploy_lptoken(
            amm,
            'Carmine BTC/USDC call pool',
            'C-BTCUSDC-C',
            usdc_addr,
            btc_addr,
            0,
            voladjspd_btc_call_lpt
        );
        let btc_put_lpt_addr = deploy_lptoken(
            amm,
            'Carmine BTC/USDC put pool',
            'C-BTCUSDC-P',
            usdc_addr,
            btc_addr,
            1,
            FixedTrait::from_unscaled_felt(voladjspd_eth_put_lpt)
        );

        set_trading_halt_permissions(amm);

        Options::add_1201_options(
            eth_call_lpt_addr, eth_put_lpt_addr, btc_call_lpt_addr, btc_put_lpt_addr
        );
    }

    fn deploy_lptoken(
        amm: IAMMDispatcher,
        name: felt252,
        symbol: felt252,
        quote_token_address: ContractAddress,
        base_token_address: ContractAddress,
        option_type: OptionType,
        voladjspd: Fixed
    ) -> ContractAddress {
        let lptoken_class: ClassHash = LP_TOKEN_CLASS_HASH.try_into().unwrap();
        let mut lpt_calldata: Array<felt252> = ArrayTrait::<felt252>::new();
        lpt_calldata.append(name);
        lpt_calldata.append(symbol);
        let governance_addr = get_contract_address();
        lpt_calldata.append(amm.contract_address.into());
        let deploy_retval = deploy_syscall(lptoken_class, 0, lpt_calldata.span(), false);
        let (lpt_addr, _) = deploy_retval.unwrap_syscall();
        amm
            .add_lptoken(
                quote_token_address,
                base_token_address,
                option_type.into(),
                lpt_addr,
                voladjspd,
                BoundedInt::max()
            );

        lpt_addr
    }

    fn set_trading_halt_permissions(amm: IAMMDispatcher) {
        let mut halting_addresses: Array<felt252> = ArrayTrait::new();
        halting_addresses
            .append(0x0583a9d956d65628f806386ab5b12dccd74236a3c6b930ded9cf3c54efc722a1); // Ondra
        halting_addresses
            .append(0x06717eaf502baac2b6b2c6ee3ac39b34a52e726a73905ed586e757158270a0af); // Andrej
        halting_addresses
            .append(0x0011d341c6e841426448ff39aa443a6dbb428914e05ba2259463c18308b86233); // Marek
        halting_addresses
            .append(
                0x00d79a15d84f5820310db21f953a0fae92c95e25d93cb983cc0c27fc4c52273c
            ); // Marek second
        halting_addresses
            .append(0x03d1525605db970fa1724693404f5f64cba8af82ec4aab514e6ebd3dec4838ad); // David

        loop {
            match halting_addresses.pop_front() {
                Option::Some(team_address) => {
                    amm
                        .set_trading_halt_permission(
                            team_address.try_into().expect('invalid addr'), true
                        );
                },
                Option::None(()) => { break (); },
            };
        }
    }
}
