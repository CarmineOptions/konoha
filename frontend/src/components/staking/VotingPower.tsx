import React from "react";
import { useAccount } from "@starknet-react/core";
import { useTokenBalances } from "../../lib/useTokenBalances";
import NewStake from "./NewStake";
import StakeList from "./StakeList";
import {
    VOTING_TOKEN_CONTRACT,
    FLOATING_TOKEN_CONTRACT,
} from "../../lib/config";

export default function VotingPower() {
    const { address } = useAccount();
    const tokens = [
        { name: "VOTING", address: VOTING_TOKEN_CONTRACT },
        { name: "FLOATING", address: FLOATING_TOKEN_CONTRACT },
    ];
    const { balances } = useTokenBalances(tokens, address);
    const floatingBalance =
        balances.find((b) => b.name === "FLOATING")?.balance || "0";

    return (
        <div className="w-full ">
            <div className="flex relative justify-center flex-col bg-[#F0EEDE] py-4 px-5 h-[100] space-y-4 rounded-lg w-full ">
                <p className="text-[15px] font-medium font-inter text-[#8E886A] capitalize">
                    VOTING POWER
                </p>

                <div className="flex items-center justify-between">
                    <p className=" font-inter text-[#8E886A] font-medium">
                        Connect your wallet to view your voting power.
                    </p>
                    <div className="absolute right-0 bottom-0 ">
                        <img
                            src="/wallet.png"
                            className="w-full h-full object-contain"
                            alt="wallet"
                        />
                    </div>
                </div>
            </div>

            <NewStake floatingBalance={floatingBalance.toString()} />
            <StakeList address={address} />
        </div>
    );
}
