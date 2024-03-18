use starknet::SyscallResult;
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
    u64; // for Carmine 0 = amm, 1 = governance, 2 = CARM token, 3 = merkle tree root, 4 = no-op/signal vote
type OptionSide = felt252;
type OptionType = felt252;
