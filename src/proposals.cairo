// Proposals component. Does not depend on anything. Holds governance token address.

use governance::types::{ContractType, PropDetails, VoteStatus};
use starknet::ContractAddress;

#[starknet::interface]
trait IProposals<TContractState> {
    fn vote(ref self: TContractState, prop_id: felt252, opinion: felt252);
    fn get_proposal_details(self: @TContractState, prop_id: felt252) -> PropDetails;
    fn get_vote_counts(self: @TContractState, prop_id: felt252) -> (u128, u128);
    fn submit_proposal(
        ref self: TContractState, payload: felt252, to_upgrade: ContractType
    ) -> felt252;
    fn get_proposal_status(self: @TContractState, prop_id: felt252) -> felt252;
    fn get_live_proposals(self: @TContractState) -> Array<felt252>;
    fn get_user_voted(
        self: @TContractState, user_address: ContractAddress, prop_id: felt252
    ) -> VoteStatus;
    fn submit_custom_proposal(
        ref self: TContractState, custom_proposal_type: u32, calldata: Span<felt252>
    ) -> u32;
}

#[starknet::component]
mod proposals {
    use governance::contract::IGovernance;
    use traits::TryInto;
    use option::OptionTrait;
    use traits::Into;
    use box::BoxTrait;
    use zeroable::Zeroable;

    use array::ArrayTrait;
    use array::SpanTrait;
    use clone::Clone;

    use hash::LegacyHash;

    use starknet::contract_address::ContractAddressZeroable;
    use starknet::class_hash::ClassHashZeroable;
    use starknet::get_block_info;
    use starknet::get_block_timestamp;
    use starknet::get_caller_address;
    use starknet::BlockInfo;
    use starknet::ContractAddress;
    use starknet::ClassHash;
    use starknet::contract_address_const;
    use starknet::event::EventEmitter;
    use starknet::get_contract_address;


    use starknet::class_hash::class_hash_try_from_felt252;
    use starknet::contract_address::contract_address_to_felt252;

    use governance::types::BlockNumber;
    use governance::types::ContractType;
    use governance::types::PropDetails;
    use governance::types::VoteStatus;
    use governance::types::CustomProposalConfig;
    use governance::traits::IERC20Dispatcher;
    use governance::traits::IERC20DispatcherTrait;
    use governance::traits::get_governance_token_address_self;
    use governance::constants;

    #[storage]
    struct Storage {
        proposal_details: LegacyMap::<felt252, PropDetails>,
        proposal_vote_ends: LegacyMap::<felt252, BlockNumber>,
        proposal_vote_end_timestamp: LegacyMap::<felt252, u64>,
        proposal_voted_by: LegacyMap::<(felt252, ContractAddress), VoteStatus>,
        proposal_total_yay: LegacyMap::<felt252, felt252>,
        proposal_total_nay: LegacyMap::<felt252, felt252>,
        proposal_applied: LegacyMap::<felt252, felt252>, // should be Bool after migration
        delegate_hash: LegacyMap::<ContractAddress, felt252>,
        total_delegated_to: LegacyMap::<ContractAddress, u128>,
        custom_proposal_type: LegacyMap::<u32, CustomProposalConfig>, // custom proposal type 
        custom_proposal_payload: LegacyMap::<
            (u32, u32), felt252
        > // mapping from prop_id and index to calldata
    }

    #[derive(starknet::Event, Drop)]
    struct Proposed {
        prop_id: felt252,
        payload: felt252,
        to_upgrade: ContractType
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
        Voted: Voted
    }

    fn assert_correct_contract_type(contract_type: ContractType) {
        assert(contract_type <= 6, 'invalid contract type')
    }

    fn hashing(
        hashed_data: felt252, calldata_span: Span<(ContractAddress, u128)>, index: u32
    ) -> felt252 {
        if index >= calldata_span.len() {
            return hashed_data;
        } else {
            let (a, b) = *calldata_span.at(index);
            let hashed_data = LegacyHash::hash(contract_address_to_felt252(a), b);
            return hashing(hashed_data, calldata_span, index + 1_usize);
        }
    }

    #[generate_trait]
    impl InternalImpl<
        TContractState, +HasComponent<TContractState>
    > of InternalTrait<TContractState> {
        fn check_proposal_passed_express(
            self: @ComponentState<TContractState>, prop_id: felt252
        ) -> u8 {
            let gov_token_addr = get_governance_token_address_self();
            let yay_tally_felt: felt252 = self.proposal_total_yay.read(prop_id);
            let yay_tally: u128 = yay_tally_felt.try_into().unwrap();
            let total_eligible_votes_from_tokenholders_u256: u256 = IERC20Dispatcher {
                contract_address: gov_token_addr
            }
                .totalSupply();
            assert(
                total_eligible_votes_from_tokenholders_u256.high == 0, 'totalSupply weirdly high'
            );
            let total_eligible_votes_from_tokenholders: u128 =
                total_eligible_votes_from_tokenholders_u256
                .low;

            // Not only tokenholders are eligible, but investors as well, they hold 1/4th of the voting power
            // However, their votes are currently stored in storage_var, not tokens
            // So we must calculate 4/3 of the total supply (additional supply will be 1/4th of new total)
            // and from that 1/2, because that's 50%, So (4/3) * (1/2) = 2/3 of the total supply
            // Multiply total votes by 2 and divide by 3
            // Currently, there are not investors because they haven't yet set up their wallets. For this reason, the minimum is now simply half.
            let minimum_for_express: u128 = total_eligible_votes_from_tokenholders / 2;

            // Check if yay_tally >= minimum_for_express
            if yay_tally >= minimum_for_express {
                1
            } else {
                0
            }
        }

        fn assert_voting_in_progress(self: @ComponentState<TContractState>, prop_id: felt252) {
            let end_timestamp: u64 = self.proposal_vote_end_timestamp.read(prop_id);
            assert(end_timestamp != 0, 'prop_id not found');

            let current_timestamp: u64 = get_block_timestamp();

            assert(end_timestamp > current_timestamp, 'voting concluded');
        }

        fn get_free_prop_id(self: @ComponentState<TContractState>) -> felt252 {
            self._get_free_prop_id(0)
        }

        fn _get_free_prop_id(self: @ComponentState<TContractState>, currid: felt252) -> felt252 {
            let res = self.proposal_vote_ends.read(currid);
            if res == 0 {
                currid
            } else {
                self._get_free_prop_id(currid + 1)
            }
        }

        fn get_free_prop_id_timestamp(self: @ComponentState<TContractState>) -> felt252 {
            self._get_free_prop_id_timestamp(0)
        }

        fn _get_free_prop_id_timestamp(
            self: @ComponentState<TContractState>, currid: felt252
        ) -> felt252 {
            let res = self.proposal_vote_end_timestamp.read(currid);
            if res == 0 {
                currid
            } else {
                self._get_free_prop_id_timestamp(currid + 1)
            }
        }

        fn find_already_delegated(
            self: @ComponentState<TContractState>,
            to_addr: ContractAddress,
            calldata_span: Span<(ContractAddress, u128)>,
            index: u32
        ) -> u128 {
            if index >= calldata_span.len() {
                return 0;
            } else {
                let (a, b) = *calldata_span.at(index);
                if a == to_addr {
                    return b;
                } else {
                    return self.find_already_delegated(to_addr, calldata_span, index + 1_usize);
                }
            }
        }

        // TODO are we sure this does what we want it to?
        fn update_calldata(
            self: @ComponentState<TContractState>,
            to_addr: ContractAddress,
            new_amount: u128,
            calldata_span: Span<(ContractAddress, u128)>,
            mut new_list: Array<(ContractAddress, u128)>,
            index: u32
        ) -> Array<(ContractAddress, u128)> {
            if index >= calldata_span.len() {
                return new_list;
            } else {
                //let calldata_span: Span<(ContractAddress, u128)> = calldata.span();
                let (curr_addr, curr_amount) = *calldata_span.at(index);
                if curr_addr == to_addr {
                    new_list.append((curr_addr, new_amount));
                } else {
                    new_list.append((curr_addr, curr_amount));
                }
                return self
                    .update_calldata(to_addr, new_amount, calldata_span, new_list, index + 1_usize);
            }
        }

        fn assert_eligible_to_propose(self: @ComponentState<TContractState>) {
            let user_address = get_caller_address();
            let govtoken_addr = get_governance_token_address_self();
            let caller_balance: u128 = IERC20Dispatcher { contract_address: govtoken_addr }
                .balanceOf(user_address)
                .low;
            let total_supply = IERC20Dispatcher { contract_address: govtoken_addr }.totalSupply();
            let res: u256 = (caller_balance * constants::NEW_PROPOSAL_QUORUM).into();
            assert(total_supply < res, 'not enough tokens to submit');
        }
    }

    #[embeddable_as(ProposalsImpl)]
    impl Proposals<
        TContractState, +HasComponent<TContractState>
    > of super::IProposals<ComponentState<TContractState>> {
        fn get_vote_counts(
            self: @ComponentState<TContractState>, prop_id: felt252
        ) -> (u128, u128) {
            let yay = self.proposal_total_yay.read(prop_id);
            let nay = self.proposal_total_nay.read(prop_id);

            (yay.try_into().unwrap(), nay.try_into().unwrap())
        }

        fn get_proposal_details(
            self: @ComponentState<TContractState>, prop_id: felt252
        ) -> PropDetails {
            self.proposal_details.read(prop_id)
        }

        fn get_live_proposals(self: @ComponentState<TContractState>) -> Array<felt252> {
            let max: u32 = self.get_free_prop_id_timestamp().try_into().unwrap();
            let mut i: u32 = 0;
            let mut arr = ArrayTrait::<felt252>::new();

            loop {
                if i >= max {
                    break;
                }

                let prop_id: felt252 = i.into();
                let current_status = self.get_proposal_status(prop_id);

                if current_status == 0 {
                    arr.append(prop_id);
                }

                i += 1;
            };

            arr
        }

        fn get_user_voted(
            self: @ComponentState<TContractState>, user_address: ContractAddress, prop_id: felt252
        ) -> VoteStatus {
            self.proposal_voted_by.read((prop_id, user_address))
        }

        fn submit_proposal(
            ref self: ComponentState<TContractState>, payload: felt252, to_upgrade: ContractType
        ) -> felt252 {
            assert_correct_contract_type(to_upgrade);
            self.assert_eligible_to_propose();

            let prop_id = self.get_free_prop_id_timestamp();
            let prop_details = PropDetails { payload: payload, to_upgrade: to_upgrade.into() };
            self.proposal_details.write(prop_id, prop_details);

            let current_timestamp: u64 = get_block_timestamp();
            let end_timestamp: u64 = current_timestamp + constants::PROPOSAL_VOTING_SECONDS;
            self.proposal_vote_end_timestamp.write(prop_id, end_timestamp);

            self.emit(Proposed { prop_id, payload, to_upgrade });
            prop_id
        }

        fn submit_custom_proposal(
            ref self: ComponentState<TContractState>,
            custom_proposal_type: u32,
            mut calldata: Span<felt252>
        ) -> u32 {
            let config: CustomProposalConfig = self.custom_proposal_type.read(custom_proposal_type);
            assert(
                config.target.is_non_zero(), 'custom prop classhash 0'
            ); // wrong custom proposal type?
            assert(
                config.selector.is_non_zero(), 'custom prop selector 0'
            ); // wrong custom proposal type?
            self.assert_eligible_to_propose();

            let prop_id_felt = self.get_free_prop_id_timestamp();
            let prop_id: u32 = prop_id_felt.try_into().unwrap();
            let payload = custom_proposal_type.into();
            let prop_details = PropDetails {
                payload, to_upgrade: 5
            }; // to_upgrade = 5 – custom proposal type.
            self.proposal_details.write(prop_id_felt, prop_details);

            let current_timestamp: u64 = get_block_timestamp();
            let end_timestamp: u64 = current_timestamp + constants::PROPOSAL_VOTING_SECONDS;
            self.proposal_vote_end_timestamp.write(prop_id_felt, end_timestamp);
            self.emit(Proposed { prop_id: prop_id_felt, payload, to_upgrade: 5 });

            self.custom_proposal_payload.write((prop_id, 0), calldata.len().into());
            let mut i: u32 = 1;
            loop {
                match calldata.pop_front() {
                    Option::Some(argument) => {
                        self.custom_proposal_payload.write((prop_id, i), *argument);
                        i += 1;
                    },
                    Option::None(()) => { break (); }
                }
            };
            prop_id
        }


        // fn delegate_vote(
        //     ref self: ComponentState<TContractState>,
        //     to_addr: ContractAddress,
        //     calldata: Array<(ContractAddress, u128)>,
        //     amount: u128
        // ) {
        //     let caller_addr = get_caller_address();
        //     let stored_hash = self.delegate_hash.read(caller_addr);
        //     let calldata_span: Span<(ContractAddress, u128)> = calldata.span();
        //     assert(stored_hash == hashing(0, calldata_span, 0), 'incorrect delegate list');

        //     let curr_total_delegated_to = self.total_delegated_to.read(to_addr);
        //     let converted_addr = contract_address_to_felt252(caller_addr);

        //     let gov_token_addr = self.get_governance_token_address();
        //     let caller_balance_u256: u256 = IERC20Dispatcher { contract_address: gov_token_addr }
        //         .balanceOf(caller_addr);
        //     assert(caller_balance_u256.high == 0, 'CARM balance > u128');
        //     let caller_balance: u128 = caller_balance_u256.low;
        //     assert(caller_balance > 0, 'CARM balance is zero');

        //     let already_delegated = self.find_already_delegated(to_addr, calldata_span, 0);
        //     assert(caller_balance - already_delegated >= amount, 'Not enough funds');

        //     let updated_list: Array<(ContractAddress, u128)> = array![];
        //     let updated_list_span = updated_list.span();

        //     self.update_calldata(to_addr, already_delegated + amount, calldata_span, updated_list, 0);

        //     self.delegate_hash.write(caller_addr, hashing(0, updated_list_span, 0));
        //     self.total_delegated_to.write(to_addr, curr_total_delegated_to + amount);
        // }

        // fn withdraw_delegation(
        //     ref self: ComponentState<TContractState>,
        //     to_addr: ContractAddress,
        //     calldata: Array<(ContractAddress, u128)>,
        //     amount: u128
        // ) {
        //     let caller_addr = get_caller_address();
        //     let stored_hash = self.delegate_hash.read(caller_addr);
        //     let calldata_span: Span<(ContractAddress, u128)> = calldata.span();
        //     assert(stored_hash == hashing(0, calldata_span, 0), 'incorrect delegate list');

        //     let max_power_to_withdraw: u128 = self.find_already_delegated(to_addr, calldata_span, 0);
        //     assert(max_power_to_withdraw >= amount, 'amount has to be lower');

        //     let updated_list: Array<(ContractAddress, u128)> = ArrayTrait::new();
        //     let updated_list_span = updated_list.span();
        //     let minus_amount = 0 - amount;
        //     self.update_calldata(to_addr, minus_amount, calldata_span, updated_list, 0);

        //     self.delegate_hash.write(caller_addr, hashing(0, updated_list_span, 0));

        //     let curr_total_delegated_to = self.total_delegated_to.read(to_addr);
        //     self.total_delegated_to.write(to_addr, curr_total_delegated_to - amount);
        // }

        fn vote(ref self: ComponentState<TContractState>, prop_id: felt252, opinion: felt252) {
            // Checks
            assert((opinion == 1) | (opinion == 2), 'opinion must be either 1 or 2');
            let mut actual_opinion = 0;
            if opinion == 2 {
                actual_opinion = constants::MINUS_ONE;
            } else {
                actual_opinion = 1;
            }

            let gov_token_addr = get_governance_token_address_self();
            let caller_addr = get_caller_address();
            let curr_vote_status: felt252 = self.proposal_voted_by.read((prop_id, caller_addr));
            // TODO allow override of previous vote
            assert(curr_vote_status == 0, 'already voted');

            let caller_balance_u256: u256 = IERC20Dispatcher { contract_address: gov_token_addr }
                .balanceOf(caller_addr);
            assert(caller_balance_u256.high == 0, 'CARM balance > u128');
            let caller_balance: u128 = caller_balance_u256.low;
            assert(caller_balance != 0, 'CARM balance is zero');

            let caller_voting_power = caller_balance + self.total_delegated_to.read(caller_addr);

            assert(caller_voting_power > 0, 'No voting power');

            self.assert_voting_in_progress(prop_id);

            // Cast vote
            self.proposal_voted_by.write((prop_id, caller_addr), actual_opinion);
            if actual_opinion == constants::MINUS_ONE {
                let curr_votes: u128 = self.proposal_total_nay.read(prop_id).try_into().unwrap();
                let new_votes: u128 = curr_votes + caller_voting_power;
                assert(new_votes >= 0, 'new_votes must be non-negative');
                self.proposal_total_nay.write(prop_id, new_votes.into());
            } else {
                let curr_votes: u128 = self.proposal_total_yay.read(prop_id).try_into().unwrap();
                let new_votes: u128 = curr_votes + caller_voting_power;
                assert(new_votes >= 0, 'new_votes must be non-negative');
                self.proposal_total_yay.write(prop_id, new_votes.into());
            }
            self.emit(Voted { prop_id: prop_id, voter: caller_addr, opinion: opinion });
        }

        fn get_proposal_status(self: @ComponentState<TContractState>, prop_id: felt252) -> felt252 {
            let end_timestamp: u64 = self.proposal_vote_end_timestamp.read(prop_id);
            let current_timestamp: u64 = get_block_timestamp();

            if current_timestamp <= end_timestamp {
                return self.check_proposal_passed_express(prop_id).into();
            }

            let gov_token_addr = get_governance_token_address_self();
            let nay_tally_felt: felt252 = self.proposal_total_nay.read(prop_id);
            let yay_tally_felt: felt252 = self.proposal_total_yay.read(prop_id);
            let nay_tally: u128 = nay_tally_felt.try_into().unwrap();
            let yay_tally: u128 = yay_tally_felt.try_into().unwrap();
            let total_tally: u128 = yay_tally + nay_tally;
            // Here we multiply by 100 as the constant QUORUM is in percent.
            // If QUORUM = 10, quorum was not met if (total_tally*100) < (total_eligible * 10).
            let total_tally_multiplied = total_tally * 100;

            let total_eligible_votes_u256: u256 = IERC20Dispatcher {
                contract_address: gov_token_addr
            }
                .totalSupply();
            assert(total_eligible_votes_u256.high == 0, 'unable to check quorum');
            let total_eligible_votes: u128 = total_eligible_votes_u256.low;

            let quorum_threshold: u128 = total_eligible_votes * constants::QUORUM;
            if total_tally_multiplied < quorum_threshold {
                return constants::MINUS_ONE; // didn't meet quorum
            }

            if yay_tally == nay_tally {
                return constants::MINUS_ONE; // yay_tally = nay_tally
            }

            if yay_tally > nay_tally {
                return 1; // yay_tally > nay_tally
            } else {
                return constants::MINUS_ONE; // yay_tally < nay_tally
            }
        }
    }
}
