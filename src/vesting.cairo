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
    use starknet::syscalls::get_block_timestamp;

    use governance::traits::IGovernanceTokenDispatcher;
    use governance::traits::IGovernanceTokenDispatcherTrait;

    // TODO: must depend on Ownable or Proposals to clarify who has the right to add vesting milestones
    #[storage]
    struct Storage {
        milestone: LegacyMap::<(u64, ContractAddress), u128>
    }

    #[derive(starknet::Event, Drop)]
    #[event]
    enum Event {
        VestingMilestoneAdded: VestingMilestoneAdded,
        Vested: Vested
    }

    #[derive(starknet::Event, Drop)]
    struct VestingMilestoneAdded {
        grantee: ContractAddress,
        timestamp: u64,
        amount: u128
    }

    #[derive(starknet::Event, Drop)]
    struct Vested {
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
            assert(amt_to_vest != 0, 'no vesting milestone found, or already vested');
            assert(get_block_timestamp() > vested_timestamp, 'not yet eligible');
            IGovernanceTokenDispatcher { contract_address: govtoken_addr }
                .mint(claimee, u256 { high: 0, low: amt_to_vest });
            self.milestone.write((vested_timestamp, grantee), 0);
            self
                .emit(
                    Vested { grantee: grantee, timestamp: vested_timestamp, amount: amt_to_vest }
                );
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
