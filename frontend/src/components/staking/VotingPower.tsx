import { VOTING_TOKEN_CONTRACT, FLOATING_TOKEN_CONTRACT } from '../../lib/config';
import React from "react";
import { useAccount } from "@starknet-react/core";
import TokenBalance from '../TokenBalance';

export default function VotingPower() {
    const { address } = useAccount();
    const tokens = [
        { name: "VOTING", address: VOTING_TOKEN_CONTRACT },
        { name: "FLOATING", address: FLOATING_TOKEN_CONTRACT },
    ];

    return (
        <TokenBalance
            tokens={tokens}
            accountAddress={address}
            title="Voting Power"
        />
    );
}