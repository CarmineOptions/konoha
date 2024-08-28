use starknet::{ClassHash, ContractAddress};

#[starknet::interface]
trait ITestContract<TContractState> {
    fn get_value(self: @TContractState) -> felt252;

    fn set_value(ref self: TContractState, value: felt252);
}

#[starknet::interface]
trait IMarket<TContractState> {
    //
    // Getters
    //

    fn get_reserve_data(self: @TContractState, token: ContractAddress) -> MarketReserveData;

    fn get_lending_accumulator(self: @TContractState, token: ContractAddress) -> felt252;

    fn get_debt_accumulator(self: @TContractState, token: ContractAddress) -> felt252;

    // NOTE: this function shouldn't have been made public as it always just returns 0 when called
    //       from external contracts. However, the original Cairo 0 version made it public by
    //       mistake. So we're retaining it here to be 100% backward-compatible.
    // WARN: this must be run BEFORE adjusting the accumulators (otherwise always returns 0)
    fn get_pending_treasury_amount(self: @TContractState, token: ContractAddress) -> felt252;

    fn get_total_debt_for_token(self: @TContractState, token: ContractAddress) -> felt252;

    fn get_user_debt_for_token(
        self: @TContractState, user: ContractAddress, token: ContractAddress
    ) -> felt252;

    /// Returns a bitmap of user flags.
    fn get_user_flags(self: @TContractState, user: ContractAddress) -> felt252;

    fn is_user_undercollateralized(
        self: @TContractState, user: ContractAddress, apply_borrow_factor: bool
    ) -> bool;

    fn is_collateral_enabled(
        self: @TContractState, user: ContractAddress, token: ContractAddress
    ) -> bool;

    fn user_has_debt(self: @TContractState, user: ContractAddress) -> bool;

    //
    // Permissionless entrypoints
    //

    fn deposit(ref self: TContractState, token: ContractAddress, amount: felt252);

    fn withdraw(ref self: TContractState, token: ContractAddress, amount: felt252);

    fn withdraw_all(ref self: TContractState, token: ContractAddress);

    fn borrow(ref self: TContractState, token: ContractAddress, amount: felt252);

    fn repay(ref self: TContractState, token: ContractAddress, amount: felt252);

    fn repay_for(
        ref self: TContractState,
        token: ContractAddress,
        amount: felt252,
        beneficiary: ContractAddress
    );

    fn repay_all(ref self: TContractState, token: ContractAddress);

    fn enable_collateral(ref self: TContractState, token: ContractAddress);

    fn disable_collateral(ref self: TContractState, token: ContractAddress);

    /// With the current design, liquidators are responsible for calculating the maximum amount
    /// allowed.
    /// We simply check collteralization factor is below one after liquidation.
    /// TODO: calculate max amount on-chain because compute is cheap on StarkNet.
    fn liquidate(
        ref self: TContractState,
        user: ContractAddress,
        debt_token: ContractAddress,
        amount: felt252,
        collateral_token: ContractAddress
    );

    fn flash_loan(
        ref self: TContractState,
        receiver: ContractAddress,
        token: ContractAddress,
        amount: felt252,
        calldata: Span::<felt252>
    );

    //
    // Permissioned entrypoints
    //

    fn upgrade(ref self: TContractState, new_implementation: ClassHash);

    fn add_reserve(
        ref self: TContractState,
        token: ContractAddress,
        z_token: ContractAddress,
        interest_rate_model: ContractAddress,
        collateral_factor: felt252,
        borrow_factor: felt252,
        reserve_factor: felt252,
        flash_loan_fee: felt252,
        liquidation_bonus: felt252
    );

    fn set_treasury(ref self: TContractState, new_treasury: ContractAddress);

    fn set_interest_rate_model(
        ref self: TContractState, token: ContractAddress, interest_rate_model: ContractAddress
    );

    fn set_collateral_factor(
        ref self: TContractState, token: ContractAddress, collateral_factor: felt252
    );

    fn set_borrow_factor(ref self: TContractState, token: ContractAddress, borrow_factor: felt252);

    fn set_reserve_factor(
        ref self: TContractState, token: ContractAddress, reserve_factor: felt252
    );

    fn set_debt_limit(ref self: TContractState, token: ContractAddress, limit: felt252);

    fn transfer_ownership(ref self: TContractState, new_owner: ContractAddress);

    fn renounce_ownership(ref self: TContractState);
}

#[starknet::interface]
trait IZToken<TContractState> {
    //
    // Getters
    //

    fn name(self: @TContractState) -> felt252;

    fn symbol(self: @TContractState) -> felt252;

    fn decimals(self: @TContractState) -> felt252;

    fn totalSupply(self: @TContractState) -> u256;

    fn felt_total_supply(self: @TContractState) -> felt252;

    fn balanceOf(self: @TContractState, account: ContractAddress) -> u256;

    fn felt_balance_of(self: @TContractState, account: ContractAddress) -> felt252;

    fn allowance(self: @TContractState, owner: ContractAddress, spender: ContractAddress) -> u256;

    fn felt_allowance(
        self: @TContractState, owner: ContractAddress, spender: ContractAddress
    ) -> felt252;

    fn underlying_token(self: @TContractState) -> ContractAddress;

    fn get_raw_total_supply(self: @TContractState) -> felt252;

    //
    // Permissionless entrypoints
    //

    fn transfer(ref self: TContractState, recipient: ContractAddress, amount: u256) -> bool;

    fn felt_transfer(ref self: TContractState, recipient: ContractAddress, amount: felt252) -> bool;

    fn transferFrom(
        ref self: TContractState, sender: ContractAddress, recipient: ContractAddress, amount: u256
    ) -> bool;

    fn felt_transfer_from(
        ref self: TContractState,
        sender: ContractAddress,
        recipient: ContractAddress,
        amount: felt252
    ) -> bool;

    fn approve(ref self: TContractState, spender: ContractAddress, amount: u256) -> bool;

    fn felt_approve(ref self: TContractState, spender: ContractAddress, amount: felt252) -> bool;

    /// This method exists because ZToken balances are always increasing (unless when no interest is
    /// accumulating). so it's hard for off-chain actors to clear balance completely.
    ///
    /// Returns the actual amount transferred.
    fn transfer_all(ref self: TContractState, recipient: ContractAddress) -> felt252;

    /// Emits raw balances of a list of users via the `EchoRawBalance` event.
    ///
    /// This function (and the event) exists as there used to be a bug in this contract where the
    /// `RawTransfer` event was missing in some cases, making it impossible to track accurate raw
    /// balances using `RawTransfer`. The bug itself has been fixed but the `RawTransfer` history of
    /// users before the fix is broken. This event enables indexers to calibrate raw balances. Once
    /// deployed, this event must be emitted for any user who has ever placed a deposit before the
    /// contract upgrade.
    fn echo_raw_balances(ref self: TContractState, users: Span<ContractAddress>);

    //
    // Permissioned entrypoints
    //

    fn upgrade(ref self: TContractState, new_implementation: ClassHash);

    /// Returns whether the user had zero balance before minting.
    fn mint(ref self: TContractState, to: ContractAddress, amount: felt252) -> bool;

    fn burn(ref self: TContractState, user: ContractAddress, amount: felt252);

    /// Returns the actual amount burnt.
    fn burn_all(ref self: TContractState, user: ContractAddress) -> felt252;

    fn move(
        ref self: TContractState,
        from_account: ContractAddress,
        to_account: ContractAddress,
        amount: felt252
    );

    fn transfer_ownership(ref self: TContractState, new_owner: ContractAddress);

    fn renounce_ownership(ref self: TContractState);
}

#[starknet::interface]
trait IZklendFlashCallback<TContractState> {
    fn zklend_flash_callback(
        ref self: TContractState, initiator: ContractAddress, calldata: Span::<felt252>
    );
}

#[starknet::interface]
trait IPriceOracle<TContractState> {
    //
    // Getters
    //

    /// Get the price of the token in USD with 8 decimals.
    fn get_price(self: @TContractState, token: ContractAddress) -> felt252;

    /// Get the price of the token in USD with 8 decimals and update timestamp.
    fn get_price_with_time(self: @TContractState, token: ContractAddress) -> PriceWithUpdateTime;
}

#[starknet::interface]
trait IDefaultPriceOracle<TContractState> {
    //
    // Permissioned entrypoints
    //

    fn set_token_source(ref self: TContractState, token: ContractAddress, source: ContractAddress);
}

#[starknet::interface]
trait IPriceOracleSource<TContractState> {
    //
    // Getters
    //

    /// Get the price of the token in USD with 8 decimals.
    fn get_price(self: @TContractState) -> felt252;

    /// Get the price of the token in USD with 8 decimals and update timestamp.
    fn get_price_with_time(self: @TContractState) -> PriceWithUpdateTime;
}

#[starknet::interface]
trait IInterestRateModel<TContractState> {
    //
    // Getters
    //

    fn get_interest_rates(
        self: @TContractState, reserve_balance: felt252, total_debt: felt252
    ) -> ModelRates;
}

#[starknet::interface]
trait IPragmaOracle<TContractState> {
    fn get_data_median(self: @TContractState, data_type: PragmaDataType) -> PragmaPricesResponse;
}

#[starknet::interface]
trait IERC20<TContractState> {
    fn decimals(self: @TContractState) -> felt252;

    fn balanceOf(self: @TContractState, user: ContractAddress) -> u256;

    // TODO: support non-standard tokens (without return values) by using helper instead
    fn transfer(ref self: TContractState, recipient: ContractAddress, amount: u256) -> bool;

    // TODO: support non-standard tokens (without return values) by using helper instead
    fn transferFrom(
        ref self: TContractState, sender: ContractAddress, recipient: ContractAddress, amount: u256
    ) -> bool;
}

#[derive(Drop, Serde, starknet::Store)]
struct MarketReserveData {
    enabled: bool,
    decimals: felt252,
    z_token_address: ContractAddress,
    interest_rate_model: ContractAddress,
    collateral_factor: felt252,
    borrow_factor: felt252,
    reserve_factor: felt252,
    last_update_timestamp: felt252,
    lending_accumulator: felt252,
    debt_accumulator: felt252,
    current_lending_rate: felt252,
    current_borrowing_rate: felt252,
    raw_total_debt: felt252,
    flash_loan_fee: felt252,
    liquidation_bonus: felt252,
    debt_limit: felt252
}

#[derive(Drop, Serde)]
struct ModelRates {
    lending_rate: felt252,
    borrowing_rate: felt252
}

#[derive(Drop, Serde)]
struct PriceWithUpdateTime {
    price: felt252,
    update_time: felt252
}

#[derive(Drop, Serde)]
enum PragmaDataType {
    SpotEntry: felt252,
    FutureEntry: (felt252, u64),
    GenericEntry: felt252,
}

#[derive(Drop, Serde)]
struct PragmaPricesResponse {
    price: u128,
    decimals: u32,
    last_updated_timestamp: u64,
    num_sources_aggregated: u32,
    expiration_timestamp: Option<u64>,
}
