import React, { useState } from "react";
import { Distribution } from "./Distribution";
import { useAccount, useContractWrite } from "@starknet-react/core";
import { toast } from "react-hot-toast";
import { CONTRACT_ADDR } from "../../lib/config";


const treasuryProposalTypes = [
  {
    icon: "/distribution.png",
    label: "distribution",
  },
  {
    icon: "/zklend.png",
    label: "zklend",
  },

  {
    icon: "/nostra.png",
    label: "nostra",
  },

  {
    icon: "/carmine.png",
    label: "carmine",
  },
];

const treasuryProposalTypetoId = {
  distribution: 0,
  zklend: 2,
  nostra: 3,
  carmine: 4,
};

export default function Treasury({
  setIsModalOpen,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const { isConnected } = useAccount();

  const { writeAsync } = useContractWrite({ calls: [] });

  const handleSubmit = async (newCalldata: string[]) => {
    if (!isConnected) {
      toast.error("Please connect your wallet");
      return;
    }

    if (!selectedType || newCalldata.length === 0) {
      toast.error("Please fill out all fields");
      return;
    }

    const selectedTypeId = treasuryProposalTypetoId[selectedType];

    if (!selectedType || newCalldata.length === 0) return [];
    const calls = [
      {
        contractAddress: CONTRACT_ADDR,
        entrypoint: "submit_custom_proposal",
        calldata: [
          selectedTypeId,
          newCalldata.length,
          ...newCalldata.map((data) => data.toString()),
        ],
      },
    ];
    console.log("calling writeAsync with calls", calls);
    try {
      await writeAsync({ calls: calls });
      toast.success("Custom proposal submitted");
    } catch (e) {
      toast.error("Something went wrong");
      console.error(e);
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <>
     <div className="flex items-center gap-x-4">
        <p className="uppercase text-[12px] font-inter font-medium">Platform</p>
     <div className="flex bg-[#FEFCF1] justify-between space-x-2 px-2 py-2">
        {treasuryProposalTypes.map(({label, icon}) => (
          <button
            key={label}
            type="button"
            onClick={() => setSelectedType(label)}
            className={`px-2 py-2 rounded-[6px] flex items-center gap-x-1 text-[12px]  ${
              selectedType === label
                ? "bg-[#FDE8C1] text-black"
                : "bg-transparent"
            }`}
          >
            <img src={icon} alt={icon} />
            {label}
          </button>
        ))}
      </div>
     </div>
      {selectedType === "distribution" && (
        <Distribution onSubmit={handleSubmit} />
      )}
    </>
  );
}
