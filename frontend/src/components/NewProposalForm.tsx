import React, { useState, useMemo } from "react";
import toast from "react-hot-toast";
import { CONTRACT_ADDR } from "../lib/config";
import { useAccount, useContractWrite } from "@starknet-react/core";
//import CustomProposal from "./CustomProposal";
import Treasury from "./proposal-form/Treasury";
import Config from "./proposal-form/ConfigProposal";

const proposalTypes = [
  "airdrop",
  "signal vote",
  "AMM",
  "governance",
  "treasury",
  "config",
];

const proposalIds = {
  governance: 1,
  airdrop: 3,
  "signal vote": 4,
};

export default function NewProposalForm({
  setIsModalOpen,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { isConnected } = useAccount();
  const [selectedType, setSelectedType] = useState<string | null>("airdrop");
  const [payload, setPayload] = useState<string>("");

  const calls = useMemo(() => {
    if (!selectedType) return [];
    const typeIndex = proposalIds[selectedType];
    if (typeIndex === undefined) {
      return [];
    }
    return [
      {
        contractAddress: CONTRACT_ADDR,
        entrypoint: "submit_proposal",
        calldata: [payload, typeIndex.toString()],
      },
    ];
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
    <div className="py-10">
      <h1>Proposal Details</h1>

      <div className="py-8 space-y-5">
        <div className="space-y-1">
          <p className="capitalize text-[12px] font-inter text-black">TITLE*</p>
          <input
            type="text"
            placeholder="Give your proposal a title"
            className=" w-full h-[41px] bg-transparent focus:outline-secondary border-[0.25px] px-3 py-2 border-[#837E69] rounded-[5px] placeholder:text-[#837E69] placeholder:text-[14px] font-inter font-medium"
          />
        </div>

        <div className="space-y-1">
          <p className="capitalize text-[12px] font-inter text-black">
            DESCRIPTION*
          </p>
          <textarea
            rows={4}
            placeholder="Describe your proposal"
            className=" w-full bg-transparent focus:outline-secondary border-[0.25px] px-3 py-2 border-[#837E69] rounded-[5px] placeholder:text-[#837E69] placeholder:text-[14px] font-inter font-medium"
          />
        </div>
      </div>

      <div className="">
        <p className="text-[13px] font-inter font-medium">
          <span className="text-[15px]">Action</span> Choose what your proposal
          does.
        </p>
      </div>

      <div className="flex items-center justify-start py-3 px-2 space-x-2 bg-[#FEFCF1] mt-4">
        {proposalTypes.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setSelectedType(type)}
            className={`px-3 text-[15px] py-2  uppercase ${
              selectedType === type
                ? "bg-[#FDE8C1] text-black"
                : "bg-transparent"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {selectedType &&
        selectedType !== "treasury" &&
        selectedType !== "config" && (
          <form onSubmit={submitProposal} className="w-full space-y-2 py-5">
            <label htmlFor="payload" className="block font-inter text-[12px]">
              Payload
            </label>
            <input
              id="payload"
              type="text"
              placeholder="(integer or hex, e.g.: 1 or 0x1)"
              className=" w-full h-[41px] bg-transparent focus:outline-secondary border-[0.25px] px-3 py-2 border-[#837E69] rounded-[5px] placeholder:text-[#837E69] placeholder:text-[14px] font-inter font-medium"
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
            />
            <div className="flex items-center gap-x-4 py-4">
              <button
                type="submit"
                disabled={true}
                className=" bg-secondary text-sm text-white py-2 px-3"
              >
                Submit Proposal
              </button>

              <button
                type="submit"
                className=" bg-[#6C6C6C] text-sm text-white py-2 px-3"
              >
                Save Draft
              </button>
            </div>
          </form>
        )}

      {selectedType === "config" && (
        <div className="py-4">
          <Config setIsModalOpen={setIsModalOpen} />
        </div>
      )}

      {selectedType === "treasury" && (
        <div className="py-4">
          <Treasury setIsModalOpen={setIsModalOpen} />
        </div>
      )}
    </div>
  );
}
