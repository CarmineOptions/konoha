// https://github.com/CarmineOptions/carmine-api/blob/master/carmine-api-airdrop/src/merkle_tree.rs

mod Airdrop {
    use array::ArrayTrait;
    use hash::LegacyHash;
    use traits::Into;
    use starknet::ContractAddress;
    use starknet::ContractAddressIntoFelt252;
    use traits::TryInto;
    use option::OptionTrait;

    use governance::merkle_tree::MerkleTree;
    use governance::merkle_tree::MerkleTreeTrait;

    use governance::contract::Governance;
    use governance::traits::IGovernanceTokenDispatcher;
    use governance::traits::IGovernanceTokenDispatcherTrait;
    use governance::contract::Governance::governance_token_address;
    use governance::contract::Governance::airdrop_claimed;

    const MERKLE_ROOT: felt252 =
        0x6d5f4866e61240e8f14de3d5c994153b1bcbf58603f64fa1a0500074b8c8d38; // airdrop week5-week8, from round_2_composed.csv

    // Lets claimee claim from merkle tree the amount - claimed_so_far
    fn claim(claimee: ContractAddress, amount: u128, proof: Array::<felt252>) {
        let mut merkle_tree = MerkleTreeTrait::new();
        let amount_felt: felt252 = amount.into();
        let leaf = LegacyHash::hash(claimee.into(), amount_felt);

        let root = merkle_tree.compute_root(leaf, proof.span());
        assert(root == MERKLE_ROOT, 'invalid proof');

        let claimed_so_far: u128 = airdrop_claimed::read(claimee);
        assert(claimed_so_far < amount, 'claiming more than eligible for');
        let to_mint = amount - claimed_so_far;

        // Mint
        let govtoken_addr = governance_token_address::read();
        IGovernanceTokenDispatcher {
            contract_address: govtoken_addr
        }.mint(claimee, u256 { high: 0, low: to_mint });
        // Emit event
        Governance::Claimed(claimee, to_mint);
        // Write new claimed amt
        airdrop_claimed::write(claimee, to_mint + claimed_so_far);
    }
}
