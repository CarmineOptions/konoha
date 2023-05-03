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
    use governance::contract::Governance::investor_voting_power;
    use governance::contract::Governance::total_investor_distributed_power;
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

    //_get_free_prop_id(0)
    fn get_free_prop_id() -> felt252 {
        if proposal_vote_ends::read(
            0
        ) == 0 {
            0
        } else if proposal_vote_ends::read(
            1
        ) == 0 {
            1
        } else if proposal_vote_ends::read(
            2
        ) == 0 {
            2
        } else if proposal_vote_ends::read(
            3
        ) == 0 {
            3
        } else if proposal_vote_ends::read(
            4
        ) == 0 {
            4
        } else if proposal_vote_ends::read(
            5
        ) == 0 {
            5
        } else if proposal_vote_ends::read(
            6
        ) == 0 {
            6
        } else if proposal_vote_ends::read(
            7
        ) == 0 {
            7
        } else if proposal_vote_ends::read(
            8
        ) == 0 {
            8
        } else if proposal_vote_ends::read(
            9
        ) == 0 {
            9
        } else if proposal_vote_ends::read(
            10
        ) == 0 {
            10
        } else if proposal_vote_ends::read(
            11
        ) == 0 {
            11
        } else if proposal_vote_ends::read(
            12
        ) == 0 {
            12
        } else if proposal_vote_ends::read(
            13
        ) == 0 {
            13
        } else if proposal_vote_ends::read(
            14
        ) == 0 {
            14
        } else if proposal_vote_ends::read(
            15
        ) == 0 {
            15
        } else if proposal_vote_ends::read(
            16
        ) == 0 {
            16
        } else if proposal_vote_ends::read(
            17
        ) == 0 {
            17
        } else if proposal_vote_ends::read(
            18
        ) == 0 {
            18
        } else if proposal_vote_ends::read(19) == 0 {
            19
        } else {
            20
        }
    }

    fn _get_free_prop_id(currid: felt252) -> felt252 {
        gas::withdraw_gas_all(get_builtin_costs()).expect('Out of gas'); // remove after alpha7
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
        // let IMPL_HASH_MIN_VALUE: felt252 =
        //    0x200000000000000000000000000000000000000000000000000000000000;
        // assert(IMPL_HASH_MIN_VALUE < impl_hash, 'impl_hash weirdly small'); < Trait has no implementation in context: core::traits::PartialOrd::<core::felt252>
        // so skipping this check for now, FIXME
        // so this check is actually inside Cairo now. Very cool, ClassHash has its own type.
        assert_correct_contract_type(to_upgrade);
        let govtoken_addr = governance_token_address::read();
        let caller = get_caller_address();
        let caller_balance: u128 = IERC20Dispatcher {
            contract_address: govtoken_addr
        }.balanceOf(caller).low;
        let total_supply = IERC20Dispatcher { contract_address: govtoken_addr }.totalSupply();
        let res: u256 = as_u256(
            0_u128, caller_balance * constants::NEW_PROPOSAL_QUORUM
        ); // TODO use such multiplication that u128 * u128 = u256
        assert(total_supply < res, 'not enough tokens to submit');

        let prop_id = get_free_prop_id();
        let prop_details = PropDetails { impl_hash: impl_hash, to_upgrade: to_upgrade };
        proposal_details::write(prop_id, prop_details);

        let current_block_number: u64 = get_block_info().unbox().block_number;
        let end_block_number: BlockNumber = (current_block_number
            + constants::PROPOSAL_VOTING_TIME_BLOCKS).into();
        proposal_vote_ends::write(prop_id, end_block_number);

        Governance::Proposed(prop_id, impl_hash, to_upgrade);
        prop_id
    }

    fn vote(prop_id: felt252, opinion: felt252) {
        // Checks
        // This is quite awful and a mistake by me, will be fixed but not during C1 migration.
        assert(opinion == constants::MINUS_ONE | opinion == 1, 'opinion must be either 1 or -1');
        let gov_token_addr = governance_token_address::read();
        let caller_addr = get_caller_address();
        let curr_vote_status: felt252 = proposal_voted_by::read((prop_id, caller_addr));
        assert(curr_vote_status == 0, 'already voted');

        let caller_balance_u256: u256 = IERC20Dispatcher {
            contract_address: gov_token_addr
        }.balanceOf(caller_addr);
        assert(caller_balance_u256.high == 0_u128, 'CARM balance > u128');
        let caller_balance: u128 = caller_balance_u256.low;
        assert(caller_balance != 0_u128, 'CARM balance is zero');

        assert_voting_in_progress(prop_id);

        // Cast vote
        proposal_voted_by::write((prop_id, caller_addr), opinion);
        if opinion == constants::MINUS_ONE {
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

    fn check_proposal_passed_express(prop_id: felt252) -> u8 {
        let gov_token_addr = governance_token_address::read();
        let yay_tally_felt: felt252 = proposal_total_yay::read(prop_id);
        let yay_tally: u128 = yay_tally_felt.try_into().unwrap();
        let total_eligible_votes_from_tokenholders_u256: u256 = IERC20Dispatcher {
            contract_address: gov_token_addr
        }.totalSupply();
        assert(
            total_eligible_votes_from_tokenholders_u256.high == 0_u128, 'totalSupply weirdly high'
        );
        let total_eligible_votes_from_tokenholders: u128 =
            total_eligible_votes_from_tokenholders_u256.low;

        // Not only tokenholders are eligible, but investors as well, they hold 1/4th of the voting power
        // However, their votes are currently stored in storage_var, not tokens
        // So we must calculate 4/3 of the total supply (additional supply will be 1/4th of new total)
        // and from that 1/2, because that's 50%, So (4/3) * (1/2) = 2/3 of the total supply
        // Multiply total votes by 2 and divide by 3
        let minimum_for_express: u128 = total_eligible_votes_from_tokenholders * 2_u128 / 3_u128;

        // Check if yay_tally >= minimum_for_express
        if yay_tally >= minimum_for_express {
            1_u8
        } else {
            0_u8
        }
    }

    fn get_proposal_status(prop_id: felt252) -> felt252 {
        let end_block_number_felt: felt252 = proposal_vote_ends::read(prop_id);
        let end_block_number: u64 = end_block_number_felt.try_into().unwrap();
        let current_block_number: u64 = get_block_info().unbox().block_number;

        if current_block_number <= end_block_number {
            return check_proposal_passed_express(prop_id).into();
        }

        let gov_token_addr = governance_token_address::read();
        let nay_tally_felt: felt252 = proposal_total_nay::read(prop_id);
        let yay_tally_felt: felt252 = proposal_total_yay::read(prop_id);
        let nay_tally: u128 = nay_tally_felt.try_into().unwrap();
        let yay_tally: u128 = yay_tally_felt.try_into().unwrap();
        let total_tally: u128 = yay_tally + nay_tally;

        let total_eligible_votes_u256: u256 = IERC20Dispatcher {
            contract_address: gov_token_addr
        }.totalSupply();
        assert(total_eligible_votes_u256.high == 0_u128, 'unable to check quorum');
        let total_eligible_votes: u128 = total_eligible_votes_u256.low;

        let quorum_threshold: u128 = total_eligible_votes * constants::QUORUM;
        if total_tally < quorum_threshold {
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

    fn vote_investor(prop_id: felt252, opinion: felt252) {
        // Checks
        assert(opinion == constants::MINUS_ONE | opinion == 1, 'opinion must be either 1 or -1');

        let caller_addr = get_caller_address();
        let investor_voting_power: u128 = investor_voting_power::read(
            caller_addr
        ).try_into().unwrap();
        assert(investor_voting_power != 0_u128, 'caller not whitelisted investor');

        let curr_vote_status: felt252 = proposal_voted_by::read((prop_id, caller_addr));
        assert(curr_vote_status == 0, 'already voted');

        assert_voting_in_progress(prop_id);

        // Calculate real voting power
        let gov_token_addr = governance_token_address::read();
        let total_supply_u256: u256 = IERC20Dispatcher {
            contract_address: gov_token_addr
        }.totalSupply();
        assert(total_supply_u256.high == 0_u128, 'totalSupply weirdly high');
        let total_supply: u128 = total_supply_u256.low;
        let real_investor_voting_power: u128 = total_supply - constants::TEAM_TOKEN_BALANCE;
        assert(total_supply >= constants::TEAM_TOKEN_BALANCE, 'total_supply<team token bal?');
        let total_distributed_power: u128 =
            total_investor_distributed_power::read().try_into().unwrap();
        let vote_power = (real_investor_voting_power * investor_voting_power)
            / total_distributed_power;
        assert(vote_power != 0_u128, 'vote_power is zero');

        // Cast vote
        proposal_voted_by::write((prop_id, caller_addr), opinion);
        if opinion == constants::MINUS_ONE {
            let curr_votes: u128 = proposal_total_nay::read(prop_id).try_into().unwrap();
            let new_votes: u128 = curr_votes + vote_power;
            assert(new_votes >= 0_u128, 'new_votes negative');
            proposal_total_nay::write(prop_id, new_votes.into());
        } else {
            let curr_votes: u128 = proposal_total_yay::read(prop_id).try_into().unwrap();
            let new_votes: u128 = curr_votes + vote_power;
            assert(new_votes >= 0_u128, 'new_votes negative');
            proposal_total_yay::write(prop_id, new_votes.into());
        }
    }
}
