# Vesting Contract Documentation

## Overview

The Vesting contract provides functionality for managing vesting schedules and milestones within the Konoha ecosystem. It is designed to ensure that tokens are distributed according to predefined schedules, enhancing transparency and security. This documentation outlines how to use the Vesting contract and how to customize it for specific protocol requirements.
The component allows protocols to define linear vesting schedules and specific vesting milestones for grantees, ensuring that tokens are vested in a controlled and predictable manner.

## Key Features

- Linear Vesting Schedule: Allows for gradual release of tokens over a specified period.
- Vesting Milestones: Enables setting specific vesting milestones with predefined amounts.
- Event Emission: Tracks and emits events for vesting milestones and completed vesting actions.

## Usage

The IVesting trait defines the external interface for the vesting component.
It exposes the following external interface functions:

1. vest(grantee: ContractAddress, vested_timestamp: u64): This function vests only a single milestone for a specific grantee at a given timestamp.
2. add_vesting_milestone(vesting_timestamp: u64, grantee: ContractAddress, amount: u128): This function adds a vesting milestone for a grantee at a specific vesting timestamp.
3. add_linear_vesting_schedule(first_vest: u64, period: u64, increments_count: u64, total_amount: u128): This function adds a linear vesting schedule with specified parameters.

## Adding a Vesting Milestone

To add a single vesting milestone, we use the add_vesting_milestone function. This function sets a specific amount of tokens to be vested at a given timestamp for a grantee.

#### Example usage of adding a vesting milestone

```

contract_instance.add_vesting_milestone(
vesting_timestamp=1632555600,
grantee=ContractAddress,
amount=1000
);

```

### Parameters

- vesting_timestamp: The timestamp when the vesting event should occur.
- grantee: The address of the grantee.
- amount: The amount of tokens (in the smallest unit) to be vested.

### Executing Vesting

To execute the vesting process for a grantee at a specified timestamp, use the vest function. This function will check if the conditions are met and, if so, mint the vested tokens to the grantee. Only only one milestone is vested at a time.


#### Example usage of vesting tokens

```

contract_instance.vest(
grantee=ContractAddress,
vested_timestamp=1650000000
);
```

### Parameters

- grantee: The address of the grantee.
- vested_timestamp: the timestamp at which the tokens vested. This vested_timestamp must be exactly the same as the milestone added.

## Adding a Linear Vesting Schedule

To add a linear vesting schedule, we use the add_linear_vesting_schedule function. This function divides the total amount to be vested into increments and schedules them over specified periods.

#### Example usage of adding a Linear vesting schedule

```

contract_instance.add_linear_vesting_schedule(
first_vest=1650000000,
period=2592000, // 30 days in seconds
increments_count=10,
total_amount=1200,
grantee=ContractAddress
);

```

### Parameters

- first_vest: The timestamp of the first vesting event.
- period: The time interval between vesting events.
- increments_count: The number of vesting increments.
- total_amount: The total amount of tokens to be vested.
- grantee: The address of the grantee.

#### Cliff Period

A cliff period is the initial period in a vesting schedule during which no tokens are vested. Tokens start to vest only after the cliff period ends. This is useful for ensuring that the grantee remains with the project for a minimum period before receiving any tokens.

##### How Cliff Works
When using the add_linear_vesting_schedule method, you can set the cliff period by adjusting the first_vest parameter. The first_vest timestamp should be set to a date in the future, representing the end of the cliff period.

* For example, if the current date is January 1, 2024, and you want a 6-month cliff period, the first_vest timestamp should be set to July 1, 2024. Tokens will start vesting only after this date.

## Customization

To customize the Vesting contract for specific protocol’s need, use the methods defined below;

- Custom Proposals: To add new vesting schedules, the component should be part of a custom proposal that calls either add_linear_vesting_schedule or add_vesting_milestone.
- Contract Integration: The vest function should be exported externally from the contract to allow protocols to execute the vesting process.

The Vesting contract is composed of the following:

- VestingImpl: Implementation of the IVesting trait for managing vesting operations.
- Storage: Storage component for storing vesting milestones.

Note that the methods `add_vesting_milestone ` and `add_linear_vesting_schedule` can only be called by the contract itself to prevent unauthorized modifications.
