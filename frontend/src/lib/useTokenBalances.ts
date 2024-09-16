import { useMemo } from "react";
import { useContractRead } from "@starknet-react/core";
import { abi } from "./erc20";

interface Token {
    name: string;
    address: string;
}

export function useTokenBalances(tokens: Token[], accountAddress: string) {
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
            balance: BigInt(balanceReads[index].data?.toString() || "0"),
        })),
        [tokens, balanceReads]
    );

    const isLoading = balanceReads.some(read => read.isLoading);

    return { balances, isLoading };
}