import React from "react";
import { useAccount } from "@starknet-react/core";
import TokenBalance from '../TokenBalance';
import { useTokenBalances } from "../../lib/useTokenBalances";
import NewStake from './NewStake';
import StakeList from './StakeList';
import { VOTING_TOKEN_CONTRACT, FLOATING_TOKEN_CONTRACT } from '../../lib/config';

export default function VotingPower() {
    const { address } = useAccount();
    const tokens = [
        { name: "VOTING", address: VOTING_TOKEN_CONTRACT },
        { name: "FLOATING", address: FLOATING_TOKEN_CONTRACT },
    ];
    const { balances, isLoading } = useTokenBalances(tokens, address);

    const floatingBalance = balances.find(b => b.name === "FLOATING")?.balance || "0";

    return (
        <div className="w-full max-w-[50rem]">
            <TokenBalance
                balances={balances}
                isLoading={isLoading}
                title="Voting Power"
            />
            <NewStake floatingBalance={floatingBalance.toString()} />
            <StakeList address={address} />
        </div>
    );
}