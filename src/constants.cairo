const NEW_PROPOSAL_QUORUM: u128 =
    200_u128; // 1/200 of totalSupply required to propose an upgrade. Quorums don't take into account investors. at all, they don't count into total eligible voters, but do vote
const PROPOSAL_VOTING_TIME_BLOCKS: u64 = 500_u64;
