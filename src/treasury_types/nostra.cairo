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

#[derive(Copy, Drop, Serde)]
enum NostraPair {
    STRK_ETH,
    STRK_USDC,
    USDC_USDT,
    ETH_USDC,
    ETH_USDT,
    WBTC_ETH,
}

#[starknet::interface]
trait INostraPair<TContractState> {
    fn token_0(self: @TContractState) -> ContractAddress;
    fn token_1(self: @TContractState) -> ContractAddress;
    fn balance_of(self: @TContractState, account: ContractAddress) -> u256;
    fn approve(ref self: TContractState, spender: ContractAddress, amount: u256);
}
