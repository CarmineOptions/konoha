# Proposals

## Proposals Component Documentation

### Overview

The Konoha Vesting Module provides a structured approach to managing token vesting schedules for your team. This module is designed to ensure that tokens are distributed according to predefined schedules, enhancing transparency and security.

### Key Features

- Linear Vesting Schedule: Allows for gradual release of tokens over a specified period.
- Vesting Milestones: Enables setting specific vesting milestones with predefined amounts.
- Event Emission: Tracks and emits events for vesting milestones and completed vesting actions.
  Components
- Interface: `IVesting` This interface defines the core functionality for the vesting module.

## Methods

- vest(grantee: ContractAddress, vested_timestamp: u64)

- Description: Releases vested tokens to the grantee if the vesting timestamp has been reached.

`Parameters:`

- grantee: Address of the token recipient.

- vested_timestamp: The timestamp when the tokens become eligible for vesting.

`add_vesting_milestone(vesting_timestamp: u64, grantee: ContractAddress, amount: u128)`

Description: Adds a vesting milestone for a grantee with a specific amount to be vested at a given timestamp.

`Parameters:`

- vesting_timestamp: The timestamp when the tokens will be vested.
- grantee: Address of the token recipient.
- amount: Amount of tokens to be vested.

`- add_linear_vesting_schedule(first_vest: u64, period: u64, increments_count: u16, total_amount: u128, grantee: ContractAddress)`

- Description: Creates a linear vesting schedule where tokens are vested in increments over a specified period.

`Parameters:`

- first_vest: The initial vesting timestamp.
- period: Time interval between each vesting event.
- increments_count: Total number of vesting increments.
- total_amount: Total amount of tokens to be vested.
- grantee: Address of the token recipient.

### Vesting

This implements the IVesting interface, managing the storage and execution of vesting schedules.

##### Storage

- milestone: Stores the vesting milestones as a map of (timestamp, grantee) to the amount of tokens.

* Events
  VestingMilestoneAdded

`Parameters:`

- grantee: Address of the token recipient.
- timestamp: The vesting timestamp.
- amount: Amount of tokens to be vested.

## Vested

`Parameters:`

- grantee: Address of the token recipient.
- timestamp: The vesting timestamp.
- amount: Amount of tokens vested.

### Methods

- vest(grantee: ContractAddress, vested_timestamp: u64)
- Executes the vesting process, releasing the tokens to the grantee if the vesting timestamp has been reached and the amount to vest is not zero.

- Generates multiple vesting milestones based on the linear vesting schedule parameters.

## Cliff Period

A cliff period is the initial period in a vesting schedule during which no tokens are vested. Tokens start to vest only after the cliff period ends. This is useful for ensuring that the grantee remains with the project for a minimum period before receiving any tokens.

### How Cliff Works

When using the add_linear_vesting_schedule method, you can set the cliff period by adjusting the first_vest parameter. The first_vest timestamp should be set to a date in the future, representing the end of the cliff period.

` For example, if the current date is January 1, 2024, and you want a 6-month cliff period, the first_vest timestamp should be set to July 1, 2024. Tokens will start vesting only after this date.`

## Usage

To implement a vesting schedule using the Konoha Vesting Module, follow these steps:

- Define the Vesting Schedule: Determine whether you need a `linear vesting schedule` or specific vesting milestones.
- Add Vesting Milestones or Schedule:
- For a linear vesting schedule, `use the add_linear_vesting_schedule method.`
- For specific milestones, use the `add_vesting_milestone method.`
- Execute Vesting: Call the `vest ` method to release tokens when they become eligible.
