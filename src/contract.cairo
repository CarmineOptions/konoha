// This file if possible calls out to Proposals or Upgrades or other files where actual logic resides.
// When Components arrive in Cairo 2.?, it will be refactored to take advantage of them. Random change to rerun CI

use starknet::ContractAddress;
use konoha::types::{ContractType, PropDetails, VoteStatus};

#[starknet::interface]
trait IGovernance<TContractState> {
    // PROPOSALS

    // in component

    // UPGRADES

    fn get_governance_token_address(self: @TContractState) -> ContractAddress;
    fn get_amm_address(self: @TContractState) -> ContractAddress;
// fn apply_passed_proposal(ref self: TContractState, prop_id: felt252);
// AIRDROPS

// in component

// OPTIONS / ONE-OFF
}


#[starknet::contract]
mod Governance {
    use konoha::types::BlockNumber;
    use konoha::types::VoteStatus;
    use konoha::types::ContractType;
    use konoha::types::PropDetails;
    use konoha::proposals::proposals as proposals_component;
    use konoha::upgrades::upgrades as upgrades_component;
    use konoha::airdrop::airdrop as airdrop_component;

    use starknet::ContractAddress;


    component!(path: airdrop_component, storage: airdrop, event: AirdropEvent);
    component!(path: proposals_component, storage: proposals, event: ProposalsEvent);
    component!(path: upgrades_component, storage: upgrades, event: UpgradesEvent);

    #[abi(embed_v0)]
    impl Airdrop = airdrop_component::AirdropImpl<ContractState>;

    #[abi(embed_v0)]
    impl Proposals = proposals_component::ProposalsImpl<ContractState>;

    #[abi(embed_v0)]
    impl Upgrades = upgrades_component::UpgradesImpl<ContractState>;

    #[storage]
    struct Storage {
        proposal_initializer_run: LegacyMap::<u64, bool>,
        governance_token_address: ContractAddress,
        amm_address: ContractAddress,
        #[substorage(v0)]
        proposals: proposals_component::Storage,
        #[substorage(v0)]
        airdrop: airdrop_component::Storage,
        #[substorage(v0)]
        upgrades: upgrades_component::Storage
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
    #[event]
    enum Event {
        Proposed: Proposed,
        Voted: Voted,
        AirdropEvent: airdrop_component::Event,
        ProposalsEvent: proposals_component::Event,
        UpgradesEvent: upgrades_component::Event
    }

    #[constructor]
    fn constructor(ref self: ContractState, govtoken_address: ContractAddress) {
        // This is not used in production on mainnet, because the governance token is already deployed (and distributed).
        self.governance_token_address.write(govtoken_address);
    }

    #[abi(embed_v0)]
    impl Governance of super::IGovernance<ContractState> {
        fn get_governance_token_address(self: @ContractState) -> ContractAddress {
            self.governance_token_address.read()
        }

        fn get_amm_address(self: @ContractState) -> ContractAddress {
            self.amm_address.read()
        }
    }
}
