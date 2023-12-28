const NEW_PROPOSAL_QUORUM: u128 =
    200; // 1/200 of totalSupply required to propose an upgrade. Quorums don't take into account investors. at all, they don't count into total eligible voters, but do vote
const PROPOSAL_VOTING_TIME_BLOCKS: u64 = 2500;
const QUORUM: u128 = 10; // 1/10 of totalSupply required to participate to pass
const MINUS_ONE: felt252 = 0x800000000000011000000000000000000000000000000000000000000000000;
const TEAM_TOKEN_BALANCE: u128 = 1000000000000000000;
const OPTION_CALL: felt252 = 0;
const OPTION_PUT: felt252 = 1;
const TRADE_SIDE_LONG: felt252 = 0;
const TRADE_SIDE_SHORT: felt252 = 1;
const PROPOSAL_VOTING_SECONDS: u64 = consteval_int!(60 * 60 * 24 * 7);


// ADDRESSES

const USDC_ADDRESS: felt252 = 0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8;
const ETH_ADDRESS: felt252 = 0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7;
const BTC_ADDRESS: felt252 = 0x03fe2b97c1fd336e750087d68b9b867997fd64a2661ff3ca5a7c771641e8e7ac;

// CLASS HASHES

const LP_TOKEN_CLASS_HASH: felt252 = 0x0; // TODO
const AMM_CLASS_HASH: felt252 = 0x0; // TODO
