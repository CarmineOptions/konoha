use konoha::treasury_types::carmine::OptionType;
use konoha::types::{Transfer};
use starknet::ContractAddress;

#[starknet::interface]
trait ITreasury<TContractState> {
    fn add_transfer(
        ref self: TContractState,
        receiver: ContractAddress,
        amount: u256,
        token_addr: ContractAddress
    ) -> Transfer;

    fn get_next_pending(self: @TContractState) -> Option<Transfer>;

    fn get_unprocessed_transfers(self: @TContractState) -> Span<Transfer>;

    fn get_finished_transfers(self: @TContractState) -> Span<Transfer>;

    fn get_live_transfers(self: @TContractState) -> Span<Transfer>;

    fn get_cancelled_transfers(self: @TContractState) -> Span<Transfer>;

    fn get_transfer_by_id(self: @TContractState, transfer_id: u64) -> Transfer;

    fn cancel_transfer(ref self: TContractState, transfer_id: u64);

    fn execute_pending_by_id(ref self: TContractState, transfer_id: u64) -> bool;

    fn add_guardian(ref self: TContractState, address: ContractAddress);

    fn remove_guardian(ref self: TContractState, address: ContractAddress);

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
    use core::array::ArrayTrait;
    use core::num::traits::zero::Zero;
    use core::option::OptionTrait;
    use core::starknet::event::EventEmitter;
    use core::traits::TryInto;
    use konoha::airdrop::{IAirdropDispatcher, IAirdropDispatcherTrait};
    use konoha::constants::TREASURY_COOLDOWN_TIME;
    use konoha::traits::{IERC20Dispatcher, IERC20DispatcherTrait};
    use konoha::treasury::ITreasury;
    use konoha::treasury_types::carmine::{IAMMDispatcher, IAMMDispatcherTrait};
    use konoha::treasury_types::nostra::interface::{
        INostraInterestToken, INostraInterestTokenDispatcher, INostraInterestTokenDispatcherTrait
    };
    use konoha::treasury_types::zklend::interfaces::{
        IMarket, IMarketDispatcher, IMarketDispatcherTrait
    };
    use konoha::types::{Transfer, TransferStatus};
    use openzeppelin::access::accesscontrol::interface::IAccessControl;
    use openzeppelin::access::accesscontrol::{AccessControlComponent, DEFAULT_ADMIN_ROLE};
    use openzeppelin::access::ownable::OwnableComponent;
    use openzeppelin::access::ownable::interface::IOwnableTwoStep;
    use openzeppelin::access::ownable::ownable::OwnableComponent::InternalTrait;
    use openzeppelin::introspection::src5::SRC5Component;
    use openzeppelin::token::erc20::ERC20Component;
    use openzeppelin::upgrades::interface::IUpgradeable;
    use openzeppelin::upgrades::upgradeable::UpgradeableComponent;
    use starknet::{
        ContractAddress, get_caller_address, get_contract_address, get_block_timestamp, ClassHash
    };

    use super::{OptionType};

    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);

    component!(path: UpgradeableComponent, storage: upgradeable, event: UpgradeableEvent);

    // Ownable
    #[abi(embed_v0)]
    impl OwnableTwoStepImpl = OwnableComponent::OwnableTwoStepImpl<ContractState>;
    impl OwnableInternalImpl = OwnableComponent::InternalImpl<ContractState>;

    // Upgradeable
    impl UpgradeableInternalImpl = UpgradeableComponent::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        amm_address: ContractAddress,
        zklend_market_contract_address: ContractAddress,
        transfers_on_cooldown: LegacyMap<u64, Transfer>,
        transfers_count: u64,
        guardians: LegacyMap<ContractAddress, bool>,
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

    #[derive(starknet::Event, Drop)]
    struct GuardianAdded {
        address: ContractAddress
    }

    #[derive(starknet::Event, Drop)]
    struct GuardianRemoved {
        address: ContractAddress
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        TokenSent: TokenSent,
        TransferCancelled: TransferCancelled,
        TransferPending: TransferPending,
        GuardianAdded: GuardianAdded,
        GuardianRemoved: GuardianRemoved,
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
        const NOT_GUARDIAN: felt252 = 'You are not a guardian';
        const INVALID_ID: felt252 = 'Invalid id provided';
        const TRANSFER_NOT_PENDING: felt252 = 'Transfer need to be pending';
        const COOLDOWN_NOT_PASSED: felt252 = 'Cooldown time has not passed';
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        gov_contract_address: ContractAddress,
        AMM_contract_address: ContractAddress,
        zklend_market_contract_address: ContractAddress,
        first_guardian: ContractAddress
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

        if first_guardian != zeroable::Zeroable::zero() {
            self.guardians.write(first_guardian, true)
        };
    }

    #[generate_trait]
    impl InternalFunctions of InternalFunctionsTrait {
        fn get_transfers_by_status(
            self: @ContractState, status: TransferStatus, start_id: u64, break_id: u64
        ) -> Span<Transfer> {
            assert(
                break_id >= start_id && break_id <= self.transfers_count.read(), 'Invalid range'
            );
            let mut transfers = ArrayTrait::<Transfer>::new();
            let mut i: u64 = start_id;
            let mut last_cooldown_end: u64 = 0;
            let current_timestamp = get_block_timestamp();

            while i < break_id
                && (status != TransferStatus::FINISHED || current_timestamp > last_cooldown_end) {
                    let current_transfer = self.transfers_on_cooldown.read(i);
                    if status == current_transfer.status {
                        transfers.append(current_transfer);
                    }
                    last_cooldown_end = current_transfer.cooldown_end;
                    i += 1;
                };
            transfers.span()
        }
    }

    #[abi(embed_v0)]
    impl Treasury of super::ITreasury<ContractState> {
        fn get_next_pending(self: @ContractState) -> Option<Transfer> {
            if self.transfers_count.read() == 0 {
                return Option::None;
            }
            let current_timestamp = get_block_timestamp();
            let transfers_count = self.transfers_count.read();
            let mut i = 0;
            let mut next_pending_transfer = Option::None;
            while i < transfers_count {
                let current_transfer = self.transfers_on_cooldown.read(i);
                if current_transfer.cooldown_end > current_timestamp
                    && current_transfer.status == TransferStatus::PENDING {
                    next_pending_transfer = Option::Some(current_transfer);
                    break;
                }
                i += 1;
            };
            next_pending_transfer
        }

        fn get_unprocessed_transfers(self: @ContractState) -> Span<Transfer> {
            match self.get_next_pending() {
                Option::None => self
                    .get_transfers_by_status(
                        TransferStatus::PENDING, 0, self.transfers_count.read()
                    ),
                Option::Some(next_pending) => self
                    .get_transfers_by_status(TransferStatus::PENDING, 0, next_pending.id)
            }
        }

        fn get_live_transfers(self: @ContractState) -> Span<Transfer> {
            match self.get_next_pending() {
                Option::Some(next_pending) => self
                    .get_transfers_by_status(
                        TransferStatus::PENDING, next_pending.id, self.transfers_count.read()
                    ),
                Option::None => ArrayTrait::<Transfer>::new().span()
            }
        }

        fn get_cancelled_transfers(self: @ContractState) -> Span<Transfer> {
            self.get_transfers_by_status(TransferStatus::CANCELLED, 0, self.transfers_count.read())
        }

        fn get_finished_transfers(self: @ContractState) -> Span<Transfer> {
            self.get_transfers_by_status(TransferStatus::FINISHED, 0, self.transfers_count.read())
        }

        fn get_transfer_by_id(self: @ContractState, transfer_id: u64) -> Transfer {
            assert(transfer_id < self.transfers_count.read(), Errors::INVALID_ID);
            self.transfers_on_cooldown.read(transfer_id)
        }

        fn add_transfer(
            ref self: ContractState,
            receiver: ContractAddress,
            amount: u256,
            token_addr: ContractAddress
        ) -> Transfer {
            self.ownable.assert_only_owner();
            let token: IERC20Dispatcher = IERC20Dispatcher { contract_address: token_addr };
            assert(token.balanceOf(get_contract_address()) >= amount, Errors::INSUFFICIENT_FUNDS);
            let transfers_count = self.transfers_count.read();
            self.transfers_count.write(transfers_count + 1);
            let transfer = Transfer {
                id: transfers_count,
                receiver,
                token_addr,
                amount,
                cooldown_end: get_block_timestamp() + TREASURY_COOLDOWN_TIME,
                status: TransferStatus::PENDING
            };
            self.transfers_on_cooldown.write(transfers_count, transfer);
            self.emit(TransferPending { receiver, token_addr, amount });
            self.transfers_on_cooldown.read(transfers_count)
        }

        fn cancel_transfer(ref self: ContractState, transfer_id: u64) {
            assert(self.guardians.read(get_caller_address()), Errors::NOT_GUARDIAN);
            assert(transfer_id < self.transfers_count.read(), Errors::INVALID_ID);
            let initial_transfer = self.transfers_on_cooldown.read(transfer_id);
            assert(
                initial_transfer.status == TransferStatus::PENDING, Errors::TRANSFER_NOT_PENDING
            );

            let cancelation_event = TransferCancelled {
                initial_amount: initial_transfer.amount,
                token_addr: initial_transfer.token_addr,
                receiver: initial_transfer.receiver
            };
            self
                .transfers_on_cooldown
                .write(
                    transfer_id,
                    Transfer { amount: 0, status: TransferStatus::CANCELLED, ..initial_transfer }
                );
            self.emit(cancelation_event);
        }

        fn execute_pending_by_id(ref self: ContractState, transfer_id: u64) -> bool {
            assert(transfer_id < self.transfers_count.read(), Errors::INVALID_ID);
            let transfer_pending = self.transfers_on_cooldown.read(transfer_id);
            assert(
                get_block_timestamp() >= transfer_pending.cooldown_end, Errors::COOLDOWN_NOT_PASSED
            );

            if transfer_pending.status == TransferStatus::CANCELLED {
                return false;
            }

            let token: IERC20Dispatcher = IERC20Dispatcher {
                contract_address: transfer_pending.token_addr
            };
            assert(
                token.balanceOf(get_contract_address()) >= transfer_pending.amount,
                Errors::INSUFFICIENT_FUNDS
            );

            let sent_event = TokenSent {
                amount: transfer_pending.amount,
                token_addr: transfer_pending.token_addr,
                receiver: transfer_pending.receiver
            };
            self
                .transfers_on_cooldown
                .write(
                    transfer_pending.id,
                    Transfer { status: TransferStatus::FINISHED, ..transfer_pending }
                );
            self.emit(sent_event);

            token.transfer(transfer_pending.receiver, transfer_pending.amount)
        }

        fn add_guardian(ref self: ContractState, address: ContractAddress) {
            self.ownable.assert_only_owner();
            self.guardians.write(address, true);
            self.emit(GuardianAdded { address });
        }

        fn remove_guardian(ref self: ContractState, address: ContractAddress) {
            self.ownable.assert_only_owner();
            self.guardians.write(address, false);
            self.emit(GuardianRemoved { address });
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
