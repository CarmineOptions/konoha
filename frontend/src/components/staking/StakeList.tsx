import React from 'react';
import { useStakes } from '../../lib/staking/useStakes';
import { useAccount, useContract } from '@starknet-react/core';
import { formatBalance } from "../../lib/erc20";
import { CONTRACT_ADDR } from '../../lib/config';
import toast from 'react-hot-toast';
import { abi } from "../../lib/abi";

interface StakeListProps {
    address: string | undefined;
}

const StakeList: React.FC<StakeListProps> = ({ address }) => {
    const { stakes, isLoading, error } = useStakes(address);

    const { contract } = useContract({
        address: CONTRACT_ADDR,
        abi,
    });

    const { account } = useAccount();




    if (isLoading) return <div className="text-center">Loading stakes...</div>;
    if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;
    if (!stakes.length) return <div className="text-center">No stakes found.</div>;

    const formatExpirationStatus = (startDate: bigint, length: bigint, stakeId: number) => {
        const startTimestamp = Number(startDate) * 1000;
        const expirationTimestamp = startTimestamp + (Number(length) * 1000);
        const now = Date.now();

        if (now > expirationTimestamp) {
            return (
                <div>
                    <span>Expired on {new Date(expirationTimestamp).toLocaleDateString()}</span>
                    <button
                        onClick={() => handleUnstake(stakeId)}
                        className="ml-2 px-2 py-1 text-xs font-semibold bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Unstake
                    </button>
                </div>
            );
        } else {
            return `Expires on ${new Date(expirationTimestamp).toLocaleDateString()}`;
        }
    };

    const handleUnstake = async (stakeId: number) => {
        try {
            await account.execute([{ contractAddress: contract.address, entrypoint: 'unstake', calldata: [stakeId] }], [abi])
            toast.success('Unstake successful');
        } catch (error) {
            console.error('Unstake error:', error);
            toast.error('Failed to unstake');
        }
    };

    return (
        <div className="w-full max-w-[50rem] mt-4">
            <h2 className="text-xl font-bold mb-2">Your Stakes</h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2 text-left">Stake ID</th>
                        <th className="border p-2 text-left">Amount Staked</th>
                        <th className="border p-2 text-left">Voting Power</th>
                        <th className="border p-2 text-left">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {stakes.map(stake => (
                        <tr key={stake.id} className="hover:bg-gray-50">
                            <td className="border p-2">{stake.id}</td>
                            <td className="border p-2">{formatBalance(stake.amount_staked)} KONOHA</td>
                            <td className="border p-2">{formatBalance(stake.amount_voting_token)} veKONOHA</td>
                            <td className="border p-2">{formatExpirationStatus(stake.start_date, stake.length, stake.id)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StakeList;