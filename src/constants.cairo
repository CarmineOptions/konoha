const NEW_PROPOSAL_QUORUM: u128 =
    200_u128; // 1/200 of totalSupply required to propose an upgrade. Quorums don't take into account investors. at all, they don't count into total eligible voters, but do vote
const PROPOSAL_VOTING_TIME_BLOCKS: u64 = 500_u64;
const QUORUM: u128 = 10_u128; // 1/10 of totalSupply required to participate to pass
const MINUS_ONE: felt252 = 0x800000000000011000000000000000000000000000000000000000000000000;
const TEAM_TOKEN_BALANCE: u128 = 1000000000000000000_u128;