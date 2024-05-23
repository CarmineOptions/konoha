# Testing

All Cairo code must be tested for the PR to be approved and merged. Tests must cover all of the functionality and edge cases.

## Adding a new tests file

1. Create a new file, such as `test_staking.cairo`
2. Update `tests/lib.cairo` and add `mod test_staking;` Don't forget to sort the module names alphabetically.
3. Refer to the [Starknet Foundry Book](https://foundry-rs.github.io/starknet-foundry/) for reference on `snforge` which we use for tests.