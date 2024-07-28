import React from "react";
// import { useBlock } from "@starknet-react/core";
import Header from "./components/Header";
import { useContractRead } from "@starknet-react/core";
import { abi } from "./lib/abi";
import Proposal from "./components/Proposal";
import { CONTRACT_ADDR } from "./lib/config";
import NewProposalForm from "./components/NewProposalForm";
// import { useAccount } from "@starknet-react/core";

function App() {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    // Call the contract function get_live_proposals to get the live proposals
    const { data, isError, isLoading, error } = useContractRead({
        functionName: "get_live_proposals",
        args: [],
        abi,
        address: CONTRACT_ADDR,
        watch: true,
    });

    // Check if there is an error, if there is, display the error message
    if (isError) {
        return <div>{error?.message}</div>;
    }

    // Display the proposals
    return (
        <main className="flex flex-col items-center min-h-screen gap-12 mt-16">
            <Header />
            {isModalOpen && (
                <dialog className="fixed inset-0 z-50 flex items-center justify-center w-full h-full p-6 bg-black bg-opacity-50">
                    <div className="relative flex flex-col items-center gap-4 p-8 bg-white rounded-lg w-[50%] h-[50%]">
                        {/* Close modal button */}
                        <button
                            className="absolute right-3 top-3 text-slate-400"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <p className="text-xl font-bold">New treasury proposal</p>
                        {/* New proposal form */}
                        <NewProposalForm setIsModalOpen={setIsModalOpen} />
                    </div>
                </dialog>
            )}

            {/* List of proposals */}
            <div className="flex max-w-[50rem] flex-col items-center w-full gap-2 p-6">
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
                                index={index}
                            />
                        );
                    })
                )}
            </div>
        </main>
    );
}

export default App;
