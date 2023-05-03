// https://github.com/CarmineOptions/carmine-api/blob/master/carmine-api-airdrop/src/merkle_tree.rs

mod Airdrop {
    use array::ArrayTrait;
    use hash::LegacyHash;
    use traits::Into;
    use starknet::ContractAddress;
    use starknet::ContractAddressIntoFelt252;
    use traits::TryInto;
    use option::OptionTrait;

    use quaireaux_data_structures::merkle_tree::MerkleTree;
    use quaireaux_data_structures::merkle_tree::MerkleTreeTrait;

    use governance::contract::Governance;
    use governance::traits::IGovernanceTokenDispatcher;
    use governance::traits::IGovernanceTokenDispatcherTrait;
    use governance::contract::Governance::governance_token_address;
    use governance::contract::Governance::airdrop_claimed;

    const MERKLE_ROOT: felt252 =
        0x6a8fef16fb1de78980fb73c46ee5a0899a3aa3a95d9f6deae73b545919bc704; // First test from David

    // Lets claimee claim from merkle tree the amount - claimed_so_far
    fn claim(claimee: ContractAddress, amount: u128, proof: Array::<felt252>) {
        let mut merkle_tree = MerkleTreeTrait::new();
        let leaf = LegacyHash::hash(claimee.into(), amount.into());

        let root = merkle_tree.compute_root(leaf, proof);
        assert(root == MERKLE_ROOT, 'invalid proof');

        let claimed_so_far: u128 = airdrop_claimed::read(claimee);
        assert(claimed_so_far < amount, 'claiming more than eligible for');
        let to_mint = amount - claimed_so_far;

        // Mint
        let govtoken_addr = governance_token_address::read();
        IGovernanceTokenDispatcher {
            contract_address: govtoken_addr
        }.mint(claimee, u256 { high: 0_u128, low: to_mint });
        // Emit event
        Governance::Claimed(claimee, to_mint);
        // Write new claimed amt
        airdrop_claimed::write(claimee, to_mint + claimed_so_far);
    }
}
