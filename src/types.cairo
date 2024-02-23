use starknet::{ClassHash, SyscallResult};
use starknet::syscalls::storage_read_syscall;
use starknet::syscalls::storage_write_syscall;
use starknet::storage_address_from_base_and_offset;
use core::serde::Serde;

#[derive(Copy, Drop, Serde, starknet::Store)]
struct PropDetails {
    payload: felt252,
    to_upgrade: felt252,
}

struct VoteCounts {
    yay: felt252,
    nay: felt252
}

type BlockNumber = felt252;
type VoteStatus = felt252; // 0 = not voted, 1 = yay, -1 = nay
type ContractType =
    felt252; // for Carmine 0 = amm, 1 = governance, 2 = CARM token, 3 = merkle tree root, 4 = no-op/signal vote
type OptionSide = felt252;
type OptionType = felt252;

// TODO Toufic suggestion:
// i would try to have these as part of the contract (constants in code) – not in storage to save
struct CustomProposal {
    class: ClassHash,
    function_selector: ClassHash,
    // maybe name?
    // maybe proposal type id?
}

// We need protocols that will be integrating the governance to be able to easily do this without altering it. So I would add a new module
// CustomProposals and require that it contains an impl for a trait like this:
// the precise form of integration will be probably redone later, now I lean towards having governance as a package with components and requiring
// any protocol that is using it to implement a few traits. hopefully that should all that's needed. this way we also lay the groundwork for #51
trait CustomProposalList {
    fn get_custom_proposals() -> Span<CustomProposal>; // 
}
