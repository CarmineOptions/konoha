import React from 'react';
import {useContractWrite} from "@starknet-react/core";
import {TREASURY_ADDRESS} from "../constants/config.json";

interface CancelTransferButtonProps {
    transferId: number;
}

const CancelTransferBtn: React.FC<CancelTransferButtonProps> = ({transferId}) => {

    const { write, error } = useContractWrite({
        calls: [{
            contractAddress: TREASURY_ADDRESS,
            entrypoint: 'cancel_transfer',
            calldata: [transferId],
        }],
    });

    const handleCancelTransfer = async () => {
        try {
            await write();
            console.log(`Transfer ${transferId} cancelled successfully.`);
        } catch (err) {
            console.error(`Error cancelling transfer ${transferId}:`, err);
            console.error(`Error write ${transferId}:`, error);
        }
    };

    return (
        <button
            type="button"
            className='bg-blue-500 rounded-md text-white disabled:opacity-50'
            onClick={handleCancelTransfer}>
            cancel
        </button>
    );
};

export default CancelTransferBtn;