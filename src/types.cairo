use starknet::StorageAccess;
use starknet::SyscallResult;
use starknet::storage_access::StorageBaseAddress;
use starknet::syscalls::storage_read_syscall;
use starknet::syscalls::storage_write_syscall;
use starknet::storage_address_from_base_and_offset;
use core::serde::Serde;

#[derive(Copy, Drop)]
struct PropDetails {
    impl_hash: felt252,
    to_upgrade: felt252,
}

struct VoteCounts {
    yay: felt252,
    nay: felt252
}

type BlockNumber = felt252;
type VoteStatus = felt252; // 0 = not voted, 1 = yay, -1 = nay
type ContractType = felt252; // for Carmine 0 = amm, 1 = governance, 2 = CARM token
type OptionSide = felt252;
type OptionType = felt252;

impl StorageAccessPropDetails of StorageAccess<PropDetails> {
    fn read(address_domain: u32, base: StorageBaseAddress) -> SyscallResult<PropDetails> {
        Result::Ok(
            PropDetails {
                impl_hash: StorageAccess::<felt252>::read(address_domain, base)?,
                to_upgrade: storage_read_syscall(
                    address_domain, storage_address_from_base_and_offset(base, 1_u8)
                )?
            }
        )
    }

    fn write(
        address_domain: u32, base: StorageBaseAddress, value: PropDetails
    ) -> SyscallResult<()> {
        StorageAccess::<felt252>::write(address_domain, base, value.impl_hash)?;
        storage_write_syscall(
            address_domain, storage_address_from_base_and_offset(base, 1_u8), value.to_upgrade
        )
    }
}

impl PropDetailsSerde of serde::Serde<PropDetails> {
    fn serialize(self: @PropDetails, ref output: array::Array<felt252>) {
        self.impl_hash.serialize(ref output);
        self.to_upgrade.serialize(ref output);
    }
    fn deserialize(ref serialized: array::Span<felt252>) -> Option<PropDetails> {
        Option::Some(
            PropDetails {
                impl_hash: serde::Serde::deserialize(ref serialized)?,
                to_upgrade: serde::Serde::deserialize(ref serialized)?,
            }
        )
    }
}
