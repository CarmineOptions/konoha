mod airdrop;
mod treasury_types {
    mod carmine;
}
mod constants;
mod contract;
mod merkle_tree;
//mod options;
mod proposals;
mod token;
mod traits;
mod treasury;
mod types;
mod upgrades;
mod vesting;
mod govtoken; // if I put this in tests/ , I seem unable to use declare('MyToken')
mod voting_token;
mod testing {
    mod setup;
}
