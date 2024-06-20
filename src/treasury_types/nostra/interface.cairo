use starknet::ContractAddress;

#[starknet::interface]
trait INostraAssetToken<TContractState> {
    fn balanceOf(self: @TContractState, account: ContractAddress) -> u256;
    fn deposit(ref self: TContractState, to: ContractAddress, amount: u256);
    fn withdraw(
        ref self: TContractState, from: ContractAddress, to: ContractAddress, amount: u256
    ) -> u256;
}

