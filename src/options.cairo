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

    // 2**61 = 2305843009213693952
    const VOLATILITY_28: Math64x61_ = consteval_int!(28 * 2305843009213693952);
    const VOLATILITY_30: Math64x61_ = consteval_int!(30 * 2305843009213693952);
    const VOLATILITY_30_5: Math64x61_ = 70328211781017665536;
    const VOLATILITY_31_5: Math64x61_ = 72634054790231359488;
    const VOLATILITY_32: Math64x61_ = consteval_int!(32 * 2305843009213693952);
    const VOLATILITY_32_5: Math64x61_ = 74939897799445053440;
    const VOLATILITY_33: Math64x61_ = consteval_int!(33 * 2305843009213693952);
    const VOLATILITY_34: Math64x61_ = consteval_int!(34 * 2305843009213693952);
    const VOLATILITY_35: Math64x61_ = consteval_int!(35 * 2305843009213693952);
    const VOLATILITY_35_5: Math64x61_ = 81857426827086135296;
    const VOLATILITY_36: Math64x61_ = consteval_int!(36 * 2305843009213693952);
    const VOLATILITY_37: Math64x61_ = consteval_int!(37 * 2305843009213693952);
    const VOLATILITY_38: Math64x61_ = 87622034350120370176;
    const VOLATILITY_38_5: Math64x61_ = 88774955854727217152;
    const VOLATILITY_39: Math64x61_ = consteval_int!(39 * 2305843009213693952);
    const VOLATILITY_40: Math64x61_ = 92233720368547758080;
    const VOLATILITY_41: Math64x61_ = 94539563377761452032;
    const VOLATILITY_41_5: Math64x61_ = 95692484882368299008;
    const VOLATILITY_42: Math64x61_ = consteval_int!(42 * 2305843009213693952);
    const VOLATILITY_43_5: Math64x61_ = 100304170900795686912;
    const VOLATILITY_44: Math64x61_ = 101457092405402533888;
    const VOLATILITY_45: Math64x61_ = 124515522497539473408;
    const VOLATILITY_46: Math64x61_ = 106068778423829921792;
    const VOLATILITY_46_5: Math64x61_ = 107221699928436768768;
    const VOLATILITY_47: Math64x61_ = consteval_int!(47 * 2305843009213693952);
    const VOLATILITY_48_5: Math64x61_ = 111833385946864156672;
    const VOLATILITY_51: Math64x61_ = consteval_int!(51 * 2305843009213693952);
    const VOLATILITY_52: Math64x61_ = consteval_int!(52 * 2305843009213693952);
    const VOLATILITY_53: Math64x61_ = consteval_int!(53 * 2305843009213693952);
    const VOLATILITY_55: Math64x61_ = 126821365506753167360;
    const VOLATILITY_59: Math64x61_ = consteval_int!(59 * 2305843009213693952);
    const VOLATILITY_60: Math64x61_ = 138350580552821637120;

    const STRIKE_PRICE_1400: Math64x61_ = consteval_int!(1400 * 2305843009213693952);
    const STRIKE_PRICE_1500: Math64x61_ = consteval_int!(1500 * 2305843009213693952);
    const STRIKE_PRICE_1600: Math64x61_ = consteval_int!(1600 * 2305843009213693952);
    const STRIKE_PRICE_1700: Math64x61_ = consteval_int!(1700 * 2305843009213693952);
    const STRIKE_PRICE_1800: Math64x61_ = consteval_int!(1800 * 2305843009213693952);
    const STRIKE_PRICE_1900: Math64x61_ = consteval_int!(1900 * 2305843009213693952);
    const STRIKE_PRICE_2000: Math64x61_ = consteval_int!(2000 * 2305843009213693952);

    fn add_options(salt: felt252, mut options: Span<FutureOption>) {
        // TODO use block hash from block_hash syscall as salt // actually doable with the new syscall
        let governance_address = get_contract_address();
        let state = Governance::unsafe_new_contract_state();
        let amm_address = state.get_amm_address();
        let proxy_class: felt252 =
            0x00eafb0413e759430def79539db681f8a4eb98cf4196fe457077d694c6aeeb82;
        let opt_class: felt252 = 0x5ce3a80daeb5b7a766df9b41ca8d9e52b6b0a045a0d2ced72f43d4dd2f93b10;
        loop {
            match options.pop_front() {
                Option::Some(option) => {
                    add_option(
                        proxy_class, opt_class, governance_address, amm_address, salt, option
                    );
                },
                Option::None(()) => { break (); },
            };
        }
    }

    // Usable after C1 AMM is deployed
    fn add_options_both_sides(salt: felt252, mut options: Span<FutureOption>) {
        // TODO use block hash from block_hash syscall as salt // actually doable with the new syscall
        let governance_address = get_contract_address();
        let state = Governance::unsafe_new_contract_state();
        let amm_address = state.get_amm_address();
        let proxy_class: felt252 =
            0x00eafb0413e759430def79539db681f8a4eb98cf4196fe457077d694c6aeeb82;
        let opt_class: felt252 = 0x5ce3a80daeb5b7a766df9b41ca8d9e52b6b0a045a0d2ced72f43d4dd2f93b10;
        loop {
            match options.pop_front() {
                Option::Some(option) => {
                    add_option_both_sides(
                        proxy_class, opt_class, governance_address, amm_address, salt, option
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
        strike_price: Math64x61_,
        option_type: OptionType,
        lptoken_address: ContractAddress,
        initial_volatility: Math64x61_
    }

    fn add_option(
        proxy_class: felt252,
        opt_class: felt252,
        governance_address: ContractAddress,
        amm_address: ContractAddress,
        salt: felt252,
        option: @FutureOption
    ) {
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

        let proxy_class_hash: ClassHash = proxy_class.try_into().unwrap();
        let opt_class_hash: ClassHash = opt_class.try_into().unwrap();
        let optoken_long_addr: ContractAddress = deploy_via_proxy(
            proxy_class_hash, opt_class_hash, custom_salt
        );

        IOptionTokenDispatcher { contract_address: optoken_long_addr }
            .initializer(
                o.name_long,
                'C-OPT',
                governance_address,
                amm_address,
                quote_token_address,
                base_token_address,
                o.option_type,
                o.strike_price,
                o.maturity,
                TRADE_SIDE_LONG
            );

        IAMMDispatcher { contract_address: amm_address }
            .add_option(
                TRADE_SIDE_LONG,
                o.maturity,
                o.strike_price,
                quote_token_address,
                base_token_address,
                o.option_type,
                o.lptoken_address,
                optoken_long_addr,
                o.initial_volatility
            );

        let optoken_short_addr: ContractAddress = deploy_via_proxy(
            proxy_class_hash, opt_class_hash, custom_salt + 1
        );

        IOptionTokenDispatcher { contract_address: optoken_short_addr }
            .initializer(
                o.name_short,
                'C-OPT',
                governance_address,
                amm_address,
                quote_token_address,
                base_token_address,
                o.option_type,
                o.strike_price,
                o.maturity,
                TRADE_SIDE_SHORT
            );

        IAMMDispatcher { contract_address: amm_address }
            .add_option(
                TRADE_SIDE_SHORT,
                o.maturity,
                o.strike_price,
                quote_token_address,
                base_token_address,
                o.option_type,
                o.lptoken_address,
                optoken_short_addr,
                o.initial_volatility
            );
    }

    fn add_option_both_sides(
        proxy_class: felt252,
        opt_class: felt252,
        governance_address: ContractAddress,
        amm_address: ContractAddress,
        salt: felt252,
        option: @FutureOption
    ) {
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

        let proxy_class_hash: ClassHash = proxy_class.try_into().unwrap();
        let opt_class_hash: ClassHash = opt_class.try_into().unwrap();
        let optoken_long_addr: ContractAddress = deploy_via_proxy(
            proxy_class_hash, opt_class_hash, custom_salt
        );
        let optoken_short_addr: ContractAddress = deploy_via_proxy(
            proxy_class_hash, opt_class_hash, custom_salt + 1
        );

        IOptionTokenDispatcher { contract_address: optoken_long_addr }
            .initializer(
                o.name_long,
                'C-OPT',
                governance_address,
                amm_address,
                quote_token_address,
                base_token_address,
                o.option_type,
                o.strike_price,
                o.maturity,
                TRADE_SIDE_LONG
            );

        IOptionTokenDispatcher { contract_address: optoken_short_addr }
            .initializer(
                o.name_short,
                'C-OPT',
                governance_address,
                amm_address,
                quote_token_address,
                base_token_address,
                o.option_type,
                o.strike_price,
                o.maturity,
                TRADE_SIDE_SHORT
            );

        IAMMDispatcher { contract_address: amm_address }
            .add_option_both_sides(
                o.maturity,
                o.strike_price,
                quote_token_address,
                base_token_address,
                o.option_type,
                o.lptoken_address,
                optoken_long_addr,
                optoken_short_addr,
                o.initial_volatility
            );
    }

    fn deploy_via_proxy(
        proxy_class: ClassHash, impl_class: ClassHash, salt: felt252
    ) -> ContractAddress {
        let curr_salt = salt + impl_class.into();
        let mut calldata = array![impl_class.into(), 0, 0];
        let syscall_res = deploy_syscall(proxy_class, curr_salt, calldata.span(), false);
        let (res, _) = syscall_res.unwrap_syscall();
        res
    }

    fn run_add_0911_1611_options() {
        let mut state = Governance::unsafe_new_contract_state();
        assert(!state.proposal_initializer_run.read(36), 'prop already initialized');

        state.proposal_initializer_run.write(36, true);

        add_0911_options();
        add_1611_options();
    }

    fn add_0911_options() {
        let MATURITY: felt252 = 1699574399;

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
                    name_long: 'ETHUSDC-09NOV23-1800-LONG-CALL',
                    name_short: 'ETHUSDC-09NOV23-1800-SHORT-CALL',
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_1800,
                    option_type: OPTION_CALL,
                    lptoken_address: eth_lpt_addr,
                    initial_volatility: VOLATILITY_41
                }
            );
        to_add
            .append(
                FutureOption {
                    name_long: 'ETHUSDC-09NOV23-1900-LONG-CALL',
                    name_short: 'ETHUSDC-09NOV23-1900-SHORT-CALL',
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_1900,
                    option_type: OPTION_CALL,
                    lptoken_address: eth_lpt_addr,
                    initial_volatility: VOLATILITY_45
                }
            );
        to_add
            .append(
                FutureOption {
                    name_long: 'ETHUSDC-09NOV23-2000-LONG-CALL',
                    name_short: 'ETHUSDC-09NOV23-2000-SHORT-CALL',
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_2000,
                    option_type: OPTION_CALL,
                    lptoken_address: eth_lpt_addr,
                    initial_volatility: VOLATILITY_53
                }
            );
        to_add
            .append(
                FutureOption {
                    name_long: 'ETHUSDC-09NOV23-1700-LONG-PUT',
                    name_short: 'ETHUSDC-09NOV23-1700-SHORT-PUT',
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_1700,
                    option_type: OPTION_PUT,
                    lptoken_address: usdc_lpt_addr,
                    initial_volatility: VOLATILITY_42
                }
            );
        to_add
            .append(
                FutureOption {
                    name_long: 'ETHUSDC-09NOV23-1600-LONG-PUT',
                    name_short: 'ETHUSDC-09NOV23-1600-SHORT-PUT',
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_1600,
                    option_type: OPTION_PUT,
                    lptoken_address: usdc_lpt_addr,
                    initial_volatility: VOLATILITY_52
                }
            );

        add_options(1011238812, to_add.span())
    }


    fn add_1611_options() {
        let MATURITY: felt252 = 1700179199;

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
                    name_long: 'ETHUSDC-16NOV23-1800-LONG-CALL',
                    name_short: 'ETHUSDC-16NOV23-1800-SHORT-CALL',
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_1800,
                    option_type: OPTION_CALL,
                    lptoken_address: eth_lpt_addr,
                    initial_volatility: VOLATILITY_44
                }
            );
        to_add // purposefully only two call strikes to be conservative about future volatility spikes
            .append(
                FutureOption {
                    name_long: 'ETHUSDC-16NOV23-1900-LONG-CALL',
                    name_short: 'ETHUSDC-16NOV23-1900-SHORT-CALL',
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_1900,
                    option_type: OPTION_CALL,
                    lptoken_address: eth_lpt_addr,
                    initial_volatility: VOLATILITY_46
                }
            );
        to_add
            .append(
                FutureOption {
                    name_long: 'ETHUSDC-16NOV23-1700-LONG-PUT',
                    name_short: 'ETHUSDC-16NOV23-1700-SHORT-PUT',
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_1700,
                    option_type: OPTION_PUT,
                    lptoken_address: usdc_lpt_addr,
                    initial_volatility: VOLATILITY_43_5
                }
            );
        to_add
            .append(
                FutureOption {
                    name_long: 'ETHUSDC-16NOV23-1600-LONG-PUT',
                    name_short: 'ETHUSDC-16NOV23-1600-SHORT-PUT',
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_1600,
                    option_type: OPTION_PUT,
                    lptoken_address: usdc_lpt_addr,
                    initial_volatility: VOLATILITY_48_5
                }
            );

        add_options(16112383681242, to_add.span())
    }
}
