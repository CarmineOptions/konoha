/* eslint-disable */
import { abi } from "../abi";
import { CONTRACT_ADDR } from "../config";
import { useContractRead } from "@starknet-react/core";

// Assuming CarmineStake interface based on provided information
interface CarmineStake {
    amount_staked: bigint;
    amount_voting_token: bigint;
    start_date: bigint;
    length: bigint;
    withdrawn: boolean;
    id: number;
}

export const useStakes = (address: string) => {
    const stakeId = 0;
    const result = useContractRead({
        functionName: "get_stake",
        args: [address, stakeId.toString()],
        abi,
        address: CONTRACT_ADDR,
        watch: false,
    });

    console.log('Raw stake data:', result.data);
    console.log(result.error);

    return {
        stake: result.data as unknown as CarmineStake,
        isLoading: result.isLoading,
        error: result.error
    };
};