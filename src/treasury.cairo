use konoha::treasury_types::carmine::OptionType;
use starknet::ContractAddress;

#[starknet::interface]
trait ITreasury<TContractState> {
    fn send_tokens_to_address(
        ref self: TContractState,
        receiver: ContractAddress,
        amount: u256,
        token_addr: ContractAddress
    ) -> bool;
    fn update_AMM_address(ref self: TContractState, new_amm_address: ContractAddress);
    fn provide_liquidity_to_carm_AMM(
        ref self: TContractState,
        pooled_token_addr: ContractAddress,
        quote_token_address: ContractAddress,
        base_token_address: ContractAddress,
        option_type: OptionType,
        amount: u256
    );
    fn withdraw_liquidity(
        ref self: TContractState,
        pooled_token_addr: ContractAddress,
        quote_token_address: ContractAddress,
        base_token_address: ContractAddress,
        option_type: OptionType,
        lp_token_amount: u256
    );
    fn get_amm_address(self: @TContractState) -> ContractAddress;
    fn deposit_to_zklend(ref self: TContractState, token: ContractAddress, amount: u256);
    fn withdraw_from_zklend(ref self: TContractState, token: ContractAddress, amount: u256);
    fn deposit_to_nostra_lending_pool(
        ref self: TContractState, token: ContractAddress, amount: u256
    );
    fn withdraw_from_nostra_lending_pool(
        ref self: TContractState, token: ContractAddress, amount: u256
    );
}

#[starknet::contract]
mod Treasury {
    use core::num::traits::zero::Zero;
    use core::starknet::event::EventEmitter;
    use core::traits::TryInto;
    use konoha::airdrop::{IAirdropDispatcher, IAirdropDispatcherTrait};
    use konoha::traits::{IERC20Dispatcher, IERC20DispatcherTrait};
    use konoha::treasury_types::carmine::{IAMMDispatcher, IAMMDispatcherTrait};
    use konoha::treasury_types::nostra::interface::{
        INostraAssetToken, INostraAssetTokenDispatcher, INostraAssetTokenDispatcherTrait
    };
    use konoha::treasury_types::zklend::interfaces::{
        IMarket, IMarketDispatcher, IMarketDispatcherTrait
    };
    use openzeppelin::access::ownable::OwnableComponent;
    use openzeppelin::access::ownable::interface::IOwnableTwoStep;
    use openzeppelin::upgrades::interface::IUpgradeable;
    use openzeppelin::upgrades::upgradeable::UpgradeableComponent;
    use starknet::{ContractAddress, get_caller_address, get_contract_address, ClassHash};
    use super::{OptionType};
    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);
    component!(path: UpgradeableComponent, storage: upgradeable, event: UpgradeableEvent);


    #[abi(embed_v0)]
    impl OwnableTwoStepImpl = OwnableComponent::OwnableTwoStepImpl<ContractState>;
    impl InternalImpl = OwnableComponent::InternalImpl<ContractState>;
    impl UpgradeableInternalImpl = UpgradeableComponent::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        amm_address: ContractAddress,
        zklend_market_contract_address: ContractAddress,
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
        #[substorage(v0)]
        upgradeable: UpgradeableComponent::Storage
    }
    #[derive(starknet::Event, Drop)]
    struct TokenSent {
        receiver: ContractAddress,
        token_addr: ContractAddress,
        amount: u256
    }

    #[derive(starknet::Event, Drop)]
    struct AMMAddressUpdated {
        previous_address: ContractAddress,
        new_amm_address: ContractAddress
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
    struct LiquidityProvidedToZklend {
        token_address: ContractAddress,
        amount: u256
    }

    #[derive(starknet::Event, Drop)]
    struct LiquidityWithdrawnFromZklend {
        token_address: ContractAddress,
        amount: u256
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        TokenSent: TokenSent,
        AMMAddressUpdated: AMMAddressUpdated,
        LiquidityProvided: LiquidityProvided,
        LiquidityWithdrawn: LiquidityWithdrawn,
        LiquidityProvidedToZklend: LiquidityProvidedToZklend,
        LiquidityWithdrawnFromZklend: LiquidityWithdrawnFromZklend,
        #[flat]
        OwnableEvent: OwnableComponent::Event,
        #[flat]
        UpgradeableEvent: UpgradeableComponent::Event
    }

    mod Errors {
        const INSUFFICIENT_FUNDS: felt252 = 'Insufficient token balance';
        const INSUFFICIENT_POOLED_TOKEN: felt252 = 'Insufficient Pooled balance';
        const INSUFFICIENT_LP_TOKENS: felt252 = 'Insufficient LP token balance';
        const INSUFFICIENT_NOSTRA_LENDING_P_TOKENS: felt252 = 'Insufficient nostr LP token bal';
        const ADDRESS_ZERO_GOVERNANCE: felt252 = 'Governance addr is zero address';
        const ADDRESS_ZERO_AMM: felt252 = 'AMM addr is zero address';
        const ADDRESS_ZERO_ZKLEND_MARKET: felt252 = 'zklnd markt addr is zero addrr';
        const ADDRESS_ALREADY_CHANGED: felt252 = 'New Address same as Previous';
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        gov_contract_address: ContractAddress,
        AMM_contract_address: ContractAddress,
        zklend_market_contract_address: ContractAddress
    ) {
        assert(gov_contract_address != zeroable::Zeroable::zero(), Errors::ADDRESS_ZERO_GOVERNANCE);
        assert(AMM_contract_address != zeroable::Zeroable::zero(), Errors::ADDRESS_ZERO_AMM);
        assert(
            zklend_market_contract_address != zeroable::Zeroable::zero(),
            Errors::ADDRESS_ZERO_ZKLEND_MARKET
        );
        self.amm_address.write(AMM_contract_address);
        self.zklend_market_contract_address.write(zklend_market_contract_address);
        self.ownable.initializer(gov_contract_address);
    }

    #[abi(embed_v0)]
    impl Treasury of super::ITreasury<ContractState> {
        fn send_tokens_to_address(
            ref self: ContractState,
            receiver: ContractAddress,
            amount: u256,
            token_addr: ContractAddress
        ) -> bool {
            self.ownable.assert_only_owner();
            let token: IERC20Dispatcher = IERC20Dispatcher { contract_address: token_addr };
            assert(token.balanceOf(get_contract_address()) >= amount, Errors::INSUFFICIENT_FUNDS);
            let status: bool = token.transfer(receiver, amount);
            self.emit(TokenSent { receiver, token_addr, amount });
            return status;
        }

        fn update_AMM_address(ref self: ContractState, new_amm_address: ContractAddress) {
            self.ownable.assert_only_owner();
            assert(new_amm_address != zeroable::Zeroable::zero(), Errors::ADDRESS_ZERO_AMM);
            assert(new_amm_address != self.amm_address.read(), Errors::ADDRESS_ALREADY_CHANGED);
            let previous_address: ContractAddress = self.amm_address.read();
            self.amm_address.write(new_amm_address);
            self.emit(AMMAddressUpdated { previous_address, new_amm_address })
        }

        fn provide_liquidity_to_carm_AMM(
            ref self: ContractState,
            pooled_token_addr: ContractAddress,
            quote_token_address: ContractAddress,
            base_token_address: ContractAddress,
            option_type: OptionType,
            amount: u256
        ) {
            self.ownable.assert_only_owner();
            let carm_AMM: IAMMDispatcher = IAMMDispatcher {
                contract_address: self.amm_address.read()
            };

            let pooled_token: IERC20Dispatcher = IERC20Dispatcher {
                contract_address: pooled_token_addr
            };

            assert(
                pooled_token.balanceOf(get_contract_address()) >= amount,
                Errors::INSUFFICIENT_POOLED_TOKEN
            );
            pooled_token.approve(self.amm_address.read(), amount);

            carm_AMM
                .deposit_liquidity(
                    pooled_token_addr, quote_token_address, base_token_address, option_type, amount
                );
            self
                .emit(
                    LiquidityProvided {
                        quote_token_address, base_token_address, option_type, amount
                    }
                );
        }

        fn withdraw_liquidity(
            ref self: ContractState,
            pooled_token_addr: ContractAddress,
            quote_token_address: ContractAddress,
            base_token_address: ContractAddress,
            option_type: OptionType,
            lp_token_amount: u256
        ) {
            self.ownable.assert_only_owner();
            let carm_AMM: IAMMDispatcher = IAMMDispatcher {
                contract_address: self.amm_address.read()
            };

            let lp_token_addr = carm_AMM
                .get_lptoken_address_for_given_option(
                    quote_token_address, base_token_address, option_type
                );
            let lp_token: IERC20Dispatcher = IERC20Dispatcher { contract_address: lp_token_addr };
            assert(
                lp_token.balanceOf(get_contract_address()) >= lp_token_amount,
                Errors::INSUFFICIENT_LP_TOKENS
            );

            carm_AMM
                .withdraw_liquidity(
                    pooled_token_addr,
                    quote_token_address,
                    base_token_address,
                    option_type,
                    lp_token_amount
                );
            self
                .emit(
                    LiquidityWithdrawn {
                        quote_token_address, base_token_address, option_type, lp_token_amount
                    }
                );
        }

        fn get_amm_address(self: @ContractState) -> ContractAddress {
            self.amm_address.read()
        }

        // Deposit token to ZKLend Market
        fn deposit_to_zklend(ref self: ContractState, token: ContractAddress, amount: u256) {
            self.ownable.assert_only_owner();
            let pooled_token: IERC20Dispatcher = IERC20Dispatcher { contract_address: token };
            let zklend_market: IMarketDispatcher = IMarketDispatcher {
                contract_address: self.zklend_market_contract_address.read()
            };

            assert(
                pooled_token.balanceOf(get_contract_address()) >= amount,
                Errors::INSUFFICIENT_POOLED_TOKEN
            );

            pooled_token.approve(self.zklend_market_contract_address.read(), amount);

            zklend_market.deposit(token, amount.try_into().unwrap());

            zklend_market.enable_collateral(token);

            self.emit(LiquidityProvidedToZklend { token_address: token, amount });
        }

        // Withdraw token from ZKLend Market
        fn withdraw_from_zklend(ref self: ContractState, token: ContractAddress, amount: u256) {
            self.ownable.assert_only_owner();
            let zklend_market: IMarketDispatcher = IMarketDispatcher {
                contract_address: self.zklend_market_contract_address.read()
            };

            zklend_market.withdraw(token, amount.try_into().unwrap());

            self.emit(LiquidityWithdrawnFromZklend { token_address: token, amount });
        }

        //Deposit token to Nostra lending pool
        fn deposit_to_nostra_lending_pool(
            ref self: ContractState, token: ContractAddress, amount: u256
        ) {
            self.ownable.assert_only_owner();
            let pooled_token: INostraAssetTokenDispatcher = INostraAssetTokenDispatcher {
                contract_address: token
            };

            assert(
                pooled_token.balanceOf(get_contract_address()) >= amount,
                Errors::INSUFFICIENT_POOLED_TOKEN
            );

            pooled_token.deposit(token, amount.try_into().unwrap());
        }

        // Withdraw token from Nostra lending pool
        fn withdraw_from_nostra_lending_pool(
            ref self: ContractState, token: ContractAddress, amount: u256
        ) {
            self.ownable.assert_only_owner();
            let pooled_token: INostraAssetTokenDispatcher = INostraAssetTokenDispatcher {
                contract_address: token
            };

            assert(
                pooled_token.balanceOf(get_contract_address()) >= amount,
                Errors::INSUFFICIENT_NOSTRA_LENDING_P_TOKENS
            );

            pooled_token.withdraw(token, get_contract_address(), amount.try_into().unwrap());
        }
    }


    #[abi(embed_v0)]
    impl UpgradeableImpl of IUpgradeable<ContractState> {
        fn upgrade(ref self: ContractState, new_class_hash: ClassHash) {
            self.ownable.assert_only_owner();
            self.upgradeable._upgrade(new_class_hash);
        }
    }
}
