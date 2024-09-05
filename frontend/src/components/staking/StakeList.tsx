import React from 'react';
import { useStakes } from '../../lib/staking/useStakes';
import { formatBalance } from "../../lib/erc20";

interface StakeListProps {
    address: string | undefined;
}

const StakeList: React.FC<StakeListProps> = ({ address }) => {
    const { stakes, isLoading, error } = useStakes(address);

    if (isLoading) return <div className="text-center">Loading stakes...</div>;
    if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;
    if (!stakes.length) return <div className="text-center">No stakes found.</div>;

    const formatExpirationStatus = (startDate: bigint, length: bigint) => {
        const startTimestamp = Number(startDate) * 1000; // Convert to milliseconds
        const expirationTimestamp = startTimestamp + (Number(length) * 1000);
        const now = Date.now();

        if (now > expirationTimestamp) {
            return `Expired on ${new Date(expirationTimestamp).toLocaleDateString()}`;
        } else {
            return `Expires on ${new Date(expirationTimestamp).toLocaleDateString()}`;
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
                            <td className="border p-2">{formatExpirationStatus(stake.start_date, stake.length)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StakeList;