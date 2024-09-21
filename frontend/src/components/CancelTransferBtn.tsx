import React from 'react';
import { useContractWrite } from "@starknet-react/core";
import { TREASURY_ADDRESS } from "../lib/config";
import { Contract } from "starknet";
import TreasuryABI from "../lib/treasury_abi.json";

interface CancelTransferButtonProps {
    transferId: number;
}

const CancelTransferBtn: React.FC<CancelTransferButtonProps> = ({ transferId }) => {

    const contract = new Contract(TreasuryABI, TREASURY_ADDRESS)

    const { writeAsync, error } = useContractWrite({
        calls: [
            contract.populateTransaction["cancel_transfer"](transferId)
        ],
    });

    const handleCancelTransfer = async () => {
        try {
            await writeAsync();
            console.log(`Transfer ${transferId} cancelled successfully.`);
        } catch (err) {
            console.error(`Error cancelling transfer ${transferId}:`, err);
            console.error(`Error write ${transferId}:`, error);
        }
    };

    return (
        <button
            type="button"
            className='bg-blue-500 rounded-md text-white disabled:opacity-50 p-1 w-full'
            onClick={handleCancelTransfer}>
            Сancel
        </button>
    );
};

export default CancelTransferBtn;