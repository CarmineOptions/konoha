use starknet::{ContractAddress, ClassHash};

pub type OptionSide = felt252;
pub type OptionType = felt252;

#[starknet::interface]
pub trait IAMM<TContractState> {
    fn get_lptokens_for_underlying(
        self: @TContractState, pooled_token_addr: ContractAddress, underlying_amt: u256,
    ) -> u256;
    fn get_underlying_for_lptokens(
        self: @TContractState, lptoken_addr: ContractAddress, lpt_amt: u256
    ) -> u256;
    fn get_available_lptoken_addresses(self: @TContractState, order_i: felt252) -> ContractAddress;
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
    // fn get_available_options(
    //     self: @TContractState, lptoken_address: ContractAddress, order_i: u32
    // ) -> Option_;

    fn get_lptoken_address_for_given_option(
        self: @TContractState,
        quote_token_address: ContractAddress,
        base_token_address: ContractAddress,
        option_type: OptionType,
    ) -> ContractAddress;
    // fn get_pool_definition_from_lptoken_address(
    //     self: @TContractState, lptoken_addres: ContractAddress
    // ) -> Pool;
    // fn get_total_premia(
    //     self: @TContractState, option: Option_, position_size: u256, is_closing: bool
    // ) -> (Fixed, Fixed);

    fn set_pragma_checkpoint(ref self: TContractState, key: felt252);
    fn set_pragma_required_checkpoints(ref self: TContractState);
    fn upgrade(ref self: TContractState, new_implementation: ClassHash);
}
