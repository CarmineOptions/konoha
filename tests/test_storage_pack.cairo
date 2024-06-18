use konoha::staking::staking::{Stake, StakeStorePacking};

#[test]
fn pack_unpack(
    amount_staked: u128, amount_voting_token: u128, start_date: u64, length: u64, withdrawn_seed: u8
) {
    let withdrawn = (withdrawn_seed % 2) == 0; // fuzztester can't generate booleans
    let startingpoint: Stake = Stake {
        amount_staked, amount_voting_token, start_date, length, withdrawn
    };
    let packed = StakeStorePacking::pack(startingpoint);
    let unpacked = StakeStorePacking::unpack(packed);
    assert(startingpoint.amount_staked == unpacked.amount_staked, 'ops');
    assert(startingpoint.amount_voting_token == unpacked.amount_voting_token, 'oops');
    assert(startingpoint.start_date == unpacked.start_date, 'ooops');
    assert(startingpoint.length == unpacked.length, 'oooops');
    assert(startingpoint.withdrawn == unpacked.withdrawn, 'ooooops');
}
