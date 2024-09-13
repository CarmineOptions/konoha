use core::ResultTrait;

use snforge_std::{
    BlockId, declare, ContractClassTrait, ContractClass, start_prank, start_warp, CheatTarget
};

//useful for debugging

//#[test]
//#[fork("SEPOLIA")]
fn test_deploy() {
    let gov_contract = declare("Governance").expect('unable to declare governance');
    let voting_token_class = 0x01d388b7b8976172e22d8707bb6d493f8a0edb6f701bb9282ed59c66c30e1e4f;
    let floating_token_class = 0x071d8c81a12d19c196712bdcb65789a90ed87415f9c36cc6cd3553ed5b796c85;
    let mut args: Array<felt252> = ArrayTrait::new();
    args.append(voting_token_class);
    args.append(floating_token_class);
    args.append(0);
    args.append(0x03f37e36c20E85e6F39b2C6F6e7ECEB2e3aAb40b94064f20983588cfe9f6fc60);
    gov_contract.deploy(@args).expect('unable to deploy governance');
}
