use starknet::ContractAddress;

// This component should not be used along with delegation, as when the tokens are unstaked, they are not automatically undelegated.

#[starknet::interface]
trait IStaking<TContractState> {
    fn stake(ref self: TContractState, length: u64, amount: u128) -> u32; // returns stake ID
    fn unstake(ref self: TContractState, id: u32);
    fn unstake_airdrop(ref self: TContractState, amount: u128);

    fn set_curve_point(ref self: TContractState, length: u64, conversion_rate: u16);
    fn set_floating_token_address(ref self: TContractState, address: ContractAddress);

    fn get_floating_token_address(self: @TContractState) -> ContractAddress;
    fn get_stake(self: @TContractState, address: ContractAddress, stake_id: u32) -> staking::Stake;
    fn get_total_voting_power(self: @TContractState, address: ContractAddress) -> u128;
}

#[starknet::component]
mod staking {
    use konoha::traits::{
        get_governance_token_address_self, IERC20Dispatcher, IERC20DispatcherTrait
    };
    use starknet::{
        ContractAddress, get_block_timestamp, get_caller_address, get_contract_address, StorePacking
    };
    use zeroable::NonZero;
    use zeroable::NonZeroIntoImpl;

    #[derive(Copy, Drop, Serde)]
    struct Stake {
        amount_staked: u128,
        amount_voting_token: u128,
        start_date: u64,
        length: u64,
        withdrawn: bool
    }

    const TWO_POW_64: u128 = 0x10000000000000000;
    const TWO_POW_128: felt252 = 0x100000000000000000000000000000000;
    const TWO_POW_192: felt252 = 0x1000000000000000000000000000000000000000000000000;

    impl StakeStorePacking of StorePacking<Stake, (felt252, felt252)> {
        fn pack(value: Stake) -> (felt252, felt252) {
            let fst = value.amount_staked.into() + value.start_date.into() * TWO_POW_128;
            let snd = value.amount_voting_token.into()
                + value.length.into() * TWO_POW_128
                + value.withdrawn.into() * TWO_POW_192;
            (fst.into(), snd.into())
        }

        fn unpack(value: (felt252, felt252)) -> Stake {
            let (fst, snd) = value;
            let fst: u256 = fst.into();
            let amount_staked = fst.low;
            let start_date = fst.high;
            let snd: u256 = snd.into();
            let amount_voting_token = snd.low;
            let two_pow_64: NonZero<u128> = TWO_POW_64.try_into().unwrap();
            let (withdrawn, length) = DivRem::div_rem(snd.high, two_pow_64);
            assert(withdrawn == 0 || withdrawn == 1, 'wrong val: withdrawn');
            Stake {
                amount_staked,
                amount_voting_token,
                start_date: start_date.try_into().expect('unwrap fail start_date'),
                length: length.try_into().expect('unpack fail length'),
                withdrawn: withdrawn != 0
            }
        }
    }

    #[storage]
    struct Storage {
        stake: LegacyMap::<
            (ContractAddress, u32), Stake
        >, // STAKE(address, ID) → Stake{amount staked, amount voting token, start date, length of stake, withdrawn}
        curve: LegacyMap::<
            u64, u16
        >, // length of stake > CARM to veCARM conversion rate (conversion rate is expressed in % – 2:1 is 200)
        floating_token_address: ContractAddress
    }

    #[derive(starknet::Event, Drop)]
    struct Staked {
        user: ContractAddress,
        stake_id: u32,
        amount: u128,
        amount_voting_token: u128,
        start_date: u64,
        length: u64
    }

    #[derive(starknet::Event, Drop)]
    struct Unstaked {
        user: ContractAddress,
        stake_id: u32,
        amount: u128,
        amount_voting_token: u128,
        start_date: u64,
        length: u64
    }

    #[derive(starknet::Event, Drop)]
    struct UnstakedAirdrop {
        user: ContractAddress,
        amount: u128
    }

    #[derive(starknet::Event, Drop)]
    #[event]
    enum Event {
        Staked: Staked,
        Unstaked: Unstaked,
        UnstakedAirdrop: UnstakedAirdrop
    }

    #[embeddable_as(StakingImpl)]
    impl Staking<
        TContractState, +HasComponent<TContractState>,
    > of super::IStaking<ComponentState<TContractState>> {
        fn stake(ref self: ComponentState<TContractState>, length: u64, amount: u128) -> u32 {
            let caller = get_caller_address();

            assert(amount != 0, 'amount to stake is zero');
            let conversion_rate: u16 = self.curve.read(length);
            assert(conversion_rate != 0, 'unsupported stake length');

            let floating_token = IERC20Dispatcher {
                contract_address: self.floating_token_address.read()
            };
            floating_token.transfer_from(caller, get_contract_address(), amount.into());

            let (amount_voting_token, _) = DivRem::div_rem((amount * conversion_rate.into()), 100);
            let free_id = self.get_free_stake_id(caller);

            self
                .stake
                .write(
                    (caller, free_id),
                    Stake {
                        amount_staked: amount,
                        amount_voting_token,
                        start_date: get_block_timestamp(),
                        length,
                        withdrawn: false
                    }
                );

            let voting_token = IERC20Dispatcher {
                contract_address: get_governance_token_address_self()
            };
            voting_token.mint(caller, amount_voting_token.into());
            self
                .emit(
                    Staked {
                        user: caller,
                        stake_id: free_id,
                        amount,
                        amount_voting_token,
                        start_date: get_block_timestamp(),
                        length
                    }
                );
            free_id
        }

        fn unstake(ref self: ComponentState<TContractState>, id: u32) {
            let caller = get_caller_address();
            let res: Stake = self.stake.read((caller, id));

            assert(!res.withdrawn, 'stake withdrawn already');

            assert(res.amount_staked != 0, 'no stake found, check stake id');
            let unlock_date = res.start_date + res.length;
            assert(get_block_timestamp() > unlock_date, 'unlock time not yet reached');

            let voting_token = IERC20Dispatcher {
                contract_address: get_governance_token_address_self()
            };
            voting_token.burn(caller, res.amount_voting_token.into());

            let floating_token = IERC20Dispatcher {
                contract_address: self.floating_token_address.read()
            };
            // user gets back the same amount of tokens they put in.
            // the payoff is in holding voting tokens, which make the user eligible for distributions of protocol revenue
            // works for tokens with fixed max float
            floating_token.transfer(caller, res.amount_staked.into());
            self
                .stake
                .write(
                    (caller, id),
                    Stake {
                        amount_staked: res.amount_staked,
                        amount_voting_token: res.amount_voting_token,
                        start_date: res.start_date,
                        length: res.length,
                        withdrawn: true
                    }
                );
            self
                .emit(
                    Unstaked {
                        user: caller,
                        stake_id: id,
                        amount: res.amount_staked,
                        amount_voting_token: res.amount_voting_token,
                        start_date: res.start_date,
                        length: res.length
                    }
                );
        }

        fn unstake_airdrop(ref self: ComponentState<TContractState>, amount: u128) {
            let caller = get_caller_address();

            let total_staked = self.get_total_staked_accounted(caller); // manually staked tokens
            let voting_token = IERC20Dispatcher {
                contract_address: get_governance_token_address_self()
            };
            let voting_token_balance = voting_token.balance_of(caller).try_into().unwrap();
            assert(
                voting_token_balance > total_staked, 'no extra tokens to unstake'
            ); // potentially unnecessary (underflow checks), but provides for a better error message
            let to_unstake = voting_token_balance - total_staked;

            // burn voting token, mint floating token
            let voting_token = IERC20Dispatcher {
                contract_address: get_governance_token_address_self()
            };
            voting_token.burn(caller, to_unstake.into());
            let floating_token = IERC20Dispatcher {
                contract_address: self.floating_token_address.read()
            };
            floating_token.transfer(caller, to_unstake.into());
            self.emit(UnstakedAirdrop { user: caller, amount: to_unstake });
        }

        fn set_curve_point(
            ref self: ComponentState<TContractState>, length: u64, conversion_rate: u16
        ) {
            let caller = get_caller_address();
            let myaddr = get_contract_address();
            assert(caller == myaddr, 'can only call from proposal');
            self.curve.write(length, conversion_rate);
        }

        fn set_floating_token_address(
            ref self: ComponentState<TContractState>, address: ContractAddress
        ) {
            let caller = get_caller_address();
            let myaddr = get_contract_address();
            assert(caller == myaddr, 'can only call from proposal');
            self.floating_token_address.write(address);
        }

        fn get_floating_token_address(self: @ComponentState<TContractState>) -> ContractAddress {
            self.floating_token_address.read()
        }

        fn get_stake(
            self: @ComponentState<TContractState>, address: ContractAddress, stake_id: u32
        ) -> Stake {
            self.stake.read((address, stake_id))
        }

        fn get_total_voting_power(
            self: @ComponentState<TContractState>, address: ContractAddress
        ) -> u128 {
            let mut id = 0;
            let mut acc = 0;
            let currtime = get_block_timestamp();
            loop {
                let res: Stake = self.stake.read((address, id));
                if (res.amount_voting_token == 0) {
                    break acc;
                }
                id += 1;
                let not_expired: bool = currtime < (res.length + res.start_date);
                if (not_expired) {
                    acc += res.amount_voting_token;
                }
            }
        }
    }

    #[generate_trait]
    impl InternalImpl<
        TContractState, +HasComponent<TContractState>
    > of InternalTrait<TContractState> {
        fn get_free_stake_id(
            self: @ComponentState<TContractState>, address: ContractAddress
        ) -> u32 {
            self._get_free_stake_id(address, 0)
        }

        fn _get_free_stake_id(
            self: @ComponentState<TContractState>, address: ContractAddress, id: u32
        ) -> u32 {
            let res: Stake = self.stake.read((address, id));
            if (res.amount_staked == 0) {
                id
            } else {
                self._get_free_stake_id(address, id + 1)
            }
        }

        fn get_total_staked_accounted(
            self: @ComponentState<TContractState>, address: ContractAddress
        ) -> u128 {
            let mut id = 0;
            let mut acc = 0;
            loop {
                let res: Stake = self.stake.read((address, id));
                if (res.amount_voting_token == 0) {
                    break acc;
                }
                id += 1;
                if (!res.withdrawn) {
                    acc += res.amount_voting_token;
                }
            }
        }
    }
}