import React from "react";
import {
    useAccount,
    useContractRead, useNetwork
} from "@starknet-react/core";
import TreasuryABI from "../lib/treasury_abi.json";
import CancelTransferBtn from "./CancelTransferBtn";
import { formatBalance } from "../lib/erc20";
import { TREASURY_ADDRESS } from "../lib/config";

const StatusTransfer = () => {
    const { address } = useAccount()
    const { data, isLoading } = useContractRead({
        functionName: 'get_live_transfers',
        address: TREASURY_ADDRESS,
        args: [],
        abi: TreasuryABI,
        watch: false,
        retry: false
    })

    const renderCancelBtn = (status, transfer_id) =>
        getTransferStatus(status) == 'PENDING' && address &&
        <CancelTransferBtn transferId={transfer_id.toString()} />

    const { chain: { network } } = useNetwork()

    const handleAddress = address => {
        const sub_domain = network === 'sepolia' ? 'sepolia.' : ''
        const url = `https://${sub_domain}starkscan.co/contract/${getAddressToHex(address)}`
        window.open(`${url}`, '_blank')
    }

    const renderData = () => {
        if (Array.isArray(data)) {
            if (data.length === 0) {
                return <div className='p-2'>There are no transfers</div>;
            }

            return data.map((transfer_item, index) => {

                return (
                    <div key={index} className="flex flex-wrap flex-row">
                        <div className='flex flex-wrap flex-row w-full'>
                            <div className="flex-1 w-1/2 basis-1/2 p-2 bg-slate-200 text-left text-gray-700 uppercase tracking-wider border-r border-slate-400">token</div>
                            <div className="flex-1 w-1/2 basis-1/2 p-2 bg-slate-200 text-left text-gray-700 uppercase tracking-wider">receiver</div>
                            <div className="flex-1 w-1/2 basis-1/2 p-2 overflow-hidden cursor-pointer" onClick={() => handleAddress(transfer_item.token_addr)}>{getFormatAddress(transfer_item.token_addr.toString())}</div>
                            <div className="flex-1 w-1/2 basis-1/2 p-2 overflow-hidden cursor-pointer" onClick={() => handleAddress(transfer_item.receiver)}>{getFormatAddress(transfer_item.receiver.toString())}</div>
                        </div>
                        <div className='flex flex-wrap flex-row w-full'>
                            <div className="flex-1 w-1/4 basis-1/4 p-2 bg-slate-200 text-left text-gray-700 uppercase tracking-wider">amount</div>
                            <div className="flex-1 w-1/4 basis-1/4 p-2 bg-slate-200 text-left text-gray-700 uppercase tracking-wider">cooldown_end</div>
                            <div className="flex-1 w-1/4 basis-1/4 p-2 bg-slate-200 text-left text-gray-700 uppercase tracking-wider">status</div>
                            <div className="flex-1 w-1/4 basis-1/4 p-2 bg-slate-200 text-left text-gray-700 uppercase tracking-wider">actions</div>
                            <div className="flex-1 w-1/4 basis-1/4 p-2 ">{formatBalance(transfer_item.amount.toString())}</div>
                            <div className="flex-1 w-1/4 basis-1/4 p-2 ">{getHoursLeft(transfer_item.cooldown_end.toString())}</div>
                            <div className="flex-1 w-1/4 basis-1/4 p-2 ">{getTransferStatus(transfer_item.status)}</div>
                            <div className="flex-1 w-1/4 basis-1/4 p-2 ">
                                {renderCancelBtn(transfer_item?.status, transfer_item?.id)}
                            </div>
                        </div>

                    </div>
                )
            })
        } else {
            return null
        }
    }

    return (
        <div>
            <div className="flex w-full flex-grow pb-4 text-2xl font-bold">Transfer status</div>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div className="w-[50rem] max-w-[50rem] grid  items-center pl-0 rounded-lg bg-slate-200">
                    <div className="min-w-full bg-white border border-gray-200 rounded-lg">

                        <div>
                            {renderData()}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

const getHoursLeft = (target_date: number): string => {
    const targetTimestamp = Number(target_date) * 1000;
    const currentTimestamp = Date.now();

    const timeLeft = targetTimestamp - currentTimestamp;
    if (timeLeft > 0) {
        const secondsLeft = Math.floor(timeLeft / 1000);
        const minutesLeft = Math.floor(secondsLeft / 60);
        const hoursLeft = Math.floor(minutesLeft / 60);
        return `hours ${hoursLeft} left`;
    } else {
        return 'expired';
    }
};

const getTransferStatus = status => {
    if (status?.variant?.PENDING) {
        return 'PENDING'
    }
    if (status?.variant?.CANCELLED) {
        return 'CANCELLED'
    }
    if (status?.variant?.FINISHED) {
        return 'FINISHED'
    }

}

const getFormatAddress = address => address.slice(0, 12) + "..." + address.slice(-4)
const getAddressToHex = address => "0x" + address.toString(16)


export default StatusTransfer