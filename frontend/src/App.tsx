import React from "react";
import Header from "./components/Header";
import { useContractRead, useAccount } from "@starknet-react/core";
import { abi } from "./lib/abi";
import Proposal from "./components/Proposal";
import { CONTRACT_ADDR } from "./lib/config";
import SubmitProposalModal from "./components/SubmitProposalModal";
import TreasuryStatus from "./components/TreasuryStatus";
import VotingPower from "./components/staking/VotingPower";
// import StatusTransfer from "./components/StatusTransfer";
// import VestingTable from "./components/VestingTable";

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
    retry: false,
  });

  // Check if there is an error, if there is, display the error message
  if (isError) {
    return <div>{error?.message}</div>;
  }

  return (
    <main className="flex flex-col items-center bg-main-bg  min-h-screen py-16">
      <Header />

      <SubmitProposalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div className="flex max-w-[50rem] flex-col items-center w-full pt-6 gap-2">
        <div className="flex items-center justify-between w-full">
          <div className="flex-grow md:text-[54px] font-default font-medium">
            Welcome to Konoha
          </div>
          <button
            className=" bg-secondary px-3 py-2 text-sm text-white font-inter transition-all rounded-md hover:bg-primary hover:text-secondary"
            onClick={() => setIsModalOpen(true)}
          >
            + New Proposal
          </button>
        </div>
        <div className=" font-inter w-full text-base text-black">
          The community toolkit for Starknet Governance.
        </div>

        {isLoading ? (
          <div className="text-center"></div>
        ) : (
          (data as bigint[])?.map((proposal, index: number) => {
            return <Proposal key={index} proposalId={proposal} />;
          })
        )}
      </div>

      <div className="w-full md:max-w-[50rem] py-[32px] space-y-6">
        <TreasuryStatus />
        {/* <StatusTransfer /> */}
        {address && <VotingPower />}

      </div>

      {/* {address && <VestingTable />} */}
    </main>
  );
}

export default App;
