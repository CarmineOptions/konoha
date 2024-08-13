import React, { useState } from "react";
import toast from "react-hot-toast";
import { CONTRACT_ADDR } from "../lib/config";
import { useAccount, useContractWrite } from "@starknet-react/core";
import CustomProposal from "./CustomProposal";

const proposalTypes = ["airdrop", "signal vote", "AMM", "governance", "treasury"];

export default function NewProposalForm({
  setIsModalOpen,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { isConnected } = useAccount();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [payload, setPayload] = useState<string>("");

  const calls = React.useMemo(() => {
    if (!selectedType) return [];
    const typeIndex = proposalTypes.indexOf(selectedType);
    return [{
      contractAddress: CONTRACT_ADDR,
      entrypoint: "submit_proposal",
      calldata: [payload, typeIndex.toString()],
    }];
  }, [selectedType, payload]);

  const { writeAsync } = useContractWrite({ calls });

  function submitProposal(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isConnected) {
      toast.error("Please connect your wallet");
      return;
    }
    if (!selectedType || (selectedType !== "treasury" && !payload)) {
      toast.error("Please fill out all fields");
      return;
    }
    writeAsync()
      .then(() => toast.success("Proposal submitted"))
      .catch((e) => {
        toast.error("Something went wrong");
        console.error(e);
      })
      .finally(() => setIsModalOpen(false));
  }

  return (
    <form onSubmit={submitProposal} className="space-y-4">
      <div className="flex justify-between space-x-2">
        {proposalTypes.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 rounded flex-1 ${
              selectedType === type ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {type}
          </button>
        ))}
      </div>
      
      {selectedType && selectedType !== "treasury" && (
        <div>
          <label htmlFor="payload" className="block mb-2">Payload</label>
          <input
            id="payload"
            type="text"
            placeholder="(integer or hex, e.g.: 1 or 0x1)"
            className="w-full p-2 border rounded-lg border-slate-300"
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
          />
        </div>
      )}
      
      {selectedType === "treasury" && <CustomProposal setIsModalOpen={setIsModalOpen}/>}
      
      {selectedType !== "treasury" && (
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-lg"
        >
          Submit
        </button>
      )}
    </form>
  );
}
