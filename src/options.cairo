// Handles adding new options to the AMM and linking them to the liquidity pool.
// I have chosen this perhaps rather complex type layout in expectation of generating the options soon –
// – first generating FutureOption, then generating everything from Pragma data

mod Options {
    use governance::contract::IGovernance;
    use traits::{Into, TryInto};
    use array::{ArrayTrait, SpanTrait};
    use option::OptionTrait;

    use starknet::SyscallResultTrait;
    use starknet::SyscallResult;
    use starknet::class_hash;
    use starknet::ClassHash;
    use starknet::contract_address::{
        ContractAddress, Felt252TryIntoContractAddress, ContractAddressIntoFelt252
    };
    use starknet::syscalls::deploy_syscall;
    use starknet::info::get_contract_address;

    use cubit::f128::types::{Fixed, FixedTrait};

    use governance::contract::Governance::{amm_address, proposal_initializer_run};
    use governance::constants::{OPTION_CALL, OPTION_PUT, TRADE_SIDE_LONG, TRADE_SIDE_SHORT};
    use governance::traits::{
        IAMMDispatcher, IAMMDispatcherTrait, IOptionTokenDispatcher, IOptionTokenDispatcherTrait
    };
    use governance::types::OptionSide;
    use governance::contract::Governance;
    use governance::types::OptionType;
    use governance::traits::Math64x61_;
    use governance::contract::Governance::proposal_initializer_runContractMemberStateTrait;

    fn add_options(salt: felt252, mut options: Span<FutureOption>) {
        // TODO use block hash from block_hash syscall as salt // actually doable with the new syscall
        let governance_address = get_contract_address();
        let state = Governance::unsafe_new_contract_state();
        let amm_address = state.get_amm_address();
        loop {
            match options.pop_front() {
                Option::Some(option) => {
                    add_option(
                        governance_address, amm_address, salt, option
                    );
                },
                Option::None(()) => { break (); },
            };
        }
    }

    // TODO add auto generation of FutureOption structs once string contacenation exists
    #[derive(Copy, Drop, Serde)]
    struct FutureOption {
        name_long: felt252,
        name_short: felt252,
        maturity: felt252,
        strike_price: Fixed,
        option_type: OptionType,
        lptoken_address: ContractAddress,
        initial_volatility: Fixed
    }

    fn add_option(
        governance_address: ContractAddress,
        amm_address: ContractAddress,
        salt: felt252,
        option: @FutureOption
    ) {
        // TODO check if class hash = compiled_contract_class.json or contract_class.json
        // starkli class-hash target/dev/carmine_protocol_OptionToken.compiled_contract_class.json
        let opt_class: felt252 = 0x07fc0b6ecc96a698cdac8c4ae447816d73bffdd9603faacffc0a8047149d02ed;

        // mainnet
        let USDC_addr: felt252 = 0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8;
        let ETH_addr: felt252 = 0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7;
        let quote_token_address = USDC_addr.try_into().unwrap();
        let base_token_address = ETH_addr.try_into().unwrap();
        let o = *option;
        // Yes, this 'overflows', but it's expected and wanted.
        let custom_salt: felt252 = salt
            + o.strike_price
            + o.maturity
            + o.option_type
            + o.lptoken_address.into()
            + o.initial_volatility;

        let opt_class_hash: ClassHash = opt_class.try_into().unwrap();
        let mut optoken_long_calldata = array![];
        optoken_long_calldata.append(o.name_long);
        optoken_long_calldata.append('C-OPT');
        optoken_long_calldata.append(amm_address.into());
        optoken_long_calldata.append(quote_token_address);
        optoken_long_calldata.append(base_token_address);
        optoken_long_calldata.append(o.option_type);
        optoken_long_calldata.append(o.strike_price.mag.into());
        optoken_long_calldata.append(o.maturity);
        optoken_long_calldata.append(TRADE_SIDE_LONG);
        let deploy_retval = deploy_syscall(opt_class_hash, salt+1, optoken_long_calldata.span(), false);
        let (optoken_long_addr, _) = deploy_retval.unwrap_syscall();

        let mut optoken_short_calldata = array![];
        optoken_long_calldata.append(o.name_short);
        optoken_long_calldata.append('C-OPT');
        optoken_long_calldata.append(amm_address.into());
        optoken_long_calldata.append(quote_token_address);
        optoken_long_calldata.append(base_token_address);
        optoken_long_calldata.append(o.option_type);
        optoken_long_calldata.append(o.strike_price.mag.into());
        optoken_long_calldata.append(o.maturity);
        optoken_long_calldata.append(TRADE_SIDE_SHORT);
        let deploy_retval = deploy_syscall(opt_class_hash, salt+2, optoken_short_calldata.span(), false);
        let (optoken_short_addr, _) = deploy_retval.unwrap_syscall();


        IAMMDispatcher { contract_address: amm_address }
            .add_option_both_sides(
                o.maturity.try_into().unwrap(),
                FixedTrait::from_felt(o.strike_price.mag.into()),
                quote_token_address.try_into().unwrap(),
                base_token_address.try_into().unwrap(),
                o.option_type,
                o.lptoken_address,
                optoken_long_addr,
                optoken_short_addr,
                FixedTrait::from_felt(o.initial_volatility.mag.into())
            );
    }


    fn add_1201_options() {
        let MATURITY: felt252 = 1704412799;

        let eth_lpt_addr: ContractAddress =
            0x7aba50fdb4e024c1ba63e2c60565d0fd32566ff4b18aa5818fc80c30e749024
            .try_into()
            .unwrap();
        let usdc_lpt_addr: ContractAddress =
            0x18a6abca394bd5f822cfa5f88783c01b13e593d1603e7b41b00d31d2ea4827a
            .try_into()
            .unwrap();

        let mut to_add = ArrayTrait::<FutureOption>::new();
        to_add
            .append(
                FutureOption {
                    name_long: 'ETHUSDC-05JAN24-2200-LONG-CALL',
                    name_short: 'ETHUSDC-05JAN24-2200-SHORT-CALL',
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_2200,
                    option_type: OPTION_CALL,
                    lptoken_address: eth_lpt_addr,
                    initial_volatility: VOLATILITY_46
                }
            );
        to_add
            .append(
                FutureOption {
                    name_long: 'ETHUSDC-05JAN24-2300-LONG-CALL',
                    name_short: 'ETHUSDC-05JAN24-2300-SHORT-CALL',
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_2300,
                    option_type: OPTION_CALL,
                    lptoken_address: eth_lpt_addr,
                    initial_volatility: VOLATILITY_46
                }
            );
        to_add
            .append(
                FutureOption {
                    name_long: 'ETHUSDC-05JAN24-2400-LONG-CALL',
                    name_short: 'ETHUSDC-05JAN24-2400-SHORT-CALL',
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_2400,
                    option_type: OPTION_CALL,
                    lptoken_address: eth_lpt_addr,
                    initial_volatility: VOLATILITY_47
                }
            );
        to_add
            .append(
                FutureOption {
                    name_long: 'ETHUSDC-05JAN24-2100-LONG-PUT',
                    name_short: 'ETHUSDC-05JAN24-2100-SHORT-PUT',
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_2100,
                    option_type: OPTION_PUT,
                    lptoken_address: usdc_lpt_addr,
                    initial_volatility: VOLATILITY_48
                }
            );
        to_add
            .append(
                FutureOption {
                    name_long: 'ETHUSDC-05JAN24-2200-LONG-PUT',
                    name_short: 'ETHUSDC-05JAN24-2200-SHORT-PUT',
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_2200,
                    option_type: OPTION_PUT,
                    lptoken_address: usdc_lpt_addr,
                    initial_volatility: VOLATILITY_46
                }
            );

        add_options(2470052502, to_add.span())
    }
}
