#[starknet::interface]
trait IUpgrades<TContractState> {
    fn apply_passed_proposal(ref self: TContractState, prop_id: felt252);
}

#[starknet::component]
mod upgrades {
    use traits::TryInto;
    use option::OptionTrait;
    use traits::Into;

    use starknet::SyscallResultTrait;
    use starknet::SyscallResult;
    use starknet::syscalls;
    use starknet::ClassHash;
    use starknet::ContractAddress;
    use starknet::class_hash;

    use konoha::types::PropDetails;
    use konoha::contract::Governance;
    use konoha::contract::Governance::ContractState;

    use konoha::proposals::proposals as proposals_component;
    use konoha::proposals::proposals::ProposalsImpl;
    use konoha::airdrop::airdrop as airdrop_component;
    use konoha::traits::IAMMDispatcher;
    use konoha::traits::IAMMDispatcherTrait;
    use konoha::traits::IGovernanceTokenDispatcher;
    use konoha::traits::IGovernanceTokenDispatcherTrait;
    use konoha::traits::get_amm_address_self;
    use konoha::traits::get_governance_token_address_self;

    #[storage]
    struct Storage {
        proposal_applied: LegacyMap::<felt252, bool>,
        amm_address: ContractAddress
    }

    #[derive(starknet::Event, Drop)]
    #[event]
    enum Event {
        Upgraded: Upgraded
    }

    #[derive(starknet::Event, Drop)]
    struct Upgraded {
        prop_id: u64,
        upgrade_type: u64
    }

    #[embeddable_as(UpgradesImpl)]
    impl Upgrades<
        TContractState,
        +HasComponent<TContractState>,
        +Drop<TContractState>,
        impl Proposals: proposals_component::HasComponent<TContractState>,
        impl Airdrop: airdrop_component::HasComponent<TContractState>
    > of super::IUpgrades<ComponentState<TContractState>> {
        fn apply_passed_proposal(ref self: ComponentState<TContractState>, prop_id: felt252) {
            let proposals_comp = get_dep_component!(@self, Proposals);
            let status = proposals_comp
                .get_proposal_status(
                    prop_id
                ); // needs use konoha::proposals::proposals::ProposalsImpl;
            assert(status == 1, 'prop not passed');
            let applied = self.proposal_applied.read(prop_id);
            assert(!applied, 'Proposal already applied');

            let prop_details: PropDetails = proposals_comp.proposal_details.read(prop_id);
            let contract_type = prop_details.to_upgrade.try_into().unwrap();

            proposals_component::assert_correct_contract_type(contract_type);

            let impl_hash = prop_details.payload;

            // Apply the upgrade
            // TODO use full match/switch when supported
            match contract_type {
                0 => {
                    let amm_addr: ContractAddress = get_amm_address_self();
                    IAMMDispatcher { contract_address: amm_addr }
                        .upgrade(impl_hash.try_into().unwrap());
                },
                _ => {
                    if (contract_type == 1) {
                        let impl_hash_classhash: ClassHash = impl_hash.try_into().unwrap();
                        syscalls::replace_class_syscall(impl_hash_classhash);
                    } else if (contract_type == 2) {
                        let govtoken_addr = get_governance_token_address_self();
                        IGovernanceTokenDispatcher { contract_address: govtoken_addr }
                            .upgrade(impl_hash);
                    } else if (contract_type == 3) {
                        let mut airdrop_comp = get_dep_component_mut!(ref self, Airdrop);
                        airdrop_comp.merkle_root.write(impl_hash);
                    } else {
                        assert(
                            contract_type == 4, 'invalid contract_type'
                        ); // type 4 is no-op, signal vote
                    }
                }
            }
            self.proposal_applied.write(prop_id, true); // Mark the proposal as applied
            self
                .emit(
                    Upgraded {
                        prop_id: prop_id.try_into().unwrap(),
                        upgrade_type: contract_type.try_into().unwrap()
                    }
                );
        }
    }
}
