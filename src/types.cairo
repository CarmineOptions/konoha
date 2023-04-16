#[derive(Copy, Drop)]
struct PropDetails {
    impl_hash: felt252,
    to_upgrade: felt252,
}

struct VoteCounts {
    yay: felt252,
    nay: felt252
}

type BlockNumber = felt252;
type VoteStatus = felt252; // 0 = not voted, 1 = yay, -1 = nay
type ContractType = felt252;  // for Carmine 0 = amm, 1 = governance, 2 = CARM token