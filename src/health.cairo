use array::ArrayTrait;
use debug::PrintTrait;
use konoha::contract::IGovernanceDispatcher;
use konoha::proposals::IProposalsDispatcher;
use konoha::upgrades::IUpgradesDispatcher;
use openzeppelin::token::erc20::interface::IERC20Dispatcher;
use starknet::ContractAddress;

#[starknet::interface]
trait IHealthCheck<TContractState> {
    fn check_if_healthy(self: @TContractState, gov_address: ContractAddress) -> bool;
    fn check_correct_contract_type(
        self: @TContractState, proposed_contract_type: felt252, previous_contract_type: u64
    ) -> bool;
}

#[starknet::contract]
mod HealthCheck {
    use array::ArrayTrait;
    use debug::PrintTrait;
    use konoha::contract::{IGovernanceDispatcher, IGovernanceDispatcherTrait};
    use konoha::proposals::{IProposalsDispatcher, IProposalsDispatcherTrait};
    use konoha::upgrades::{IUpgradesDispatcher, IUpgradesDispatcherTrait};
    use openzeppelin::token::erc20::interface::IERC20;
    use openzeppelin::token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
    use starknet::ContractAddress;
    use super::IHealthCheck;

    #[storage]
    struct Storage {}
    
    #[embeddable_as(HealthImpl)]
    impl Health<TContractState> of super::IHealthCheck<TContractState> {
        fn check_if_healthy(self: @TContractState, gov_address: ContractAddress) -> bool {
            let proposals_dispatcher = IProposalsDispatcher { contract_address: gov_address };
            let upgrades_dispatcher = IUpgradesDispatcher { contract_address: gov_address };

            // Check if there are no proposals
            let current_prop_id = proposals_dispatcher.get_latest_proposal_id();
            if current_prop_id == 0 {
                return true;
            }
            // Retrieve current proposal details
            let current_prop_details = proposals_dispatcher.get_proposal_details(current_prop_id);

            // Check if the latest upgrade type matches the proposal's upgrade type
            let (_, last_upgrade_type) = upgrades_dispatcher.get_latest_upgrade();

            if last_upgrade_type.into() != current_prop_details.to_upgrade{
                return false;
            }

            // Ensure that the type of the new proposal matches the required contract type
            if !self.check_correct_contract_type(
                    current_prop_details.to_upgrade, last_upgrade_type.into()
                ) {
                return false;
            }

            // Check the governance state
            let gov_token_addr = IGovernanceDispatcher { contract_address: gov_address }
                .get_governance_token_address();
            let total_eligible_votes_u256: u256 = IERC20Dispatcher {
                contract_address: gov_token_addr
            }
                .total_supply();
            if total_eligible_votes_u256.high != 0 {
                return false;
            }
            let total_eligible_votes: u128 = total_eligible_votes_u256.low;
            if total_eligible_votes == 0 {
                return false;
            }

            true
        }

        fn check_correct_contract_type(
            self: @TContractState, proposed_contract_type: felt252, previous_contract_type: u64
        ) -> bool {
            // Check if the proposed contract type is compatible with the previous contract type
            if proposed_contract_type == 1 && previous_contract_type == 1 {
                // Generic contract upgrade is allowed
                true
            } else if proposed_contract_type == 3 && previous_contract_type == 3 {
                // Airdrop upgrade is allowed
                true
            } else if proposed_contract_type == 5 && previous_contract_type == 5 {
                // Custom proposal is allowed
                true
            } else if proposed_contract_type == 6 && previous_contract_type == 6 {
                // Arbitrary proposal is allowed
                true
            } else if (proposed_contract_type == 0 && previous_contract_type == 0)
                || (proposed_contract_type == 2 && previous_contract_type == 2) {
                false
            } else {
                false
            }
        }
    }
}
