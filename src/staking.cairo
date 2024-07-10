use starknet::ContractAddress;

#[starknet::interface]
trait IStaking<TContractState> {
    fn create_lock(ref self: TContractState, caller: ContractAddress, amount: u128, lock_duration: u64); //creates lock -> tokens staked, for how long (the timestamp until which the tokens are locked.)
    fn increase_amount(ref self: TContractState, caller: ContractAddress, amount: u128);
    fn extend_unlock_date(ref self: TContractState, unlock_date: u64);
    fn withdraw(ref self: TContractState);
    fn set_floating_token_address(ref self: TContractState, address: ContractAddress);

    fn get_floating_token_address(self: @TContractState) -> ContractAddress;
    fn set_voting_token_address(ref self: TContractState, address: ContractAddress);
    fn get_voting_token_address(self: @TContractState) -> ContractAddress;
    fn get_balance_of(self: @TContractState, addr: ContractAddress) -> u128;
    fn balance_of_at(self: @TContractState, addr: ContractAddress, block: u64) -> u128;
    fn total_supply(self: @TContractState) -> u128;
    fn total_supply_at(self: @TContractState, block: u64) -> u128;
    fn get_locked_balance(self: @TContractState, addr: ContractAddress) -> (u128, u64);
}

#[starknet::component]
mod staking {
    use core::traits::Into;
    use super::IStaking;
    use konoha::traits::{get_governance_token_address_self, IERC20Dispatcher, IERC20DispatcherTrait};
    use integer::u256_from_felt252;
    use starknet::{
        ContractAddress, get_block_timestamp, get_block_number, get_caller_address, get_contract_address
    };

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
        voting_token_address: ContractAddress,       //voting token address
        epoch: u64, //change epochs, incrememnts by one every change
        point_history: LegacyMap::<u64, Point>, //voting power history (global)
        user_point_history: LegacyMap::<(ContractAddress, u64), Point>, //voting power history (user)
        user_point_epoch: LegacyMap::<ContractAddress, u64>, //latest epoch number for user
        slope_changes: LegacyMap::<u64, u128>, //scheduled change in slope
        locked: LegacyMap::<ContractAddress, LockedBalance>, //locked amount
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
        fn get_balance_of(self: @ComponentState<TContractState>, addr: ContractAddress) -> u128 {
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

        fn get_locked_balance(self: @ComponentState<TContractState>, addr: ContractAddress) -> (u128, u64) {
            let LockedBalance { amount: locked_amount, end: locked_end_date } = self.locked.read(addr);
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
            assert(unlock_date <= get_block_timestamp() + MAXTIME, 'Voting lock can be 4 years max');
        
            let new_locked = LockedBalance { amount, end: unlock_date };
        
            let token = IERC20Dispatcher { contract_address: self.floating_token_address.read() };
        
            let balance = token.balance_of(caller);
            assert(balance >= amount.into(), 'Insufficient balance');
        
            token.transfer_from(caller, get_contract_address(), amount.into());

            self._checkpoint(caller, old_locked, new_locked);
            self.locked.write(caller, new_locked);
        
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
            ref self: ComponentState<TContractState>, 
            caller: ContractAddress, 
            amount: u128
        ) {
            let old_locked: LockedBalance = self.locked.read(caller);
            assert(amount > 0, 'Need non-zero amount');
            assert(old_locked.amount > 0, 'No existing lock found');
            assert(old_locked.end > get_block_timestamp(), 'Cannot add to expired lock');
            
            let new_locked = LockedBalance { 
                amount: old_locked.amount + amount, 
                end: old_locked.end 
            };
            
            let token = IERC20Dispatcher { contract_address: self.floating_token_address.read() };
            
            let balance = token.balance_of(caller);
            assert(balance >= amount.into(), 'Insufficient balance');
            
            token.transfer_from(caller, get_contract_address(), amount.into());
            
            self._checkpoint(caller, old_locked, new_locked);
            self.locked.write(caller, new_locked);
        
            self.emit(Deposit {
                caller,
                amount,
                locktime: old_locked.end,
                type_: DEPOSIT_TYPE_INCREASE_AMOUNT,
                ts: get_block_timestamp(),
            });
        }
                
        fn extend_unlock_date(ref self: ComponentState<TContractState>, unlock_date: u64) {
            let caller = get_caller_address();
            let old_locked: LockedBalance = self.locked.read(caller);
            assert(old_locked.amount > 0, 'No existing lock found');
            assert(old_locked.end > get_block_timestamp(), 'Lock expired');
            assert(unlock_date > old_locked.end, 'Can only increase lock duration');
            assert(unlock_date <= get_block_timestamp() + MAXTIME, 'Voting lock can be 4 years max');
        
            let new_locked = LockedBalance { 
                amount: old_locked.amount, 
                end: unlock_date 
            };
        
            self._checkpoint(caller, old_locked, new_locked);
            self.locked.write(caller, new_locked);
        
            self.emit(Deposit {
                caller,
                amount: 0,
                locktime: unlock_date,
                type_: DEPOSIT_TYPE_INCREASE_TIME,
                ts: get_block_timestamp(),
            });
        }        

        fn withdraw(ref self: ComponentState<TContractState>) {
            let caller = get_caller_address();
            let LockedBalance { amount: locked_amount, end: locked_end_date } = self.locked.read(caller);
            assert(get_block_timestamp() >= locked_end_date, 'The lock did not expire');
            let amount = locked_amount;
        
            self.locked.write(caller, LockedBalance { amount: 0, end: 0 });
            let user_epoch = self.user_point_epoch.read(caller);
            self.user_point_epoch.write(caller, user_epoch + 1);
            self.user_point_history.write(
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
            assert(caller == myaddr, 'can only call from proposal(V)');
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
                self.slope_changes.write(old_locked.end, self.slope_changes.read(old_locked.end) - old_slope);
            }
            
            if new_locked.end > block_time {
                self.slope_changes.write(new_locked.end, self.slope_changes.read(new_locked.end) + new_slope);
            }
        }
        

        fn _balance_of(self: @ComponentState<TContractState>, addr: ContractAddress, t: u64) -> u128 {
            let LockedBalance { amount: locked_amount, end: locked_end_date } = self.locked.read(addr);
            let start_time = get_block_timestamp(); // Assuming this is when the lock was created
            
            if t >= locked_end_date {
                0
            } else if t <= start_time {
                locked_amount
            } else {
                let total_lock_duration = locked_end_date - start_time;
                let elapsed_time = t - start_time;
                let remaining_time = total_lock_duration - elapsed_time;
                
                (locked_amount * remaining_time.into()) / total_lock_duration.into()
            }
        }

        fn _balance_of_at(self: @ComponentState<TContractState>, addr: ContractAddress, block: u64) -> u128 {
        //    // Get the latest user point epoch
        //    let user_epoch = self.user_point_epoch.read(addr);
        //    
        //    // Binary search to find the point at the given block
        //    let mut low = 0;
        //    let mut high = user_epoch;
        //    point.blk = block_number;
        //    while low < high {
        //        let mid = (low + high + 1) / 2;
        //        let point = self.user_point_history.read((addr, mid));
        //        if point.blk <= block {
        //            low = mid;
        //        } else {
        //            high = mid - 1;
        //        }
        //    }
        //    
        //    let point = self.user_point_history.read((addr, low));
        //    let block_time = get_block_timestamp_at_block(block); // Assuming a function that returns the timestamp at the given block
        //    let time_diff = block_time - point.ts;
        //
        //    if time_diff >= 0 {
        //        let balance = point.bias - point.slope * time_diff as u128;
        //        if balance > 0 {
        //            balance
        //        } else {
        //            0
        //        }
        //    } else {
                0
        //    }
        }
        //fn calculate_voting_power(amount: u128, duration: u64) -> u128 {
        //    // Implement your voting power calculation logic here
        //    // This could be a simple multiplication or a more complex formula
        //    let duration = 1000;
        //    amount * (duration.into() / ONE_YEAR) // Example: 1 year lock gives full voting power
        //}
        

        fn _supply_at(self: @ComponentState<TContractState>, t: u64) -> u128 {
            let mut point = self.point_history.read(self.epoch.read());
            let mut supply = point.bias;
        
            let mut timestamp = point.ts;
            while timestamp < t {
                let slope_change = self.slope_changes.read(timestamp);
                supply = supply - point.slope * (t.into() - timestamp.into());
                point.slope = point.slope + slope_change;
                timestamp = timestamp + WEEK;
            };
        
            if supply > 0 {
                supply
            } else {
                0
            }
        }
        
    }
}