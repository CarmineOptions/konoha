const NEW_PROPOSAL_QUORUM: u128 =
    200; // 1/200 of totalSupply required to propose an upgrade. Quorums don't take into account investors. at all, they don't count into total eligible voters, but do vote
const MINUS_ONE: felt252 = 0x800000000000011000000000000000000000000000000000000000000000000;
