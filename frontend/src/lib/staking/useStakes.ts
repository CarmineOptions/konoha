/* eslint-disable */
import { useState, useCallback, useEffect } from 'react';
import { useContract, useContractRead } from '@starknet-react/core';
import { abi } from "../abi";
import { CONTRACT_ADDR } from "../config";

interface CarmineStake {
    amount_staked: bigint;
    amount_voting_token: bigint;
    start_date: bigint;
    length: bigint;
    withdrawn: boolean;
    id: number;
}

const isEmptyStake = (stake: CarmineStake) => stake.amount_staked === BigInt(0);

export const useStakes = (address: string | undefined) => {
    const [stakes, setStakes] = useState<CarmineStake[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const { contract } = useContract({
        address: CONTRACT_ADDR,
        abi,
    });

    const fetchStakes = useCallback(async () => {
        if (!contract || !address) return;

        setIsLoading(true);
        setError(null);

        try {
            const fetchedStakes: CarmineStake[] = [];
            let stakeId = 0;

            while (true) {
                const result = await contract.call('get_stake', [address, stakeId.toString()]);
                const stake = result as unknown as CarmineStake;

                if (isEmptyStake(stake)) break;

                fetchedStakes.push({ ...stake, id: stakeId });
                stakeId++;
            }

            setStakes(fetchedStakes);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An error occurred while fetching stakes'));
        } finally {
            setIsLoading(false);
        }
    }, [contract, address]);

    useEffect(() => {
        fetchStakes();
    }, [fetchStakes]);

    return { stakes, isLoading, error, refetch: fetchStakes };
};