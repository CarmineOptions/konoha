use konoha::treasury_types::carmine::OptionType;
use starknet::ContractAddress;

const GUARDIAN_ROLE: felt252 = selector!("GUARDIAN_ROLE");

#[starknet::interface]
trait ITreasury<TContractState> {
    fn add_transfer(
        ref self: TContractState,
        receiver: ContractAddress,
        amount: u256,
        token_addr: ContractAddress
    );

    fn cancel_transaction(ref self: TContractState, transfer_id: u64);

    fn execute_current_pending(ref self: TContractState) -> bool;

    fn add_pending_guardian(ref self: TContractState, guardian_address: ContractAddress);

    fn approve_guardian(ref self: TContractState, guardian_address: ContractAddress);

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
        ref self: TContractState, token: ContractAddress, nostraToken: ContractAddress, amount: u256
    );
    fn withdraw_from_nostra_lending_pool(
        ref self: TContractState, nostraToken: ContractAddress, amount: u256
    );
}

#[starknet::contract]
mod Treasury {
    use openzeppelin::access::accesscontrol::interface::IAccessControl;
    use core::option::OptionTrait;
    use core::num::traits::zero::Zero;
    use core::starknet::event::EventEmitter;
    use core::traits::TryInto;
    use konoha::airdrop::{IAirdropDispatcher, IAirdropDispatcherTrait};
    use konoha::traits::{IERC20Dispatcher, IERC20DispatcherTrait};
    use konoha::treasury_types::carmine::{IAMMDispatcher, IAMMDispatcherTrait};
    use konoha::treasury_types::nostra::interface::{
        INostraInterestToken, INostraInterestTokenDispatcher, INostraInterestTokenDispatcherTrait
    };
    use konoha::treasury_types::zklend::interfaces::{
        IMarket, IMarketDispatcher, IMarketDispatcherTrait
    };
    use openzeppelin::access::ownable::OwnableComponent;
    use openzeppelin::access::ownable::interface::IOwnableTwoStep;
    use openzeppelin::upgrades::interface::IUpgradeable;
    use openzeppelin::upgrades::upgradeable::UpgradeableComponent;
    use openzeppelin::access::accesscontrol::{AccessControlComponent, DEFAULT_ADMIN_ROLE};
    use openzeppelin::introspection::src5::SRC5Component;
    use openzeppelin::token::erc20::ERC20Component;
    use starknet::{ContractAddress, get_caller_address, get_contract_address, get_block_timestamp, ClassHash};

    use super::{OptionType, GUARDIAN_ROLE};

    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);
    
    component!(path: AccessControlComponent, storage: accesscontrol, event: AccessControlEvent);
    component!(path: SRC5Component, storage: src5, event: SRC5Event);
    
    component!(path: UpgradeableComponent, storage: upgradeable, event: UpgradeableEvent);
    
    // Ownable
    #[abi(embed_v0)]
    impl OwnableTwoStepImpl = OwnableComponent::OwnableTwoStepImpl<ContractState>;
    impl OwnableInternalImpl = OwnableComponent::InternalImpl<ContractState>;

    // Upgradeable
    impl UpgradeableInternalImpl = UpgradeableComponent::InternalImpl<ContractState>;

    // AccessControl
    #[abi(embed_v0)]
    impl AccessControlImpl = AccessControlComponent::AccessControlImpl<ContractState>;
    impl AccessControlInternalImpl = AccessControlComponent::InternalImpl<ContractState>;

    // SRC5
    #[abi(embed_v0)]
    impl SRC5Impl = SRC5Component::SRC5Impl<ContractState>;

    #[storage]
    struct Storage {
        amm_address: ContractAddress,
        zklend_market_contract_address: ContractAddress,
        transfers_on_cooldown: LegacyMap<u64, Transfer>,
        current_transfer_pointer: u64,
        last_transfer_id: u64,
        guardians: LegacyMap<u32, Guardian>,
        last_guardian_id: u32,

        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
        #[substorage(v0)]
        accesscontrol: AccessControlComponent::Storage,
        #[substorage(v0)]
        src5: SRC5Component::Storage,
        #[substorage(v0)]
        upgradeable: UpgradeableComponent::Storage
    }

    #[derive(Drop, Serde, starknet::Store)]
    struct Transfer {
        token_addr: ContractAddress,
        receiver: ContractAddress,
        amount: u256,
        cooldown_end: u64,
        is_finished: bool,
        is_cancelled: bool
    }

    #[derive(Drop, Serde, starknet::Store)]
    struct Guardian {
        address: ContractAddress,
        is_active: bool
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

    #[derive(starknet::Event, Drop)]
    struct LiquidityProvidedToNostraLendingPool {
        nostra_token: ContractAddress,
        amount: u256
    }

    #[derive(starknet::Event, Drop)]
    struct LiquidityWithdrawnFromNostraLendingPool {
        nostra_token: ContractAddress,
        amount: u256
    }


    #[derive(starknet::Event, Drop)]
    struct TransferCancelled {
        receiver: ContractAddress,
        token_addr: ContractAddress,
        initial_amount: u256
    }

    #[derive(starknet::Event, Drop)]
    struct TransferPending {
        receiver: ContractAddress,
        token_addr: ContractAddress,
        amount: u256
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        TokenSent: TokenSent,
        TransferCancelled: TransferCancelled,
        TransferPending: TransferPending,
        AMMAddressUpdated: AMMAddressUpdated,
        LiquidityProvided: LiquidityProvided,
        LiquidityWithdrawn: LiquidityWithdrawn,
        LiquidityProvidedToZklend: LiquidityProvidedToZklend,
        LiquidityWithdrawnFromZklend: LiquidityWithdrawnFromZklend,
        LiquidityProvidedToNostraLendingPool: LiquidityProvidedToNostraLendingPool,
        LiquidityWithdrawnFromNostraLendingPool: LiquidityWithdrawnFromNostraLendingPool,
        #[flat]
        OwnableEvent: OwnableComponent::Event,
        #[flat]
        AccessControlEvent: AccessControlComponent::Event,
        #[flat]
        SRC5Event: SRC5Component::Event,
        #[flat]
        UpgradeableEvent: UpgradeableComponent::Event
    }

    mod Errors {
        const INSUFFICIENT_FUNDS: felt252 = 'Insufficient token balance';
        const INSUFFICIENT_POOLED_TOKEN: felt252 = 'Insufficient Pooled balance';
        const INSUFFICIENT_LP_TOKENS: felt252 = 'Insufficient LP token balance';
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
        // first_guardian: ContractAddress // Integrate parameter for the first guardian
    ) {
        assert(gov_contract_address != zeroable::Zeroable::zero(), Errors::ADDRESS_ZERO_GOVERNANCE);
        assert(AMM_contract_address != zeroable::Zeroable::zero(), Errors::ADDRESS_ZERO_AMM);
        assert(
            zklend_market_contract_address != zeroable::Zeroable::zero(),
            Errors::ADDRESS_ZERO_ZKLEND_MARKET
        );
        self.amm_address.write(AMM_contract_address);
        self.zklend_market_contract_address.write(zklend_market_contract_address);

        self.accesscontrol.initializer();
        self.accesscontrol._grant_role(DEFAULT_ADMIN_ROLE, gov_contract_address);

        self.ownable.initializer(gov_contract_address);
    }

    #[generate_trait]
    impl InternalFunctions of InternalFunctionsTrait {
        fn get_guardian(self: @ContractState, guardian_address: ContractAddress) -> Option<(u32, Guardian)> {
            let i = 0;
            let current_id = self.last_guardian_id.read();
            loop {
                if i >= current_id {
                    break Option::None;
                }
                if self.guardians.read(i).address == guardian_address {
                    break Option::Some((i, self.guardians.read(i)));
                }
            }
        }
    }

    #[abi(embed_v0)]
    impl Treasury of super::ITreasury<ContractState> {
        // TODO: Remove
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

        // TODO: Add transfers querying methods for frontend
        
        fn add_transfer(
            ref self: ContractState,
            receiver: ContractAddress,
            amount: u256,
            token_addr: ContractAddress
        ) {
            self.ownable.assert_only_owner();
            let token: IERC20Dispatcher = IERC20Dispatcher { contract_address: token_addr };
            assert(token.balanceOf(get_contract_address()) >= amount, Errors::INSUFFICIENT_FUNDS);
            let new_transfer_id = self.last_transfer_id.read() + 1;
            self.last_transfer_id.write(new_transfer_id);
            let COOLDOWN_TIME = 3600 * 48; // TODO: Move to constants
            let transfer = Transfer {receiver, token_addr, amount, cooldown_end: get_block_timestamp() + COOLDOWN_TIME, is_finished: false, is_cancelled: false};
            self.transfers_on_cooldown.write(new_transfer_id, transfer);
            self.emit(TransferPending { receiver, token_addr, amount });
        }

        fn cancel_transaction(ref self: ContractState, transfer_id: u64) {
            // assert if guardian
            self.accesscontrol.assert_only_role(GUARDIAN_ROLE);
            let initial_transfer = self.transfers_on_cooldown.read(transfer_id);
            let cancelation_event = TransferCancelled { 
                initial_amount: initial_transfer.amount,
                token_addr: initial_transfer.token_addr,
                receiver: initial_transfer.receiver 
            };
            self.transfers_on_cooldown.write(transfer_id, Transfer {amount: 0, is_cancelled: true, ..initial_transfer});
            self.emit(cancelation_event);
        }

        fn execute_current_pending(ref self: ContractState) -> bool {
            let current_id = self.current_transfer_pointer.read();
            let transfer_pending = self.transfers_on_cooldown.read(current_id);
            self.current_transfer_pointer.write(current_id + 1);
            if transfer_pending.is_cancelled {
                return false;
            }
            let token: IERC20Dispatcher = IERC20Dispatcher { contract_address: transfer_pending.token_addr };
            let status: bool = token.transfer(transfer_pending.receiver, transfer_pending.amount);
            let sent_event = TokenSent {
                amount: transfer_pending.amount,
                token_addr: transfer_pending.token_addr,
                receiver: transfer_pending.receiver 
            };
            
            self.transfers_on_cooldown.write(current_id, Transfer { is_finished: true, ..transfer_pending });
            self.emit(sent_event);
            return status;
        }

        // TODO: Add events
        fn add_pending_guardian(ref self: ContractState, guardian_address: ContractAddress) {
            self.ownable.assert_only_owner();
            let current_id = self.last_guardian_id.read();

            assert(self.get_guardian(guardian_address).is_some(), 'guardian exists');
            
            let new_guardian = Guardian { address: guardian_address, is_active: false };
            self.guardians.write(current_id + 1, new_guardian);
            self.last_guardian_id.write(current_id + 1);
        }

        fn approve_guardian(ref self: ContractState, guardian_address: ContractAddress) {
            self.accesscontrol.assert_only_role(GUARDIAN_ROLE);
            let (id, mut guardian) = self.get_guardian(guardian_address).expect('guardian not exists');
            guardian.is_active = true;

            // TODO: Grant guardians the admin role
            // self.accesscontrol.grant_role();

            self.guardians.write(id, guardian);
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

        fn deposit_to_nostra_lending_pool(
            ref self: ContractState,
            token: ContractAddress,
            nostraToken: ContractAddress,
            amount: u256
        ) {
            self.ownable.assert_only_owner();
            let pooled_token: IERC20Dispatcher = IERC20Dispatcher { contract_address: token };
            let nostra_market: INostraInterestTokenDispatcher = INostraInterestTokenDispatcher {
                contract_address: nostraToken
            };

            assert(
                pooled_token.balanceOf(get_contract_address()) >= amount,
                Errors::INSUFFICIENT_POOLED_TOKEN
            );

            pooled_token.approve(nostraToken, amount);

            nostra_market.mint(get_contract_address(), amount);

            self.emit(LiquidityProvidedToNostraLendingPool { nostra_token: nostraToken, amount });
        }

        fn withdraw_from_nostra_lending_pool(
            ref self: ContractState, nostraToken: ContractAddress, amount: u256
        ) {
            self.ownable.assert_only_owner();
            let nostra_market: INostraInterestTokenDispatcher = INostraInterestTokenDispatcher {
                contract_address: nostraToken
            };

            nostra_market.burn(get_contract_address(), get_contract_address(), amount);

            self
                .emit(
                    LiquidityWithdrawnFromNostraLendingPool { nostra_token: nostraToken, amount }
                );
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
