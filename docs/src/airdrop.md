# Airdrop

The Konoha Airdrop component uses the Merkle tree-based airdrop system to distribute rewards or protocol tokens accurately. It ensures that only eligible claimee can claim tokens, track claimed tokens to prevent multiple claims, and emits events for successful claims. Each protocol deploying this component can manage its own airdrop, ensuring accuracy.

## Features

* Merkle Tree Validation System: Uses proofs to verify claims ensuring that each participant can only claim their tokens. The contract determines the submitted Merkle proof against all previously added roots. If a match is found, indicating eligibility, the contract proceeds with the distribution.
  
* Event Emission: The contract emits a `Claimed` event for each successful claim. This event includes the claimee's address and the amount received, enabling easy monitoring and logging of claims.
  
* Prevents claimee from claiming more than eligible for. Claimees receive the requested claim amount minus any amount claimed so far.

## Setup

* Protocols intending to use the Konoha airdrop contract to distribute airdrops should deploy its instance of the contract.
  
* Set the merkle root: When a new round of airdrops is available, add the merkle root to the contract to validate claims.
  
* Claimees can claim their tokens by providing their address, claimable amount and proof.
  
## Usage

The Konoha airdrop component is designed to work within the framework and it offers various customization options to fit each protocol needs.

* Merkle tree: You can take control of the tree by modifying the code to fit your protocol's needs.
  
* Event handling: You can add or modify events to better monitor the distribution of tokens to claimees and the amount of token being distributed.
  
* Governance token dispatcher: You can implement your token dispatch logic if your protocol uses a custom token standard.