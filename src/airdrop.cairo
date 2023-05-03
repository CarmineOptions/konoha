// https://github.com/CarmineOptions/carmine-api/blob/master/carmine-api-airdrop/src/merkle_tree.rs

mod Airdrop {
    use array::ArrayTrait;
    use hash::LegacyHash;
    use traits::Into;
    use starknet::ContractAddress;
    use starknet::Felt252TryIntoContractAddress;
    use traits::TryInto;
    use option::OptionTrait;

    use quaireaux_data_structures::merkle_tree::MerkleTree;
    use quaireaux_data_structures::merkle_tree::MerkleTreeTrait;

    use governance::traits::IGovernanceTokenDispatcher;
    use governance::traits::IGovernanceTokenDispatcherTrait;
    use governance::contract::Governance::governance_token_address;

    const MERKLE_ROOT: felt252 =
        0x6a8fef16fb1de78980fb73c46ee5a0899a3aa3a95d9f6deae73b545919bc704; // First test from David

    fn mint(claimee: felt252, amount: felt252, proof: Array::<felt252>) {
        let mut merkle_tree = MerkleTreeTrait::new();
        let leaf = LegacyHash::hash(claimee, amount);
        let root = merkle_tree.compute_root(leaf, proof);
        assert(root == MERKLE_ROOT, 'invalid proof');
        // TODO write that address has already claimed x amt into storage
        let govtoken_addr = governance_token_address::read();
        IGovernanceTokenDispatcher {
            contract_address: govtoken_addr
        }.mint(claimee.try_into().unwrap(), amount.into());
    }
}
