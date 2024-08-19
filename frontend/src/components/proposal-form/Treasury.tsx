import React, { useState } from "react";
import { Distribution } from "./Distribution";
import { useAccount, useContractWrite } from '@starknet-react/core';
import { toast } from 'react-hot-toast';
import { CONTRACT_ADDR } from "../../lib/config";

const treasuryProposalTypes = ["distribution", "zklend", "nostra", "carmine"];
const treasuryProposalTypetoId = {"distribution": 0, "zklend": 1, "nostra": 2, "carmine": 3}

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
            toast.error('Please connect your wallet');
            return;
        }

        if (!selectedType || newCalldata.length === 0) {
            toast.error('Please fill out all fields');
            return;
        }

        const selectedTypeId = treasuryProposalTypetoId[selectedType];
        
        if (!selectedType || newCalldata.length === 0) return [];
        const calls = [{
            contractAddress: CONTRACT_ADDR,
            entrypoint: 'submit_custom_proposal',
            calldata: [
                selectedTypeId,
                newCalldata.length,
                ...newCalldata.map(data => data.toString()),
            ],
        }];
        console.log("calling writeAsync with calls", calls);
        try {
            await writeAsync({ calls: calls });
            toast.success('Custom proposal submitted');
        } catch (e) {
            toast.error('Something went wrong');
            console.error(e);
        } finally {
            setIsModalOpen(false);
        }
    };

    return (
        <>
            <div className="flex justify-between space-x-2">
                {treasuryProposalTypes.map((type) => (
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
            {selectedType === "distribution" && (
                <Distribution onSubmit={handleSubmit} />
            )}
        </>
    );
}