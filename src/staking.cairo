use starknet::ContractAddress;

#[starknet::interface]
trait IStaking<TContractState> {
    fn create_lock(
        ref self: TContractState, caller: ContractAddress, amount: u128, lock_duration: u64
    ); //creates lock -> tokens staked, for how long (the timestamp until which the tokens are locked.)
    fn increase_amount(ref self: TContractState, caller: ContractAddress, amount: u128);
    fn extend_unlock_date(ref self: TContractState, unlock_date: u64);
    fn withdraw(ref self: TContractState, caller: ContractAddress);

    fn set_floating_token_address(ref self: TContractState, address: ContractAddress);
    fn get_floating_token_address(self: @TContractState) -> ContractAddress;
    fn set_voting_token_address(ref self: TContractState, address: ContractAddress);
    fn get_voting_token_address(self: @TContractState) -> ContractAddress;

    fn get_current_supply(self: @TContractState, timestamp: u64) -> u128;
    fn get_balance_of(self: @TContractState, addr: ContractAddress, timestamp: u64) -> u128;
    fn get_locked_balance(self: @TContractState, addr: ContractAddress) -> (u128, u64);
}

#[starknet::component]
mod staking {
    use core::traits::Into;
    use integer::u256_from_felt252;
    use konoha::traits::{
        get_governance_token_address_self, IERC20Dispatcher, IERC20DispatcherTrait
    };
    use starknet::{
        ContractAddress, get_block_timestamp, get_block_number, get_caller_address,
        get_contract_address
    };
    use super::IStaking;

    const WEEK: u64 = 7 * 86400; // 7 days in seconds
    const MAXTIME: u64 = 4 * 365 * 86400; // 4 years in seconds
    const ONE_YEAR: u64 = 31536000; // 365 days

    //deposit types
    const DEPOSIT_TYPE_CREATE: u8 = 0;
    const DEPOSIT_TYPE_INCREASE_AMOUNT: u8 = 1;
    const DEPOSIT_TYPE_INCREASE_TIME: u8 = 2;

    #[derive(Drop, Serde, Copy, starknet::Store)]
    struct Point {
        bias: u128, //starting token deposit amount 
        slope: u128, //decay rate (token amount / stake time)
        ts: u64, //time stamp
        blk: u64, //block number
    }

    #[storage]
    struct Storage {
        floating_token_address: ContractAddress, //locked ERC20 token address 
        voting_token_address: ContractAddress, //voting token address
        epoch: u64, //change epochs, incrememnts by one every change
        point_history: LegacyMap::<u64, Point>, //voting power history (global)
        user_point_history: LegacyMap::<
            (ContractAddress, u64), Point
        >, //voting power history (user)
        user_point_epoch: LegacyMap::<ContractAddress, u64>, //latest epoch number for user
        slope_changes: LegacyMap::<u64, u128>, //scheduled change in slope
        locked: LegacyMap::<ContractAddress, LockedBalance>, //locked amount
        address_list: LegacyMap::<u32, ContractAddress>,
        address_count: u32,
    }

    #[derive(Drop, Serde, Copy, starknet::Store)]
    struct LockedBalance {
        amount: u128,
        end: u64,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        Deposit: Deposit,
        Withdraw: Withdraw,
    }

    #[derive(starknet::Event, Drop, Serde)]
    struct Deposit {
        caller: ContractAddress,
        amount: u128,
        locktime: u64,
        type_: u8,
        ts: u64,
    }

    #[derive(starknet::Event, Drop, Serde)]
    struct Withdraw {
        caller: ContractAddress,
        amount: u128,
        ts: u64,
    }

    #[embeddable_as(StakingImpl)]
    impl Staking<
        TContractState, +HasComponent<TContractState>
    > of super::IStaking<ComponentState<TContractState>> {
        fn get_balance_of(
            self: @ComponentState<TContractState>, addr: ContractAddress, timestamp: u64
        ) -> u128 {
            let LockedBalance { amount: locked_amount, end: locked_end_date } = self
                .locked
                .read(addr);
            let user_epoch = self.user_point_epoch.read(addr);
            let user_point: Point = self.user_point_history.read((addr, user_epoch));

            if timestamp >= locked_end_date {
                0
            } else {
                let total_lock_duration = locked_end_date - user_point.ts;
                let elapsed_time = timestamp - user_point.ts;
                let remaining_time = total_lock_duration - elapsed_time;

                (locked_amount * remaining_time.into()) / total_lock_duration.into()
            }
        }

        fn get_current_supply(self: @ComponentState<TContractState>, timestamp: u64) -> u128 {
            let mut total_supply: u128 = 0;
            let address_count = self.address_count.read();

            let mut i = 0;
            loop {
                if i >= address_count {
                    break;
                }

                let addr: ContractAddress = self.address_list.read(i);
                let balance = self.get_balance_of(addr, timestamp); // Use get_balance_of_at

                total_supply += balance;

                i += 1;
            };

            total_supply
        }

        fn get_locked_balance(
            self: @ComponentState<TContractState>, addr: ContractAddress
        ) -> (u128, u64) {
            let LockedBalance { amount: locked_amount, end: locked_end_date } = self
                .locked
                .read(addr);
            (locked_amount, locked_end_date)
        }

        //using create_lock, locking 4000veCRM for 4 years
        //  const FOUR_YEARS_IN_SECONDS: u64 = 4 * 365 * 24 * 60 * 60; // 126144000 seconds
        //  let amount = 4000 * 10_u128.pow(18); // Assuming 18 decimal places
        //  let current_time = get_block_timestamp();
        //  let lock_duration = current_time + FOUR_YEARS_IN_SECONDS;
        //create_lock(amount, lock_duration);

        fn create_lock(
            ref self: ComponentState<TContractState>,
            caller: ContractAddress,
            amount: u128,
            lock_duration: u64
        ) {
            let old_locked: LockedBalance = self.locked.read(caller);
            assert(old_locked.amount == 0, 'Withdraw old tokens first');
            assert(amount > 0, 'Need non-zero amount');

            let unlock_date = get_block_timestamp() + lock_duration.into();
            assert(unlock_date > get_block_timestamp(), 'can only lock in the future(CL)');
            assert(
                unlock_date <= get_block_timestamp() + MAXTIME, 'Voting lock can be 4 years max'
            );

            let new_locked = LockedBalance { amount, end: unlock_date };

            let token = IERC20Dispatcher { contract_address: self.floating_token_address.read() };

            let balance = token.balance_of(caller);
            assert(balance >= amount.into(), 'Insufficient balance');

            token.transfer_from(caller, get_contract_address(), amount.into());

            self.locked.write(caller, new_locked);
            let current_count = self.address_count.read();
            self.address_list.write(current_count, caller);
            self.address_count.write(current_count + 1);
            self._checkpoint(caller, old_locked, new_locked);

            let voting_token = IERC20Dispatcher {
                contract_address: get_governance_token_address_self()
            };
            voting_token.mint(caller, amount.into());
            self
                .emit(
                    Deposit {
                        caller,
                        amount,
                        locktime: unlock_date,
                        type_: DEPOSIT_TYPE_CREATE,
                        ts: get_block_timestamp(),
                    }
                );
        }

        fn increase_amount(
            ref self: ComponentState<TContractState>, caller: ContractAddress, amount: u128
        ) {
            let old_locked: LockedBalance = self.locked.read(caller);
            assert(amount > 0, 'Need non-zero amount');
            assert(old_locked.amount > 0, 'No existing lock found');
            assert(old_locked.end > get_block_timestamp(), 'Cannot add to expired lock');

            let new_locked = LockedBalance {
                amount: old_locked.amount + amount, end: old_locked.end
            };

            let token = IERC20Dispatcher { contract_address: self.floating_token_address.read() };

            let balance = token.balance_of(caller);
            assert(balance >= amount.into(), 'Insufficient balance');

            token.transfer_from(caller, get_contract_address(), amount.into());

            self.locked.write(caller, new_locked);
            self._checkpoint(caller, old_locked, new_locked);

            self
                .emit(
                    Deposit {
                        caller,
                        amount,
                        locktime: old_locked.end,
                        type_: DEPOSIT_TYPE_INCREASE_AMOUNT,
                        ts: get_block_timestamp(),
                    }
                );
        }

        fn extend_unlock_date(ref self: ComponentState<TContractState>, unlock_date: u64) {
            let caller = get_caller_address();
            let old_locked: LockedBalance = self.locked.read(caller);
            assert(old_locked.amount > 0, 'No existing lock found');
            assert(old_locked.end > get_block_timestamp(), 'Lock expired');
            assert(unlock_date > old_locked.end, 'Can only increase lock duration');
            assert(
                unlock_date <= get_block_timestamp() + MAXTIME, 'Voting lock can be 4 years max'
            );

            let new_locked = LockedBalance { amount: old_locked.amount, end: unlock_date };

            self.locked.write(caller, new_locked);
            self._checkpoint(caller, old_locked, new_locked);

            self
                .emit(
                    Deposit {
                        caller,
                        amount: 0,
                        locktime: unlock_date,
                        type_: DEPOSIT_TYPE_INCREASE_TIME,
                        ts: get_block_timestamp(),
                    }
                );
        }

        fn withdraw(ref self: ComponentState<TContractState>, caller: ContractAddress) {
            let LockedBalance { amount: locked_amount, end: locked_end_date } = self
                .locked
                .read(caller);
            assert(get_block_timestamp() >= locked_end_date, 'The lock did not expire');
            let amount = locked_amount;

            self.locked.write(caller, LockedBalance { amount: 0, end: 0 });
            let user_epoch = self.user_point_epoch.read(caller);
            self.user_point_epoch.write(caller, user_epoch + 1);
            self
                .user_point_history
                .write(
                    (caller, user_epoch + 1),
                    Point { bias: 0, slope: 0, ts: get_block_timestamp(), blk: get_block_number() }
                );

            assert(amount > 0, 'Withdrawing zero amount');
            let token = IERC20Dispatcher { contract_address: self.floating_token_address.read() };
            token.transfer(caller, amount.into());

            self.emit(Withdraw { caller, amount, ts: get_block_timestamp() });
        }

        fn set_floating_token_address(
            ref self: ComponentState<TContractState>, address: ContractAddress
        ) {
            let caller = get_caller_address();
            let myaddr = get_contract_address();
            assert(caller == myaddr, 'can only call from proposal(F)');
            self.floating_token_address.write(address);
        }

        fn get_floating_token_address(self: @ComponentState<TContractState>) -> ContractAddress {
            self.floating_token_address.read()
        }

        fn set_voting_token_address(
            ref self: ComponentState<TContractState>, address: ContractAddress
        ) {
            let caller = get_caller_address();
            let myaddr = get_contract_address();
            assert(caller == myaddr, 'can only call from proposal(F)');
            self.voting_token_address.write(address);
        }

        fn get_voting_token_address(self: @ComponentState<TContractState>) -> ContractAddress {
            self.voting_token_address.read()
        }
    }

    #[generate_trait]
    impl InternalImpl<
        TContractState, +HasComponent<TContractState>
    > of InternalTrait<TContractState> {
        fn _checkpoint(
            ref self: ComponentState<TContractState>,
            addr: ContractAddress,
            old_locked: LockedBalance,
            new_locked: LockedBalance
        ) {
            let mut epoch = self.epoch.read();
            let mut point = if epoch == 0 {
                Point { bias: 0, slope: 0, ts: get_block_timestamp(), blk: get_block_number() }
            } else {
                self.point_history.read(epoch)
            };

            let block_time = get_block_timestamp();
            let block_number = get_block_number();

            if block_time > point.ts {
                let mut last_point = point;
                last_point.bias -= last_point.slope * (block_time.into() - last_point.ts.into());
                if last_point.bias < 0 {
                    last_point.bias = 0;
                }

                self.point_history.write(epoch + 1, last_point);
                self.epoch.write(epoch + 1);
                epoch += 1;
                point = last_point;
            }

            point.ts = block_time;
            point.blk = block_number;

            let old_slope = if old_locked.end > block_time {
                old_locked.amount / (old_locked.end.into() - block_time.into())
            } else {
                0
            };

            let new_slope = if new_locked.end > block_time {
                new_locked.amount / (new_locked.end.into() - block_time.into())
            } else {
                0
            };

            point.bias = point.bias + new_locked.amount - old_locked.amount;
            point.slope = point.slope + new_slope - old_slope;

            self.point_history.write(epoch, point);
            self.user_point_history.write((addr, epoch), point);
            self.user_point_epoch.write(addr, epoch);

            if old_locked.end > block_time {
                self
                    .slope_changes
                    .write(old_locked.end, self.slope_changes.read(old_locked.end) - old_slope);
            }

            if new_locked.end > block_time {
                self
                    .slope_changes
                    .write(new_locked.end, self.slope_changes.read(new_locked.end) + new_slope);
            }
        }

        fn _supply(self: @ComponentState<TContractState>, t: u64) -> u128 {
            let mut epoch = self.epoch.read();
            let mut point: Point = self.point_history.read(epoch);

            let mut t_i = point.ts;
            let mut i = epoch;

            loop {
                if i == 0 {
                    break;
                }

                let last_point = point;
                point = self.point_history.read(i);

                if t < point.ts {
                    i -= 1;
                    continue;
                }

                let dt = if t > last_point.ts {
                    t - last_point.ts
                } else {
                    0
                };

                if point.bias > point.slope * dt.into() {
                    point.bias -= point.slope * dt.into();
                } else {
                    point.bias = 0;
                }

                if t_i > last_point.ts {
                    let d_slope = self.slope_changes.read(last_point.ts);
                    point.slope += d_slope;
                }

                t_i = last_point.ts;
                i -= 1;
            };

            point.bias
        }
        fn get_address_by_index(
            self: @ComponentState<TContractState>, index: u32
        ) -> ContractAddress {
            self.address_list.read(index)
        }
    }
}

