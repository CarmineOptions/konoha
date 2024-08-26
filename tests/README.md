Here is a comprehensive but evolutive list of the unit and integration tests we need.


## airdrops.cairo

### Unit tests

[] Valid claim 

Simulate a claim with valid merkle proof, check the claimed amount is correctly
minted and recorded.

### Integration tests

[] Simulate a valid claim and verify that the correct amount of governance
tokens is minted to the claimee's address. Check that the
contract's storage reflects the claimed amount

[] Check that the Claimed event is correctly emitted when a claim is processed
successfully

[] Simulate a valid claim and multiple invalid attempts:
 - claim second time with same proof
 - claim with invalid proof
 - update root
 - claim with old root + new proof, new root + old proof


## proposals.cairo

### Usual proposal functionalities

[x] Successful proposal submission : ensure the proposal submission is registered with a unique proposal id

[x] Proposal expiry : check that the proposal is correctly flagged as expired after its voting deadline

[x] Express proposal : create a proposition and simulate a massive vote to ensure the proposal is considered to be passed

[x] Vote on an expired proposal : make sure the contract rejects a vote that occurs after the expiry of the proposal

[] Re-applying a proposal that has already passed : make sure the contract rejects the submission of a proposal that has expired in the past

[] Change the quorum and proposal voting time


### Delegate_vote and withdraw_delegation functions 

Waiting for delegation to work

[] Multiple delegations with insufficient balance 

User A delegates a certain amount to user B, and immediately (e.g. without getting
any more balance in between) tries to delegate another sum to user C without
enough balance to cover both delegations.
The second delegation should fail (would test the already_delegated variable).

[] Delegation, vote, then delegation withdrawal

A delegates to B, then B votes on a proposal and A attempts to withdraw the 
delegation.
A should be prevented from withdrawing the delegation after B has voted.

[] Multiple delegations

A delegates to B multiple times with different amounts (with enough funds). 
B should receive the correct sum of amounts.

[] Full withdrawal and vote

A delegates to B at t1, then fully withdraws delegation. B tries to vote immediately after
using its voting power at t1.
Should fail to assert the voting power delegated from A to B has been withdrawn.

[] Withdraw more than delegated amount

A delegates an amount to B, then tries to withdraw more than the delegated amount.
Should obviously fail.

[] Withdraw delegation with incorrect calldata

A tries to withdraw a delegation with an unmatching calldata. Should fail.

[] Delegate, vote and withdraw

A delegates to B, B votes, then A withdraws the delegation and finally A attempts to vote 
on the same proposal.
Should prevent A from voting on the same proposal to avoid double counting.

### Health check

Runs tests on a specific, already deployed contract.


## upgrades.cairo

### Unit tests

[x] Apply a passed proposal

Test that a proposal marked as passed is correctly applied, including the appropriate contract upgrade.

[x] Apply already applied proposal

Ensure the contract rejects applying a proposal that has already been applied.

[x] Apply failed proposal

Ensure the contract rejects applying a proposal that did not pass.

[x] Apply non-existent proposal

Ensure the contract rejects applying a proposal that does not exist.

### Integration tests

[] Successful contract upgrade

Simulate a successful contract upgrade via a passed proposal and verify that the new implementation is in effect.

[] Custom proposal execution

Simulate the execution of a custom proposal and verify that the specified action is correctly performed.

[] Multiple contract upgrades

Simulate multiple successful contract upgrades and ensure that each upgrade is correctly applied.

[] Event emission

Verify that the appropriate events (Upgraded, etc.) are correctly emitted during successful and failed upgrade attempts.
