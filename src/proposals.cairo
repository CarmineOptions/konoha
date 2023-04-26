mod Proposals {
    use traits::TryInto;
    use option::OptionTrait;
    use traits::Into;
    use box::BoxTrait;

    use starknet::get_block_info;
    use starknet::get_caller_address;
    use starknet::BlockInfo;

    use governance::contract::Governance::proposal_total_yay;
    use governance::contract::Governance::proposal_total_nay;
    use governance::contract::Governance::proposal_vote_ends;
    use governance::contract::Governance::proposal_details;
    use governance::contract::Governance::proposal_voted_by;
    use governance::contract::Governance::governance_token_address;
    use governance::contract::Governance;
    use governance::types::BlockNumber;
    use governance::types::ContractType;
    use governance::types::PropDetails;
    use governance::traits::IERC20Dispatcher;
    use governance::traits::IERC20DispatcherTrait;
    use governance::constants;

    fn get_vote_counts(prop_id: felt252) -> (felt252, felt252) {
        let yay = proposal_total_yay::read(prop_id);
        let nay = proposal_total_nay::read(prop_id);

        (yay, nay)
    }

    fn get_proposal_details(prop_id: felt252) -> PropDetails {
        proposal_details::read(prop_id)
    }

    fn get_free_prop_id() -> felt252 {
        _get_free_prop_id(0)
    }

    fn _get_free_prop_id(currid: felt252) -> felt252 {
        let res = proposal_vote_ends::read(currid);

        if res == 0 {
            currid
        } else {
            _get_free_prop_id(currid + 1)
        }
    }

    fn assert_correct_contract_type(contract_type: ContractType) {
        let contract_type_u: u64 = contract_type.try_into().unwrap();
        assert(contract_type_u <= 2_u64, 'invalid contract type')
    }

    fn assert_voting_in_progress(prop_id: felt252) {
        let end_block_number_felt: felt252 = proposal_vote_ends::read(prop_id);
        let end_block_number: u64 = end_block_number_felt.try_into().unwrap();
        assert(end_block_number != 0_u64, 'prop_id not found');

        let current_block_number: u64 = get_block_info().unbox().block_number;

        assert(end_block_number > current_block_number, 'voting concluded');
    }

    fn as_u256(high: u128, low: u128) -> u256 {
        u256 { low, high }
    }

    fn submit_proposal(impl_hash: felt252, to_upgrade: ContractType) -> felt252 {
        let IMPL_HASH_MIN_VALUE: felt252 = 0x200000000000000000000000000000000000000000000000000000000000;
        // assert(IMPL_HASH_MIN_VALUE < impl_hash, 'impl_hash weirdly small'); < Trait has no implementation in context: core::traits::PartialOrd::<core::felt252>
        // so skipping this check for now, FIXME
        assert_correct_contract_type(to_upgrade);
        let govtoken_addr = governance_token_address::read();
        let caller = get_caller_address();
        let caller_balance : u128  = IERC20Dispatcher{contract_address: govtoken_addr}.balanceOf(caller).low;
        let total_supply = IERC20Dispatcher{contract_address: govtoken_addr}.totalSupply();
        let res: u256 = as_u256(0_u128, caller_balance * constants::NEW_PROPOSAL_QUORUM); // TODO use such multiplication that u128 * u128 = u256
        assert(total_supply < res, 'not enough tokens to submit');

        let prop_id = get_free_prop_id();
        let prop_details = PropDetails {
            impl_hash: impl_hash,
            to_upgrade: to_upgrade
        };
        proposal_details::write(prop_id, prop_details);

        let current_block_number: u64 = get_block_info().unbox().block_number;
        let end_block_number: BlockNumber = (current_block_number + constants::PROPOSAL_VOTING_TIME_BLOCKS).into();
        proposal_vote_ends::write(prop_id, end_block_number);

        Governance::Proposed(prop_id, impl_hash, to_upgrade);
        prop_id
    }

    fn vote(prop_id: felt252, opinion: felt252) {
        // Checks
        // This is quite awful and a mistake by me, will be fixed but not during C1 migration.
        let MINUS_ONE: felt252 = 3618502788666131213697322783095070105623107215331596699973092056135872020480;
        assert(opinion == MINUS_ONE | opinion == 1, 'opinion must be either 1 or -1');
        let gov_token_addr = governance_token_address::read();
        let caller_addr = get_caller_address();
        let curr_vote_status: felt252 = proposal_voted_by::read((prop_id, caller_addr));
        assert(curr_vote_status == 0, 'already voted');

        let caller_balance_u256: u256 = IERC20Dispatcher { contract_address: gov_token_addr }.balanceOf(caller_addr);
        assert(caller_balance_u256.high == 0_u128, 'CARM balance > u128');
        let caller_balance: u128 = caller_balance_u256.low;
        assert(caller_balance != 0_u128, 'CARM balance is zero');

        assert_voting_in_progress(prop_id);

        // Cast vote
        // TODO fix Illegal bigint value during serialization.
        //proposal_voted_by::write((prop_id, caller_addr), opinion);
        if opinion == MINUS_ONE {
            let curr_votes: u128 = proposal_total_nay::read(prop_id).try_into().unwrap();
            let new_votes: u128 = curr_votes + caller_balance;
            assert(new_votes >= 0_u128, 'new_votes must be non-negative');
            proposal_total_nay::write(prop_id, new_votes.into());
        } else {
            let curr_votes: u128 = proposal_total_nay::read(prop_id).try_into().unwrap();
            let new_votes: u128 = curr_votes + caller_balance;
            assert(new_votes >= 0_u128, 'new_votes must be non-negative');
            proposal_total_yay::write(prop_id, new_votes.into());
        }
        Governance::Voted(prop_id, caller_addr, opinion);
    }

}
