import React, { useMemo } from "react";
import { useContractRead } from "@starknet-react/core";
import { abi, formatBalance } from "../lib/erc20";

interface Token {
    name: string;
    address: string;
}

interface TokenBalanceProps {
    tokens: Token[];
    accountAddress: string;
    title: string;
}

export default function TokenBalance({ tokens, accountAddress, title }: TokenBalanceProps) {
    const balanceReads = tokens.map(token =>
        useContractRead({
            functionName: "balanceOf",
            args: [accountAddress],
            abi,
            address: token.address,
            watch: true,
        })
    );

    const balances = useMemo(() =>
        tokens.map((token, index) => ({
            name: token.name,
            balance: balanceReads[index].data,
            isLoading: balanceReads[index].isLoading,
        })),
        [tokens, balanceReads]
    );

    const isLoading = balances.some(b => b.isLoading);

    return (
        <div>
            <div className="flex w-full flex-grow pb-4 text-2xl font-bold">{title}</div>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div className="w-[50rem] max-w-[50rem] grid grid-cols-2 items-center p-2 pl-0 rounded-lg bg-slate-200">
                    {balances.map((token, index) => (
                        <div key={index} className="flex items-center">
                            <div className="self-stretch pl-5 pr-4 mr-4 font-mono border-r grid text-slate-400 place-content-center border-slate-400">
                                {token.name}
                            </div>
                            <div className="flex justify-between items-center gap-20">
                                <div className="flex-grow font-bold">
                                    {formatBalance(BigInt(token.balance.toString()))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}