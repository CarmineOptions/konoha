use starknet::ContractAddress;

#[starknet::interface]
trait IVesting<TContractState> {
    fn vest(ref self: TContractState, grantee: ContractAddress, vested_timestamp: u64);

    fn add_vesting_milestone(
        ref self: TContractState, vesting_timestamp: u64, grantee: ContractAddress
    );
// add_linear_vesting_schedule
// add_cliff_linear_vesting_schedule
// MAYBE – streaming?
// MAYBE – options on the govtoken?
}

#[starknet::component]
mod vesting {
    #[storage]
    struct Storage {
        milestone: LegacyMap::<(u64, ContractAddress), u128>
    }

    #[embeddable_as(VestingImpl)]
    impl Vesting<
        TContractState, +HasComponent<TContractState>
    > of super::IVesting<ComponentState<TContractState>> {
        fn vest(
            ref self: ComponentState<TContractState>,
            grantee: ContractAddress,
            vested_timestamp: u64
        ) {}

        fn add_vesting_milestone(
            ref self: ComponentState<TContractState>,
            vesting_timestamp: u64,
            grantee: ContractAddress
        ) {}
    }
}
