#[starknet::contract]
mod MyToken {
    use openzeppelin::token::erc20::ERC20Component;
    use starknet::ContractAddress;

    component!(path: ERC20Component, storage: erc20, event: ERC20Event);

    #[abi(embed_v0)]
    impl ERC20Impl = ERC20Component::ERC20Impl<ContractState>;
    #[abi(embed_v0)]
    impl ERC20MetadataImpl = ERC20Component::ERC20MetadataImpl<ContractState>;
    #[abi(embed_v0)]
    impl ERC20CamelOnlyImpl = ERC20Component::ERC20CamelOnlyImpl<ContractState>;
    impl InternalImpl = ERC20Component::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        #[substorage(v0)]
        erc20: ERC20Component::Storage
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ERC20Event: ERC20Component::Event
    }

    #[constructor]
    fn constructor(ref self: ContractState, fixed_supply: u256, recipient: ContractAddress) {
        let name = 'MyToken';
        let symbol = 'MTK';

        self.erc20.initializer(name, symbol);
        self.erc20._mint(recipient, fixed_supply);
    }
}

use array::ArrayTrait;
use core::traits::TryInto;
use debug::PrintTrait;
use starknet::ContractAddress;
use openzeppelin::token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
use snforge_std::{BlockId, declare, ContractClassTrait, ContractClass, start_prank, CheatTarget};

use governance::contract::IGovernanceDispatcher;
use governance::contract::IGovernanceDispatcherTrait;
use governance::proposals::IProposalsDispatcher;
use governance::proposals::IProposalsDispatcherTrait;
use governance::upgrades::IUpgradesDispatcher;
use governance::upgrades::IUpgradesDispatcherTrait;

const GOV_TOKEN_INITIAL_SUPPLY: felt252 = 1000000000000000000;

const first_address: ContractAddress = 0x1.try_into().unwrap();
const second_address: ContractAddress = 0x2.try_into().unwrap();
const admin_addr: ContractAddress = 0x3.try_into().unwrap();

fn deploy_governance() -> IGovernanceDispatcher {
    let gov_contract = declare('Governance');
    let address = gov_contract.deploy().expect('unable to deploy governance');
    IGovernanceDispatcher { contract_address: address };
}


fn deploy_and_distribute_gov_tokens(recipient: ContractAddress) {
    let mut calldata = ArrayTrait::new();
    calldata.append(GOV_TOKEN_INITIAL_SUPPLY);
    calldata.append(recipient);

    let gov_token_contract = declare('MyToken');
    let token_addr = gov_token_contract.deploy_at(@calldata).expect('unable to deploy MyToken');
    let token: IERC20Dispatcher = IERC20Dispatcher { contract_address: token_addr };

    start_prank(CheatTarget::One(token_addr), admin_addr);

    token.transfer(first_address, 100000);
    token.transfer(second_address, 100000);
}


fn test_vote_upgrade_root(new_merkle_root: felt252) {
    let gov_contract = deploy_governance();
    let gov_contract_addr = gov_contract.contract_address;
    let token_contract = deploy_and_distribute_gov_tokens(admin_addr);

    let dispatcher = IProposalsDispatcher { contract_address: gov_contract_addr };

    start_prank(CheatTarget::One(gov_contract_addr), admin_addr);
    let prop_id = dispatcher.submit_proposal(new_merkle_root, 3);

    start_prank(CheatTarget::One(gov_contract_addr), first_address);
    dispatcher.vote(prop_id, 1);
    start_prank(CheatTarget::One(gov_contract_addr), second_address);
    dispatcher.vote(prop_id, 1);
    start_prank(CheatTarget::One(gov_contract_addr), admin_addr);
    dispatcher.vote(prop_id, 1);

    assert(dispatcher.get_proposal_status(prop_id) == 1, 'proposal not passed!');

    let upgrade_dispatcher = IUpgradesDispatcher { contract_address: gov_contract_addr };
    upgrade_dispatcher.apply_passed_proposal(prop_id);
    assert(check_if_healthy(gov_contract_addr), 'new gov not healthy');
}

