// This is the locked Cairo token.

#[starknet::contract]
mod VotingToken {
    use openzeppelin::token::erc20::interface::IERC20;
    use openzeppelin::token::erc20::ERC20Component;
    use starknet::ContractAddress;

    component!(path: ERC20Component, storage: erc20, event: ERC20Event);

    impl ERC20Impl = ERC20Component::ERC20Impl<ContractState>;
    #[abi(embed_v0)]
    impl ERC20MetadataImpl = ERC20Component::ERC20MetadataImpl<ContractState>;

    impl InternalImpl = ERC20Component::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        #[substorage(v0)]
        erc20: ERC20Component::Storage
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ERC20Event: ERC20Component::Event
    }

    #[constructor]
    fn constructor(ref self: ContractState, fixed_supply: u256, recipient: ContractAddress) {
        let name = "Konoha Sepolia Deployment Test Token";
        let symbol = "KONOHA";

        self.erc20.initializer(name, symbol);
        self.erc20._mint(recipient, fixed_supply);
    }

    #[abi(embed_v0)]
    impl VotingToken of IERC20<ContractState> {
        fn total_supply(self: @ContractState) -> u256 {
            self.erc20.total_supply()
        }

        fn balance_of(self: @ContractState, account: ContractAddress) -> u256 {
            self.erc20.balance_of(account)
        }

        fn allowance(
            self: @ContractState, owner: ContractAddress, spender: ContractAddress
        ) -> u256 {
            self.erc20.allowance(owner, spender)
        }

        fn transfer(ref self: ContractState, recipient: ContractAddress, amount: u256) -> bool {
            assert(false, 'token locked, unwrap first');
            false
        }

        fn transfer_from(
            ref self: ContractState,
            sender: ContractAddress,
            recipient: ContractAddress,
            amount: u256
        ) -> bool {
            assert(false, 'token locked, unwrap first');
            false
        }

        fn approve(ref self: ContractState, spender: ContractAddress, amount: u256) -> bool {
            self.erc20.approve(spender, amount)
        }
    }
}
