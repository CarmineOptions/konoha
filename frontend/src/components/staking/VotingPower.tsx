import React from "react";
import { useAccount } from "@starknet-react/core";
import { useTokenBalances } from "../../lib/useTokenBalances";
import NewStake from "./NewStake";
import StakeList from "./StakeList";
import {
  VOTING_TOKEN_CONTRACT,
  FLOATING_TOKEN_CONTRACT,
} from "../../lib/config";
import { Link } from "react-router-dom";
import NewStakeList from "./NewStakeList";

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
      <div className="flex  justify-center flex-col bg-[#F0EEDE] py-5 px-5 h-[100] space-y-8 rounded-lg w-full ">
        <div className="flex items-center justify-between">
          <p className="text-[15px] font-medium font-inter text-[#8E886A] capitalize">
            VOTING POWER
          </p>

          <Link
            to="/staking"
            className="bg-[#453C0D] px-3 py-2 text-xs text-white font-inter transition-all hover:bg-primary hover:text-secondary"
          >
            Manage Staking
          </Link>
        </div>

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

      <NewStakeList />
    </div>
  );
}
