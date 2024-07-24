use starknet::ContractAddress;
#[starknet::interface]
trait IStreaming<TContractState> {
    fn add_new_stream(
        ref self: TContractState,
        streamer: ContractAddress,
        recipient: ContractAddress,
        start_time: u64,
        end_time: u64,
        total_amount: u128,
        is_minting: bool 
    );

    fn claim_stream(
        ref self: TContractState,
        streamer: ContractAddress,
        recipient: ContractAddress,
        start_time: u64,
        end_time: u64,
    );

    fn cancel_stream(
        ref self: TContractState,
        recipient: ContractAddress,
        start_time: u64,
        end_time: u64,
    );

    fn get_stream_info(
        ref self: TContractState,
        streamer: ContractAddress,
        recipient: ContractAddress,
        start_time: u64,
        end_time: u64,
    ) -> (u128, u128, bool); // Include is_minting in return type
}
#[starknet::component]
mod streaming {
    use konoha::contract::Governance;
    use konoha::contract::{IGovernanceDispatcher, IGovernanceDispatcherTrait};
    use konoha::traits::{IGovernanceTokenDispatcher, IGovernanceTokenDispatcherTrait};
    use openzeppelin::token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
    use starknet::ContractAddress;
    use starknet::{get_block_timestamp, get_caller_address, get_contract_address};

    #[storage]
    struct Storage {
        streams: LegacyMap::<
            (ContractAddress, ContractAddress, u64, u64), (u128, u128, bool)
        > // (currently_claimable, total_amount, is_minting)
    }

    #[derive(starknet::Event, Drop, Serde)]
    #[event]
    enum Event {
        StreamCreated: StreamCreated,
        StreamClaimed: StreamClaimed,
        StreamCanceled: StreamCanceled
    }

    #[derive(starknet::Event, Drop, Serde)]
    struct StreamCreated {
        streamer: ContractAddress,
        recipient: ContractAddress,
        start_time: u64,
        end_time: u64,
        total_amount: u128,
        is_minting: bool // Include is_minting in event
    }

    #[derive(starknet::Event, Drop, Serde)]
    struct StreamClaimed {
        streamer: ContractAddress,
        recipient: ContractAddress,
        start_time: u64,
        end_time: u64,
        total_amount: u128,
        amount_claimed: u128
    }

    #[derive(starknet::Event, Drop, Serde)]
    struct StreamCanceled {
        streamer: ContractAddress,
        recipient: ContractAddress,
        start_time: u64,
        end_time: u64,
        reclaimed_amount: u256
    }

    #[embeddable_as(StreamingImpl)]
    impl Streaming<TContractState, +HasComponent<TContractState>> of super::IStreaming<ComponentState<TContractState>> {
        fn add_new_stream(
            ref self: ComponentState<TContractState>,
            streamer: ContractAddress,
            recipient: ContractAddress,
            start_time: u64,
            end_time: u64,
            total_amount: u128,
            is_minting: bool // Added parameter
        ) {
            let key = (get_caller_address(), recipient, start_time, end_time);

            assert(get_caller_address() == get_contract_address(), 'not self-call');
            assert(start_time < end_time, 'start_time shld be < end_time');

            let currently_claimable = 0;
            self.streams.write(key, (currently_claimable, total_amount, is_minting));

            self.emit(
                StreamCreated {
                    streamer: get_caller_address(),
                    recipient: recipient,
                    start_time: start_time,
                    end_time: end_time,
                    total_amount: total_amount,
                    is_minting: is_minting // Emit event with is_minting
                }
            );
        }

        fn claim_stream(
            ref self: ComponentState<TContractState>,
            streamer: ContractAddress,
            recipient: ContractAddress,
            start_time: u64,
            end_time: u64,
        ) {
            let current_time = get_block_timestamp();
            let key = (get_caller_address(), recipient, start_time, end_time);
            
            let (already_claimed, total_amount, is_minting): (u128, u128, bool) = self.streams.read(key);
            assert(current_time > start_time, 'stream has not started');
            
            let elapsed_time = if current_time > end_time {
                end_time - start_time
            } else {
                current_time - start_time
            };
            let stream_duration = end_time - start_time;
            
            let currently_claimable = (total_amount * elapsed_time.into() / stream_duration.into());
            let amount_to_claim = currently_claimable - already_claimed;
            
            assert(amount_to_claim > 0, 'nothing to claim');            

            // Update the storage with the new claimed amount
            self.streams.write(key, (currently_claimable, total_amount, is_minting));

            if is_minting {
                let governance_token = IGovernanceTokenDispatcher {
                    contract_address: get_contract_address() // Assumes the contract address is the governance token address
                };
                governance_token.mint(recipient, amount_to_claim.into());
            } else {
                let erc20_token = IERC20Dispatcher { contract_address: get_contract_address() };

                let balance = erc20_token.balance_of(get_contract_address());
                assert(balance >= amount_to_claim.into(), 'Insufficient transfer balance');

                erc20_token.approve(recipient, amount_to_claim.try_into().unwrap());
                erc20_token.transfer(recipient, amount_to_claim.try_into().unwrap());
            }

            self.emit(
                StreamClaimed {
                    streamer: streamer,
                    recipient: recipient,
                    start_time: start_time,
                    end_time: end_time,
                    total_amount: total_amount,
                    amount_claimed: amount_to_claim
                }
            );
        }

        fn cancel_stream(
            ref self: ComponentState<TContractState>,
            recipient: ContractAddress,
            start_time: u64,
            end_time: u64
        ) {
            let key: (ContractAddress, ContractAddress, u64, u64) = (
                get_caller_address(), recipient, start_time, end_time,
            );

            let (already_claimed, total_amount, _is_minting): (u128, u128, bool) = self.streams.read(key);
            let to_distribute: u256 = total_amount.into() - already_claimed.into();

            self.streams.write(key, (0, 0, false));

            let governance_token = IGovernanceTokenDispatcher { contract_address: get_contract_address() };
            governance_token.mint(get_caller_address(), to_distribute.into());

            self.emit(
                StreamCanceled {
                    streamer: get_caller_address(),
                    recipient: recipient,
                    start_time: start_time,
                    end_time: end_time,
                    reclaimed_amount: to_distribute
                }
            );
        }

        fn get_stream_info(
            ref self: ComponentState<TContractState>,
            streamer: ContractAddress,
            recipient: ContractAddress,
            start_time: u64,
            end_time: u64,
        ) -> (u128, u128, bool) {
            let key: (ContractAddress, ContractAddress, u64, u64) = (
                get_caller_address(), recipient, start_time, end_time,
            );
            self.streams.read(key)
        }
    }
}
