import React from "react";
// import { useBlock } from "@starknet-react/core";
import Header from "./components/Header";
import { useContractRead } from "@starknet-react/core";
import { abi } from "./lib/abi";
import Proposal from "./components/Proposal";
import { CONTRACT_ADDR } from "./lib/config";
// import { useAccount } from "@starknet-react/core";

function App() {
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

            <div className="flex flex-col items-stretch w-full gap-2 p-6">
                <div className="text-2xl font-bold">Proposals</div>
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

            {/* <p className="mb-2 text-lg">
                Get started by editing&nbsp;
                <code className="p-2 rounded bg-zinc-200">src/App.tsx</code>
            </p>
            <div className="flex flex-row gap-12">
                <a
                    className="flex flex-col items-start justify-start w-48 gap-6 p-4 border rounded-md bg-zinc-100 group"
                    href="https://starknet.io/docs"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        src="https://pbs.twimg.com/profile_images/1656626805816565763/WyFDMG6u_400x400.png"
                        className="object-contain w-24 h-24"
                        alt="starknet-icon"
                    />
                    <p className="mb-2 text-lg">
                        Starknet Documentation
                        <span className="ml-2 transition-all group-hover:font-bold group-hover:ml-4">
                            {">"}
                        </span>
                    </p>
                </a>
                <a
                    className="flex flex-col items-start justify-start w-48 gap-6 p-4 border rounded-md bg-zinc-100 group"
                    href="https://starknet-react.com/docs/getting-started"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png"
                        className="object-contain w-24 h-24"
                        alt="react-icon"
                    />
                    <p className="mb-2 text-lg">
                        Starknet React Documentation
                        <span className="ml-2 transition-all group-hover:font-bold group-hover:ml-4">
                            {">"}
                        </span>
                    </p>
                </a>
            </div> */}
        </main>
    );
}

export default App;
