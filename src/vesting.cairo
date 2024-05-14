use starknet::ContractAddress;

// To add new vesting schedules, this Component should be part of a Custom proposal which calls add_linear_vesting_schedule or a vesting milestone.
// This will execute the code from this component in the context of the contract. Only vest() should be exported externally from the contract.

#[starknet::interface]
trait IVesting<TContractState> {
    fn vest(ref self: TContractState, grantee: ContractAddress, vested_timestamp: u64);

    fn add_vesting_milestone(
        ref self: TContractState, vesting_timestamp: u64, grantee: ContractAddress, amount: u128
    );

    fn add_linear_vesting_schedule(
        ref self: TContractState,
        first_vest: u64,
        period: u64,
        increments_count: u64,
        total_amount: u128
    );
// MAYBE – streaming?
// MAYBE – options on the govtoken?
}

#[starknet::component]
mod vesting {
    use starknet::syscalls::get_block_timestamp;

    use konoha::traits::IGovernanceTokenDispatcher;
    use konoha::traits::IGovernanceTokenDispatcherTrait;

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
            self.milestone.write((vested_timestamp, grantee), amount);
            self
                .emit(
                    VestingMilestoneAdded {
                        grantee: grantee, timestamp: vesting_timestamp, amount: u128
                    }
                )
        }

        fn add_linear_vesting_schedule(
            ref self: TContractState,
            first_vest: u64,
            period: u64,
            increments_count: u16,
            total_amount: u128,
            grantee: ContractAddress
        ) {
            let mut i: u16 = 0;
            let mut curr_timestamp = first_vest;
            assert(increments_count > 1, 'schedule must have more than one milestone');
            assert(get_block_timestamp() < first_vest, 'first vest cannot be in the past');
            assert()
            let per_vest_amount = total_amount / increments_count;
            let mut total_scheduled = 0;
            loop {
                if i == increments_count {
                    break;
                }
                total_scheduled += per_vest_amount;
                if i + 1 == increments_count {
                    let left_to_get_to_total = total_amount - total_scheduled;
                    self
                        .add_vesting_milestone(
                            curr_timestamp, grantee, per_vest_amount + left_to_get_to_total
                        );
                } else {
                    self.add_vesting_milestone(curr_timestamp, grantee, per_vest_amount);
                }
                curr_timestamp = curr_timestamp + period;
                i += 1;
            }
        }
    }
}
