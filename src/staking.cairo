use starknet::ContractAddress;

#[starknet::interface]
trait IStaking<TContractState> {
    fn stake(ref self: TContractState, length: u64, amount: u128) -> u32; // returns stake ID
    fn unstake(ref self: TContractState, id: u32);
    fn unstake_airdrop(ref self: TContractState, amount: u128);

    fn set_curve_point(ref self: TContractState, length: u64, conversion_rate: u16);
    fn set_floating_token_address(ref self: TContractState, address: ContractAddress);

    fn get_floating_token_address(self: @TContractState) -> ContractAddress;
}

#[starknet::component]
mod staking {
    use starknet::{ContractAddress, get_block_timestamp, get_caller_address, get_contract_address};
    use konoha::traits::{
        get_governance_token_address_self, IERC20Dispatcher, IERC20DispatcherTrait
    };
    use konoha::constants::UNLOCK_DATE;

    #[storage]
    struct Storage {
        stake: LegacyMap::<
            (ContractAddress, u32), (u128, u128, u64, u64)
        >, // STAKE(address, ID) → (amount staked, amount voting token, start date, length of stake)
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

            let amount_voting_token = (amount * conversion_rate.into()) / 100;
            let free_id = self.get_free_stake_id(caller);

            self
                .stake
                .write(
                    (caller, free_id), (amount, amount_voting_token, get_block_timestamp(), length)
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
            let res: (u128, u128, u64, u64) = self.stake.read((caller, id));
            let (amount_staked, amount_voting_token, start_date, length) = res;

            assert(amount_staked != 0, 'no stake found, check stake id');
            let unlock_date = start_date + length;
            assert(get_block_timestamp() > unlock_date, 'unlock time not yet reached');

            let voting_token = IERC20Dispatcher {
                contract_address: get_governance_token_address_self()
            };
            voting_token.burn(caller, amount_voting_token.into());

            let floating_token = IERC20Dispatcher {
                contract_address: self.floating_token_address.read()
            };
            // user gets back the same amount of tokens they put in.
            // the payoff is in holding voting tokens, which make the user eligible for distributions of protocol revenue
            // works for tokens with fixed max float
            floating_token.transfer(caller, amount_staked.into());
            self
                .emit(
                    Unstaked {
                        user: caller,
                        stake_id: id,
                        amount: amount_staked,
                        amount_voting_token,
                        start_date,
                        length
                    }
                );
        }

        fn unstake_airdrop(ref self: ComponentState<TContractState>, amount: u128) {
            assert(get_block_timestamp() > UNLOCK_DATE, 'tokens not yet unlocked');

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
            floating_token.mint(caller, to_unstake.into());
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
            let res: (u128, u128, u64, u64) = self.stake.read((address, id));
            let (newamt, _a, _b, _c) = res;
            if (newamt == 0) {
                id
            } else {
                self._get_free_stake_id(address, id + 1)
            }
        }

        fn get_total_staked_accounted(
            self: @ComponentState<TContractState>, address: ContractAddress
        ) -> u128 {
            // to handle the special case where the user has been airdropped (locked) voting tokens
            // TODO
            42
        }
    }
}
