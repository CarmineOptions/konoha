import React, { useState } from 'react';
import { CONTRACT_ADDR } from '../lib/config';
import axios from 'axios';
import { useAccount } from '@starknet-react/core';
import { useQuery } from '@tanstack/react-query';

interface VestingEvent {
    amount: number;
    claimable_at: number | null;
    is_claimable: boolean;
    is_claimed: boolean;
}

const ITEMS_PER_PAGE = 10; // Items per page

const VestingTable: React.FC = () => {
    const { address } = useAccount();
    const [currentPage, setCurrentPage] = useState(1); // Track the current page

    const { data: events = [], isLoading, error } = useQuery({
        queryKey: ['vesting-events', address],
        queryFn: async () => {
            if (!address) {
                return [];
            }
            const response = await axios.get('/api/vesting-events', {
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
        <div>
            {/* Title */}
            <div className="flex w-full flex-grow pb-4 text-2xl font-bold">Vesting Event</div>

            {/* Table */}
            <div className="w-[50rem] max-w-[50rem] grid items-center p-2 pl-0 rounded-lg bg-slate-200">
                <div className="grid grid-cols-4 bg-slate-100 p-2 font-semibold text-gray-700">
                    <div className="pl-5">Amount</div>
                    <div>Claimable At</div>
                    <div>Is Claimable</div>
                    <div>Is Claimed</div>
                </div>
                {paginatedEvents.map((event: VestingEvent, index: number) => (
                    <div key={index} className="grid grid-cols-4 p-2 bg-white even:bg-gray-50">
                        <div className="pl-5">{event.amount}</div>
                        <div>{event.claimable_at ? new Date(event.claimable_at * 1000).toLocaleString() : 'N/A'}</div>
                        <div>{event.is_claimable ? 'Yes' : 'No'}</div>
                        <div>{event.is_claimed ? 'Yes' : 'No'}</div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
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
        </div>
    );
};

export default VestingTable;