import React, { useState, useMemo } from "react";
import { useContractWrite } from "@starknet-react/core";
import { CONTRACT_ADDR, FLOATING_TOKEN_CONTRACT } from '../../lib/config'; // 
import toast from "react-hot-toast";

const stakingPeriods = [
    { label: "1 month", value: "2629743" }
];

interface NewStakeProps {
    floatingBalance: string;
}

export default function NewStake({ floatingBalance }: NewStakeProps) {
    const [amount, setAmount] = useState<string>("");
    const [period, setPeriod] = useState<string>(stakingPeriods[0].value);

    const calls = useMemo(() => {
        if (!amount) return [];
        return [
            {
                contractAddress: FLOATING_TOKEN_CONTRACT,
                entrypoint: "approve",
                calldata: [CONTRACT_ADDR, 0, amount]
            },
            {
                contractAddress: CONTRACT_ADDR,
                entrypoint: "stake",
                calldata: [period, amount],
            }
        ];
    }, [amount, period]);

    const { writeAsync } = useContractWrite({ calls });

    const handleStake = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!amount) {
            toast.error("Please enter an amount to stake");
            return;
        }
        writeAsync()
            .then(() => toast.success("Stake successful"))
            .catch((e) => {
                toast.error("Staking failed");
                console.error(e);
            });
    };

    if (BigInt(floatingBalance) === 0n) return null;

    return (
        <form onSubmit={handleStake} className="mt-4 space-y-4">
            <div className="flex w-full flex-grow pb-4 text-xl font-bold">Stake your floating token</div>
            <div>
                <label htmlFor="stakePeriod" className="block mb-1">Staking Period</label>
                <select
                    id="stakePeriod"
                    className="w-full p-2 border rounded-lg border-slate-300"
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                >
                    {stakingPeriods.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="stakeAmount" className="block mb-1">Stake Amount</label>
                <input
                    id="stakeAmount"
                    type="text"
                    placeholder="Amount in wei"
                    className="w-full p-2 border rounded-lg border-slate-300"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded-lg"
            >
                Stake
            </button>
        </form>
    );
}