import React from "react";
import { useContractRead } from "@starknet-react/core";
import { CONTRACT_ADDR } from "../../lib/config";
import { abi } from "../../lib/abi";
import Proposal from "../Proposal";
import { Link } from "react-router-dom";
import TreasuryStatus from "../TreasuryStatus";
import VotingPower from "../staking/VotingPower";

const Home = () => {
  const { data, isError, isLoading, error } = useContractRead({
    functionName: "get_live_proposals",
    args: [],
    abi,
    address: CONTRACT_ADDR,
    watch: false,
    retry: false,
  });

  if (isError) {
    return <div>{error?.message}</div>;
  }

  return (
    <div className="flex  flex-col items-center w-full pt-6 gap-2">
      <div className="flex items-center justify-between w-full">
        <div className="flex-grow md:text-[54px] font-default font-regular">
          Welcome to Konoha
        </div>
        <Link
          to="/create-proposal"
          className="bg-secondary px-3 py-2 text-sm text-white font-inter transition-all rounded-md hover:bg-primary hover:text-secondary"
        >
          + New Proposal
        </Link>
      </div>
      <div className="font-inter w-full text-base text-black">
        The community toolkit for Starknet Governance.
      </div>

      <div className="w-full space-y-10 py-5">
        <TreasuryStatus />

        <VotingPower />

      </div>

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        (data as bigint[])?.map((proposal, index: number) => (
          <Proposal key={index} proposalId={proposal} />
        ))
      )}
    </div>
  );
};

export default Home;
