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
        FeeSettings::Eth(EthFeeSettings { max_fee: Option::None }),
        Option::None
    )
        .expect('VotingToken declare failed');

    let floating_token_class_hash = declare(
        "FloatingToken",
        FeeSettings::Eth(EthFeeSettings { max_fee: Option::None }),
        Option::Some(nonce)
    )
        .expect('declare failed');

    let treasury_class_hash = declare(
        "Treasury",
        FeeSettings::Eth(EthFeeSettings { max_fee: Option::None }),
        Option::Some(nonce)
    )
        .expect('declare failed');

    let declare_result = declare(
        "Governance",
        FeeSettings::Eth(EthFeeSettings { max_fee: Option::None }),
        Option::Some(nonce)
    )
        .expect('declare failed');

    let mut calldata: Array<felt252> = array![
        voting_token_class_hash.class_hash.try_into().unwrap(),
        floating_token_class_hash.class_hash.try_into().unwrap(),
        treasury_class_hash.class_hash.try_into().unwrap(),
        USER
    ];

    let class_hash = declare_result.class_hash;

    println!("Class hash of the declared contract: {}", declare_result.class_hash);

    let deploy_result = deploy(
        class_hash,
        calldata,
        Option::Some(salt),
        true,
        FeeSettings::Eth(EthFeeSettings { max_fee: Option::None }),
        Option::Some(nonce)
    )
        .expect('deploy failed');

    println!("Deployed the contract to address: {}", deploy_result.contract_address);
}
