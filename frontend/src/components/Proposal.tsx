import { useAccount, useContractRead } from "@starknet-react/core";
import { abi } from "../lib/abi";
import React from "react";
import { CONTRACT_ADDR } from "../lib/config";
import toast from "react-hot-toast";

export default function Proposal({
    proposalId,
    index,
}: {
    proposalId: bigint;
    index: number;
}) {
    const { isConnected } = useAccount();

    // Call the contract function get_proposal_details with the proposalId to get the proposal details
    const { data, isLoading } = useContractRead({
        functionName: "get_proposal_details",
        args: [proposalId.toString()],
        abi,
        address: CONTRACT_ADDR,
        watch: true,
    });

    // Convert the proposal type from number to string
    const proposal_type = {
        0: "amm",
        1: "governance",
        2: "CARM token",
        3: "merkle tree root",
        4: "no-op/signal vote",
    };

    // Function to vote on a proposal
    function vote(vote: boolean) {
        // Check if the user is connected to a wallet
        if (!isConnected) {
            // If the user is not connected, display a toast message
            toast.error("Please connect your wallet to vote");
            return;
        }

        toast.success(`Voted ${vote ? "yes" : "no"} on proposal ${proposalId}`);
    }

    return isLoading ? (
        <div>loading contract {proposalId?.toString()}</div>
    ) : (
        <div className="flex flex-row items-center gap-1 p-2 pl-0 rounded-lg bg-slate-200">
            <div className="grid self-stretch pl-5 pr-4 mr-4 font-mono border-r text-slate-400 place-content-center border-slate-400">
                {index}
            </div>
            <div>Type:</div>
            <div className="flex-grow font-bold">
                {proposal_type[data.valueOf()["to_upgrade"]]}
            </div>
            <button
                className="px-3 py-2 text-sm font-semibold transition-all bg-green-300 rounded-lg hover:bg-green-400"
                onClick={() => vote(true)}
            >
                Vote Yes
            </button>
            <button
                className="px-3 py-2 text-sm font-semibold transition-all bg-red-300 rounded-lg hover:bg-red-400"
                onClick={() => vote(false)}
            >
                Vote No
            </button>
        </div>
    );
}
