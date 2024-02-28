Here is a comprehensive but evolutive list of the unit and integration tests to perform.


airdrops.cairo :

### Unit tests

1) Valid claim 

Simulate a claim with valid merkle proof, check the claimed amount is correctly
minted and recorded.

2) Claim with incorrect amount

The contract should reject the claim if the amount exceeds the one encoded in
the merkle proof.

3) Claim more than eligible through multiple claims

After successful claim, attempt another claim that would exceed the adress's
total eligible amount. Expecting rejection.


4) Claim with incorrect claimee

Attempt a claim with a merkle proof corresponding to a different address and
check if the contract rejects the claim.

5) Claim with invalid proof

Generate a random merkle proof and checks the contract correctly rejects it.

 
6) Claim with a proof that has already been used

Simply repeat a claim and expect the second one to be rejected.


### Integration tests

1) Simulate a valid claim and verify that the correct amount of governance
tokens is minted to the claimee's address.

2) Check that the Claimed event is correctly emitted when a claim is processed
successfully

3) Test contract's state update : after a successful claim, check that the
contract's storage reflects the claimed amount and prevents the same claimee
from claiming more than entitled


options.cairo : 

### Unit tests

1) Add valid option 

Ensure the addition of a single option (either call or put) with valid parameters
is successful.

2) Add option with invalid parameters

Make sure the contract rejects the addition of options with invalid parameters,
namely invalid option_type or unsupported asset pair.

3) Add two options with exact same parameters

Attempt to add two call or put options with same strike, maturity, vol, asset pair
and other features. The second addition should be rejected.


### Integration tests

1) Ensure that after adding an option, it can be traded on the AMM and the
liquidity pool is correctly updated

2) Options deployment and contract interaction

Deploy a new option contract and check that it interacts correctly with the
governance token contract for minting option tokens.

3) Validate the lifecycle of the option from its creation through trading up to its
expiry and settlement.

proposals.cairo :

### Usual proposal functionalities

1) Successful proposal submission : ensure the proposal submission is registered with a unique proposal id

2) Proposal expiry : check that the proposal is correctly flagged as expired after its voting deadline

3) Express proposal : create a proposition and simulate a massive vote to ensure the proposal is considered to be passed

4) Vote on an expired proposal : make sure the contract rejects a vote that occurs after the expiry of the proposal

5) Re-applying a proposal that has already passed : make sure the contract rejects the submission of a proposal that has expired in the past


### Delegate_vote and withdraw_delegation functions 

1) Multiple delegations with insufficient balance 

User A delegates a certain amount to user B, and immediately (e.g. without getting
any more balance in between) tries to delegate another sum to user C without
enough balance to cover both delegations.
The second delegation should fail (would test the already_delegated variable).

2) Delegation, vote, then delegation withdrawal

A delegates to B, then B votes on a proposal and A attempts to withdraw the 
delegation.
A should be prevented from withdrawing the delegation after B has voted.

3) Multiple delegations

A delegates to B multiple times with different amounts (with enough funds). 
B should receive the correct sum of amounts.

4) Full withdrawal and vote

A delegates to B at t1, then fully withdraws delegation. B tries to vote immediately after
using its voting power at t1.
Should fail to assert the voting power delegated from A to B has been withdrawn.

5) Withdraw more than delegated amount

A delegates an amount to B, then tries to withdraw more than the delegated amount.
Should obviously fail.

6) Withdraw delegation with incorrect calldata

A tries to withdraw a delegation with an unmatching calldata. Should fail.

7) Delegate, vote and withdraw

A delegates to B, B votes, then A withdraws the delegation and finally A attempts to vote 
on the same proposal.
Should prevent A from voting on the same proposal to avoid double counting.
