use starknet::ContractAddress;
use governance::types::OptionType;

#[starknet::interface]
trait IGovernance<TContractState> {
    fn claim(ref self: TContractState, claimee: ContractAddress, amount: u128, proof: Array::<felt252>);
}

#[starknet::interface]
trait Itreasury<TContractState> {
    fn send_tokens_to_address(ref self: TContractState, receiver: ContractAddress, amount: u256, tokenAddr: ContractAddress) -> bool;
    fn update_governance_contract(ref self: TContractState, newGovernanceContract: ContractAddress);
    fn update_AMM_contract(ref self: TContractState, newAMMContract: ContractAddress);
    fn provide_liquidity_to_carm_AMM(ref self: TContractState, pooled_token_addr: ContractAddress, quote_token_address: ContractAddress, base_token_address: ContractAddress, option_type: OptionType, amount: u256);
    fn withdraw_liquidity(ref self: TContractState, pooled_token_addr: ContractAddress, quote_token_address: ContractAddress, base_token_address: ContractAddress, option_type: OptionType, lp_token_amount: u256);
    fn claim_airdrop_tokens(ref self: TContractState, claimee: ContractAddress, amount: u128, proof: Array::<felt252>);
    fn get_governance_address(self: @TContractState) -> ContractAddress;
    fn get_amm_address(self: @TContractState) -> ContractAddress;
}

#[starknet::contract]
mod Treasury {
    use core::starknet::event::EventEmitter;
    use super::{OptionType, IGovernanceDispatcher, IGovernanceDispatcherTrait};
    use core::num::traits::zero::Zero;
    use openzeppelin::access::ownable::OwnableComponent;
    use starknet::{ContractAddress, get_caller_address, get_contract_address};
    use governance::traits::{IERC20Dispatcher, IERC20DispatcherTrait, IAMMDispatcher, IAMMDispatcherTrait};
    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);

   #[abi(embed_v0)]
    impl OwnableImpl = OwnableComponent::OwnableImpl<ContractState>;

    #[abi(embed_v0)]
    impl OwnableCamelOnlyImpl =
        OwnableComponent::OwnableCamelOnlyImpl<ContractState>;
    impl InternalImpl = OwnableComponent::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        governance_contract_address: ContractAddress,
        amm_address: ContractAddress,
        #[substorage(v0)]
        ownable: OwnableComponent::Storage
    }
    #[derive(starknet::Event, Drop)]
    struct TokenSent {
        receiver: ContractAddress,
        tokenAddr: ContractAddress,
        amount: u256
    }

    #[derive(starknet::Event, Drop)]
    struct GovernanceContractUpdated {
        previousContract: ContractAddress,
        newGovernanceContract: ContractAddress
    }

    #[derive(starknet::Event, Drop)]
    struct AMMContractUpdated {
        previousContract: ContractAddress,
        newAMMContract: ContractAddress    
    }

    #[derive(starknet::Event, Drop)]
    struct LiquidityProvided { 
        quote_token_address: ContractAddress, 
        base_token_address: ContractAddress, 
        option_type: OptionType, 
        amount: u256
    }

    #[derive(starknet::Event, Drop)]
    struct LiquidityWithdrawn { 
        quote_token_address: ContractAddress, 
        base_token_address: ContractAddress, 
        option_type: OptionType, 
        lp_token_amount: u256
    } 

    #[derive(starknet::Event, Drop)]
    struct airdropClaimed {
        claimee: ContractAddress,
        amount: u128
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        TokenSent: TokenSent,
        GovernanceContractUpdated: GovernanceContractUpdated,
        AMMContractUpdated: AMMContractUpdated,
        LiquidityProvided: LiquidityProvided,
        LiquidityWithdrawn: LiquidityWithdrawn,
        airdropClaimed: airdropClaimed,

        #[flat]
        OwnableEvent: OwnableComponent::Event
    }

    mod Errors {
        const InsufficientFunds: felt252 = 'Insufficient token ballance';
        const InsufficientQuoteToken: felt252 = 'Insufficient Quote ballance';
        const InsufficientBaseToken: felt252 = 'Insufficient Base ballance';
        const InsufficientLPToken: felt252 = 'Insufficient LP token ballance';
        const AddressZeroGovernance: felt252 = 'Governance addr is zero address';
        const AddressZeroAMM: felt252 = 'AMM addr is zero address';
        const AddressAlreadyChanged: felt252 = 'New Address same as Previous';
    }

    #[constructor]
    fn constructor(ref self: ContractState, gov_contract_address: ContractAddress, AMM_contract_address: ContractAddress) {
        assert(gov_contract_address != zeroable::Zeroable::zero(), Errors::AddressZeroGovernance);
        assert(AMM_contract_address != zeroable::Zeroable::zero(), Errors::AddressZeroAMM);
        self.governance_contract_address.write(gov_contract_address);
        self.amm_address.write(AMM_contract_address);
        self.ownable.initializer(gov_contract_address);
    }

    #[abi(embed_v0)]
    impl Treasury of super::Itreasury<ContractState> {
        fn send_tokens_to_address(ref self: ContractState, receiver: ContractAddress, amount: u256, tokenAddr: ContractAddress) -> bool {
            self.ownable.assert_only_owner();
            let token: IERC20Dispatcher = IERC20Dispatcher{contract_address: tokenAddr};
            assert(token.balanceOf(get_contract_address()) >= amount, Errors::InsufficientFunds);
            let status: bool = token.transfer(receiver, amount);
            self.emit(TokenSent{receiver, tokenAddr, amount});
            return status;
        }

        fn update_governance_contract(ref self: ContractState, newGovernanceContract: ContractAddress) {
            self.ownable.assert_only_owner();
            assert(newGovernanceContract != zeroable::Zeroable::zero(), Errors::AddressZeroGovernance);
            assert(newGovernanceContract != self.governance_contract_address.read(), Errors::AddressAlreadyChanged);
            let previousContract: ContractAddress = self.governance_contract_address.read();
            self.governance_contract_address.write(newGovernanceContract);
            self.emit(GovernanceContractUpdated{previousContract,  newGovernanceContract})
        }

        fn update_AMM_contract(ref self: ContractState, newAMMContract: ContractAddress) {
            self.ownable.assert_only_owner();
            assert(newAMMContract != zeroable::Zeroable::zero(), Errors::AddressZeroAMM);
            assert(newAMMContract != self.amm_address.read(), Errors::AddressAlreadyChanged);
            let previousContract: ContractAddress = self.amm_address.read();
            self.amm_address.write(newAMMContract);
            self.emit(AMMContractUpdated{previousContract,  newAMMContract})
        }

        fn provide_liquidity_to_carm_AMM(ref self: ContractState, pooled_token_addr: ContractAddress, quote_token_address: ContractAddress, base_token_address: ContractAddress, option_type: OptionType, amount: u256) {
            self.ownable.assert_only_owner();
            let carm_AMM: IAMMDispatcher = IAMMDispatcher{contract_address: self.amm_address.read()};

            let _quote_token: IERC20Dispatcher = IERC20Dispatcher{contract_address: quote_token_address};
            // assert(quote_token.balanceOf(get_contract_address()) >= amount, Errors::InsufficientQuoteToken);
            let _base_token: IERC20Dispatcher = IERC20Dispatcher{contract_address: quote_token_address};
            // assert(base_token.balanceOf(get_contract_address()) >= amount, Errors::InsufficientBaseToken);

            carm_AMM.deposit_liquidity(pooled_token_addr, quote_token_address, base_token_address, option_type, amount);
            self.emit(LiquidityProvided{quote_token_address, base_token_address, option_type, amount});
        }

        fn withdraw_liquidity(ref self: ContractState, pooled_token_addr: ContractAddress, quote_token_address: ContractAddress, base_token_address: ContractAddress, option_type: OptionType, lp_token_amount: u256) {
            self.ownable.assert_only_owner();
            let carm_AMM: IAMMDispatcher = IAMMDispatcher{contract_address: self.amm_address.read()};

            let lp_tokenAddr = carm_AMM.get_lptoken_address_for_given_option(quote_token_address, base_token_address, option_type);
            let lp_token: IERC20Dispatcher = IERC20Dispatcher{contract_address: lp_tokenAddr};
            assert(lp_token.balanceOf(get_contract_address()) >= lp_token_amount, Errors::InsufficientLPToken);

            carm_AMM.withdraw_liquidity(pooled_token_addr, quote_token_address, base_token_address, option_type, lp_token_amount);
            self.emit(LiquidityWithdrawn{quote_token_address, base_token_address, option_type, lp_token_amount});
        }

        // Note the claim airdrop function is a prototype implementation, clearity is needed for the actual intended purpose of this function.
        fn claim_airdrop_tokens(ref self: ContractState, claimee: ContractAddress, amount: u128, proof: Array::<felt252>) {
            self.ownable.assert_only_owner();
            let Governance: IGovernanceDispatcher = IGovernanceDispatcher{contract_address: self.governance_contract_address.read()};
            Governance.claim(claimee, amount, proof);
            self.emit(airdropClaimed{claimee, amount});
        }

        fn get_governance_address(self: @ContractState) -> ContractAddress {
            self.governance_contract_address.read()
        }

        fn get_amm_address(self: @ContractState) -> ContractAddress {
            self.amm_address.read()
        }
    }
}