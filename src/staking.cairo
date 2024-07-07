use starknet::ContractAddress;

#[starknet::interface]
trait IVotingEscrow<TContractState> {
    fn create_lock(ref self: TContractState, value: u128, unlock_time: u64); //creates lock -> tokens staked, for how long (the timestamp until which the tokens are locked.)
    fn increase_amount(ref self: TContractState, value: u128);
    fn increase_unlock_time(ref self: TContractState, unlock_time: u64);
    fn withdraw(ref self: TContractState);

    fn balance_of(self: @TContractState, addr: ContractAddress) -> u128;
    fn balance_of_at(self: @TContractState, addr: ContractAddress, block: u64) -> u128;
    fn total_supply(self: @TContractState) -> u128;
    fn total_supply_at(self: @TContractState, block: u64) -> u128;
    fn locked(self: @TContractState, addr: ContractAddress) -> (u128, u64);
}

#[starknet::component]
mod voting_escrow {
    use core::traits::Into;
use super::IVotingEscrow;
    use konoha::traits::{IERC20Dispatcher, IERC20DispatcherTrait};
    use starknet::{
        ContractAddress, get_block_timestamp, get_block_number, get_caller_address, get_contract_address
    };

    const WEEK: u64 = 7 * 86400; // 7 days in seconds
    const MAXTIME: u64 = 4 * 365 * 86400; // 4 years in seconds
    const MULTIPLIER: u128 = 10_000_000_000; // To handle decimals

    //deposit types
    const DEPOSIT_TYPE_CREATE: u8 = 0;
    const DEPOSIT_TYPE_INCREASE_AMOUNT: u8 = 1;
    const DEPOSIT_TYPE_INCREASE_TIME: u8 = 2;

    #[derive(starknet::Event, Drop, Serde)]
    struct Point {
        bias: u128, //token amount 
        slope: u128, //decay rate (token amount / stake time)
        ts: u64, //time stamp
        blk: u64, //block number
    }

    #[derive(starknet::Event, Drop, Serde)]
    struct LockedBalance {
        amount: u128,
        end: u64,
    }

    #[storage]
    struct Storage {
        token: ContractAddress, //locked ERC20 token address 
        epoch: u64, //change epochs, incrememnts by one every change
        point_history: LegacyMap::<u64, Point>, //voting power history (global)
        user_point_history: LegacyMap::<(ContractAddress, u64), Point>, //voting power history (user)
        user_point_epoch: LegacyMap::<ContractAddress, u64>, //latest epoch number for user
        slope_changes: LegacyMap::<u64, u128>, //scheduled change in slope
        locked: LegacyMap::<ContractAddress, LockedBalance>, //locked amount
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        Deposit: Deposit,
        Withdraw: Withdraw,
    }

    #[derive(starknet::Event, Drop, Serde)]
    struct Deposit {
        provider: ContractAddress,
        value: u128,
        locktime: u64,
        type_: u8,
        ts: u64,
    }

    #[derive(starknet::Event, Drop, Serde)]
    struct Withdraw {
        provider: ContractAddress,
        value: u128,
        ts: u64,
    }

    #[embeddable_as(VotingEscrowImpl)]
    impl VotingEscrow<
        TContractState, +HasComponent<TContractState>
    > of super::IVotingEscrow<ComponentState<TContractState>> {
        fn balance_of(self: @ComponentState<TContractState>, addr: ContractAddress) -> u128 {
            self._balance_of(addr, get_block_timestamp())
        }

        fn balance_of_at(
            self: @ComponentState<TContractState>, addr: ContractAddress, block: u64
        ) -> u128 {
            self._balance_of_at(addr, block)
        }

        fn total_supply(self: @ComponentState<TContractState>) -> u128 {
            self._supply_at(get_block_timestamp())
        }

        fn total_supply_at(self: @ComponentState<TContractState>, block: u64) -> u128 {
            self._supply_at(block)
        }

        fn locked(self: @ComponentState<TContractState>, addr: ContractAddress) -> (u128, u64) {
            let locked = self.locked.read(addr);
            (locked.amount, locked.end)
        }

        //using create_lock, locking 4000veCRM for 4 years

        //  const FOUR_YEARS_IN_SECONDS: u64 = 4 * 365 * 24 * 60 * 60; // 126144000 seconds
        //  let amount = 4000 * 10_u128.pow(18); // Assuming 18 decimal places
        //  let current_time = get_block_timestamp();
        //  let unlock_time = current_time + FOUR_YEARS_IN_SECONDS;
        //create_lock(amount, unlock_time);

        fn create_lock(
            ref self: ComponentState<TContractState>, value: u128, unlock_time: u64
        ){ //users will create a lock with the amount of tokens and time to stake it in (seconds)?

            let caller = get_caller_address();

            let locked = self.locked.read(caller);
            assert(locked == 0, 'Withdraw old tokens first');
            assert(value > 0, 'Need non-zero value');
            assert_gt!(unlock_time, get_block_timestamp(), "can only lock in the future");
            assert(unlock_time <= get_block_timestamp() + MAXTIME, 'Voting lock can be 4 years max');

            self._deposit_for(caller, value, unlock_time, locked, DEPOSIT_TYPE_CREATE);
        }

        fn increase_amount(ref self: ComponentState<TContractState>, value: u128) {
            let caller = get_caller_address();
            let locked = self.locked.read(caller);
            assert(value > 0, 'Need non-zero value');
            assert(locked.amount > 0, 'No existing lock found');
            assert(locked.end > get_block_timestamp(), 'Cannot add to expired lock');

            self._deposit_for(caller, value, 0, locked, DEPOSIT_TYPE_INCREASE_AMOUNT);
        }

        fn increase_unlock_time(ref self: ComponentState<TContractState>, unlock_time: u64) {
            let caller = get_caller_address();
            let locked = self.locked.read(caller);
            assert(locked > 0, 'No existing lock found');
            assert(locked.end > get_block_timestamp(), 'Lock expired');
            assert(unlock_time > locked.end, 'Can only increase lock duration');
            assert(unlock_time <= get_block_timestamp() + MAXTIME, 'Voting lock can be 4 years max');

            self._deposit_for(caller, 0, unlock_time, locked, DEPOSIT_TYPE_INCREASE_TIME);
        }

        fn withdraw(ref self: ComponentState<TContractState>) {
            let caller = get_caller_address();
            let locked = self.locked.read(caller);
            assert(get_block_timestamp() >= locked.end, 'The lock did not expire');
            let value = locked;

            self.locked.write(caller, LockedBalance { amount: 0, end: 0 });
            let user_epoch = self.user_point_epoch.read(caller);
            self.user_point_epoch.write(caller, user_epoch + 1);
            self.user_point_history.write(
                (caller, user_epoch + 1),
                Point { bias: 0, slope: 0, ts: get_block_timestamp(), blk: get_block_number() }
            );
            self._checkpoint(caller, locked, LockedBalance { amount: 0, end: 0 });

            assert(value > 0, 'Withdrawing zero amount');
            let token = IERC20Dispatcher { contract_address: self.token.read() };
            token.transfer(caller, value);

            self.emit(Withdraw { provider: caller, value, ts: get_block_timestamp() });
        }
    }

    #[generate_trait]
    impl InternalImpl<
        TContractState, +HasComponent<TContractState>
    > of InternalTrait<TContractState> {
        fn _deposit_for(
            ref self: ComponentState<TContractState>,
            addr: ContractAddress,
            value: u128,
            unlock_time: u64,
            locked_balance: u128,
            type_: u8
        ) {
            let _type = type_;
            let mut locked = locked_balance;
            let supply_before = self._supply_at(get_block_timestamp());
            
            self.token.read().transfer_from(addr, get_contract_address(), value);
            
            let mut amount = locked.amount + value;
            assert(amount > 0, 'Insufficient deposit');
            
            let unlock_time = if unlock_time == 0 { locked.end } else { unlock_time };
            assert(unlock_time > get_block_timestamp(), 'Can only lock until time in the future');
            assert(unlock_time <= get_block_timestamp() + MAXTIME, 'Voting lock can be 4 years max');

            self.locked.write(addr, LockedBalance { amount, end: unlock_time });
            
            // Record global and per-user point
            self._checkpoint(addr, locked, LockedBalance { amount, end: unlock_time });
            
            if value != 0 {
                self.emit(Deposit {
                    provider: addr, value, locktime: unlock_time, type_: _type, ts: get_block_timestamp()
                });
            }
        }

        fn _checkpoint(
            ref self: ComponentState<TContractState>,
            addr: ContractAddress,
            old_locked: LockedBalance,
            new_locked: LockedBalance
        ) {
            let mut u_old = old_locked;
            let mut u_new = new_locked;
            let mut epoch = self.epoch.read();
            
            self.point_history.write(
                epoch,
                Point {
                    bias: 0,
                    slope: 0,
                    ts: get_block_timestamp(),
                    blk: get_block_number()
                }
            );
            
            if addr != starknet::contract_address_const::<0>() {
                let mut user_epoch = self.user_point_epoch.read(addr);
                self.user_point_epoch.write(addr, user_epoch + 1);
                self.user_point_history.write(
                    (addr, user_epoch + 1),
                    Point {
                        bias: 0,
                        slope: 0,
                        ts: get_block_timestamp(),
                        blk: get_block_number()
                    }
                );
            }
            
            self.epoch.write(epoch + 1);
        }

        fn _balance_of(self: @ComponentState<TContractState>, addr: ContractAddress, t: u64) -> u128 {
            let _t = t;
            let locked = self.locked.read(addr);
            if _t >= locked.end {
                0
            } else {
                locked.amount * (_t.into() - locked.end.into()) / MAXTIME.into();
            }
        }

        fn _balance_of_at(
            self: @ComponentState<TContractState>, addr: ContractAddress, block: u64
        ) -> u128 {
            // TODO: Implement historic balance calculation
            0
        }

        fn _supply_at(self: @ComponentState<TContractState>, t: u64) -> u128 {
            let _t = t;
            let epoch = self.epoch.read();
            let last_point = self.point_history.read(epoch);
            
            if _t > last_point.ts {
                last_point.bias
            } else {
                let mut point = last_point;
                let mut d_block = 0;
                let mut d_t = 0;
                if _t > point.ts {
                    d_block = block - point.blk;
                    d_t = _t - point.ts;
                }
                point.bias - point.slope * d_t.into();
            }
        }
    }
}
