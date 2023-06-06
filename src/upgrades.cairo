mod Upgrades {
    use traits::TryInto;
    use option::OptionTrait;
    use traits::Into;
    use box::BoxTrait;

    use starknet::SyscallResultTrait;
    use starknet::SyscallResult;
    use starknet::syscalls;
    use starknet::ClassHash;
    use starknet::ContractAddress;
    use starknet::class_hash;
    use governance::proposals::Proposals;
    use governance::contract::Governance::proposal_applied;
    use governance::contract::Governance::amm_address;
    use governance::contract::Governance::governance_token_address;

    use governance::types::PropDetails;

    use governance::traits::IAMMDispatcher;
    use governance::traits::IAMMDispatcherTrait;
    use governance::traits::IGovernanceTokenDispatcher;
    use governance::traits::IGovernanceTokenDispatcherTrait;

    fn apply_passed_proposal(prop_id: felt252) {
        let status = Proposals::get_proposal_status(prop_id);
        assert(status == 1, 'prop not passed');
        let applied: felt252 = proposal_applied::read(prop_id);
        assert(applied == 0, 'Proposal already applied');

        let prop_details: PropDetails = Proposals::proposal_details::read(prop_id);
        let contract_type = prop_details.to_upgrade;

        Proposals::assert_correct_contract_type(contract_type);

        let impl_hash = prop_details.impl_hash;

        // TODO check if the new contract has the right type
        // let new_contract_type = IContract(addr).contract_type();
        // assert(new_contract_type == contract_type, 'Wrong contract type');

        // Apply the upgrade
        // TODO use match/switch
        match contract_type {
            0 => {
                let amm_addr: ContractAddress = amm_address::read();
                IAMMDispatcher { contract_address: amm_addr }.upgrade(impl_hash);
            },
            _ => {
                if (contract_type == 1) {
                    let impl_hash_classhash: ClassHash = impl_hash.try_into().unwrap();
                    syscalls::replace_class_syscall(impl_hash_classhash);
                } else {
                    assert(contract_type == 2, 'invalid contract_type');
                    let govtoken_addr = governance_token_address::read();
                    IGovernanceTokenDispatcher {
                        contract_address: govtoken_addr
                    }.upgrade(impl_hash);
                }
            }
        }
        proposal_applied::write(prop_id, 1); // Mark the proposal as applied
    }
}
