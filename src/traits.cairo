use starknet::{ClassHash, ContractAddress};
use core::starknet::SyscallResultTrait;


#[starknet::interface]
trait IProvidesAddresses<TContractState> {
    fn get_governance_token_address(self: @TContractState) -> ContractAddress;
    fn get_amm_address(self: @TContractState) -> ContractAddress;
}

// To be called from within any component to access the parent contract.
// Not nice, but it works.
// Incurs nonnegligible gas cost.
// Could be replaced by directly fetching the address from storage?
use starknet::get_contract_address;
fn get_governance_token_address_self() -> ContractAddress {
    let dsp = IProvidesAddressesDispatcher { contract_address: get_contract_address() };
    dsp.get_governance_token_address()
}

fn get_amm_address_self() -> ContractAddress {
    let dsp = IProvidesAddressesDispatcher { contract_address: get_contract_address() };
    dsp.get_amm_address()
}

#[starknet::interface]
trait IERC20<TContractState> {
    fn name(self: @TContractState) -> ByteArray;
    fn symbol(self: @TContractState) -> ByteArray;
    fn decimals(self: @TContractState) -> u8;
    fn totalSupply(self: @TContractState) -> u256;
    fn total_supply(self: @TContractState) -> u256;
    fn balanceOf(self: @TContractState, account: ContractAddress) -> u256;
    fn balance_of(self: @TContractState, account: ContractAddress) -> u256;
    fn allowance(self: @TContractState, owner: ContractAddress, spender: ContractAddress) -> u256;
    fn transfer(ref self: TContractState, recipient: ContractAddress, amount: u256) -> bool;
    fn transferFrom(
        ref self: TContractState, sender: ContractAddress, recipient: ContractAddress, amount: u256
    ) -> bool;
    fn transfer_from(
        ref self: TContractState, sender: ContractAddress, recipient: ContractAddress, amount: u256
    ) -> bool;
    fn approve(ref self: TContractState, spender: ContractAddress, amount: u256) -> bool;
    fn mint(ref self: TContractState, recipient: ContractAddress, amount: u256);
    fn burn(ref self: TContractState, recipient: ContractAddress, amount: u256);
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
