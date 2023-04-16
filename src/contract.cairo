// This file if possible calls out to Proposals or Upgrades or other files where actual logic resides

#[contract]
mod Governance {
    use governance::types::PropDetails;
    use governance::types::BlockNumber;
    use governance::types::VoteStatus;
    use governance::types::ContractType;
    use governance::proposals::Proposals;

    use starknet::ContractAddress;


    struct Storage {
        //proposal_details: LegacyMap::<felt252, PropDetails>, // waiting for C1.0 docs to be finished so struct behavior in storage is clearer
        proposal_vote_ends: LegacyMap::<felt252, BlockNumber>,
        proposal_voted_by: LegacyMap::<(felt252, ContractAddress), VoteStatus>,
        proposal_total_yay: LegacyMap::<felt252, felt252>,
        proposal_total_nay: LegacyMap::<felt252, felt252>,
        proposal_applied: LegacyMap::<felt252, felt252>, // should be Bool after migration
        investor_voting_power: LegacyMap::<ContractAddress, felt252>,
        total_investor_distributed_power: felt252,
    }

    #[event]
    fn Proposed(prop_id: felt252, impl_hash: felt252, to_upgrade: ContractType) {}

    #[event]
    fn Voted(prop_id: felt252, voter: ContractAddress, opinion: VoteStatus) {}

    //#[view]
    //fn get_proposal_details(prop_id: felt252) -> PropDetails {
    //
    //}

    // This should ideally return VoteCounts, but it seems like structs can't be returned from 
    // C1.0 external fns as they can't be serialized
    #[view]
    fn get_vote_counts(prop_id: felt252) -> (felt252, felt252) {
        Proposals::get_vote_counts(prop_id)
    }
}
