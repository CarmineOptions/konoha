import {
    useAccount,
    useContractRead,
    useContractWrite,
} from "@starknet-react/core";
import { abi } from "../lib/abi";
import React, { useMemo } from "react";
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

    const [voteChoice, setVoteChoice] = React.useState<number | null>(null);

    // Create a call to vote YES on a proposal
    const yes_call = useMemo(() => {
        if (!voteChoice) return [];

        const tx = {
            contractAddress: CONTRACT_ADDR,
            entrypoint: "vote",
            calldata: [proposalId.toString(), 1],
        };
        return [tx];
    }, [voteChoice]);

    const { write: write_yes } = useContractWrite({ calls: yes_call });

    // Create a call to vote NO on a proposal
    const no_call = useMemo(() => {
        if (!voteChoice) return [];

        const tx = {
            contractAddress: CONTRACT_ADDR,
            entrypoint: "vote",
            calldata: [proposalId.toString(), 2],
        };
        return [tx];
    }, [voteChoice]);
    const { write: write_no } = useContractWrite({ calls: no_call });

    // Function to vote on a proposal
    async function vote(vote: boolean) {
        // Check if the user is connected to a wallet
        if (!isConnected) {
            // If the user is not connected, display a toast message
            toast.error("Please connect your wallet to vote");
            return;
        }

        // Set the vote choice
        setVoteChoice(vote ? 1 : 2);

        // Call the write function to vote on the proposal
        if (vote) {
            // contract.invoke("vote", [proposalId.toString(), 1]);

            // await contract.functions.vote(proposalId.toString(), 1);
            write_yes();
        } else {
            write_no();
        }
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
