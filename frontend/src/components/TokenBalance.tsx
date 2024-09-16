import React from "react";
import { formatBalance } from "../lib/erc20";

interface TokenBalanceItem {
    name: string;
    balance: bigint;
}

interface TokenBalanceProps {
    balances: TokenBalanceItem[];
    title: string;
    isLoading: boolean;
}

export default function TokenBalance({ balances, title, isLoading }: TokenBalanceProps) {
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
                                    {formatBalance(token.balance)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}