import React, { useState } from "react";
import { toast } from 'react-hot-toast';
import { useContractWrite } from "@starknet-react/core";
import { CONTRACT_ADDR } from "../../lib/config";

interface ConfigProposalProps {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ConfigProposal: React.FC<ConfigProposalProps> = ({ setIsModalOpen }) => {
    const [quorum, setQuorum] = useState("");
    const [proposalVotingSeconds, setProposalVotingSeconds] = useState("");

    const { writeAsync } = useContractWrite({
        calls: [{
            contractAddress: CONTRACT_ADDR,
            entrypoint: "submit_custom_proposal",
            calldata: [1, 2, quorum, proposalVotingSeconds],
        }],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const quorumValue = parseInt(quorum);
        if (isNaN(quorumValue) || quorumValue < 0 || quorumValue > 50) {
            toast.error('Quorum must be a number between 0 and 50');
            return;
        }

        const votingSeconds = parseInt(proposalVotingSeconds);
        if (isNaN(votingSeconds) || votingSeconds <= 0) {
            toast.error('Proposal voting seconds must be a positive number');
            return;
        }

        if (votingSeconds <= 60 * 60) {
            toast.error('Voting should be longer than 1 hour. Enter seconds');
            return;
        }

        writeAsync()
            .then(() => {
                toast.success("Config proposal submitted");
                setIsModalOpen(false);
            })
            .catch((e) => {
                toast.error("Something went wrong");
                console.error(e);
            });
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Default proposal configuration</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="quorum" className="block mb-2">Quorum (%)</label>
                    <input
                        id="quorum"
                        className='border border-gray-300 rounded-lg p-2 w-full'
                        type="number"
                        min="0"
                        max="100"
                        value={quorum}
                        onChange={(e) => setQuorum(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="proposalVotingSeconds" className="block mb-2">Proposal Voting Duration (seconds)</label>
                    <input
                        id="proposalVotingSeconds"
                        className='border border-gray-300 rounded-lg p-2 w-full'
                        type="number"
                        min="3600"
                        value={proposalVotingSeconds}
                        onChange={(e) => setProposalVotingSeconds(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full p-2 mt-4 text-white bg-blue-500 rounded-lg"
                >
                    Submit Config Proposal
                </button>
            </form>
        </div>
    );
};

export default ConfigProposal;