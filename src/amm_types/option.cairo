use starknet::ContractAddress;
use cubit::f128::types::{Fixed, FixedTrait};
use core::serde::Serde;

use governance::amm_types::basic::{OptionType, OptionSide};

#[derive(Copy, Drop, Serde, starknet::Store)]
struct Option_ {
    option_side: OptionSide,
    maturity: u64,
    strike_price: Fixed,
    quote_token_address: ContractAddress,
    base_token_address: ContractAddress,
    option_type: OptionType
}

#[derive(Drop, Copy, Serde)]
struct OptionWithPremia {
    option: Option_,
    premia: Fixed,
}
