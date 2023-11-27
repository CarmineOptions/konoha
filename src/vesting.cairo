use starknet::ContractAddress;

#[starknet::interface]
trait IVesting<TContractState> {
    fn vest(ref self: TContractState, grantee: ContractAddress, vested_timestamp: u64);

    fn add_vesting_milestone(
        ref self: TContractState, vesting_timestamp: u64, grantee: ContractAddress, amount: u128
    );
// add_linear_vesting_schedule
// add_cliff_linear_vesting_schedule
// MAYBE – streaming?
// MAYBE – options on the govtoken?
}

#[starknet::component]
mod vesting {
    // TODO: must depend on Ownable or Proposals to clarify who has the right to add vesting milestones
    #[storage]
    struct Storage {
        milestone: LegacyMap::<(u64, ContractAddress), u128>
    }

    #[derive(starknet::Event, Drop)]
    #[event]
    enum Event {
        VestingMilestoneAdded: VestingMilestoneAdded
    }

    #[derive(starknet::Event, Drop)]
    struct VestingMilestoneAdded {
        grantee: ContractAddress,
        timestamp: u64,
        amount: u128
    }

    #[embeddable_as(VestingImpl)]
    impl Vesting<
        TContractState, +HasComponent<TContractState>
    > of super::IVesting<ComponentState<TContractState>> {
        fn vest(
            ref self: ComponentState<TContractState>,
            grantee: ContractAddress,
            vested_timestamp: u64
        ) {
            let amt_to_vest = self.milestone.read((vested_timestamp, grantee));
            assert(amt_to_vest != 0, 'no vesting milestone found');
        }

        fn add_vesting_milestone(
            ref self: ComponentState<TContractState>,
            vesting_timestamp: u64,
            grantee: ContractAddress,
            amount: u128
        ) {
            // TODO: check if caller is eligible to add vesting milestone or if this is part of a proposal
            self.milestone.write((vested_timestamp, grantee), amount);
            self
                .emit(
                    VestingMilestoneAdded {
                        grantee: grantee, timestamp: vesting_timestamp, amount: u128
                    }
                )
        }
    }
}
