export const abi = [
  {
    "name": "Governance",
    "type": "impl",
    "interface_name": "konoha::contract::IGovernance"
  },
  {
    "name": "konoha::contract::IGovernance",
    "type": "interface",
    "items": [
      {
        "name": "get_governance_token_address",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "state_mutability": "view"
      }
    ]
  },
  {
    "name": "Airdrop",
    "type": "impl",
    "interface_name": "konoha::airdrop::IAirdrop"
  },
  {
    "name": "konoha::airdrop::IAirdrop",
    "type": "interface",
    "items": [
      {
        "name": "claim",
        "type": "function",
        "inputs": [
          {
            "name": "claimee",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "amount",
            "type": "core::integer::u128"
          },
          {
            "name": "proof",
            "type": "core::array::Array::<core::felt252>"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      }
    ]
  },
  {
    "name": "Vesting",
    "type": "impl",
    "interface_name": "konoha::vesting::IVesting"
  },
  {
    "name": "konoha::vesting::IVesting",
    "type": "interface",
    "items": [
      {
        "name": "vest",
        "type": "function",
        "inputs": [
          {
            "name": "grantee",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "vested_timestamp",
            "type": "core::integer::u64"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "add_vesting_milestone",
        "type": "function",
        "inputs": [
          {
            "name": "vesting_timestamp",
            "type": "core::integer::u64"
          },
          {
            "name": "grantee",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "amount",
            "type": "core::integer::u128"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "add_linear_vesting_schedule",
        "type": "function",
        "inputs": [
          {
            "name": "first_vest",
            "type": "core::integer::u64"
          },
          {
            "name": "period",
            "type": "core::integer::u64"
          },
          {
            "name": "increments_count",
            "type": "core::integer::u16"
          },
          {
            "name": "total_amount",
            "type": "core::integer::u128"
          },
          {
            "name": "grantee",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      }
    ]
  },
  {
    "name": "Proposals",
    "type": "impl",
    "interface_name": "konoha::proposals::IProposals"
  },
  {
    "name": "konoha::types::PropDetails",
    "type": "struct",
    "members": [
      {
        "name": "payload",
        "type": "core::felt252"
      },
      {
        "name": "to_upgrade",
        "type": "core::felt252"
      }
    ]
  },
  {
    "name": "core::array::Span::<core::felt252>",
    "type": "struct",
    "members": [
      {
        "name": "snapshot",
        "type": "@core::array::Array::<core::felt252>"
      }
    ]
  },
  {
    "name": "core::bool",
    "type": "enum",
    "variants": [
      {
        "name": "False",
        "type": "()"
      },
      {
        "name": "True",
        "type": "()"
      }
    ]
  },
  {
    "name": "konoha::types::CustomProposalConfig",
    "type": "struct",
    "members": [
      {
        "name": "target",
        "type": "core::felt252"
      },
      {
        "name": "selector",
        "type": "core::felt252"
      },
      {
        "name": "library_call",
        "type": "core::bool"
      },
      {
        "name": "proposal_voting_time",
        "type": "core::integer::u32"
      }
    ]
  },
  {
    "name": "konoha::proposals::IProposals",
    "type": "interface",
    "items": [
      {
        "name": "vote",
        "type": "function",
        "inputs": [
          {
            "name": "prop_id",
            "type": "core::felt252"
          },
          {
            "name": "opinion",
            "type": "core::felt252"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "get_proposal_details",
        "type": "function",
        "inputs": [
          {
            "name": "prop_id",
            "type": "core::felt252"
          }
        ],
        "outputs": [
          {
            "type": "konoha::types::PropDetails"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "get_vote_counts",
        "type": "function",
        "inputs": [
          {
            "name": "prop_id",
            "type": "core::felt252"
          }
        ],
        "outputs": [
          {
            "type": "(core::integer::u128, core::integer::u128)"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "submit_proposal",
        "type": "function",
        "inputs": [
          {
            "name": "payload",
            "type": "core::felt252"
          },
          {
            "name": "to_upgrade",
            "type": "core::integer::u64"
          }
        ],
        "outputs": [
          {
            "type": "core::felt252"
          }
        ],
        "state_mutability": "external"
      },
      {
        "name": "get_proposal_status",
        "type": "function",
        "inputs": [
          {
            "name": "prop_id",
            "type": "core::felt252"
          }
        ],
        "outputs": [
          {
            "type": "core::felt252"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "get_live_proposals",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::array::Array::<core::felt252>"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "get_user_voted",
        "type": "function",
        "inputs": [
          {
            "name": "user_address",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "prop_id",
            "type": "core::felt252"
          }
        ],
        "outputs": [
          {
            "type": "core::felt252"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "submit_custom_proposal",
        "type": "function",
        "inputs": [
          {
            "name": "custom_proposal_type",
            "type": "core::integer::u32"
          },
          {
            "name": "calldata",
            "type": "core::array::Span::<core::felt252>"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u32"
          }
        ],
        "state_mutability": "external"
      },
      {
        "name": "get_custom_proposal_type",
        "type": "function",
        "inputs": [
          {
            "name": "i",
            "type": "core::integer::u32"
          }
        ],
        "outputs": [
          {
            "type": "konoha::types::CustomProposalConfig"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "delegate_vote",
        "type": "function",
        "inputs": [
          {
            "name": "to_addr",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "calldata",
            "type": "core::array::Array::<(core::starknet::contract_address::ContractAddress, core::integer::u128)>"
          },
          {
            "name": "amount",
            "type": "core::integer::u128"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "withdraw_delegation",
        "type": "function",
        "inputs": [
          {
            "name": "to_addr",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "calldata",
            "type": "core::array::Array::<(core::starknet::contract_address::ContractAddress, core::integer::u128)>"
          },
          {
            "name": "amount",
            "type": "core::integer::u128"
          },
          {
            "name": "prop_id",
            "type": "core::felt252"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "get_total_delegated_to",
        "type": "function",
        "inputs": [
          {
            "name": "to_addr",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u128"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "add_custom_proposal_config",
        "type": "function",
        "inputs": [
          {
            "name": "config",
            "type": "konoha::types::CustomProposalConfig"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u32"
          }
        ],
        "state_mutability": "external"
      },
      {
        "name": "set_default_proposal_params",
        "type": "function",
        "inputs": [
          {
            "name": "quorum",
            "type": "core::integer::u32"
          },
          {
            "name": "proposal_voting_seconds",
            "type": "core::integer::u32"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      }
    ]
  },
  {
    "name": "Upgrades",
    "type": "impl",
    "interface_name": "konoha::upgrades::IUpgrades"
  },
  {
    "name": "konoha::upgrades::IUpgrades",
    "type": "interface",
    "items": [
      {
        "name": "apply_passed_proposal",
        "type": "function",
        "inputs": [
          {
            "name": "prop_id",
            "type": "core::felt252"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      }
    ]
  },
  {
    "name": "Discussions",
    "type": "impl",
    "interface_name": "konoha::discussion::IDiscussion"
  },
  {
    "name": "core::byte_array::ByteArray",
    "type": "struct",
    "members": [
      {
        "name": "data",
        "type": "core::array::Array::<core::bytes_31::bytes31>"
      },
      {
        "name": "pending_word",
        "type": "core::felt252"
      },
      {
        "name": "pending_word_len",
        "type": "core::integer::u32"
      }
    ]
  },
  {
    "name": "konoha::types::Comment",
    "type": "struct",
    "members": [
      {
        "name": "user",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "ipfs_hash",
        "type": "core::byte_array::ByteArray"
      }
    ]
  },
  {
    "name": "konoha::discussion::IDiscussion",
    "type": "interface",
    "items": [
      {
        "name": "add_comment",
        "type": "function",
        "inputs": [
          {
            "name": "prop_id",
            "type": "core::integer::u32"
          },
          {
            "name": "ipfs_hash",
            "type": "core::byte_array::ByteArray"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "get_comments",
        "type": "function",
        "inputs": [
          {
            "name": "prop_id",
            "type": "core::integer::u32"
          }
        ],
        "outputs": [
          {
            "type": "core::array::Array::<konoha::types::Comment>"
          }
        ],
        "state_mutability": "view"
      }
    ]
  },
  {
    "name": "Staking",
    "type": "impl",
    "interface_name": "konoha::staking::IStaking"
  },
  {
    "name": "konoha::staking::staking::Stake",
    "type": "struct",
    "members": [
      {
        "name": "amount_staked",
        "type": "core::integer::u128"
      },
      {
        "name": "amount_voting_token",
        "type": "core::integer::u128"
      },
      {
        "name": "start_date",
        "type": "core::integer::u64"
      },
      {
        "name": "length",
        "type": "core::integer::u64"
      },
      {
        "name": "withdrawn",
        "type": "core::bool"
      }
    ]
  },
  {
    "name": "konoha::staking::IStaking",
    "type": "interface",
    "items": [
      {
        "name": "stake",
        "type": "function",
        "inputs": [
          {
            "name": "length",
            "type": "core::integer::u64"
          },
          {
            "name": "amount",
            "type": "core::integer::u128"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u32"
          }
        ],
        "state_mutability": "external"
      },
      {
        "name": "unstake",
        "type": "function",
        "inputs": [
          {
            "name": "id",
            "type": "core::integer::u32"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "unstake_airdrop",
        "type": "function",
        "inputs": [
          {
            "name": "amount",
            "type": "core::integer::u128"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "set_curve_point",
        "type": "function",
        "inputs": [
          {
            "name": "length",
            "type": "core::integer::u64"
          },
          {
            "name": "conversion_rate",
            "type": "core::integer::u16"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "set_floating_token_address",
        "type": "function",
        "inputs": [
          {
            "name": "address",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "get_floating_token_address",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "get_stake",
        "type": "function",
        "inputs": [
          {
            "name": "address",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "stake_id",
            "type": "core::integer::u32"
          }
        ],
        "outputs": [
          {
            "type": "konoha::staking::staking::Stake"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "get_total_voting_power",
        "type": "function",
        "inputs": [
          {
            "name": "address",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u128"
          }
        ],
        "state_mutability": "view"
      }
    ]
  },
  {
    "name": "Streaming",
    "type": "impl",
    "interface_name": "konoha::streaming::IStreaming"
  },
  {
    "name": "konoha::streaming::IStreaming",
    "type": "interface",
    "items": [
      {
        "name": "add_new_stream",
        "type": "function",
        "inputs": [
          {
            "name": "recipient",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "start_time",
            "type": "core::integer::u64"
          },
          {
            "name": "end_time",
            "type": "core::integer::u64"
          },
          {
            "name": "total_amount",
            "type": "core::integer::u128"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "claim_stream",
        "type": "function",
        "inputs": [
          {
            "name": "recipient",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "start_time",
            "type": "core::integer::u64"
          },
          {
            "name": "end_time",
            "type": "core::integer::u64"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "cancel_stream",
        "type": "function",
        "inputs": [
          {
            "name": "recipient",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "start_time",
            "type": "core::integer::u64"
          },
          {
            "name": "end_time",
            "type": "core::integer::u64"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "get_stream_info",
        "type": "function",
        "inputs": [
          {
            "name": "recipient",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "start_time",
            "type": "core::integer::u64"
          },
          {
            "name": "end_time",
            "type": "core::integer::u64"
          }
        ],
        "outputs": [
          {
            "type": "(core::integer::u128, core::integer::u128)"
          }
        ],
        "state_mutability": "external"
      }
    ]
  },
  {
    "name": "constructor",
    "type": "constructor",
    "inputs": [
      {
        "name": "voting_token_class",
        "type": "core::starknet::class_hash::ClassHash"
      },
      {
        "name": "floating_token_class",
        "type": "core::starknet::class_hash::ClassHash"
      },
      {
        "name": "treasury_classhash",
        "type": "core::starknet::class_hash::ClassHash"
      },
      {
        "name": "recipient",
        "type": "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "konoha::contract::Governance::Proposed",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "prop_id",
        "type": "core::felt252"
      },
      {
        "kind": "data",
        "name": "payload",
        "type": "core::felt252"
      },
      {
        "kind": "data",
        "name": "to_upgrade",
        "type": "core::integer::u64"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "konoha::contract::Governance::Voted",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "prop_id",
        "type": "core::felt252"
      },
      {
        "kind": "data",
        "name": "voter",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "kind": "data",
        "name": "opinion",
        "type": "core::felt252"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "konoha::airdrop::airdrop::Claimed",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "address",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "kind": "data",
        "name": "received",
        "type": "core::integer::u128"
      }
    ]
  },
  {
    "kind": "enum",
    "name": "konoha::airdrop::airdrop::Event",
    "type": "event",
    "variants": [
      {
        "kind": "nested",
        "name": "Claimed",
        "type": "konoha::airdrop::airdrop::Claimed"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "konoha::vesting::vesting::VestingMilestoneAdded",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "grantee",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "kind": "data",
        "name": "timestamp",
        "type": "core::integer::u64"
      },
      {
        "kind": "data",
        "name": "amount",
        "type": "core::integer::u128"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "konoha::vesting::vesting::Vested",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "grantee",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "kind": "data",
        "name": "timestamp",
        "type": "core::integer::u64"
      },
      {
        "kind": "data",
        "name": "amount",
        "type": "core::integer::u128"
      }
    ]
  },
  {
    "kind": "enum",
    "name": "konoha::vesting::vesting::Event",
    "type": "event",
    "variants": [
      {
        "kind": "nested",
        "name": "VestingMilestoneAdded",
        "type": "konoha::vesting::vesting::VestingMilestoneAdded"
      },
      {
        "kind": "nested",
        "name": "Vested",
        "type": "konoha::vesting::vesting::Vested"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "konoha::proposals::proposals::Proposed",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "prop_id",
        "type": "core::felt252"
      },
      {
        "kind": "data",
        "name": "payload",
        "type": "core::felt252"
      },
      {
        "kind": "data",
        "name": "to_upgrade",
        "type": "core::integer::u64"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "konoha::proposals::proposals::Voted",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "prop_id",
        "type": "core::felt252"
      },
      {
        "kind": "data",
        "name": "voter",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "kind": "data",
        "name": "opinion",
        "type": "core::felt252"
      }
    ]
  },
  {
    "kind": "enum",
    "name": "konoha::proposals::proposals::Event",
    "type": "event",
    "variants": [
      {
        "kind": "nested",
        "name": "Proposed",
        "type": "konoha::proposals::proposals::Proposed"
      },
      {
        "kind": "nested",
        "name": "Voted",
        "type": "konoha::proposals::proposals::Voted"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "konoha::upgrades::upgrades::Upgraded",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "prop_id",
        "type": "core::integer::u64"
      },
      {
        "kind": "data",
        "name": "upgrade_type",
        "type": "core::integer::u64"
      }
    ]
  },
  {
    "kind": "enum",
    "name": "konoha::upgrades::upgrades::Event",
    "type": "event",
    "variants": [
      {
        "kind": "nested",
        "name": "Upgraded",
        "type": "konoha::upgrades::upgrades::Upgraded"
      }
    ]
  },
  {
    "kind": "enum",
    "name": "konoha::discussion::discussion::Event",
    "type": "event",
    "variants": []
  },
  {
    "kind": "struct",
    "name": "konoha::staking::staking::Staked",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "user",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "kind": "data",
        "name": "stake_id",
        "type": "core::integer::u32"
      },
      {
        "kind": "data",
        "name": "amount",
        "type": "core::integer::u128"
      },
      {
        "kind": "data",
        "name": "amount_voting_token",
        "type": "core::integer::u128"
      },
      {
        "kind": "data",
        "name": "start_date",
        "type": "core::integer::u64"
      },
      {
        "kind": "data",
        "name": "length",
        "type": "core::integer::u64"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "konoha::staking::staking::Unstaked",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "user",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "kind": "data",
        "name": "stake_id",
        "type": "core::integer::u32"
      },
      {
        "kind": "data",
        "name": "amount",
        "type": "core::integer::u128"
      },
      {
        "kind": "data",
        "name": "amount_voting_token",
        "type": "core::integer::u128"
      },
      {
        "kind": "data",
        "name": "start_date",
        "type": "core::integer::u64"
      },
      {
        "kind": "data",
        "name": "length",
        "type": "core::integer::u64"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "konoha::staking::staking::UnstakedAirdrop",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "user",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "kind": "data",
        "name": "amount",
        "type": "core::integer::u128"
      }
    ]
  },
  {
    "kind": "enum",
    "name": "konoha::staking::staking::Event",
    "type": "event",
    "variants": [
      {
        "kind": "nested",
        "name": "Staked",
        "type": "konoha::staking::staking::Staked"
      },
      {
        "kind": "nested",
        "name": "Unstaked",
        "type": "konoha::staking::staking::Unstaked"
      },
      {
        "kind": "nested",
        "name": "UnstakedAirdrop",
        "type": "konoha::staking::staking::UnstakedAirdrop"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "konoha::streaming::streaming::StreamCreated",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "recipient",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "kind": "data",
        "name": "start_time",
        "type": "core::integer::u64"
      },
      {
        "kind": "data",
        "name": "end_time",
        "type": "core::integer::u64"
      },
      {
        "kind": "data",
        "name": "total_amount",
        "type": "core::integer::u128"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "konoha::streaming::streaming::StreamClaimed",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "recipient",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "kind": "data",
        "name": "start_time",
        "type": "core::integer::u64"
      },
      {
        "kind": "data",
        "name": "end_time",
        "type": "core::integer::u64"
      },
      {
        "kind": "data",
        "name": "total_amount",
        "type": "core::integer::u128"
      }
    ]
  },
  {
    "name": "core::integer::u256",
    "type": "struct",
    "members": [
      {
        "name": "low",
        "type": "core::integer::u128"
      },
      {
        "name": "high",
        "type": "core::integer::u128"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "konoha::streaming::streaming::StreamCanceled",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "recipient",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "kind": "data",
        "name": "start_time",
        "type": "core::integer::u64"
      },
      {
        "kind": "data",
        "name": "end_time",
        "type": "core::integer::u64"
      },
      {
        "kind": "data",
        "name": "reclaimed_amount",
        "type": "core::integer::u256"
      }
    ]
  },
  {
    "kind": "enum",
    "name": "konoha::streaming::streaming::Event",
    "type": "event",
    "variants": [
      {
        "kind": "nested",
        "name": "StreamCreated",
        "type": "konoha::streaming::streaming::StreamCreated"
      },
      {
        "kind": "nested",
        "name": "StreamClaimed",
        "type": "konoha::streaming::streaming::StreamClaimed"
      },
      {
        "kind": "nested",
        "name": "StreamCanceled",
        "type": "konoha::streaming::streaming::StreamCanceled"
      }
    ]
  },
  {
    "kind": "enum",
    "name": "konoha::contract::Governance::Event",
    "type": "event",
    "variants": [
      {
        "kind": "nested",
        "name": "Proposed",
        "type": "konoha::contract::Governance::Proposed"
      },
      {
        "kind": "nested",
        "name": "Voted",
        "type": "konoha::contract::Governance::Voted"
      },
      {
        "kind": "nested",
        "name": "AirdropEvent",
        "type": "konoha::airdrop::airdrop::Event"
      },
      {
        "kind": "nested",
        "name": "VestingEvent",
        "type": "konoha::vesting::vesting::Event"
      },
      {
        "kind": "nested",
        "name": "ProposalsEvent",
        "type": "konoha::proposals::proposals::Event"
      },
      {
        "kind": "nested",
        "name": "UpgradesEvent",
        "type": "konoha::upgrades::upgrades::Event"
      },
      {
        "kind": "nested",
        "name": "DiscussionEvent",
        "type": "konoha::discussion::discussion::Event"
      },
      {
        "kind": "nested",
        "name": "StakingEvent",
        "type": "konoha::staking::staking::Event"
      },
      {
        "kind": "nested",
        "name": "StreamingEvent",
        "type": "konoha::streaming::streaming::Event"
      }
    ]
  }
]