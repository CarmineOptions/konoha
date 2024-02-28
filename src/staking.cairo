#[starknet::interface]
trait IAirdrop<TContractState> {
    fn stake(
        ref self: TContractState, length: u64, amount: u128
    ) -> u32; // returns stake ID
    fn unstake(
        ref self: TContractState, id: u32
    );


    // owner only
    // set_curve_point
}

#[starknet::component]
mod staking {
    use cubit::f128;

    #[storage]
    struct Storage {
        stake: LegacyMap::<(ContractAddress, u32), (u128, u128, u64, u64)>, // STAKE(address, ID) → (amount staked, amount veCARM, start date, length of stake)
        curve: LegacyMap::<u64, f128> // length of stake > CARM to veCARM conversion rate (in cubit f128) 
    }

    // impl, etc, embeddable_as StakingImpl...
    // fn stake()
    // fn unstake(){
        // here, keep in mind the special case where the user has veCARM and no corresponding entry in the stake storage var.
        // what id to use? to be decided
    //}
}