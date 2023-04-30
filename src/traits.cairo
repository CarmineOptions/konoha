use starknet::ContractAddress;
use array::ArrayTrait;

use governance::types::OptionSide;
use governance::types::OptionType;

type Math64x61_ = felt252; // legacy, for AMM trait definition

#[abi]
trait IERC20 {
    fn name() -> felt252;
    fn symbol() -> felt252;
    fn decimals() -> u8;
    fn totalSupply() -> u256;
    fn balanceOf(account: ContractAddress) -> u256;
    fn allowance(owner: ContractAddress, spender: ContractAddress) -> u256;
    fn transfer(recipient: ContractAddress, amount: u256) -> bool;
    fn transferFrom(sender: ContractAddress, recipient: ContractAddress, amount: u256) -> bool;
    fn approve(spender: ContractAddress, amount: u256) -> bool;
}

#[abi]
trait IAMM {
    fn trade_open(
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
        option_type: OptionType,
        strike_price: Math64x61_,
        maturity: felt252,
        option_side: OptionSide,
        option_size: felt252,
        quote_token_address: ContractAddress,
        base_token_address: ContractAddress,
    );
    fn is_option_available(
        lptoken_address: ContractAddress,
        option_side: OptionSide,
        strike_price: Math64x61_,
        maturity: felt252,
    ) -> felt252;
    fn set_trading_halt(new_status: felt252);
    fn get_trading_halt() -> felt252;
    fn add_lptoken(
        quote_token_address: ContractAddress,
        base_token_address: ContractAddress,
        option_type: OptionType,
        lptoken_address: ContractAddress,
        pooled_token_addr: ContractAddress,
        volatility_adjustment_speed: Math64x61_,
        max_lpool_bal: u256,
    );
    fn add_option(
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
    fn get_option_token_address(
        lptoken_address: ContractAddress,
        option_side: OptionSide,
        maturity: felt252,
        strike_price: Math64x61_,
    ) -> ContractAddress;
    fn get_lptokens_for_underlying(
        pooled_token_addr: ContractAddress, underlying_amt: u256, 
    ) -> u256;
    fn get_underlying_for_lptokens(pooled_token_addr: ContractAddress, lpt_amt: u256) -> u256;
    fn get_available_lptoken_addresses(order_i: felt252) -> ContractAddress;
    fn get_all_options(lptoken_address: ContractAddress) -> Array<felt252>;
    fn get_all_non_expired_options_with_premia(lptoken_address: ContractAddress) -> Array<felt252>;
    fn get_option_with_position_of_user(user_address: ContractAddress) -> Array<felt252>;
    fn get_all_lptoken_addresses() -> Array<ContractAddress>;
    fn get_value_of_pool_position(lptoken_address: ContractAddress) -> Math64x61_;
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
        pooled_token_addr: ContractAddress,
        quote_token_address: ContractAddress,
        base_token_address: ContractAddress,
        option_type: OptionType,
        amount: u256,
    );
    fn withdraw_liquidity(
        pooled_token_addr: ContractAddress,
        quote_token_address: ContractAddress,
        base_token_address: ContractAddress,
        option_type: OptionType,
        lp_token_amount: u256,
    );
    fn get_unlocked_capital(lptoken_address: ContractAddress) -> u256;
    fn expire_option_token_for_pool(
        lptoken_address: ContractAddress,
        option_side: OptionSide,
        strike_price: Math64x61_,
        maturity: felt252,
    );
    fn getAdmin();
    fn set_max_option_size_percent_of_voladjspd(max_opt_size_as_perc_of_vol_adjspd: felt252);
    fn get_max_option_size_percent_of_voladjspd() -> felt252;
    fn get_lpool_balance(lptoken_address: ContractAddress) -> u256;
    fn get_max_lpool_balance(pooled_token_addr: ContractAddress) -> u256;
    fn set_max_lpool_balance(pooled_token_addr: ContractAddress, max_lpool_bal: u256);
    fn get_pool_locked_capital(lptoken_address: ContractAddress) -> u256;
    // fn get_available_options(lptoken_address: ContractAddress, order_i: felt252) -> Option;
    fn get_available_options_usable_index(
        lptoken_address: ContractAddress, starting_index: felt252
    ) -> felt252;
    fn get_lptoken_address_for_given_option(
        quote_token_address: ContractAddress,
        base_token_address: ContractAddress,
        option_type: OptionType,
    ) -> ContractAddress;
    //fn get_pool_definition_from_lptoken_address(lptoken_addres: ContractAddress) -> Pool;
    fn get_option_type(lptoken_address: ContractAddress) -> OptionType;
    fn get_pool_volatility_separate(
        lptoken_address: ContractAddress, maturity: felt252, strike_price: Math64x61_, 
    ) -> Math64x61_;
    fn get_underlying_token_address(lptoken_address: ContractAddress) -> ContractAddress;
    fn get_available_lptoken_addresses_usable_index(starting_index: felt252) -> felt252;
    fn get_pool_volatility_adjustment_speed(lptoken_address: ContractAddress) -> Math64x61_;
    fn set_pool_volatility_adjustment_speed_external(
        lptoken_address: ContractAddress, new_speed: Math64x61_, 
    );
    fn get_pool_volatility(lptoken_address: ContractAddress, maturity: felt252) -> Math64x61_;
    fn get_pool_volatility_auto(
        lptoken_address: ContractAddress, maturity: felt252, strike_price: Math64x61_, 
    ) -> Math64x61_;
    fn get_option_position(
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
        sigma: felt252,
        time_till_maturity_annualized: felt252,
        strike_price: felt252,
        underlying_price: felt252,
        risk_free_rate_annualized: felt252,
        is_for_trade: felt252, // bool
    ) -> (felt252, felt252);
    fn empiric_median_price(key: felt252) -> Math64x61_;
    fn initializer(proxy_admin: ContractAddress);
    fn upgrade(new_implementation: felt252);
    fn setAdmin(address: felt252);
    fn getImplementationHash() -> felt252;
}

#[abi]
trait IGovernanceToken {
    fn name() -> felt252;
    fn symbol() -> felt252;
    fn decimals() -> felt252;
    fn totalSupply() -> u256;
    fn balanceOf(account: ContractAddress) -> u256;
    fn allowance(owner: ContractAddress, spender: ContractAddress) -> u256;
    fn transfer(recipient: ContractAddress, amount: u256) -> felt252;
    fn transferFrom(sender: ContractAddress, recipient: ContractAddress, amount: u256) -> felt252;
    fn mint(to: ContractAddress, amount: u256);
    fn approve(spender: ContractAddress, amount: u256) -> felt252;
    fn increaseAllowance(spender: ContractAddress, added_value: u256) -> felt252;
    fn decreaseAllowance(spender: ContractAddress, subtracted_value: u256) -> felt252;
    fn pause();
    fn unpause();
    fn upgrade(new_implementation: felt252);
    fn initializer(
        name: felt252,
        symbol: felt252,
        decimals: felt252,
        initial_supply: u256,
        recipient: ContractAddress,
        proxy_admin: ContractAddress
    );
}
