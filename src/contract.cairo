use konoha::types::{ContractType, PropDetails, VoteStatus};
// This file if possible calls out to Proposals or Upgrades or other files where actual logic resides.

use starknet::ContractAddress;

#[starknet::interface]
trait IGovernance<TContractState> {
    // PROPOSALS

    // in component

    // UPGRADES

    fn get_governance_token_address(self: @TContractState) -> ContractAddress;
// rest in component
// AIRDROPS

// in component

// VESTING

// in component

// STAKING

// in component
}


#[starknet::contract]
mod Governance {
    use konoha::airdrop::airdrop as airdrop_component;
    use konoha::discussion::discussion as discussion_component;
    use konoha::proposals::proposals as proposals_component;
    use konoha::proposals::{IProposalsDispatcher, IProposalsDispatcherTrait};
    use konoha::staking::staking as staking_component;
    use konoha::staking::{IStakingDispatcher, IStakingDispatcherTrait};
    use konoha::streaming::streaming as streaming_component;
    use konoha::types::BlockNumber;
    use konoha::types::ContractType;
    use konoha::types::CustomProposalConfig;
    use konoha::types::PropDetails;
    use konoha::types::VoteStatus;
    use konoha::upgrades::upgrades as upgrades_component;
    use konoha::vesting::vesting as vesting_component;
    use konoha::vesting::{IVestingDispatcher, IVestingDispatcherTrait};
    use starknet::get_contract_address;

    use starknet::syscalls::deploy_syscall;

    use starknet::{ContractAddress, ClassHash};


    component!(path: airdrop_component, storage: airdrop, event: AirdropEvent);
    component!(path: vesting_component, storage: vesting, event: VestingEvent);
    component!(path: proposals_component, storage: proposals, event: ProposalsEvent);
    component!(path: upgrades_component, storage: upgrades, event: UpgradesEvent);
    component!(path: discussion_component, storage: discussions, event: DiscussionEvent);
    component!(path: staking_component, storage: staking, event: StakingEvent);
    component!(path: streaming_component, storage: streaming, event: StreamingEvent);


    #[abi(embed_v0)]
    impl Airdrop = airdrop_component::AirdropImpl<ContractState>;

    #[abi(embed_v0)]
    impl Vesting = vesting_component::VestingImpl<ContractState>;
    #[abi(embed_v0)]
    impl Proposals = proposals_component::ProposalsImpl<ContractState>;

    #[abi(embed_v0)]
    impl Upgrades = upgrades_component::UpgradesImpl<ContractState>;

    #[abi(embed_v0)]
    impl Discussions = discussion_component::DiscussionImpl<ContractState>;

    #[abi(embed_v0)]
    impl Staking = staking_component::StakingImpl<ContractState>;

    #[abi(embed_v0)]
    impl Streaming = streaming_component::StreamingImpl<ContractState>;

    #[storage]
    struct Storage {
        proposal_initializer_run: LegacyMap::<u64, bool>,
        governance_token_address: ContractAddress,
        #[substorage(v0)]
        airdrop: airdrop_component::Storage,
        #[substorage(v0)]
        vesting: vesting_component::Storage,
        #[substorage(v0)]
        proposals: proposals_component::Storage,
        #[substorage(v0)]
        upgrades: upgrades_component::Storage,
        #[substorage(v0)]
        discussions: discussion_component::Storage,
        #[substorage(v0)]
        staking: staking_component::Storage,
        #[substorage(v0)]
        streaming: streaming_component::Storage,
    }

    // PROPOSALS

    #[derive(starknet::Event, Drop)]
    struct Proposed {
        prop_id: felt252,
        payload: felt252,
        to_upgrade: ContractType,
    }

    #[derive(starknet::Event, Drop)]
    struct Voted {
        prop_id: felt252,
        voter: ContractAddress,
        opinion: VoteStatus
    }

    #[derive(starknet::Event, Drop)]
    #[event]
    enum Event {
        Proposed: Proposed,
        Voted: Voted,
        AirdropEvent: airdrop_component::Event,
        VestingEvent: vesting_component::Event,
        ProposalsEvent: proposals_component::Event,
        UpgradesEvent: upgrades_component::Event,
        DiscussionEvent: discussion_component::Event,
        StakingEvent: staking_component::Event,
        StreamingEvent: streaming_component::Event,
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        voting_token_class: ClassHash,
        floating_token_class: ClassHash,
        treasury_classhash: ClassHash,
        recipient: ContractAddress
    ) {
        // This is not used in production on mainnet, because the governance token is already deployed (and distributed).

        let governance_address = get_contract_address();
        assert(governance_address.into() != 0, 'gov addr zero??');

        let mut voting_token_calldata: Array<felt252> = ArrayTrait::new();
        voting_token_calldata.append(governance_address.into());
        let (voting_token_address, _) = deploy_syscall(
            voting_token_class, 42, voting_token_calldata.span(), false
        )
            .expect('unable to deploy votingtoken');
        self.governance_token_address.write(voting_token_address);

        let mut floating_token_calldata: Array<felt252> = ArrayTrait::new();
        floating_token_calldata.append(10000000000000000000); // 10**19, 10 tokens overall
        floating_token_calldata.append(0); // high for u256 supply
        floating_token_calldata.append(recipient.into());
        floating_token_calldata.append(governance_address.into());
        let (floating_token_address, _) = deploy_syscall(
            floating_token_class, 1337, floating_token_calldata.span(), false
        )
            .expect('unable to deploy floatingtoken');

        let staking = IStakingDispatcher { contract_address: governance_address };
        staking.set_floating_token_address(floating_token_address);
        let ONE_MONTH: u64 = 2629743; // 30.44 days
        let THREE_MONTHS = ONE_MONTH * 3;
        let SIX_MONTHS = ONE_MONTH * 6;
        let ONE_YEAR: u64 = 31536000; // 365 days
        staking.set_curve_point(ONE_MONTH, 100);
        staking.set_curve_point(THREE_MONTHS, 120);
        staking.set_curve_point(SIX_MONTHS, 160);
        staking.set_curve_point(ONE_YEAR, 250);

        let proposals = IProposalsDispatcher { contract_address: governance_address };

        if (treasury_classhash.into() != 0) {
            let mut treasury_calldata: Array<felt252> = ArrayTrait::new();
            treasury_calldata.append(governance_address.into());
            treasury_calldata.append(0x1); // carmine amm addr
            treasury_calldata.append(0x1); // zklend addr
            treasury_calldata
                .append(
                    0x027994c503bd8C32525FBDAf9d398bDd4e86757988C64581B055A06c5955eA49
                ); // first guardian
            let (treasury_address, _) = deploy_syscall(
                treasury_classhash, 42, treasury_calldata.span(), false
            )
                .unwrap();

            let send_tokens_custom_proposal_config: CustomProposalConfig = CustomProposalConfig {
                target: treasury_address.into(),
                selector: selector!("add_transfer"),
                library_call: false,
                proposal_voting_time: 86400 // 1 day, to accelerate testing
            };

            proposals.add_custom_proposal_config(send_tokens_custom_proposal_config);

            let add_guardian_custom_proposal_config: CustomProposalConfig = CustomProposalConfig {
                target: treasury_address.into(),
                selector: selector!("add_guardian"),
                library_call: false,
                proposal_voting_time: 0 // use global default
            };

            proposals.add_custom_proposal_config(add_guardian_custom_proposal_config);

            let remove_guardian_custom_proposal_config: CustomProposalConfig =
                CustomProposalConfig {
                target: treasury_address.into(),
                selector: selector!("remove_guardian"),
                library_call: false,
                proposal_voting_time: 0 // use global default
            };

            proposals.add_custom_proposal_config(remove_guardian_custom_proposal_config);
        }

        let set_default_proposal_params_custom_proposal_config: CustomProposalConfig =
            CustomProposalConfig {
            target: governance_address.into(),
            selector: selector!("set_default_proposal_params"),
            library_call: false,
            proposal_voting_time: 0 // use global default
        };

        proposals.add_custom_proposal_config(set_default_proposal_params_custom_proposal_config);

        let vesting = IVestingDispatcher { contract_address: governance_address };

        let first_vest = 1726858800; // Fri Sep 20 2024 19:00:00 GMT+0000 
        let period = 21600; // 6 hours
        let increments_count = 56;
        let total_amount = 56000000000000000000; // 56 * 10**18 meaning 56 KONOHA tokens
        vesting
            .add_linear_vesting_schedule(
                first_vest,
                period,
                increments_count,
                total_amount,
                0x027994c503bd8C32525FBDAf9d398bDd4e86757988C64581B055A06c5955eA49
                    .try_into()
                    .unwrap()
            );
        vesting
            .add_linear_vesting_schedule(
                first_vest, period, increments_count, total_amount, recipient
            );

        proposals
            .set_default_proposal_params(
                quorum: 10, proposal_voting_seconds: consteval_int!(60 * 60 * 24 * 3)
            ); // can be omitted to keep the default values
    }

    #[abi(embed_v0)]
    impl Governance of super::IGovernance<ContractState> {
        fn get_governance_token_address(self: @ContractState) -> ContractAddress {
            self.governance_token_address.read()
        }
    }
}
