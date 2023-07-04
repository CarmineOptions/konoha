// This file if possible calls out to Proposals or Upgrades or other files where actual logic resides.
// When Components arrive in Cairo 2, it will be refactored to take advantage of them.

use starknet::ContractAddress;

#[starknet::interface]
trait IGovernance<TContractState> {
}


#[starknet::contract]
mod Governance {
    use governance::types::BlockNumber;
    use governance::types::VoteStatus;
    use governance::types::ContractType;

    use starknet::ContractAddress;

    #[storage]
    struct Storage {
        //proposal_details: LegacyMap::<felt252, PropDetails>,
        proposal_vote_ends: LegacyMap::<felt252, BlockNumber>,
        proposal_voted_by: LegacyMap::<(felt252, ContractAddress), VoteStatus>,
        proposal_total_yay: LegacyMap::<felt252, felt252>,
        proposal_total_nay: LegacyMap::<felt252, felt252>,
        proposal_applied: LegacyMap::<felt252, felt252>, // should be Bool after migration
        proposal_initializer_run: LegacyMap::<u64, bool>,
        investor_voting_power: LegacyMap::<ContractAddress, felt252>,
        total_investor_distributed_power: felt252,
        governance_token_address: ContractAddress,
        amm_address: ContractAddress
    }

    // PROPOSALS

    #[derive(starknet::Event, Drop)]
    struct Proposed {
        prop_id: felt252,
        payload: felt252,
        to_upgrade: ContractType
    }

    #[derive(starknet::Event, Drop)]
    struct Voted {
        prop_id: felt252,
        voter: ContractAddress,
        opinion: VoteStatus
    }

    #[derive(starknet::Event, Drop)]
    struct Claimed {
        address: ContractAddress,
        received: u128
    }

    #[derive(starknet::Event, Drop)]
    #[event]
    enum Event {
        Proposed: Proposed,
        Voted: Voted,
        Claimed: Claimed
    }

    #[external(v0)]
    impl Governance of super::IGovernance<ContractState> {
    }
}
