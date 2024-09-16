import {useContractRead} from "@starknet-react/core";
import {TreasuryABI} from "../lib/treasuryABI";
import {TREASURY_ADDRESS} from "../constants/config.json";

export function StatusTransfer() {
    const statusTransfer = useContractRead({
        functionName: "get_live_transfers",
        address: TREASURY_ADDRESS,
        abi: TreasuryABI,
    })

    console.log('Data is ', statusTransfer)
    if (statusTransfer.error){
        console.error(statusTransfer.error);
    }
}