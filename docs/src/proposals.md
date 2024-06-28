# Proposals

The core of Konoha are proposals. This is one of the two components (the other being [upgrades](upgrades.md) that should be mixed into every deployed instance.

## Constants

To propose a proposal, you need 1/200 of the total supply of the voting token.

By default, it takes a week for a proposal to pass.

Both values are adjustable in `constants.cairo`.

## Proposal types

Konoha supports three different types of proposals:
- builtin proposals
- custom proposals
- arbitrary proposals

### Builtin proposals

These are for upgrades of the governance contract itself and for replacing the current merkle tree root.

To propose a builtin proposal, call `submit_proposal` with parameters:
- payload – meaning varies based on the `to_upgrade` value.
    - class hash of the new governance contract if `to_upgrade == 1`
    - merkle tree root for the airdrop component if `to_upgrade == 3`
    - no other builtin proposals are supported

### Custom proposals

Well suited for actions that are to be performed relatively frequently and that follow code paths defined ahead of time. Even though you could use an arbitrary proposal for everything that you would use a custom one for, this is not recommended as it obfuscates the meaning of proposals for anyone wishing to verify what is actually being passed.

Examples of what custom proposals are for:
- adjust risk parameters of a lending protocol
- adjust the caps on a protocol such as Nimbora
- deposit funds accumulated in treasury to a lending pool or distribute them to tokenholders
- add options to a protocol such as Carmine Options or adjust parameters

To define a custom proposal, either call `add_custom_proposal_config` in the constructor of your contract or use an arbitrary proposal that will call `add_custom_proposal_config` under the hood.

#### Custom proposal configuration

A custom proposal is defined by the following values:
- `target` – the contract to be called when executing
- `selector` – function on the target contract to call
- `library_call` – whether this should be called from the governance contract (`false`) or should be executed in the context of governance as a [library call](https://docs.starknet.io/documentation/architecture_and_concepts/Smart_Contracts/system-calls/#library_call). For most custom proposals, it should be enough to keep this as `false`, unless you need to execute multiple different calls in one proposal.

### Arbitrary proposals

These allow the execution of arbitrary code in the execution context (and with the corresponding rights) of the main governance contract.

To prepare an arbitrary proposal, first declare a class with the function `execute_arbitrary_proposal` and note the class hash. This function will execute in the context of governance (will be library called).

To then propose an arbitrary proposal, call `submit_proposal` with `to_upgrade = 6`, and the payload being the class hash of the previously declared class.
