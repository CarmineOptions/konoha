// use core::hash::HashStateExTrait;
// use core::{ArrayTrait, SpanTrait};
// use core::debug::PrintTrait;
// use governance::airdrop::{airdrop, IAirdropDispatcher, IAirdropDispatcherTrait};
// use airdrop::STRK_ADDRESS;
// use openzeppelin::token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
// use snforge_std::{ContractClassTrait, declare, start_prank, CheatTarget};
// use starknet::{ContractAddress, deploy_syscall};

// const ADMIN_ADDR: felt252 = 0x42;
// const CLAIMEE_1: felt252 = 0x13;
// const CLAIMEE_2: felt252 = 0x14;

// fn deploy() -> IAirdropDispatcher {
//     let mut calldata = ArrayTrait::new();
//     calldata.append(ADMIN_ADDR);

//     let contract = declare('Airdrop');
//     let address = contract.deploy().expect('unable to deploy Airdrop');
//     IAirdropDispatcher { contract_address: address }
// }

// #[test]
// fn test_claim_twice_with_same_proof() {
//     let airdrop_contract = deploy();
//     let token_contract = deploy_token(airdrop_contract.contract_address);

//     start_prank(
//         CheatTarget::One(airdrop_contract.contract_address), ADMIN_ADDR.try_into().unwrap()
//     );
//     airdrop_contract.add_root(valid_root);

//     start_prank(CheatTarget::One(airdrop_contract.contract_address), CLAIMEE_1.try_into().unwrap());
//     let initial_proof = array![valid_proof_element];
//     airdrop_contract.claim(CLAIMEE_1, valid_claim_amount, initial_proof.span());
//     assert(
//         token_contract.balance_of(CLAIMEE_1.try_into().unwrap()) == valid_claim_amount,
//         "First claim failed"
//     );

//     airdrop_contract.claim(CLAIMEE_1, valid_claim_amount, initial_proof.span());
//     assert(
//         token_contract.balance_of(CLAIMEE_1.try_into().unwrap()) == valid_claim_amount,
//         "Second claim modified the claimee's balance"
//     );
// }

// #[test]
// #[should_panic(expected: ('INVALID PROOF',))]
// fn test_claim_invalid_proof() {
//     let contract = deploy();
//     deploy_token(contract.contract_address);
//     start_prank(CheatTarget::One(contract.contract_address), ADMIN_ADDR.try_into().unwrap());
//     contract.add_root(0xf7c8d3f309262572ad35df8ff6c33f24d8114c60eac3bc27bf42382ca82faf);

//     start_prank(CheatTarget::One(contract.contract_address), CLAIMEE_1.try_into().unwrap());
//     let proof = array![0x2a18afb0550a011d54ca3940648e59894c06e4c3d0a611256c0b575bd528b3b, 0x1];
//     contract.claim(0x88, proof.span());
// }

// #[test]
// fn test_update_root_and_claim_attempts() {
//     let contract = deploy();
//     let tok = deploy_token(contract.contract_address);
//     start_prank(CheatTarget::One(contract.contract_address), ADMIN_ADDR.try_into().unwrap());

//     // add intial root and valid claim
//     contract.add_root(initial_root);
//     start_prank(CheatTarget::One(contract.contract_address), CLAIMEE_1.try_into().unwrap());
//     contract.claim(claim_amount, valid_proof_for_initial_root.span());
//     assert(tok.balance_of(CLAIMEE_1.try_into().unwrap()) == claim_amount, 'initial claim failed');

//     // update root
//     start_prank(CheatTarget::One(contract.contract_address), ADMIN_ADDR.try_into().unwrap());
//     contract.add_root(new_root);

//     // claim with old root + new proof, should fail
//     start_prank(CheatTarget::One(contract.contract_address), CLAIMEE_2.try_into().unwrap());
//     contract.claim(claim_amount, new_proof_not_matching_old_root.span());
//     // check fail : to do, use should panic ?

//     // claim with new root + old proof, should fail 
//     contract.claim(claim_amount, old_proof_not_matching_new_root.span());
// // check fail : to do
// }


