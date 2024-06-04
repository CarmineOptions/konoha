# Proposals

## Proposals Component Documentation

### Overview

The Proposals component is designed for governance within the Konoha ecosystem. It includes functions for voting on proposals, submitting new proposals and managing custom proposals. It primarily interacts with a governance token, allowing for token holders to participate in the decision-making process.
It includes functions for voting on proposals, submitting new proposals, and managing custom proposals.

## Storage

The storage structure for proposals is as follows:

- **proposal_details**: This maps proposal IDs to detailed proposal information.
- **proposal_vote_ends**: Maps proposal IDs to their respective voting end block numbers.
- **proposal_vote_end_timestamp**: Maps proposal IDs to their voting end timestamps.
- **proposal_voted_by**: Connects proposal IDs and user addresses to the voting status.
- **proposal_total_yay**: Tracks the count of votes in favor for each proposal.
- **proposal_total_nay**: Tracks the count of votes against each proposal.
- **proposal_applied**: Maps proposal IDs to their application status.
- **delegate_hash**: Maps user addresses to their delegate hash.
- **total_delegated_to**: Maps user addresses to their total delegated voting power.
- **custom_proposal_type**: Links custom proposal type IDs to CustomProposalConfig.
- **custom_proposal_payload**: Maps (proposal ID, index) to the calldata associated with the custom proposals. 


## Structures

- The `PropDetails` represents the details of a proposal.
  It consists of the `payload` which is the data associated with the proposal and `to_upgrade` which is the type of contract upgrade proposed.

- The `VoteStatus` indicates the voting status of a user on a proposal.
  It consists of the following possible values:

* 0: No vote cast.
* 1: Voted in favor.
* 2: Voted against.

- The `CustomProposalConfig` indicates the Configuration for custom proposals.
  It consists of the following Fields:

* target: The target contract for the custom proposal.
* selector: The function selector for the custom proposal.

# Integration

The Proposals component can be integrated into your protocol without any dependencies on other Konoha components. This means it can be used standalone within the Konoha ecosystem or potentially integrated into other systems that follow similar patterns.

## Key Functions

##### Submitting a Proposal

```

fn submit_proposal(
ref self: TContractState, payload: felt252, to_upgrade: ContractType
) -> felt252;

```

###### Parameters:

- payload: The data related to the proposal.
- to_upgrade: The type of contract upgrade proposed.
- Returns: A unique identifier for the submitted proposal.

##### Voting on a Proposal

```

fn vote(
ref self: TContractState,
prop_id: felt252,
opinion: felt252);

```

###### Parameters:

- prop_id: The identifier of the proposal.
- opinion: The user's vote (1 for yay, 2 for nay).

##### Getting Proposal Details

```

fn get_proposal_details(self: @TContractState,
prop_id: felt252) -> PropDetails;

```

###### Parameters:

- prop_id: The identifier of the proposal.
- Returns: The details of the specified proposal.

##### Getting Vote Counts

```
fn get_vote_counts(self: @TContractState,
prop_id: felt252) -> (u128, u128);

```

###### Parameters:

- prop_id: The identifier of the proposal.
- Returns: A tuple containing the yay and nay vote counts.

##### Getting Proposal Status

```
fn get_proposal_status(self: @TContractState,
prop_id: felt252) -> felt252;

```

###### Parameters:

- prop_id: The identifier of the proposal.
- Returns: The status of the proposal (e.g., active, passed, failed).

##### Getting Live Proposals

fn get_live_proposals(self: @TContractState) -> Array<felt252>;
Returns: An array of identifiers for active proposals.

##### Checking User Vote

```

fn get_user_voted(
self: @TContractState,
user_address: ContractAddress,
prop_id: felt252
) -> VoteStatus;

```

## Parameters:

- user_address: The address of the user.
- prop_id: The identifier of the proposal.
- Returns: The voting status of the user for the specified proposal.

## Customization

While the current version of the component does not support altering the built-in voting logic, this is an area planned for future development. If you have specific requirements or ideas for custom voting logic, now is an excellent time to reach out to us with your feedback and suggestions.
Here are some ways you can customize it:

Custom Voting Logic: This modifies the vote function to implement custom voting logic or add additional checks.

Proposal Validation: This extends the submit_proposal function to include additional validation or metadata for proposals. This allows for greater control over the types of proposals submitted and ensures that they meet the necessary criteria before being accepted.

### Dependencies

The Proposals component does not depend on other Konoha components, making it flexible and easy to integrate.

It interacts with a governance token contract, so ensure your protocol has a compatible ERC-20 governance token.

- Note: The governance token should be non-transferable.

### Conclusion

The Proposals component is a versatile and independent module for managing decentralized governance.
Its ease of integration and rich functionality make it a suitable choice for protocols looking to implement governance within the Konoha ecosystem or beyond. Customize and extend its features as needed to best fit your protocol’s requirements.
