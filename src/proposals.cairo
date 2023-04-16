mod Proposals {
    use traits::TryInto;
    use option::OptionTrait;
    use box::BoxTrait;

    use starknet::get_block_info;
    use starknet::BlockInfo;

    use governance::contract::Governance::proposal_total_yay;
    use governance::contract::Governance::proposal_total_nay;
    use governance::contract::Governance::proposal_vote_ends;

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

    fn assert_voting_in_progress(prop_id: felt252) {
        let end_block_number_felt: felt252 = proposal_vote_ends::read(prop_id);
        let end_block_number: u64 = end_block_number_felt.try_into().unwrap();
        assert(end_block_number != 0, 'prop_id not found');

        let current_block_number: u64 = get_block_info().unbox().block_number;

        assert(end_block_number > current_block_number, 'voting concluded');
    }
}
