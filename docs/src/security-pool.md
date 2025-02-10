# Security pool management

Konoha also supports the deployment of a security pool – intended for funds that should only be touched as a last resort (e.g. in case of a hack or protocol liquidity shortfall event).

## Features of a security pool

At its core, the security pool is the same contract as Treasury – but configured differently to suit usage as a security pool.

## Deployment and configuration of the pool

As usual, we will add the security pool through a arbitrary proposal. This proposal will:
1. Deploy a treasury contract with a different, broader set of guardians. Guardian is an address that can cancel a *pending transfer*[^1].
2. Add custom proposal types – they will have a higher voting time than default.

```rust
#[starknet::interface]
trait IArbitraryProposal<TContractState> {
    fn execute_arbitrary_proposal(ref self: TContractState);
}

#[starknet::contract]
mod SecurityPoolDeploymentController {
    use starknet::{ContractAddress, ClassHash};
    use openzeppelin::token::erc20::interface::IERC20Dispatcher;
    use konoha::treasury::ITreasuryDispatcher;
    use konoha::proposals::IProposalsDispatcher;
    use konoha::types::CustomProposalConfig;

    #[storage]
    struct Storage {}

    #[abi(embed_v0)]
    impl SecurityPoolDeploymentController of super::IArbitraryProposal<ContractState> {
        fn execute_arbitrary_proposal(ref self: ContractState) {
            // Use current class hash of Treasury contract
            let treasury_class_hash: ClassHash = 0x456...;

            // Contract addresses (replace with actual addresses)
            let mut calldata = ArrayTrait::new();
            let governance_address: ContractAddress = 0x123...;
            calldata.append(governance_address.into());
            let carmine_amm_address: ContractAddress = 0x047472e6755afc57ada9550b6a3ac93129cc4b5f98f51c73e0644d129fd208d9; // Carmine Options AMM mainnet
            calldata.append(carmine_amm_address.into());
            let zklend_market_contract_address: ContractAddress = 0x04c0a5193d58f74fbace4b74dcf65481e734ed1714121bdc571da345540efa05;
            calldata.append(zklend_market_contract_address.into());
            
            let first_guardian_address: ContractAddress = 0x456...; // can be zero if you don't want a Guardian, but it's not recommended.
            calldata.append(first_guardian_address.into());

            let (security_pool_address, _) = starknet::deploy_syscall(treasury_class_hash, 1, calldata.span(), false).unwrap();

            let security_pool = ITreasuryDispatcher { contract_address: security_pool_address };
            // possibly add more guardians
            security_pool.add_guardian(0x12345);
            
            // Now, the security pool is deployed. We need to add the corresponding proposals to the governance.
            let gov_proposals = IProposalsDispatcher { contract_address: governance_address };
            let prop_config_add_transfer: CustomProposalConfig = CustomProposalConfig {
                target: governance_address.into(),
                selector: selector!("add_transfer"),
                library_call: false,
                proposal_voting_time: 60 * 60 * 24 * 10 // 10 days, adjust to your requirements
            };

            gov_proposals.add_custom_proposal_config(prop_config_add_transfer);

            let prop_config_add_guardian: CustomProposalConfig = CustomProposalConfig {
                target: governance_address.into(),
                selector: selector!("add_guardian"),
                library_call: false,
                proposal_voting_time: 60 * 60 * 24 * 10 // 10 days, adjust to your requirements
            };

            gov_proposals.add_custom_proposal_config(prop_config_add_guardian);

            let prop_config_remove_guardian: CustomProposalConfig = CustomProposalConfig {
                target: governance_address.into(),
                selector: selector!("remove_guardian"),
                library_call: false,
                proposal_voting_time: 60 * 60 * 24 * 10 // 10 days, adjust to your requirements
            };

            gov_proposals.add_custom_proposal_config(prop_config_remove_guardian);
        }
    }
}
```

[^1]: A transfer is pending in the contract for two days after the corresponding proposal has passed and has been executed. In case a guardian is uncooperative, it can be removed.