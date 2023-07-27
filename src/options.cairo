// Handles adding new options to the AMM and linking them to the liquidity pool.
// I have chosen this perhaps rather complex type layout in expectation of generating the options soon –
// – first generating FutureOption, then generating everything from Pragma data

mod Options {
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
    use governance::types::OptionType;
    use governance::traits::Math64x61_;

    const VOLATILITY_31: Math64x61_ = 71481133285624512512;
    const VOLATILITY_32: Math64x61_ = 73786976294838206464;
    const VOLATILITY_32_5: Math64x61_ = 74939897799445053440;
    const VOLATILITY_33: Math64x61_ = 76092819304051900416;
    const VOLATILITY_34: Math64x61_ = 78398662313265594368;
    const VOLATILITY_37: Math64x61_ = 85316191340906676224;
    const VOLATILITY_38: Math64x61_ = 87622034350120370176;
    const VOLATILITY_39: Math64x61_ = 89927877359334064128;
    const VOLATILITY_40: Math64x61_ = 92233720368547758080;
    const VOLATILITY_41: Math64x61_ = 94539563377761452032;
    const VOLATILITY_41_5: Math64x61_ = 95692484882368299008;
    const VOLATILITY_42: Math64x61_ = 96845406386975145984; // = 42 * 2^61
    const VOLATILITY_44: Math64x61_ = 101457092405402533888;
    const VOLATILITY_45: Math64x61_ = 124515522497539473408;
    const VOLATILITY_46: Math64x61_ = 106068778423829921792;
    const VOLATILITY_48_5: Math64x61_ = 111833385946864156672;
    const VOLATILITY_55: Math64x61_ = 126821365506753167360;
    const VOLATILITY_60: Math64x61_ = 138350580552821637120;

    fn add_options(salt: felt252, mut options: Span<FutureOption>) {
        // TODO use block hash from block_hash syscall as salt
        let governance_address = get_contract_address();
        let amm_address = amm_address::read();
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
                Option::None(()) => {
                    break ();
                },
            };
        }
    }

    // TODO add auto generation of FutureOption structs once string contacenation exists
    #[derive(Copy, Drop, Serde)]
    struct FutureOption {
        name: felt252,
        option_side: OptionSide,
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
            + o.option_side
            + o.lptoken_address.into()
            + o.initial_volatility;

        let proxy_class_hash: ClassHash = proxy_class.try_into().unwrap();
        let opt_class_hash: ClassHash = opt_class.try_into().unwrap();
        let optoken_addr: ContractAddress = deploy_via_proxy(
            proxy_class_hash, opt_class_hash, custom_salt
        );

        IOptionTokenDispatcher {
            contract_address: optoken_addr
        }
            .initializer(
                o.name,
                'C-OPT',
                governance_address,
                amm_address,
                quote_token_address,
                base_token_address,
                o.option_type,
                o.strike_price,
                o.maturity,
                o.option_side
            );

        IAMMDispatcher {
            contract_address: amm_address
        }
            .add_option(
                o.option_side,
                o.maturity,
                o.strike_price,
                quote_token_address,
                base_token_address,
                o.option_type,
                o.lptoken_address,
                optoken_addr,
                o.initial_volatility
            );
    }

    fn deploy_via_proxy(
        proxy_class: ClassHash, impl_class: ClassHash, salt: felt252
    ) -> ContractAddress {
        let curr_salt = salt + impl_class.into();
        let mut calldata = ArrayTrait::<felt252>::new();
        calldata.append(impl_class.into());
        calldata.append(0);
        calldata.append(0);
        let syscall_res = deploy_syscall(proxy_class, curr_salt, calldata.span(), false);
        let (res, _) = syscall_res.unwrap_syscall();
        res
    }

    fn add_0308_1008_2408_options() {
        assert(!proposal_initializer_run::read(19), 'prop19 initializer called again');
        proposal_initializer_run::write(19, true);

        let amm_address = amm_address::read();
        let max_put_pool_balance = u256 { low: 50000000000, high: 0 };
        let USDC_addr: ContractAddress =
            0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8
            .try_into()
            .unwrap();
        IAMMDispatcher {
            contract_address: amm_address
        }.set_max_lpool_balance(USDC_addr, max_put_pool_balance);

        add_0308_options();
        add_1008_options();
        add_2408_options();
    }

    fn add_0308_options() {
        let MATURITY: felt252 = 1691107199;

        let STRIKE_PRICE_1900 = 4381101717506018508800;
        let STRIKE_PRICE_2000 = 4611686018427387904000;
        let STRIKE_PRICE_2100 = 4842270319348757299200;
        let STRIKE_PRICE_1800 = 4150517416584649113600;
        let STRIKE_PRICE_1700 = 3919933115663279718400;

        let eth_lpt_addr: ContractAddress =
            0x7aba50fdb4e024c1ba63e2c60565d0fd32566ff4b18aa5818fc80c30e749024
            .try_into()
            .unwrap();
        let usdc_lpt_addr: ContractAddress =
            0x18a6abca394bd5f822cfa5f88783c01b13e593d1603e7b41b00d31d2ea4827a
            .try_into()
            .unwrap();

        let mut to_add = ArrayTrait::<FutureOption>::new();
        // Add options here with the appropriate volatilities
        to_add
            .append(
                FutureOption {
                    name: 'ETHUSDC-03AUG23-1900-LONG-CALL',
                    option_side: TRADE_SIDE_LONG,
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_1900,
                    option_type: OPTION_CALL,
                    lptoken_address: eth_lpt_addr,
                    initial_volatility: VOLATILITY_32
                }
            );
        to_add
            .append(
                FutureOption {
                    name: 'ETHUSDC-03AUG23-2000-LONG-CALL',
                    option_side: TRADE_SIDE_LONG,
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_2000,
                    option_type: OPTION_CALL,
                    lptoken_address: eth_lpt_addr,
                    initial_volatility: VOLATILITY_37
                }
            );
        to_add
            .append(
                FutureOption {
                    name: 'ETHUSDC-03AUG23-2100-LONG-CALL',
                    option_side: TRADE_SIDE_LONG,
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_2100,
                    option_type: OPTION_CALL,
                    lptoken_address: eth_lpt_addr,
                    initial_volatility: VOLATILITY_45
                }
            );
        to_add
            .append(
                FutureOption {
                    name: 'ETHUSDC-03AUG23-1800-LONG-PUT',
                    option_side: TRADE_SIDE_LONG,
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_1800,
                    option_type: OPTION_PUT,
                    lptoken_address: usdc_lpt_addr,
                    initial_volatility: VOLATILITY_34
                }
            );
        to_add
            .append(
                FutureOption {
                    name: 'ETHUSDC-03AUG23-1900-LONG-PUT',
                    option_side: TRADE_SIDE_LONG,
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_1900,
                    option_type: OPTION_PUT,
                    lptoken_address: usdc_lpt_addr,
                    initial_volatility: VOLATILITY_32
                }
            );
        to_add
            .append(
                FutureOption {
                    name: 'ETHUSDC-03AUG23-1900-SHORT-CALL',
                    option_side: TRADE_SIDE_SHORT,
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_1900,
                    option_type: OPTION_CALL,
                    lptoken_address: eth_lpt_addr,
                    initial_volatility: VOLATILITY_32
                }
            );
        to_add
            .append(
                FutureOption {
                    name: 'ETHUSDC-03AUG23-2000-SHORT-CALL',
                    option_side: TRADE_SIDE_SHORT,
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_2000,
                    option_type: OPTION_CALL,
                    lptoken_address: eth_lpt_addr,
                    initial_volatility: VOLATILITY_37
                }
            );
        to_add
            .append(
                FutureOption {
                    name: 'ETHUSDC-03AUG23-2100-SHORT-CALL',
                    option_side: TRADE_SIDE_SHORT,
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_2100,
                    option_type: OPTION_CALL,
                    lptoken_address: eth_lpt_addr,
                    initial_volatility: VOLATILITY_45
                }
            );
        to_add
            .append(
                FutureOption {
                    name: 'ETHUSDC-03AUG23-1800-SHORT-PUT',
                    option_side: TRADE_SIDE_SHORT,
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_1800,
                    option_type: OPTION_PUT,
                    lptoken_address: usdc_lpt_addr,
                    initial_volatility: VOLATILITY_34
                }
            );
        to_add
            .append(
                FutureOption {
                    name: 'ETHUSDC-03AUG23-1900-SHORT-PUT',
                    option_side: TRADE_SIDE_SHORT,
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_1900,
                    option_type: OPTION_PUT,
                    lptoken_address: usdc_lpt_addr,
                    initial_volatility: VOLATILITY_32
                }
            );

        add_options(0308235583341284012, to_add.span())
    }

    fn add_1008_options() {
        let MATURITY: felt252 = 1691711999;

        let STRIKE_PRICE_1900 = 4381101717506018508800;
        let STRIKE_PRICE_2000 = 4611686018427387904000;
        let STRIKE_PRICE_2100 = 4842270319348757299200;
        let STRIKE_PRICE_1800 = 4150517416584649113600;
        let STRIKE_PRICE_1700 = 3919933115663279718400;

        let eth_lpt_addr: ContractAddress =
            0x7aba50fdb4e024c1ba63e2c60565d0fd32566ff4b18aa5818fc80c30e749024
            .try_into()
            .unwrap();
        let usdc_lpt_addr: ContractAddress =
            0x18a6abca394bd5f822cfa5f88783c01b13e593d1603e7b41b00d31d2ea4827a
            .try_into()
            .unwrap();

        let mut to_add = ArrayTrait::<FutureOption>::new();
        // Add options here with the appropriate volatilities
        to_add
            .append(
                FutureOption {
                    name: 'ETHUSDC-10AUG23-1900-LONG-CALL',
                    option_side: TRADE_SIDE_LONG,
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_1900,
                    option_type: OPTION_CALL,
                    lptoken_address: eth_lpt_addr,
                    initial_volatility: VOLATILITY_31
                }
            );
        to_add
            .append(
                FutureOption {
                    name: 'ETHUSDC-10AUG23-2000-LONG-CALL',
                    option_side: TRADE_SIDE_LONG,
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_2000,
                    option_type: OPTION_CALL,
                    lptoken_address: eth_lpt_addr,
                    initial_volatility: VOLATILITY_33
                }
            );
        to_add
            .append(
                FutureOption {
                    name: 'ETHUSDC-10AUG23-2100-LONG-CALL',
                    option_side: TRADE_SIDE_LONG,
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_2100,
                    option_type: OPTION_CALL,
                    lptoken_address: eth_lpt_addr,
                    initial_volatility: VOLATILITY_39
                }
            );
        to_add
            .append(
                FutureOption {
                    name: 'ETHUSDC-10AUG23-1800-LONG-PUT',
                    option_side: TRADE_SIDE_LONG,
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_1800,
                    option_type: OPTION_PUT,
                    lptoken_address: usdc_lpt_addr,
                    initial_volatility: VOLATILITY_32_5
                }
            );
        to_add
            .append(
                FutureOption {
                    name: 'ETHUSDC-10AUG23-1900-LONG-PUT',
                    option_side: TRADE_SIDE_LONG,
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_1900,
                    option_type: OPTION_PUT,
                    lptoken_address: usdc_lpt_addr,
                    initial_volatility: VOLATILITY_31
                }
            );
        to_add
            .append(
                FutureOption {
                    name: 'ETHUSDC-10AUG23-1900-SHORT-CALL',
                    option_side: TRADE_SIDE_SHORT,
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_1900,
                    option_type: OPTION_CALL,
                    lptoken_address: eth_lpt_addr,
                    initial_volatility: VOLATILITY_31
                }
            );
        to_add
            .append(
                FutureOption {
                    name: 'ETHUSDC-10AUG23-2000-SHORT-CALL',
                    option_side: TRADE_SIDE_SHORT,
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_2000,
                    option_type: OPTION_CALL,
                    lptoken_address: eth_lpt_addr,
                    initial_volatility: VOLATILITY_33
                }
            );
        to_add
            .append(
                FutureOption {
                    name: 'ETHUSDC-10AUG23-2100-SHORT-CALL',
                    option_side: TRADE_SIDE_SHORT,
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_2100,
                    option_type: OPTION_CALL,
                    lptoken_address: eth_lpt_addr,
                    initial_volatility: VOLATILITY_39
                }
            );
        to_add
            .append(
                FutureOption {
                    name: 'ETHUSDC-10AUG23-1800-SHORT-PUT',
                    option_side: TRADE_SIDE_SHORT,
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_1800,
                    option_type: OPTION_PUT,
                    lptoken_address: usdc_lpt_addr,
                    initial_volatility: VOLATILITY_32_5
                }
            );
        to_add
            .append(
                FutureOption {
                    name: 'ETHUSDC-10AUG23-1900-SHORT-PUT',
                    option_side: TRADE_SIDE_SHORT,
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_1900,
                    option_type: OPTION_PUT,
                    lptoken_address: usdc_lpt_addr,
                    initial_volatility: VOLATILITY_31
                }
            );

        add_options(1008235894263284012, to_add.span())
    }

    fn add_2408_options() {
        let MATURITY: felt252 = 1691711999;

        let STRIKE_PRICE_1900 = 4381101717506018508800;
        let STRIKE_PRICE_2000 = 4611686018427387904000;
        let STRIKE_PRICE_2100 = 4842270319348757299200;
        let STRIKE_PRICE_1800 = 4150517416584649113600;
        let STRIKE_PRICE_1700 = 3919933115663279718400;

        let eth_lpt_addr: ContractAddress =
            0x7aba50fdb4e024c1ba63e2c60565d0fd32566ff4b18aa5818fc80c30e749024
            .try_into()
            .unwrap();
        let usdc_lpt_addr: ContractAddress =
            0x18a6abca394bd5f822cfa5f88783c01b13e593d1603e7b41b00d31d2ea4827a
            .try_into()
            .unwrap();

        let mut to_add = ArrayTrait::<FutureOption>::new();
        // Add options here with the appropriate volatilities
        to_add
            .append(
                FutureOption {
                    name: 'ETHUSDC-24AUG23-1900-LONG-CALL',
                    option_side: TRADE_SIDE_LONG,
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_1900,
                    option_type: OPTION_CALL,
                    lptoken_address: eth_lpt_addr,
                    initial_volatility: VOLATILITY_34
                }
            );
        to_add
            .append(
                FutureOption {
                    name: 'ETHUSDC-24AUG23-2000-LONG-CALL',
                    option_side: TRADE_SIDE_LONG,
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_2000,
                    option_type: OPTION_CALL,
                    lptoken_address: eth_lpt_addr,
                    initial_volatility: VOLATILITY_34
                }
            );
        to_add
            .append(
                FutureOption {
                    name: 'ETHUSDC-24AUG23-2100-LONG-CALL',
                    option_side: TRADE_SIDE_LONG,
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_2100,
                    option_type: OPTION_CALL,
                    lptoken_address: eth_lpt_addr,
                    initial_volatility: VOLATILITY_37
                }
            );
        to_add
            .append(
                FutureOption {
                    name: 'ETHUSDC-24AUG23-1800-LONG-PUT',
                    option_side: TRADE_SIDE_LONG,
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_1800,
                    option_type: OPTION_PUT,
                    lptoken_address: usdc_lpt_addr,
                    initial_volatility: VOLATILITY_32_5
                }
            );
        to_add
            .append(
                FutureOption {
                    name: 'ETHUSDC-24AUG23-1900-LONG-PUT',
                    option_side: TRADE_SIDE_LONG,
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_1900,
                    option_type: OPTION_PUT,
                    lptoken_address: usdc_lpt_addr,
                    initial_volatility: VOLATILITY_31
                }
            );
        to_add
            .append(
                FutureOption {
                    name: 'ETHUSDC-24AUG23-1900-SHORT-CALL',
                    option_side: TRADE_SIDE_SHORT,
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_1900,
                    option_type: OPTION_CALL,
                    lptoken_address: eth_lpt_addr,
                    initial_volatility: VOLATILITY_34
                }
            );
        to_add
            .append(
                FutureOption {
                    name: 'ETHUSDC-24AUG23-2000-SHORT-CALL',
                    option_side: TRADE_SIDE_SHORT,
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_2000,
                    option_type: OPTION_CALL,
                    lptoken_address: eth_lpt_addr,
                    initial_volatility: VOLATILITY_34
                }
            );
        to_add
            .append(
                FutureOption {
                    name: 'ETHUSDC-24AUG23-2100-SHORT-CALL',
                    option_side: TRADE_SIDE_SHORT,
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_2100,
                    option_type: OPTION_CALL,
                    lptoken_address: eth_lpt_addr,
                    initial_volatility: VOLATILITY_37
                }
            );
        to_add
            .append(
                FutureOption {
                    name: 'ETHUSDC-24AUG23-1800-SHORT-PUT',
                    option_side: TRADE_SIDE_SHORT,
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_1800,
                    option_type: OPTION_PUT,
                    lptoken_address: usdc_lpt_addr,
                    initial_volatility: VOLATILITY_32_5
                }
            );
        to_add
            .append(
                FutureOption {
                    name: 'ETHUSDC-24AUG23-1900-SHORT-PUT',
                    option_side: TRADE_SIDE_SHORT,
                    maturity: MATURITY,
                    strike_price: STRIKE_PRICE_1900,
                    option_type: OPTION_PUT,
                    lptoken_address: usdc_lpt_addr,
                    initial_volatility: VOLATILITY_31
                }
            );

        add_options(1008235894263284012, to_add.span())
    }
}
