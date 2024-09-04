use core::serde::Serde;
use starknet::ContractAddress;
use starknet::SyscallResult;
use starknet::storage_address_from_base_and_offset;
use starknet::syscalls::{storage_read_syscall, storage_write_syscall, ClassHash};

#[derive(Copy, Drop, Serde, starknet::Store)]
struct PropDetails {
    payload: felt252,
    to_upgrade: felt252,
}

struct VoteCounts {
    yay: felt252,
    nay: felt252
}

#[derive(Drop, Serde)]
struct GuardiansInfo {
    guardians: Array<Guardian>,
    active_guardians_count: u32,
    total_guardians_count: u32
}

type BlockNumber = felt252;
type VoteStatus = felt252; // 0 = not voted, 1 = yay, 2 = nay
type ContractType =
    u64; // for Carmine 0 = amm, 1 = governance, 2 = CARM token, 3 = merkle tree root, 4 = no-op/signal vote, 5 = custom proposal

#[derive(Copy, Drop, Serde, starknet::Store)]
struct CustomProposalConfig {
    target: felt252, //class hash if library call, contract address if regular call
    selector: felt252,
    library_call: bool,
    proposal_voting_time: u32
}

#[derive(Drop, Serde, starknet::Store)]
struct Comment {
    user: ContractAddress,
    ipfs_hash: ByteArray,
}

#[derive(Drop, Copy, PartialEq, Serde, starknet::Store)]
enum TransferStatus {
    PENDING,
    CANCELLED,
    FINISHED
}

#[derive(Drop, Serde, starknet::Store, fmt::Debug)]
struct Transfer {
    id: u64,
    token_addr: ContractAddress,
    receiver: ContractAddress,
    amount: u256,
    cooldown_end: u64,
    status: TransferStatus
}

#[derive(Drop, Serde, starknet::Store)]
struct Guardian {
    address: ContractAddress,
    is_active: bool
}
