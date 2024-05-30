# Airdrop

## Overview

The Konoha Airdrop component uses the Merkle tree-based airdrop system to distribute rewards or protocol tokens accurately. It ensures that only eligible claimee can claim tokens, track claimed tokens to prevent multiple claims, and emits events for successful claims. Each protocol deploying this component can manage its own airdrop, ensuring accuracy.

## Features

- Merkle Tree Validation System: Uses proofs to verify claims ensuring that each participant can only claim their tokens. The contract determines the submitted Merkle proof against all previously added roots. If a match is found, indicating eligibility, the contract proceeds with the distribution.
- Event Emission: The contract emits a `Claimed` event for each successful claim. This event includes the claimee's address and the amount received, enabling easy monitoring of claims.
- ```
  self.emit(Claimed { address: claimee, received: to_mint });

  ```

## Setup

- Protocols intending to use the Konoha airdrop component to distribute airdrops should integrate its instance within their deployment process.
- Set the merkle root: When a new round of airdrops is available, add the merkle root to the contract to validate claims.
- Claimees can claim their tokens by providing their address, claimable amount and proof.

## Deployment

To deploy the Konoha airdrop component, you should follow these steps:

- You should ensure that your Starknet environment is set up correctly and you have the necessary tools installed.
- The `airdrop` module needs to be part of your Konoha deployment setup.You should ensure it is included in your building process.

## Usage

The Konoha airdrop component is designed to integrate into your protocol without any dependencies on other Konoha components. This means it can be used standalone within the Konoha ecosystem.

- Merkle tree: You can take control of the tree by modifying the code to fit your protocol's needs.
- Event handling: You can add or modify events to better monitor the distribution of tokens to claimees and the amount of token being distributed.
- Governance token dispatcher: You can implement your token dispatch logic if your protocol uses a custom token standard.
  While the airdrop component is designed to work within the Konoha ecosystem, you can adapt it for use outside Konoha. However, you will need to ensure the contract interfaces match those of your deployment environment.

## Generating the Merkle Tree Root

To generate the Merkle tree root, you need to create a tree structure where each leaf is a hash of an airdrop claim and compute the root of the tree.
To serve the Merkle proofs, the proofs shoulld be generated using the Merkle tree and the generated proofs should be stored alongside its corresponding claim and served to the claimee.

```
fn compute_root(
  ref self: MerkleTree, mut current_node: felt252, mut proof: Span<felt252>
    ) -> felt252 {
        loop {
            match proof.pop_front() {
                Option::Some(proof_element) => {
                    // Compute the hash of the current node and the current element of the proof.
                    // We need to check if the current node is smaller than the current element of the proof.
                    // If it is, we need to swap the order of the hash.
                    let a: u256 = current_node.into();
                    let b: u256 = (*proof_element).into();
                    if b > a {
                        current_node = LegacyHash::hash(current_node, *proof_element);
                    } else {
                        current_node = LegacyHash::hash(*proof_element, current_node);
                    }
                },
                Option::None(()) => { break current_node; },
            };
        }
    }

```

#### Parameters

- `ref self: MerkleTree`: A reference to the current instance of the MerkleTree class.
- current_node: A mutable felt252 type representing the initial node.
- proof: A mutable span (or array) of felt252 type elements representing the Merkle proof.
- proof.pop_front(): removes and returns the first element of the proof. It returns `Option::Some(proof_element)` if there are elements left, or `Option::None` if the proof is empty.

## Integrating the Konoha Airdrop Component with the rest of Konoha

To integrate the airdrop component, you should ensure that the component can interact with other Konoha components and contracts such as the governance token dispatcher.

- The governance token dispatcher is used to mint tokens for the airdrop.
- ```
  let govtoken_addr = state.get_governance_token_address();
    IGovernanceTokenDispatcher { contract_address: govtoken_addr }
    .mint(claimee, u256 { high: 0, low: to_mint });

  ```
- Konoha's `Governance::unsafe_new_contract_state` is used to interact with the governance contract state.
- Konoha's `MerkleTreeTrait` is used to verify claims against the stored Merkle root.
