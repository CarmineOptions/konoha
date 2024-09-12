import React from "react";
// import { useBlock } from "@starknet-react/core";
import Header from "./components/Header";
import { useContractRead, useAccount } from "@starknet-react/core";
//import Tokens from "./helpers/tokens";
import { abi } from "./lib/abi";
import Proposal from "./components/Proposal";
import { CONTRACT_ADDR } from "./lib/config";
// import { useAccount } from "@starknet-react/core";
import SubmitProposalModal from "./components/SubmitProposalModal";
import TreasuryStatus from "./components/TreasuryStatus";
import VotingPower from "./components/staking/VotingPower";

function App() {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const { address } = useAccount();

    // Call the contract function get_live_proposals to get the live proposals
    const { data, isError, isLoading, error } = useContractRead({
        functionName: "get_live_proposals",
        args: [],
        abi,
        address: CONTRACT_ADDR,
        watch: false,
        retry: false
    });

    // Check if there is an error, if there is, display the error message
    if (isError) {
        return <div>{error?.message}</div>;
    }

    // Display the proposals
    return (
        <main className="flex flex-col items-center min-h-screen gap-12 mt-16">
            <Header />
            <SubmitProposalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* List of proposals */}
            <div className="flex max-w-[50rem] flex-col items-center w-full pt-6 gap-2">
                <div className="flex flex-row items-start w-full">
                    <div className="flex-grow text-2xl font-bold">
                        Proposals
                    </div>

                    {/* New proposal button */}
                    <button
                        className="px-3 py-2 text-sm font-semibold text-blue-500 transition-all rounded-lg hover:bg-slate-200"
                        onClick={() => setIsModalOpen(true)}
                    >
                        + New Proposal
                    </button>
                </div>
                <div className="max-w-[50rem] w-full text-sm text-slate-300">
                    It may take a few seconds for new proposals to appear here
                    after they are submitted.
                </div>
                {isLoading ? (
                    <div className="text-center">loading...</div>
                ) : (
                    (data as bigint[])?.map((proposal, index: number) => {
                        return (
                            <Proposal
                                key={index}
                                proposalId={proposal}
                            />
                        );
                    })
                )}
            </div>

            <TreasuryStatus />

            {address && <VotingPower />}
        </main>
    );
}

export default App;
