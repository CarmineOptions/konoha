use starknet::ContractAddress;

use snforge_std::{BlockId, ContractClassTrait, start_prank};

use governance::contract::IGovernanceDispatcher;
use governance::contract::IGovernanceDispatcherTrait;

//#[test]
//#[fork(url: "https://rpc.starknet-testnet.lava.build", block_id: BlockId::Number(904597))]
fn test_submit_proposal() {
    let gov_contract_addr: ContractAddress = 0x7ba1d4836a1142c09dde23cb39b2885fe350912591461b5764454a255bdbac6.try_into().unwrap();
    let dispatcher = IGovernanceDispatcher { contract_address: gov_contract_addr };
    // corresponding govtoken: 0x05151bfdd47826df3669033ea7fb977d3b2d45c4f4d1c439a9edf4062bf34bfa
    // has one holder, with 31 CARM: 0x0583a9d956d65628f806386ab5b12dccd74236a3c6b930ded9cf3c54efc722a1
    let admin_addr: ContractAddress = 0x0583a9d956d65628f806386ab5b12dccd74236a3c6b930ded9cf3c54efc722a1.try_into().unwrap();
    //start_prank(gov_contract_addr, admin_addr);
    dispatcher.submit_proposal(0x00, 1);
}

#[test]
#[fork(url: "https://starknet-goerli.infura.io/v3/76467ebfee7944fd9e38f9dffe41df8b", block_id: BlockId::Tag(Latest))]
fn test_forking_functionality() {
    let gov_contract_addr: ContractAddress = 0x7ba1d4836a1142c09dde23cb39b2885fe350912591461b5764454a255bdbac6.try_into().unwrap();
    let dispatcher = IGovernanceDispatcher { contract_address: gov_contract_addr };
    let propdetails = dispatcher.get_proposal_details(1);
    assert(propdetails.payload==0x78b4ccacdc1c902281f6f13d94b6d17b1f4c44ff811c01dea504d43a264f611, 'payload not match');
}