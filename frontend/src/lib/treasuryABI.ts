export const TreasuryABI = [
    {
        "type": "impl",
        "name": "Treasury",
        "interface_name": "konoha::treasury::ITreasury"
    },
    {
        "type": "struct",
        "name": "core::integer::u256",
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
        "type": "enum",
        "name": "konoha::types::TransferStatus",
        "variants": [
            {
                "name": "PENDING",
                "type": "()"
            },
            {
                "name": "CANCELLED",
                "type": "()"
            },
            {
                "name": "FINISHED",
                "type": "()"
            }
        ]
    },
    {
        "type": "struct",
        "name": "konoha::types::Transfer",
        "members": [
            {
                "name": "id",
                "type": "core::integer::u64"
            },
            {
                "name": "token_addr",
                "type": "core::starknet::contract_address::ContractAddress"
            },
            {
                "name": "receiver",
                "type": "core::starknet::contract_address::ContractAddress"
            },
            {
                "name": "amount",
                "type": "core::integer::u256"
            },
            {
                "name": "cooldown_end",
                "type": "core::integer::u64"
            },
            {
                "name": "status",
                "type": "konoha::types::TransferStatus"
            }
        ]
    },
    {
        "type": "enum",
        "name": "core::option::Option::<konoha::types::Transfer>",
        "variants": [
            {
                "name": "Some",
                "type": "konoha::types::Transfer"
            },
            {
                "name": "None",
                "type": "()"
            }
        ]
    },
    {
        "type": "struct",
        "name": "core::array::Span::<konoha::types::Transfer>",
        "members": [
            {
                "name": "snapshot",
                "type": "@core::array::Array::<konoha::types::Transfer>"
            }
        ]
    },
    {
        "type": "enum",
        "name": "core::bool",
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
        "type": "struct",
        "name": "konoha::types::Guardian",
        "members": [
            {
                "name": "address",
                "type": "core::starknet::contract_address::ContractAddress"
            },
            {
                "name": "is_active",
                "type": "core::bool"
            }
        ]
    },
    {
        "type": "struct",
        "name": "konoha::types::GuardiansInfo",
        "members": [
            {
                "name": "guardians",
                "type": "core::array::Array::<konoha::types::Guardian>"
            },
            {
                "name": "active_guardians_count",
                "type": "core::integer::u32"
            },
            {
                "name": "total_guardians_count",
                "type": "core::integer::u32"
            }
        ]
    },
    {
        "type": "interface",
        "name": "konoha::treasury::ITreasury",
        "items": [
            {
                "type": "function",
                "name": "add_transfer",
                "inputs": [
                    {
                        "name": "receiver",
                        "type": "core::starknet::contract_address::ContractAddress"
                    },
                    {
                        "name": "amount",
                        "type": "core::integer::u256"
                    },
                    {
                        "name": "token_addr",
                        "type": "core::starknet::contract_address::ContractAddress"
                    }
                ],
                "outputs": [
                    {
                        "type": "konoha::types::Transfer"
                    }
                ],
                "state_mutability": "external"
            },
            {
                "type": "function",
                "name": "get_next_pending",
                "inputs": [],
                "outputs": [
                    {
                        "type": "core::option::Option::<konoha::types::Transfer>"
                    }
                ],
                "state_mutability": "view"
            },
            {
                "type": "function",
                "name": "get_failed_transfers",
                "inputs": [],
                "outputs": [
                    {
                        "type": "core::array::Span::<konoha::types::Transfer>"
                    }
                ],
                "state_mutability": "view"
            },
            {
                "type": "function",
                "name": "get_finished_transfers",
                "inputs": [],
                "outputs": [
                    {
                        "type": "core::array::Span::<konoha::types::Transfer>"
                    }
                ],
                "state_mutability": "view"
            },
            {
                "type": "function",
                "name": "get_live_transfers",
                "inputs": [],
                "outputs": [
                    {
                        "type": "core::array::Span::<konoha::types::Transfer>"
                    }
                ],
                "state_mutability": "view"
            },
            {
                "type": "function",
                "name": "get_cancelled_transfers",
                "inputs": [],
                "outputs": [
                    {
                        "type": "core::array::Span::<konoha::types::Transfer>"
                    }
                ],
                "state_mutability": "view"
            },
            {
                "type": "function",
                "name": "get_active_guardians",
                "inputs": [],
                "outputs": [
                    {
                        "type": "konoha::types::GuardiansInfo"
                    }
                ],
                "state_mutability": "view"
            },
            {
                "type": "function",
                "name": "get_inactive_guardians",
                "inputs": [],
                "outputs": [
                    {
                        "type": "konoha::types::GuardiansInfo"
                    }
                ],
                "state_mutability": "view"
            },
            {
                "type": "function",
                "name": "get_transfer_by_id",
                "inputs": [
                    {
                        "name": "transfer_id",
                        "type": "core::integer::u64"
                    }
                ],
                "outputs": [
                    {
                        "type": "konoha::types::Transfer"
                    }
                ],
                "state_mutability": "view"
            },
            {
                "type": "function",
                "name": "cancel_transfer",
                "inputs": [
                    {
                        "name": "transfer_id",
                        "type": "core::integer::u64"
                    }
                ],
                "outputs": [],
                "state_mutability": "external"
            },
            {
                "type": "function",
                "name": "execute_pending_by_id",
                "inputs": [
                    {
                        "name": "transfer_id",
                        "type": "core::integer::u64"
                    }
                ],
                "outputs": [
                    {
                        "type": "core::bool"
                    }
                ],
                "state_mutability": "external"
            },
            {
                "type": "function",
                "name": "add_pending_guardian",
                "inputs": [
                    {
                        "name": "guardian_address",
                        "type": "core::starknet::contract_address::ContractAddress"
                    }
                ],
                "outputs": [],
                "state_mutability": "external"
            },
            {
                "type": "function",
                "name": "approve_guardian",
                "inputs": [
                    {
                        "name": "guardian_address",
                        "type": "core::starknet::contract_address::ContractAddress"
                    }
                ],
                "outputs": [],
                "state_mutability": "external"
            },
            {
                "type": "function",
                "name": "deactivate_guardian",
                "inputs": [
                    {
                        "name": "guardian_address",
                        "type": "core::starknet::contract_address::ContractAddress"
                    }
                ],
                "outputs": [],
                "state_mutability": "external"
            },
            {
                "type": "function",
                "name": "send_tokens_to_address",
                "inputs": [
                    {
                        "name": "receiver",
                        "type": "core::starknet::contract_address::ContractAddress"
                    },
                    {
                        "name": "amount",
                        "type": "core::integer::u256"
                    },
                    {
                        "name": "token_addr",
                        "type": "core::starknet::contract_address::ContractAddress"
                    }
                ],
                "outputs": [
                    {
                        "type": "core::bool"
                    }
                ],
                "state_mutability": "external"
            },
            {
                "type": "function",
                "name": "update_AMM_address",
                "inputs": [
                    {
                        "name": "new_amm_address",
                        "type": "core::starknet::contract_address::ContractAddress"
                    }
                ],
                "outputs": [],
                "state_mutability": "external"
            },
            {
                "type": "function",
                "name": "provide_liquidity_to_carm_AMM",
                "inputs": [
                    {
                        "name": "pooled_token_addr",
                        "type": "core::starknet::contract_address::ContractAddress"
                    },
                    {
                        "name": "quote_token_address",
                        "type": "core::starknet::contract_address::ContractAddress"
                    },
                    {
                        "name": "base_token_address",
                        "type": "core::starknet::contract_address::ContractAddress"
                    },
                    {
                        "name": "option_type",
                        "type": "core::felt252"
                    },
                    {
                        "name": "amount",
                        "type": "core::integer::u256"
                    }
                ],
                "outputs": [],
                "state_mutability": "external"
            },
            {
                "type": "function",
                "name": "withdraw_liquidity",
                "inputs": [
                    {
                        "name": "pooled_token_addr",
                        "type": "core::starknet::contract_address::ContractAddress"
                    },
                    {
                        "name": "quote_token_address",
                        "type": "core::starknet::contract_address::ContractAddress"
                    },
                    {
                        "name": "base_token_address",
                        "type": "core::starknet::contract_address::ContractAddress"
                    },
                    {
                        "name": "option_type",
                        "type": "core::felt252"
                    },
                    {
                        "name": "lp_token_amount",
                        "type": "core::integer::u256"
                    }
                ],
                "outputs": [],
                "state_mutability": "external"
            },
            {
                "type": "function",
                "name": "get_amm_address",
                "inputs": [],
                "outputs": [
                    {
                        "type": "core::starknet::contract_address::ContractAddress"
                    }
                ],
                "state_mutability": "view"
            },
            {
                "type": "function",
                "name": "deposit_to_zklend",
                "inputs": [
                    {
                        "name": "token",
                        "type": "core::starknet::contract_address::ContractAddress"
                    },
                    {
                        "name": "amount",
                        "type": "core::integer::u256"
                    }
                ],
                "outputs": [],
                "state_mutability": "external"
            },
            {
                "type": "function",
                "name": "withdraw_from_zklend",
                "inputs": [
                    {
                        "name": "token",
                        "type": "core::starknet::contract_address::ContractAddress"
                    },
                    {
                        "name": "amount",
                        "type": "core::integer::u256"
                    }
                ],
                "outputs": [],
                "state_mutability": "external"
            },
            {
                "type": "function",
                "name": "deposit_to_nostra_lending_pool",
                "inputs": [
                    {
                        "name": "token",
                        "type": "core::starknet::contract_address::ContractAddress"
                    },
                    {
                        "name": "nostraToken",
                        "type": "core::starknet::contract_address::ContractAddress"
                    },
                    {
                        "name": "amount",
                        "type": "core::integer::u256"
                    }
                ],
                "outputs": [],
                "state_mutability": "external"
            },
            {
                "type": "function",
                "name": "withdraw_from_nostra_lending_pool",
                "inputs": [
                    {
                        "name": "nostraToken",
                        "type": "core::starknet::contract_address::ContractAddress"
                    },
                    {
                        "name": "amount",
                        "type": "core::integer::u256"
                    }
                ],
                "outputs": [],
                "state_mutability": "external"
            }
        ]
    },
    {
        "type": "impl",
        "name": "UpgradeableImpl",
        "interface_name": "openzeppelin::upgrades::interface::IUpgradeable"
    },
    {
        "type": "interface",
        "name": "openzeppelin::upgrades::interface::IUpgradeable",
        "items": [
            {
                "type": "function",
                "name": "upgrade",
                "inputs": [
                    {
                        "name": "new_class_hash",
                        "type": "core::starknet::class_hash::ClassHash"
                    }
                ],
                "outputs": [],
                "state_mutability": "external"
            }
        ]
    },
    {
        "type": "impl",
        "name": "OwnableTwoStepImpl",
        "interface_name": "openzeppelin::access::ownable::interface::IOwnableTwoStep"
    },
    {
        "type": "interface",
        "name": "openzeppelin::access::ownable::interface::IOwnableTwoStep",
        "items": [
            {
                "type": "function",
                "name": "owner",
                "inputs": [],
                "outputs": [
                    {
                        "type": "core::starknet::contract_address::ContractAddress"
                    }
                ],
                "state_mutability": "view"
            },
            {
                "type": "function",
                "name": "pending_owner",
                "inputs": [],
                "outputs": [
                    {
                        "type": "core::starknet::contract_address::ContractAddress"
                    }
                ],
                "state_mutability": "view"
            },
            {
                "type": "function",
                "name": "accept_ownership",
                "inputs": [],
                "outputs": [],
                "state_mutability": "external"
            },
            {
                "type": "function",
                "name": "transfer_ownership",
                "inputs": [
                    {
                        "name": "new_owner",
                        "type": "core::starknet::contract_address::ContractAddress"
                    }
                ],
                "outputs": [],
                "state_mutability": "external"
            },
            {
                "type": "function",
                "name": "renounce_ownership",
                "inputs": [],
                "outputs": [],
                "state_mutability": "external"
            }
        ]
    },
    {
        "type": "impl",
        "name": "AccessControlImpl",
        "interface_name": "openzeppelin::access::accesscontrol::interface::IAccessControl"
    },
    {
        "type": "interface",
        "name": "openzeppelin::access::accesscontrol::interface::IAccessControl",
        "items": [
            {
                "type": "function",
                "name": "has_role",
                "inputs": [
                    {
                        "name": "role",
                        "type": "core::felt252"
                    },
                    {
                        "name": "account",
                        "type": "core::starknet::contract_address::ContractAddress"
                    }
                ],
                "outputs": [
                    {
                        "type": "core::bool"
                    }
                ],
                "state_mutability": "view"
            },
            {
                "type": "function",
                "name": "get_role_admin",
                "inputs": [
                    {
                        "name": "role",
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
                "type": "function",
                "name": "grant_role",
                "inputs": [
                    {
                        "name": "role",
                        "type": "core::felt252"
                    },
                    {
                        "name": "account",
                        "type": "core::starknet::contract_address::ContractAddress"
                    }
                ],
                "outputs": [],
                "state_mutability": "external"
            },
            {
                "type": "function",
                "name": "revoke_role",
                "inputs": [
                    {
                        "name": "role",
                        "type": "core::felt252"
                    },
                    {
                        "name": "account",
                        "type": "core::starknet::contract_address::ContractAddress"
                    }
                ],
                "outputs": [],
                "state_mutability": "external"
            },
            {
                "type": "function",
                "name": "renounce_role",
                "inputs": [
                    {
                        "name": "role",
                        "type": "core::felt252"
                    },
                    {
                        "name": "account",
                        "type": "core::starknet::contract_address::ContractAddress"
                    }
                ],
                "outputs": [],
                "state_mutability": "external"
            }
        ]
    },
    {
        "type": "impl",
        "name": "SRC5Impl",
        "interface_name": "openzeppelin::introspection::interface::ISRC5"
    },
    {
        "type": "interface",
        "name": "openzeppelin::introspection::interface::ISRC5",
        "items": [
            {
                "type": "function",
                "name": "supports_interface",
                "inputs": [
                    {
                        "name": "interface_id",
                        "type": "core::felt252"
                    }
                ],
                "outputs": [
                    {
                        "type": "core::bool"
                    }
                ],
                "state_mutability": "view"
            }
        ]
    },
    {
        "type": "constructor",
        "name": "constructor",
        "inputs": [
            {
                "name": "gov_contract_address",
                "type": "core::starknet::contract_address::ContractAddress"
            },
            {
                "name": "AMM_contract_address",
                "type": "core::starknet::contract_address::ContractAddress"
            },
            {
                "name": "zklend_market_contract_address",
                "type": "core::starknet::contract_address::ContractAddress"
            },
            {
                "name": "first_guardian",
                "type": "core::starknet::contract_address::ContractAddress"
            }
        ]
    },
    {
        "type": "event",
        "name": "konoha::treasury::Treasury::TokenSent",
        "kind": "struct",
        "members": [
            {
                "name": "receiver",
                "type": "core::starknet::contract_address::ContractAddress",
                "kind": "data"
            },
            {
                "name": "token_addr",
                "type": "core::starknet::contract_address::ContractAddress",
                "kind": "data"
            },
            {
                "name": "amount",
                "type": "core::integer::u256",
                "kind": "data"
            }
        ]
    },
    {
        "type": "event",
        "name": "konoha::treasury::Treasury::TransferCancelled",
        "kind": "struct",
        "members": [
            {
                "name": "receiver",
                "type": "core::starknet::contract_address::ContractAddress",
                "kind": "data"
            },
            {
                "name": "token_addr",
                "type": "core::starknet::contract_address::ContractAddress",
                "kind": "data"
            },
            {
                "name": "initial_amount",
                "type": "core::integer::u256",
                "kind": "data"
            }
        ]
    },
    {
        "type": "event",
        "name": "konoha::treasury::Treasury::TransferPending",
        "kind": "struct",
        "members": [
            {
                "name": "receiver",
                "type": "core::starknet::contract_address::ContractAddress",
                "kind": "data"
            },
            {
                "name": "token_addr",
                "type": "core::starknet::contract_address::ContractAddress",
                "kind": "data"
            },
            {
                "name": "amount",
                "type": "core::integer::u256",
                "kind": "data"
            }
        ]
    },
    {
        "type": "event",
        "name": "konoha::treasury::Treasury::GuardianAdded",
        "kind": "struct",
        "members": [
            {
                "name": "guardian_address",
                "type": "core::starknet::contract_address::ContractAddress",
                "kind": "data"
            }
        ]
    },
    {
        "type": "event",
        "name": "konoha::treasury::Treasury::GuardianActivated",
        "kind": "struct",
        "members": [
            {
                "name": "guardian_address",
                "type": "core::starknet::contract_address::ContractAddress",
                "kind": "data"
            },
            {
                "name": "issuer_address",
                "type": "core::starknet::contract_address::ContractAddress",
                "kind": "data"
            }
        ]
    },
    {
        "type": "event",
        "name": "konoha::treasury::Treasury::GuardianDeactivated",
        "kind": "struct",
        "members": [
            {
                "name": "guardian_address",
                "type": "core::starknet::contract_address::ContractAddress",
                "kind": "data"
            }
        ]
    },
    {
        "type": "event",
        "name": "konoha::treasury::Treasury::AMMAddressUpdated",
        "kind": "struct",
        "members": [
            {
                "name": "previous_address",
                "type": "core::starknet::contract_address::ContractAddress",
                "kind": "data"
            },
            {
                "name": "new_amm_address",
                "type": "core::starknet::contract_address::ContractAddress",
                "kind": "data"
            }
        ]
    },
    {
        "type": "event",
        "name": "konoha::treasury::Treasury::LiquidityProvided",
        "kind": "struct",
        "members": [
            {
                "name": "quote_token_address",
                "type": "core::starknet::contract_address::ContractAddress",
                "kind": "data"
            },
            {
                "name": "base_token_address",
                "type": "core::starknet::contract_address::ContractAddress",
                "kind": "data"
            },
            {
                "name": "option_type",
                "type": "core::felt252",
                "kind": "data"
            },
            {
                "name": "amount",
                "type": "core::integer::u256",
                "kind": "data"
            }
        ]
    },
    {
        "type": "event",
        "name": "konoha::treasury::Treasury::LiquidityWithdrawn",
        "kind": "struct",
        "members": [
            {
                "name": "quote_token_address",
                "type": "core::starknet::contract_address::ContractAddress",
                "kind": "data"
            },
            {
                "name": "base_token_address",
                "type": "core::starknet::contract_address::ContractAddress",
                "kind": "data"
            },
            {
                "name": "option_type",
                "type": "core::felt252",
                "kind": "data"
            },
            {
                "name": "lp_token_amount",
                "type": "core::integer::u256",
                "kind": "data"
            }
        ]
    },
    {
        "type": "event",
        "name": "konoha::treasury::Treasury::LiquidityProvidedToZklend",
        "kind": "struct",
        "members": [
            {
                "name": "token_address",
                "type": "core::starknet::contract_address::ContractAddress",
                "kind": "data"
            },
            {
                "name": "amount",
                "type": "core::integer::u256",
                "kind": "data"
            }
        ]
    },
    {
        "type": "event",
        "name": "konoha::treasury::Treasury::LiquidityWithdrawnFromZklend",
        "kind": "struct",
        "members": [
            {
                "name": "token_address",
                "type": "core::starknet::contract_address::ContractAddress",
                "kind": "data"
            },
            {
                "name": "amount",
                "type": "core::integer::u256",
                "kind": "data"
            }
        ]
    },
    {
        "type": "event",
        "name": "konoha::treasury::Treasury::LiquidityProvidedToNostraLendingPool",
        "kind": "struct",
        "members": [
            {
                "name": "nostra_token",
                "type": "core::starknet::contract_address::ContractAddress",
                "kind": "data"
            },
            {
                "name": "amount",
                "type": "core::integer::u256",
                "kind": "data"
            }
        ]
    },
    {
        "type": "event",
        "name": "konoha::treasury::Treasury::LiquidityWithdrawnFromNostraLendingPool",
        "kind": "struct",
        "members": [
            {
                "name": "nostra_token",
                "type": "core::starknet::contract_address::ContractAddress",
                "kind": "data"
            },
            {
                "name": "amount",
                "type": "core::integer::u256",
                "kind": "data"
            }
        ]
    },
    {
        "type": "event",
        "name": "openzeppelin::access::ownable::ownable::OwnableComponent::OwnershipTransferred",
        "kind": "struct",
        "members": [
            {
                "name": "previous_owner",
                "type": "core::starknet::contract_address::ContractAddress",
                "kind": "key"
            },
            {
                "name": "new_owner",
                "type": "core::starknet::contract_address::ContractAddress",
                "kind": "key"
            }
        ]
    },
    {
        "type": "event",
        "name": "openzeppelin::access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
        "kind": "struct",
        "members": [
            {
                "name": "previous_owner",
                "type": "core::starknet::contract_address::ContractAddress",
                "kind": "key"
            },
            {
                "name": "new_owner",
                "type": "core::starknet::contract_address::ContractAddress",
                "kind": "key"
            }
        ]
    },
    {
        "type": "event",
        "name": "openzeppelin::access::ownable::ownable::OwnableComponent::Event",
        "kind": "enum",
        "variants": [
            {
                "name": "OwnershipTransferred",
                "type": "openzeppelin::access::ownable::ownable::OwnableComponent::OwnershipTransferred",
                "kind": "nested"
            },
            {
                "name": "OwnershipTransferStarted",
                "type": "openzeppelin::access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
                "kind": "nested"
            }
        ]
    },
    {
        "type": "event",
        "name": "openzeppelin::access::accesscontrol::accesscontrol::AccessControlComponent::RoleGranted",
        "kind": "struct",
        "members": [
            {
                "name": "role",
                "type": "core::felt252",
                "kind": "data"
            },
            {
                "name": "account",
                "type": "core::starknet::contract_address::ContractAddress",
                "kind": "data"
            },
            {
                "name": "sender",
                "type": "core::starknet::contract_address::ContractAddress",
                "kind": "data"
            }
        ]
    },
    {
        "type": "event",
        "name": "openzeppelin::access::accesscontrol::accesscontrol::AccessControlComponent::RoleRevoked",
        "kind": "struct",
        "members": [
            {
                "name": "role",
                "type": "core::felt252",
                "kind": "data"
            },
            {
                "name": "account",
                "type": "core::starknet::contract_address::ContractAddress",
                "kind": "data"
            },
            {
                "name": "sender",
                "type": "core::starknet::contract_address::ContractAddress",
                "kind": "data"
            }
        ]
    },
    {
        "type": "event",
        "name": "openzeppelin::access::accesscontrol::accesscontrol::AccessControlComponent::RoleAdminChanged",
        "kind": "struct",
        "members": [
            {
                "name": "role",
                "type": "core::felt252",
                "kind": "data"
            },
            {
                "name": "previous_admin_role",
                "type": "core::felt252",
                "kind": "data"
            },
            {
                "name": "new_admin_role",
                "type": "core::felt252",
                "kind": "data"
            }
        ]
    },
    {
        "type": "event",
        "name": "openzeppelin::access::accesscontrol::accesscontrol::AccessControlComponent::Event",
        "kind": "enum",
        "variants": [
            {
                "name": "RoleGranted",
                "type": "openzeppelin::access::accesscontrol::accesscontrol::AccessControlComponent::RoleGranted",
                "kind": "nested"
            },
            {
                "name": "RoleRevoked",
                "type": "openzeppelin::access::accesscontrol::accesscontrol::AccessControlComponent::RoleRevoked",
                "kind": "nested"
            },
            {
                "name": "RoleAdminChanged",
                "type": "openzeppelin::access::accesscontrol::accesscontrol::AccessControlComponent::RoleAdminChanged",
                "kind": "nested"
            }
        ]
    },
    {
        "type": "event",
        "name": "openzeppelin::introspection::src5::SRC5Component::Event",
        "kind": "enum",
        "variants": []
    },
    {
        "type": "event",
        "name": "openzeppelin::upgrades::upgradeable::UpgradeableComponent::Upgraded",
        "kind": "struct",
        "members": [
            {
                "name": "class_hash",
                "type": "core::starknet::class_hash::ClassHash",
                "kind": "data"
            }
        ]
    },
    {
        "type": "event",
        "name": "openzeppelin::upgrades::upgradeable::UpgradeableComponent::Event",
        "kind": "enum",
        "variants": [
            {
                "name": "Upgraded",
                "type": "openzeppelin::upgrades::upgradeable::UpgradeableComponent::Upgraded",
                "kind": "nested"
            }
        ]
    },
    {
        "type": "event",
        "name": "konoha::treasury::Treasury::Event",
        "kind": "enum",
        "variants": [
            {
                "name": "TokenSent",
                "type": "konoha::treasury::Treasury::TokenSent",
                "kind": "nested"
            },
            {
                "name": "TransferCancelled",
                "type": "konoha::treasury::Treasury::TransferCancelled",
                "kind": "nested"
            },
            {
                "name": "TransferPending",
                "type": "konoha::treasury::Treasury::TransferPending",
                "kind": "nested"
            },
            {
                "name": "GuardianAdded",
                "type": "konoha::treasury::Treasury::GuardianAdded",
                "kind": "nested"
            },
            {
                "name": "GuardianActivated",
                "type": "konoha::treasury::Treasury::GuardianActivated",
                "kind": "nested"
            },
            {
                "name": "GuardianDeactivated",
                "type": "konoha::treasury::Treasury::GuardianDeactivated",
                "kind": "nested"
            },
            {
                "name": "AMMAddressUpdated",
                "type": "konoha::treasury::Treasury::AMMAddressUpdated",
                "kind": "nested"
            },
            {
                "name": "LiquidityProvided",
                "type": "konoha::treasury::Treasury::LiquidityProvided",
                "kind": "nested"
            },
            {
                "name": "LiquidityWithdrawn",
                "type": "konoha::treasury::Treasury::LiquidityWithdrawn",
                "kind": "nested"
            },
            {
                "name": "LiquidityProvidedToZklend",
                "type": "konoha::treasury::Treasury::LiquidityProvidedToZklend",
                "kind": "nested"
            },
            {
                "name": "LiquidityWithdrawnFromZklend",
                "type": "konoha::treasury::Treasury::LiquidityWithdrawnFromZklend",
                "kind": "nested"
            },
            {
                "name": "LiquidityProvidedToNostraLendingPool",
                "type": "konoha::treasury::Treasury::LiquidityProvidedToNostraLendingPool",
                "kind": "nested"
            },
            {
                "name": "LiquidityWithdrawnFromNostraLendingPool",
                "type": "konoha::treasury::Treasury::LiquidityWithdrawnFromNostraLendingPool",
                "kind": "nested"
            },
            {
                "name": "OwnableEvent",
                "type": "openzeppelin::access::ownable::ownable::OwnableComponent::Event",
                "kind": "flat"
            },
            {
                "name": "AccessControlEvent",
                "type": "openzeppelin::access::accesscontrol::accesscontrol::AccessControlComponent::Event",
                "kind": "flat"
            },
            {
                "name": "SRC5Event",
                "type": "openzeppelin::introspection::src5::SRC5Component::Event",
                "kind": "flat"
            },
            {
                "name": "UpgradeableEvent",
                "type": "openzeppelin::upgrades::upgradeable::UpgradeableComponent::Event",
                "kind": "flat"
            }
        ]
    }
]

