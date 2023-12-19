use starknet::ContractAddress;

use governance::types::OptionSide;
use governance::types::OptionType;

type Math64x61_ = felt252; // legacy, for AMM trait definition

#[starknet::interface]
trait IERC20<TContractState> {
    fn name(self: @TContractState) -> felt252;
    fn symbol(self: @TContractState) -> felt252;
    fn decimals(self: @TContractState) -> u8;
    fn totalSupply(self: @TContractState) -> u256;
    fn balanceOf(self: @TContractState, account: ContractAddress) -> u256;
    fn allowance(self: @TContractState, owner: ContractAddress, spender: ContractAddress) -> u256;
    fn transfer(ref self: TContractState, recipient: ContractAddress, amount: u256) -> bool;
    fn transferFrom(
        ref self: TContractState, sender: ContractAddress, recipient: ContractAddress, amount: u256
    ) -> bool;
    fn approve(ref self: TContractState, spender: ContractAddress, amount: u256) -> bool;
}

#[starknet::interface]
trait IAMM<TContractState> {
    fn trade_open(
        ref self: TContractState,
        option_type: OptionType,
        strike_price: Math64x61_,
        maturity: felt252,
        option_side: OptionSide,
        option_size: felt252,
        quote_token_address: ContractAddress,
        base_token_address: ContractAddress,
        limit_total_premia: Math64x61_,
        tx_deadline: felt252,
    ) -> Math64x61_;
    fn trade_close(
        ref self: TContractState,
        option_type: OptionType,
        strike_price: Math64x61_,
        maturity: felt252,
        option_side: OptionSide,
        option_size: felt252,
        quote_token_address: ContractAddress,
        base_token_address: ContractAddress,
        limit_total_premia: Math64x61_,
        tx_deadline: felt252,
    ) -> Math64x61_;
    fn trade_settle(
        ref self: TContractState,
        option_type: OptionType,
        strike_price: Math64x61_,
        maturity: felt252,
        option_side: OptionSide,
        option_size: felt252,
        quote_token_address: ContractAddress,
        base_token_address: ContractAddress,
    );
    fn is_option_available(
        self: @TContractState,
        lptoken_address: ContractAddress,
        option_side: OptionSide,
        strike_price: Math64x61_,
        maturity: felt252,
    ) -> felt252;
    fn set_trading_halt(ref self: TContractState, new_status: felt252);
    fn get_trading_halt(self: @TContractState) -> felt252;
    fn add_lptoken(
        ref self: TContractState,
        quote_token_address: ContractAddress,
        base_token_address: ContractAddress,
        option_type: OptionType,
        lptoken_address: ContractAddress,
        pooled_token_addr: ContractAddress,
        volatility_adjustment_speed: Math64x61_,
        max_lpool_bal: u256,
    );
    fn add_option(
        ref self: TContractState,
        option_side: OptionSide,
        maturity: felt252,
        strike_price: Math64x61_,
        quote_token_address: ContractAddress,
        base_token_address: ContractAddress,
        option_type: OptionType,
        lptoken_address: ContractAddress,
        option_token_address_: ContractAddress,
        initial_volatility: Math64x61_,
    );
    fn add_option_both_sides(
        ref self: TContractState,
        maturity: felt252,
        strike_price: Math64x61_,
        quote_token_address: ContractAddress,
        base_token_address: ContractAddress,
        option_type: OptionType,
        lptoken_address: ContractAddress,
        option_token_address_long: ContractAddress,
        option_token_address_short: ContractAddress,
        initial_volatility: Math64x61_,
    );
    fn get_option_token_address(
        self: @TContractState,
        lptoken_address: ContractAddress,
        option_side: OptionSide,
        maturity: felt252,
        strike_price: Math64x61_,
    ) -> ContractAddress;
    fn get_lptokens_for_underlying(
        ref self: TContractState, pooled_token_addr: ContractAddress, underlying_amt: u256,
    ) -> u256;
    fn get_underlying_for_lptokens(
        self: @TContractState, pooled_token_addr: ContractAddress, lpt_amt: u256
    ) -> u256;
    fn get_available_lptoken_addresses(self: @TContractState, order_i: felt252) -> ContractAddress;
    fn get_all_options(self: @TContractState, lptoken_address: ContractAddress) -> Array<felt252>;
    fn get_all_non_expired_options_with_premia(
        self: @TContractState, lptoken_address: ContractAddress
    ) -> Array<felt252>;
    fn get_option_with_position_of_user(
        self: @TContractState, user_address: ContractAddress
    ) -> Array<felt252>;
    fn get_all_lptoken_addresses(self: @TContractState,) -> Array<ContractAddress>;
    fn get_value_of_pool_position(
        self: @TContractState, lptoken_address: ContractAddress
    ) -> Math64x61_;
    // fn get_value_of_position(
    //     option: Option,
    //     position_size: Math64x61_,
    //     option_type: OptionType,
    //     current_volatility: Math64x61_,
    // ) -> Math64x61_;
    // fn get_all_poolinfo() -> Array<PoolInfo>;
    // fn get_option_info_from_addresses(
    //     lptoken_address: ContractAddress, option_token_address: ContractAddress, 
    // ) -> Option;
    // fn get_user_pool_infos(user: ContractAddress) -> Array<UserPoolInfo>;
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
        strike_price: Math64x61_,
        maturity: felt252,
    );
    fn getAdmin(self: @TContractState);
    fn set_max_option_size_percent_of_voladjspd(
        ref self: TContractState, max_opt_size_as_perc_of_vol_adjspd: felt252
    );
    fn get_max_option_size_percent_of_voladjspd(self: @TContractState) -> felt252;
    fn get_lpool_balance(self: @TContractState, lptoken_address: ContractAddress) -> u256;
    fn get_max_lpool_balance(self: @TContractState, pooled_token_addr: ContractAddress) -> u256;
    fn set_max_lpool_balance(
        ref self: TContractState, pooled_token_addr: ContractAddress, max_lpool_bal: u256
    );
    fn get_pool_locked_capital(self: @TContractState, lptoken_address: ContractAddress) -> u256;
    // fn get_available_options(lptoken_address: ContractAddress, order_i: felt252) -> Option;
    fn get_available_options_usable_index(
        self: @TContractState, lptoken_address: ContractAddress, starting_index: felt252
    ) -> felt252;
    fn get_lptoken_address_for_given_option(
        self: @TContractState,
        quote_token_address: ContractAddress,
        base_token_address: ContractAddress,
        option_type: OptionType,
    ) -> ContractAddress;
    //fn get_pool_definition_from_lptoken_address(lptoken_addres: ContractAddress) -> Pool;
    fn get_option_type(self: @TContractState, lptoken_address: ContractAddress) -> OptionType;
    fn get_pool_volatility_separate(
        self: @TContractState,
        lptoken_address: ContractAddress,
        maturity: felt252,
        strike_price: Math64x61_,
    ) -> Math64x61_;
    fn get_underlying_token_address(
        self: @TContractState, lptoken_address: ContractAddress
    ) -> ContractAddress;
    fn get_available_lptoken_addresses_usable_index(
        self: @TContractState, starting_index: felt252
    ) -> felt252;
    fn get_pool_volatility_adjustment_speed(
        self: @TContractState, lptoken_address: ContractAddress
    ) -> Math64x61_;
    fn set_pool_volatility_adjustment_speed_external(
        ref self: TContractState, lptoken_address: ContractAddress, new_speed: Math64x61_,
    );
    fn get_pool_volatility(
        self: @TContractState, lptoken_address: ContractAddress, maturity: felt252
    ) -> Math64x61_;
    fn get_pool_volatility_auto(
        self: @TContractState,
        lptoken_address: ContractAddress,
        maturity: felt252,
        strike_price: Math64x61_,
    ) -> Math64x61_;
    fn get_option_position(
        self: @TContractState,
        lptoken_address: ContractAddress,
        option_side: OptionSide,
        maturity: felt252,
        strike_price: Math64x61_
    ) -> felt252;
    // need to return two values, unclear rn
    //fn get_total_premia(
    //    option: Option, lptoken_address: ContractAddress, position_size: u256, is_closing: Bool, 
    //) -> (total_premia_before_fees : Math64x61_, total_premia_including_fees : Math64x61_);
    fn black_scholes(
        self: @TContractState,
        sigma: felt252,
        time_till_maturity_annualized: felt252,
        strike_price: felt252,
        underlying_price: felt252,
        risk_free_rate_annualized: felt252,
        is_for_trade: felt252, // bool
    ) -> (felt252, felt252);
    fn empiric_median_price(self: @TContractState, key: felt252) -> Math64x61_;
    fn initializer(ref self: TContractState, proxy_admin: ContractAddress);
    fn upgrade(ref self: TContractState, new_implementation: felt252);
    fn setAdmin(ref self: TContractState, address: felt252);
    fn getImplementationHash(self: @TContractState,) -> felt252;
}

#[starknet::interface]
trait IGovernanceToken<TContractState> {
    fn name(self: @TContractState) -> felt252;
    fn symbol(self: @TContractState) -> felt252;
    fn decimals(self: @TContractState) -> felt252;
    fn totalSupply(self: @TContractState) -> u256;
    fn balanceOf(self: @TContractState, account: ContractAddress) -> u256;
    fn allowance(self: @TContractState, owner: ContractAddress, spender: ContractAddress) -> u256;
    fn transfer(ref self: TContractState, recipient: ContractAddress, amount: u256) -> felt252;
    fn transferFrom(
        ref self: TContractState, sender: ContractAddress, recipient: ContractAddress, amount: u256
    ) -> felt252;
    fn mint(ref self: TContractState, to: ContractAddress, amount: u256);
    fn approve(ref self: TContractState, spender: ContractAddress, amount: u256) -> felt252;
    fn upgrade(ref self: TContractState, new_implementation: felt252);
    fn initializer(
        ref self: TContractState,
        name: felt252,
        symbol: felt252,
        decimals: felt252,
        initial_supply: u256,
        recipient: ContractAddress,
        proxy_admin: ContractAddress
    );
}

#[starknet::interface]
trait IOptionToken<TContractState> {
    fn initializer(
        ref self: TContractState,
        name: felt252,
        symbol: felt252,
        proxy_admin: ContractAddress,
        owner: ContractAddress,
        quote_token_address: ContractAddress,
        base_token_address: ContractAddress,
        option_type: OptionType,
        strike_price: Math64x61_,
        maturity: felt252,
        side: OptionSide
    );
    fn _set_owner_admin(ref self: TContractState, owner: ContractAddress);
    fn upgrade(ref self: TContractState, new_implementation: felt252);
    fn name(self: @TContractState) -> felt252;
    fn symbol(self: @TContractState) -> felt252;
    fn decimals(self: @TContractState) -> felt252;
    fn totalSupply(self: @TContractState) -> u256;
    fn balanceOf(self: @TContractState, account: ContractAddress) -> u256;
    fn allowance(self: @TContractState, owner: ContractAddress, spender: ContractAddress) -> u256;
    fn owner(self: @TContractState) -> ContractAddress;
    fn quote_token_address(self: @TContractState) -> ContractAddress;
    fn base_token_address(self: @TContractState) -> ContractAddress;
    fn option_type(self: @TContractState) -> OptionType;
    fn strike_price(self: @TContractState) -> Math64x61_;
    fn maturity(self: @TContractState) -> felt252;
    fn side(self: @TContractState) -> OptionSide;
    fn transfer(ref self: TContractState, recipient: ContractAddress, amount: u256) -> felt252;
    fn transferFrom(
        ref self: TContractState, sender: ContractAddress, recipient: ContractAddress, amount: u256
    ) -> felt252;
    fn approve(ref self: TContractState, spender: ContractAddress, amount: u256) -> felt252;
    fn mint(ref self: TContractState, to: ContractAddress, amount: u256);
    fn burn(ref self: TContractState, account: ContractAddress, amount: u256);
    fn transferOwnership(ref self: TContractState, newOwner: ContractAddress);
    fn renounceOwnership(ref self: TContractState);
}
