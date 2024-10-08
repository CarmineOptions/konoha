import React, { useState } from 'react';
import { CONTRACT_ADDR } from '../lib/config';
import axios from 'axios';
import { useAccount, useContractWrite } from '@starknet-react/core';
import { useQuery } from '@tanstack/react-query';
import { BASE_API_URL } from "../lib/config";
import { toast } from 'react-hot-toast';

interface VestingEvent {
    amount: number;
    claimable_at: number | null;
    is_claimable: boolean;
    is_claimed: boolean;
}

const ITEMS_PER_PAGE = 10;

const VestingTable: React.FC = () => {
    const { address } = useAccount();
    const [currentPage, setCurrentPage] = useState(1);

    const { writeAsync } = useContractWrite({ calls: [] });

    const handleClaim = async (vestedTimestamp: number) => {
        if (!address) {
            toast.error('Please connect your wallet');
            return;
        }

        const calls = [{
            contractAddress: CONTRACT_ADDR,
            entrypoint: 'vest',
            calldata: [address, vestedTimestamp.toString()],
        }];

        try {
            await writeAsync({ calls });
            toast.success('Vesting claimed successfully');
            // Optionally, refetch the vesting events here
        } catch (error) {
            toast.error('Failed to claim vesting');
            console.error(error);
        }
    };

    const { data: events = [], isLoading, error } = useQuery({
        queryKey: ['vesting-events', address],
        queryFn: async () => {
            if (!address) {
                return [];
            }
            const response = await axios.get(`${BASE_API_URL}/vesting-events`, {
                params: {
                    contract: CONTRACT_ADDR,
                    address: address,
                }
            });
            return response.data;
        },
        enabled: !!address,  // Only fetch if the address is available
        retry: false,        // Disable retries for this query
    });

    // Pagination logic
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedEvents = events.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <p>{(error as Error).message || 'Failed to load vesting events.'}</p>;
    }

    return (
        <div className="w-full max-w-[50rem] mt-4">
            <h2 className="text-xl font-bold mb-2">Vesting Milestones</h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2 text-left">Amount</th>
                        <th className="border p-2 text-left">Claimable At</th>
                        <th className="border p-2 text-left">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedEvents.map((event: VestingEvent, index: number) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="border p-2">{event.amount}</td>
                            <td className="border p-2">
                                {event.claimable_at ? new Date(event.claimable_at * 1000).toLocaleString() : 'N/A'}
                            </td>
                            <td className="border p-2">
                                {event.is_claimed ? (
                                    'Claimed'
                                ) : event.is_claimable ? (
                                    <button
                                        onClick={() => handleClaim(event.claimable_at!)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        Claim
                                    </button>
                                ) : (
                                    'Not Claimable'
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 bg-gray-300 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'}`}
                    >
                        Previous
                    </button>

                    <span className="text-sm">
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 bg-gray-300 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'}`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );

};

export default VestingTable;
