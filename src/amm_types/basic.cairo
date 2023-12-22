use cubit::f128::types::fixed::{Fixed, FixedTrait};
use starknet::ContractAddress;
use core::option::OptionTrait;

type LPTAddress = ContractAddress;
type OptionSide = u8;
type OptionType = u8;
type Timestamp = u64; // In seconds, Block timestamps are also u64

type Int = u128;

type Maturity = felt252;

type Volatility = Fixed;
type Strike = Fixed;

