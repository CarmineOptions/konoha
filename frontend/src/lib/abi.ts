export const abi = [
    {
        name: "Governance",
        type: "impl",
        interface_name: "governance::contract::IGovernance",
    },
    {
        name: "governance::contract::IGovernance",
        type: "interface",
        items: [
            {
                name: "get_governance_token_address",
                type: "function",
                inputs: [],
                outputs: [
                    {
                        type: "core::starknet::contract_address::ContractAddress",
                    },
                ],
                state_mutability: "view",
            },
            {
                name: "get_amm_address",
                type: "function",
                inputs: [],
                outputs: [
                    {
                        type: "core::starknet::contract_address::ContractAddress",
                    },
                ],
                state_mutability: "view",
            },
        ],
    },
    {
        name: "Airdrop",
        type: "impl",
        interface_name: "governance::airdrop::IAirdrop",
    },
    {
        name: "governance::airdrop::IAirdrop",
        type: "interface",
        items: [
            {
                name: "claim",
                type: "function",
                inputs: [
                    {
                        name: "claimee",
                        type: "core::starknet::contract_address::ContractAddress",
                    },
                    {
                        name: "amount",
                        type: "core::integer::u128",
                    },
                    {
                        name: "proof",
                        type: "core::array::Array::<core::felt252>",
                    },
                ],
                outputs: [],
                state_mutability: "external",
            },
        ],
    },
    {
        name: "Proposals",
        type: "impl",
        interface_name: "governance::proposals::IProposals",
    },
    {
        name: "governance::types::PropDetails",
        type: "struct",
        members: [
            {
                name: "payload",
                type: "core::felt252",
            },
            {
                name: "to_upgrade",
                type: "core::felt252",
            },
        ],
    },
    {
        name: "governance::proposals::IProposals",
        type: "interface",
        items: [
            {
                name: "vote",
                type: "function",
                inputs: [
                    {
                        name: "prop_id",
                        type: "core::felt252",
                    },
                    {
                        name: "opinion",
                        type: "core::felt252",
                    },
                ],
                outputs: [],
                state_mutability: "external",
            },
            {
                name: "get_proposal_details",
                type: "function",
                inputs: [
                    {
                        name: "prop_id",
                        type: "core::felt252",
                    },
                ],
                outputs: [
                    {
                        type: "governance::types::PropDetails",
                    },
                ],
                state_mutability: "view",
            },
            {
                name: "get_vote_counts",
                type: "function",
                inputs: [
                    {
                        name: "prop_id",
                        type: "core::felt252",
                    },
                ],
                outputs: [
                    {
                        type: "(core::integer::u128, core::integer::u128)",
                    },
                ],
                state_mutability: "view",
            },
            {
                name: "submit_proposal",
                type: "function",
                inputs: [
                    {
                        name: "payload",
                        type: "core::felt252",
                    },
                    {
                        name: "to_upgrade",
                        type: "core::integer::u64",
                    },
                ],
                outputs: [
                    {
                        type: "core::felt252",
                    },
                ],
                state_mutability: "external",
            },
            {
                name: "get_proposal_status",
                type: "function",
                inputs: [
                    {
                        name: "prop_id",
                        type: "core::felt252",
                    },
                ],
                outputs: [
                    {
                        type: "core::felt252",
                    },
                ],
                state_mutability: "view",
            },
            {
                name: "get_live_proposals",
                type: "function",
                inputs: [],
                outputs: [
                    {
                        type: "core::array::Array::<core::felt252>",
                    },
                ],
                state_mutability: "view",
            },
            {
                name: "get_user_voted",
                type: "function",
                inputs: [
                    {
                        name: "user_address",
                        type: "core::starknet::contract_address::ContractAddress",
                    },
                    {
                        name: "prop_id",
                        type: "core::felt252",
                    },
                ],
                outputs: [
                    {
                        type: "core::felt252",
                    },
                ],
                state_mutability: "view",
            },
        ],
    },
    {
        name: "constructor",
        type: "constructor",
        inputs: [
            {
                name: "govtoken_address",
                type: "core::starknet::contract_address::ContractAddress",
            },
        ],
    },
    {
        kind: "struct",
        name: "governance::contract::Governance::Proposed",
        type: "event",
        members: [
            {
                kind: "data",
                name: "prop_id",
                type: "core::felt252",
            },
            {
                kind: "data",
                name: "payload",
                type: "core::felt252",
            },
            {
                kind: "data",
                name: "to_upgrade",
                type: "core::integer::u64",
            },
        ],
    },
    {
        kind: "struct",
        name: "governance::contract::Governance::Voted",
        type: "event",
        members: [
            {
                kind: "data",
                name: "prop_id",
                type: "core::felt252",
            },
            {
                kind: "data",
                name: "voter",
                type: "core::starknet::contract_address::ContractAddress",
            },
            {
                kind: "data",
                name: "opinion",
                type: "core::felt252",
            },
        ],
    },
    {
        kind: "struct",
        name: "governance::airdrop::airdrop::Claimed",
        type: "event",
        members: [
            {
                kind: "data",
                name: "address",
                type: "core::starknet::contract_address::ContractAddress",
            },
            {
                kind: "data",
                name: "received",
                type: "core::integer::u128",
            },
        ],
    },
    {
        kind: "enum",
        name: "governance::airdrop::airdrop::Event",
        type: "event",
        variants: [
            {
                kind: "nested",
                name: "Claimed",
                type: "governance::airdrop::airdrop::Claimed",
            },
        ],
    },
    {
        kind: "struct",
        name: "governance::proposals::proposals::Proposed",
        type: "event",
        members: [
            {
                kind: "data",
                name: "prop_id",
                type: "core::felt252",
            },
            {
                kind: "data",
                name: "payload",
                type: "core::felt252",
            },
            {
                kind: "data",
                name: "to_upgrade",
                type: "core::integer::u64",
            },
        ],
    },
    {
        kind: "struct",
        name: "governance::proposals::proposals::Voted",
        type: "event",
        members: [
            {
                kind: "data",
                name: "prop_id",
                type: "core::felt252",
            },
            {
                kind: "data",
                name: "voter",
                type: "core::starknet::contract_address::ContractAddress",
            },
            {
                kind: "data",
                name: "opinion",
                type: "core::felt252",
            },
        ],
    },
    {
        kind: "enum",
        name: "governance::proposals::proposals::Event",
        type: "event",
        variants: [
            {
                kind: "nested",
                name: "Proposed",
                type: "governance::proposals::proposals::Proposed",
            },
            {
                kind: "nested",
                name: "Voted",
                type: "governance::proposals::proposals::Voted",
            },
        ],
    },
    {
        kind: "struct",
        name: "governance::upgrades::upgrades::Upgraded",
        type: "event",
        members: [
            {
                kind: "data",
                name: "prop_id",
                type: "core::integer::u64",
            },
            {
                kind: "data",
                name: "upgrade_type",
                type: "core::integer::u64",
            },
        ],
    },
    {
        kind: "enum",
        name: "governance::upgrades::upgrades::Event",
        type: "event",
        variants: [
            {
                kind: "nested",
                name: "Upgraded",
                type: "governance::upgrades::upgrades::Upgraded",
            },
        ],
    },
    {
        kind: "enum",
        name: "governance::contract::Governance::Event",
        type: "event",
        variants: [
            {
                kind: "nested",
                name: "Proposed",
                type: "governance::contract::Governance::Proposed",
            },
            {
                kind: "nested",
                name: "Voted",
                type: "governance::contract::Governance::Voted",
            },
            {
                kind: "nested",
                name: "AirdropEvent",
                type: "governance::airdrop::airdrop::Event",
            },
            {
                kind: "nested",
                name: "ProposalsEvent",
                type: "governance::proposals::proposals::Event",
            },
            {
                kind: "nested",
                name: "UpgradesEvent",
                type: "governance::upgrades::upgrades::Event",
            },
        ],
    },
];
