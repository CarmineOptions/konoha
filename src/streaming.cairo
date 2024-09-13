use starknet::ContractAddress;

#[starknet::interface]
trait IStreaming<TContractState> {
    fn add_new_stream(
        ref self: TContractState,
        recipient: ContractAddress,
        start_time: u64,
        end_time: u64,
        total_amount: u128,
        is_minting: bool,
        token_address: ContractAddress
    );

    fn claim_stream(
        ref self: TContractState, recipient: ContractAddress, start_time: u64, end_time: u64,
    );

    fn cancel_stream(
        ref self: TContractState, recipient: ContractAddress, start_time: u64, end_time: u64,
    );

    fn get_stream_info(
        ref self: TContractState, recipient: ContractAddress, start_time: u64, end_time: u64,
    ) -> (u128, u128, bool, ContractAddress);

    fn set_treasury_address(ref self: TContractState, address: ContractAddress);
    fn get_treasury_address(self: @TContractState) -> ContractAddress;
}

#[starknet::component]
mod streaming {
    use konoha::contract::Governance;
    use konoha::contract::{IGovernanceDispatcher, IGovernanceDispatcherTrait};
    use konoha::traits::{IGovernanceTokenDispatcher, IGovernanceTokenDispatcherTrait};
    use konoha::treasury::{ITreasuryDispatcher, ITreasuryDispatcherTrait};
    use openzeppelin::token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};

    use starknet::ContractAddress;
    use starknet::{get_block_timestamp, get_caller_address, get_contract_address};

    #[storage]
    struct Storage {
        streams: LegacyMap::<
            (ContractAddress, u64, u64), (u128, u128, bool, ContractAddress)
        >, // (already_claimed, total_amount, is_minting)
        treasury_address: ContractAddress
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
        recipient: ContractAddress,
        start_time: u64,
        end_time: u64,
        total_amount: u128,
        token_address: ContractAddress,
    }

    #[derive(starknet::Event, Drop, Serde)]
    struct StreamClaimed {
        recipient: ContractAddress,
        start_time: u64,
        end_time: u64,
        total_amount: u128,
    }

    #[derive(starknet::Event, Drop, Serde)]
    struct StreamCanceled {
        recipient: ContractAddress,
        start_time: u64,
        end_time: u64,
        reclaimed_amount: u256,
    }

    #[embeddable_as(StreamingImpl)]
    impl Streaming<
        TContractState, +HasComponent<TContractState>
    > of super::IStreaming<ComponentState<TContractState>> {
        fn set_treasury_address(
            ref self: ComponentState<TContractState>, address: ContractAddress
        ) {
            let caller = get_caller_address();
            let myaddr = get_contract_address();
            assert(caller == myaddr, 'can only call from proposal');
            self.treasury_address.write(address);
        }

        fn get_treasury_address(self: @ComponentState<TContractState>) -> ContractAddress {
            self.treasury_address.read()
        }
        fn add_new_stream(
            ref self: ComponentState<TContractState>,
            recipient: ContractAddress,
            start_time: u64,
            end_time: u64,
            total_amount: u128,
            is_minting: bool,
            token_address: ContractAddress,
        ) {
            let key = (recipient, start_time, end_time);

            //assert(get_caller_address() == get_contract_address(), 'not self-call');
            assert(start_time < end_time, 'starts first');

            let mut claimable_amount = 0;
            self.streams.write(key, (claimable_amount, total_amount, is_minting, token_address));

            self
                .emit(
                    StreamCreated { recipient, start_time, end_time, total_amount, token_address }
                );
        }

        fn claim_stream(
            ref self: ComponentState<TContractState>,
            recipient: ContractAddress,
            start_time: u64,
            end_time: u64,
        ) {
            let current_time = get_block_timestamp();

            let key = (recipient, start_time, end_time);
            let (
                already_claimed, total_amount, is_minting, token_address
            ): (u128, u128, bool, ContractAddress) =
                self
                .streams
                .read(key);
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
            self.streams.write(key, (currently_claimable, total_amount, is_minting, token_address));

            if is_minting {
                // Mint tokens to the recipient if minting is enabled
                let self_dsp = IGovernanceDispatcher { contract_address: get_contract_address() };
                IGovernanceTokenDispatcher {
                    contract_address: self_dsp.get_governance_token_address()
                }
                    .mint(recipient, amount_to_claim.into());
            } else {
                // Transfer tokens using the Treasury contract if minting is disabled
                let treasury_address = self.get_treasury_address();
                let treasury = ITreasuryDispatcher { contract_address: treasury_address };

                let success = treasury
                    .send_tokens_to_address(recipient, amount_to_claim.into(), token_address);
                assert!(success, "Token transfer via Treasury failed");

                // Optionally print the balance after transfer (if needed)
                let erc20_token = IERC20Dispatcher { contract_address: token_address };
                let balance_after = erc20_token.balance_of(treasury_address);
                println!("Streaming contract balance after transfer: {}", balance_after);
            }

            self.emit(StreamClaimed { recipient, start_time, end_time, total_amount, });
        }

        fn cancel_stream(
            ref self: ComponentState<TContractState>,
            recipient: ContractAddress,
            start_time: u64,
            end_time: u64,
        ) {
            let key: (ContractAddress, u64, u64) = (recipient, start_time, end_time);

            // Read from the streams LegacyMap
            let (
                already_claimed, total_amount, is_minting, token_address
            ): (u128, u128, bool, ContractAddress) =
                self
                .streams
                .read(key);
            let to_distribute: u256 = total_amount.into() - already_claimed.into();

            // Cancel stream
            self.streams.write(key, (0, 0, is_minting, token_address));
            if is_minting {
                // Mint tokens to the recipient if minting is enabled
                let self_dsp = IGovernanceDispatcher { contract_address: get_contract_address() };
                IGovernanceTokenDispatcher {
                    contract_address: self_dsp.get_governance_token_address()
                }
                    .mint(recipient, to_distribute.into());
            } else {
                // Transfer tokens using the Treasury contract if minting is disabled
                let treasury_address = self.get_treasury_address();
                let treasury = ITreasuryDispatcher { contract_address: treasury_address };

                let success = treasury
                    .send_tokens_to_address(recipient, to_distribute.into(), token_address);
                assert!(success, "Token transfer via Treasury failed");

                // Optionally print the balance after transfer (if needed)
                let erc20_token = IERC20Dispatcher { contract_address: token_address };
                let balance_after = erc20_token.balance_of(treasury_address);
                println!("Streaming contract balance after transfer: {}", balance_after);
            }

            self
                .emit(
                    StreamCanceled {
                        recipient, start_time, end_time, reclaimed_amount: to_distribute,
                    }
                );
        }

        fn get_stream_info(
            ref self: ComponentState<TContractState>,
            recipient: ContractAddress,
            start_time: u64,
            end_time: u64,
        ) -> (u128, u128, bool, ContractAddress) {
            let key: (ContractAddress, u64, u64) = (recipient, start_time, end_time);
            let (
                currently_claimable, total_amount, is_minting, token_address
            ): (u128, u128, bool, ContractAddress) =
                self
                .streams
                .read(key);
            (currently_claimable, total_amount, is_minting, token_address)
        }
    }
}
