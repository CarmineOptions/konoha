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
    use governance::contract::Governance::governance_token_address;
    use governance::contract::Governance;
    use governance::types::BlockNumber;
    use governance::types::ContractType;
    use governance::traits::IERC20Dispatcher;
    use governance::traits::IERC20DispatcherTrait;
    use governance::constants;

    fn get_vote_counts(prop_id: felt252) -> (felt252, felt252) {
        let yay = proposal_total_yay::read(prop_id);
        let nay = proposal_total_nay::read(prop_id);

        (yay, nay)
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
        // conversion to u128 must go through felt, nothing else is supported in Cairo rn
        let caller_balance : u128  = IERC20Dispatcher{contract_address: govtoken_addr}.balanceOf(caller).low;
        let total_supply = IERC20Dispatcher{contract_address: govtoken_addr}.totalSupply();
        let res: u256 = as_u256(0_u128, caller_balance * constants::NEW_PROPOSAL_QUORUM); // TODO use such multiplication that u128 * u128 = u256
        assert(total_supply < res, 'not enough tokens to submit');

        let prop_id = get_free_prop_id();

        // TODO write to prop_details once writes to it are solved

        let current_block_number: u64 = get_block_info().unbox().block_number;
        let end_block_number: BlockNumber = (current_block_number + constants::PROPOSAL_VOTING_TIME_BLOCKS).into();
        proposal_vote_ends::write(prop_id, end_block_number);

        Governance::Proposed(prop_id, impl_hash, to_upgrade);
        prop_id
    }
}
