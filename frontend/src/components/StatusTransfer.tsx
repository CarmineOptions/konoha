import React, {useEffect} from "react";
import {
    useContractRead
} from "@starknet-react/core";
import {TREASURY_ADDRESS} from "../constants/config.json";
import {TreasuryABI} from "../lib/treasuryABI";
import CancelTransferBtn from "./CancelTransferBtn";
import {formatBalance} from "../lib/erc20";

const StatusTransfer = () => {

    const getLiveTransfer = useContractRead({
        functionName: 'get_live_transfers',
        address: TREASURY_ADDRESS,
        abi: TreasuryABI,
    })

    useEffect(() => {
        getLiveTransfer.refetch()
    },[])


    const data = Transfers_mock
    return (
        <div>
            <div className="flex w-full flex-grow pb-4 text-2xl font-bold">Transfer status</div>

            <div className="w-[50rem] max-w-[50rem] grid  items-center p-2 pl-0 rounded-lg bg-slate-200">
                <div className="p-2  grid grid-cols-6 font-bold">
                    <div className="grid gap-20">token</div>
                    <div className="grid gap-20">receiver</div>
                    <div className="grid gap-20">amount</div>
                    <div className="grid gap-20">cooldown</div>
                    <div className="grid gap-20">status</div>
                    <div className="grid gap-20"></div>
                </div>
                {data && data.map((transfer_item) => (
                    <div key={transfer_item.id} className="p-2  grid grid-cols-6">
                        <div className="grid gap-20">{transfer_item.token_addr}</div>
                        <div className="grid gap-20">{transfer_item.receiver}</div>
                        <div className="grid gap-20">{formatBalance(BigInt(transfer_item.amount))}</div>
                        <div className="grid gap-20">{getHoursLeft(Number(transfer_item.cooldown_end))}</div>
                        <div className="grid gap-20">{transfer_item.status}</div>
                        <div className="grid gap-20">
                            <CancelTransferBtn transferId={transfer_item.id} />
                        </div>
                    </div>
                    ))
                }
            </div>
        </div>
    )
}

const Transfers_mock = [
    {id: 1, token_addr: '123123', receiver: '321231', amount: '28629396609133588254', cooldown_end: '1726851313', status:'PENDING'},
    {id: 2, token_addr: '123123', receiver: '321231', amount: '28629396609133588254', cooldown_end: '1726851313', status:'PENDING'},
    {id: 3, token_addr: '123123', receiver: '321231', amount: '28629396609133588254', cooldown_end: '1726851313', status:'PENDING'},
    {id: 4, token_addr: '123123', receiver: '321231', amount: '28629396609133588254', cooldown_end: '1726851313', status:'PENDING'},
    {id: 5, token_addr: '123123', receiver: '321231', amount: '28629396609133588254', cooldown_end: '1726851313', status:'PENDING'},
    ]

const getHoursLeft = (target_date: number): string => {
    const targetTimestamp = target_date * 1000;
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

export default StatusTransfer