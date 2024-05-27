# Treasury Documentation

This documentation explains how to use and customize the `Treasury` component in your smart contract. The `Treasury` component is designed to manage liquidity, handle token transfers, and interact with an Automated Market Maker (AMM) on the StarkNet platform.

## Overview

The `Treasury` component includes functions for:
- Sending tokens to an address
- Updating the AMM address
- Providing liquidity to the Carmine AMM
- Withdrawing liquidity from the Carmine AMM
- Retrieving the current AMM address

Additionally, it integrates ownership and upgradability features using OpenZeppelin's `OwnableComponent` and `UpgradeableComponent`.

## Contract Interface

```cairo
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
}
```

## Implementation Details

### Storage Structure

The storage structure for the `Treasury` contract includes:
- `amm_address`: The address of the AMM contract.
- `ownable`: Storage for the ownership component.
- `upgradeable`: Storage for the upgradeability component.

### Constructor

The constructor initializes the contract with the governance contract address and the AMM contract address.

```cairo
#[constructor]
fn constructor(
    ref self: ContractState,
    gov_contract_address: ContractAddress,
    AMM_contract_address: ContractAddress
) {
    assert(gov_contract_address != zeroable::Zeroable::zero(), Errors::ADDRESS_ZERO_GOVERNANCE);
    assert(AMM_contract_address != zeroable::Zeroable::zero(), Errors::ADDRESS_ZERO_AMM);
    self.amm_address.write(AMM_contract_address);
    self.ownable.initializer(gov_contract_address);
}
```

### Functions

#### `send_tokens_to_address`

Transfers tokens from the treasury to a specified address. Only the contract owner can execute this function.

```cairo
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
```

#### `update_AMM_address`

Updates the address of the AMM contract. Only the contract owner can execute this function.

```cairo
fn update_AMM_address(ref self: ContractState, new_amm_address: ContractAddress) {
    self.ownable.assert_only_owner();
    assert(new_amm_address != zeroable::Zeroable::zero(), Errors::ADDRESS_ZERO_AMM);
    assert(new_amm_address != self.amm_address.read(), Errors::ADDRESS_ALREADY_CHANGED);
    let previous_address: ContractAddress = self.amm_address.read();
    self.amm_address.write(new_amm_address);
    self.emit(AMMAddressUpdated { previous_address, new_amm_address });
}
```

#### `provide_liquidity_to_carm_AMM`

Provides liquidity to the Carmine AMM. Only the contract owner can execute this function.

```cairo
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

    carm_AMM.deposit_liquidity(
        pooled_token_addr, quote_token_address, base_token_address, option_type, amount
    );
    self.emit(LiquidityProvided {
        quote_token_address, base_token_address, option_type, amount
    });
}
```

#### `withdraw_liquidity`

Withdraws liquidity from the Carmine AMM. Only the contract owner can execute this function.

```cairo
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

    let lp_token_addr = carm_AMM.get_lptoken_address_for_given_option(
        quote_token_address, base_token_address, option_type
    );
    let lp_token: IERC20Dispatcher = IERC20Dispatcher { contract_address: lp_token_addr };
    assert(
        lp_token.balanceOf(get_contract_address()) >= lp_token_amount,
        Errors::INSUFFICIENT_LP_TOKENS
    );

    carm_AMM.withdraw_liquidity(
        pooled_token_addr,
        quote_token_address,
        base_token_address,
        option_type,
        lp_token_amount
    );
    self.emit(LiquidityWithdrawn {
        quote_token_address, base_token_address, option_type, lp_token_amount
    });
}
```

#### `get_amm_address`

Returns the current address of the AMM contract.

```cairo
fn get_amm_address(self: @ContractState) -> ContractAddress {
    self.amm_address.read()
}
```

## Events

The `Treasury` component emits several events to notify about significant actions:
- `TokenSent`: Emitted when tokens are sent to an address.
- `AMMAddressUpdated`: Emitted when the AMM address is updated.
- `LiquidityProvided`: Emitted when liquidity is provided to the Carmine AMM.
- `LiquidityWithdrawn`: Emitted when liquidity is withdrawn from the Carmine AMM.

## Error Handling

The `Treasury` component defines several error messages for assertion checks:
- `INSUFFICIENT_FUNDS`: Insufficient token balance for the transfer.
- `INSUFFICIENT_POOLED_TOKEN`: Insufficient pooled token balance for providing liquidity.
- `INSUFFICIENT_LP_TOKENS`: Insufficient LP token balance for withdrawing liquidity.
- `ADDRESS_ZERO_GOVERNANCE`: Governance address is zero.
- `ADDRESS_ZERO_AMM`: AMM address is zero.
- `ADDRESS_ALREADY_CHANGED`: New AMM address is the same as the current one.

## Customization

The `Treasury` component can be customized by:
- Changing the AMM address using `update_AMM_address`.
- Managing the ownership of the contract through OpenZeppelin's `OwnableComponent`.
- Upgrading the contract using OpenZeppelin's `UpgradeableComponent`.

## Usage Instructions

1. **Deployment**: Deploy the `Treasury` contract by providing the governance contract address and the initial AMM contract address.

2. **Sending Tokens**:
    ```cairo
    let success = treasury.send_tokens_to_address(receiver_address, amount, token_address);
    ```

3. **Updating AMM Address**:
    ```cairo
    treasury.update_AMM_address(new_amm_address);
    ```

4. **Providing Liquidity**:
    ```cairo
    treasury.provide_liquidity_to_carm_AMM(pooled_token_addr, quote_token_address, base_token_address, option_type, amount);
    ```

5. **Withdrawing Liquidity**:
    ```cairo
    treasury.withdraw_liquidity(pooled_token_addr, quote_token_address, base_token_address, option_type, lp_token_amount);
    ```

6. **Getting AMM Address**:
    ```cairo
    let amm_address = treasury.get_amm_address();
    ```

The Treasury component is a useful tool for managing liquidity, handling token transfers, and interacting with an AMM on StarkNet. It includes essential functions for sending tokens, updating the AMM address, providing and withdrawing liquidity, and retrieving the current AMM address. With integrated ownership and upgradability features from OpenZeppelin, this component ensures secure and flexible contract management
