#[contract]
mod Governance {
    use governance::types::PropDetails;
    use starknet::ContractAddress;

    struct Storage {
        //proposal_details: LegacyMap::<felt252, PropDetails>, // throws error
        proposal_vote_ends: LegacyMap::<felt252, felt252>
    }

    #[event]
    fn Proposed(prop_id: felt252, impl_hash: felt252, to_upgrade: felt252) {} // TODO use type aliases

}
