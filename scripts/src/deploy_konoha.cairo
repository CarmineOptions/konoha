use sncast_std::{
    declare, deploy, DeclareResult, DeployResult, get_nonce, DisplayContractAddress,
    DisplayClassHash, FeeSettings, EthFeeSettings
};

const USER: felt252 = 'USER1';

fn main() {
    let max_fee = 99999999999999999;
    let salt = 0x3;
    let nonce = get_nonce('latest');

    let voting_token_class_hash = declare(
        "VotingToken",
        FeeSettings::Eth(EthFeeSettings { max_fee: Option::Some(max_fee) }),
        Option::Some(nonce)
    ).unwrap()

    let floating_token_class_hash = declare(
        "FloatingToken",
        FeeSettings::Eth(EthFeeSettings { max_fee: Option::Some(max_fee) }),
        Option::Some(nonce)
    ).unwrap()

    let treasury_class_hash = declare(
        "FloatingToken",
        FeeSettings::Eth(EthFeeSettings { max_fee: Option::Some(max_fee) }),
        Option::Some(nonce)
    ).unwrap()

    
    let declare_result = declare(
        "Governance",
        FeeSettings::Eth(EthFeeSettings { max_fee: Option::Some(max_fee) }),
        Option::Some(nonce)
    )
    .expect('contract already declared');

    let mut calldata: Array<felt252> = array![voting_token_class_hash];
    floating_token_class_hash.serialize(ref calldata);
    treasury_class_hash.serialize(ref calldata);
    USER.serialize(ref calldata);

    let class_hash = declare_result.class_hash;

    println!("Class hash of the declared contract: {}", declare_result.class_hash);

    let deploy_result = deploy(
        class_hash,
        @calldata,
        Option::Some(salt),
        true,
        FeeSettings::Eth(EthFeeSettings { max_fee: Option::Some(max_fee) }),
        Option::Some(nonce)
    )
        .expect('deploy failed');

    println!("Deployed the contract to address: {}", deploy_result.contract_address);
}
