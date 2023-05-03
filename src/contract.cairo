// This file if possible calls out to Proposals or Upgrades or other files where actual logic resides

#[contract]
mod Governance {
    use governance::types::PropDetails;
    use governance::types::BlockNumber;
    use governance::types::VoteStatus;
    use governance::types::ContractType;
    use governance::proposals::Proposals;
    use governance::upgrades::Upgrades;
    use governance::airdrop::Airdrop;

    use starknet::ContractAddress;


    struct Storage {
        proposal_details: LegacyMap::<felt252, PropDetails>,
        proposal_vote_ends: LegacyMap::<felt252, BlockNumber>,
        proposal_voted_by: LegacyMap::<(felt252, ContractAddress), VoteStatus>,
        proposal_total_yay: LegacyMap::<felt252, felt252>,
        proposal_total_nay: LegacyMap::<felt252, felt252>,
        proposal_applied: LegacyMap::<felt252, felt252>, // should be Bool after migration
        investor_voting_power: LegacyMap::<ContractAddress, felt252>,
        total_investor_distributed_power: felt252,
        governance_token_address: ContractAddress,
        amm_address: ContractAddress
    }

    // PROPOSALS

    #[event]
    fn Proposed(prop_id: felt252, impl_hash: felt252, to_upgrade: ContractType) {}

    #[event]
    fn Voted(prop_id: felt252, voter: ContractAddress, opinion: VoteStatus) {}

    #[view]
    fn get_proposal_details(prop_id: felt252) -> PropDetails {
        Proposals::get_proposal_details(prop_id)
    }

    // This should ideally return VoteCounts, but it seems like structs can't be returned from 
    // C1.0 external fns as they can't be serialized
    // Actually it can, TODO do the same as I did with PropDetails for this
    #[view]
    fn get_vote_counts(prop_id: felt252) -> (felt252, felt252) {
        Proposals::get_vote_counts(prop_id)
    }

    #[external]
    fn submit_proposal(impl_hash: felt252, to_upgrade: ContractType) -> felt252 {
        Proposals::submit_proposal(impl_hash, to_upgrade)
    }

    #[external]
    fn vote(prop_id: felt252, opinion: felt252) {
        Proposals::vote(prop_id, opinion)
    }

    #[view]
    fn get_proposal_status(prop_id: felt252) -> felt252 {
        Proposals::get_proposal_status(prop_id)
    }

    #[external]
    fn vote_investor(prop_id: felt252, opinion: felt252) {
        Proposals::vote_investor(prop_id, opinion)
    }

    // UPGRADES

    #[view]
    fn get_governance_token_address() -> ContractAddress {
        governance_token_address::read()
    }

    #[view]
    fn get_amm_address() -> ContractAddress {
        amm_address::read()
    }

    #[external]
    fn apply_passed_proposal(prop_id: felt252) {
        Upgrades::apply_passed_proposal(prop_id)
    }

    // AIRDROPS

    #[external]
    fn mint(address: felt252, amount: felt252, proof: Array::<felt252>) {
        Airdrop::mint(address, amount, proof)
    }
}
