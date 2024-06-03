use starknet::ContractAddress;

#[starknet::interface]
trait INostraRouter<TContractState> {
    fn add_liquidity(
        ref self: TContractState,
        pair: ContractAddress,
        amount_0_desired: u256,
        amount_1_desired: u256,
        amount_0_min: u256,
        amount_1_min: u256,
        to: ContractAddress,
        deadline: u64
    ) -> (u256, u256, u256);
    fn remove_liquidity(
        ref self: TContractState,
        pair: ContractAddress,
        liquidity: u256,
        amount_0_min: u256,
        amount_1_min: u256,
        to: ContractAddress,
        deadline: u64
    ) -> (u256, u256);
}

#[starknet::interface]
trait INostraPair<TContractState> {
    fn token_0(self: @TContractState) -> ContractAddress;
    fn token_1(self: @TContractState) -> ContractAddress;
    fn balance_of(self: @TContractState, account: ContractAddress) -> u256;
    fn approve(ref self: TContractState, spender: ContractAddress, amount: u256);
}
