import React, { useState } from "react";
import toast from "react-hot-toast";
import Tokens from "../helpers/tokens";
import { useAccount, useContractWrite } from "@starknet-react/core";

export default function NewProposalForm({
                                            setIsModalOpen,
                                        }: {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { isConnected } = useAccount();

    // Use the useContractWrite hook to write the proposal
    const { writeAsync } = useContractWrite({ /*calls*/ });

    function submitProposal(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // Check if the user is connected
        if (!isConnected) {
            toast.error("Please connect your wallet");
            return;
        }

        // Call the write function to submit the proposal
        writeAsync()
            .then(() => {
                toast.success("Proposal submitted");
            })
            .catch((e) => {
                toast.error("Something went wrong");
                console.error(e);
            })
            .finally(() => {
                setIsModalOpen(false);
            });
    }

    // State to track the selected option in the dropdown
    const [selectedOption, setSelectedOption] = useState<string>('');

    // Handler for changes in the dropdown selection
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value);
    }

    // Component to render when 'distribution' is selected
    const Distribution: React.FC = () => (
        <div>
            <h1>Recipient</h1>
            <input className='border border-gray-300 rounded-lg p-0.5 w-full' type="text"/>
            <h1>Token to distribute</h1>
            <select className='border border-gray-300 rounded-lg p-0.5 w-full'>
                {/* Map over the Tokens array to create an option for each token */}
                {Tokens.map((token,index) => {
                    return(
                        <option className='text-black' key={index}>{token}</option>
                    )
                })}
            </select>
            <h1>Amount</h1>
            <input
                type="number"
                className='border border-gray-300 rounded-lg p-0.5 w-full'
                placeholder='0'
            />
            <button
                type="submit"
                className="w-full p-2 mt-4 text-white bg-blue-500 rounded-lg"
            >
                Submit
            </button>
        </div>
    );

    const renderComponent = (option: string) => {
        switch (option) {
            case 'distribution':
                return <Distribution/>;
            default:
                return null;
        }
    }

    return (
        <form onSubmit={submitProposal}>
            <select className='border border-gray-300 rounded-lg p-1 w-full' onChange={handleSelectChange}>
                <option>Select an option</option>
                <option value='zklend'>ZkLend</option>
                <option value='nostra'>Nostra</option>
                <option value='carmine'>Carmine</option>
                <option value='distribution'>Distribution</option>
            </select>

            {/* Render the component based on the selected option */}
            {selectedOption && renderComponent(selectedOption)}
        </form>
    );
}
