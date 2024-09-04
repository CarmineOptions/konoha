import React, { useState, useMemo } from 'react';
import { useAccount, useContractWrite } from '@starknet-react/core';
import { toast } from 'react-hot-toast';
import { CONTRACT_ADDR } from '../lib/config';

export default function CustomProposalForm({
  setIsModalOpen,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { isConnected } = useAccount();

  const MAX_CALLEDATA_FIELDS = 3;
  
  // State variables for custom proposal type and calldata
  const [customProposalType, setCustomProposalType] = useState<string>('0');
  const [calldata, setCalldata] = useState<string[]>([]);

  // Create a call to submit custom proposal
  const calls = useMemo(() => {
    const tx = {
      contractAddress: CONTRACT_ADDR,
      entrypoint: 'submit_custom_proposal',
      calldata: [
        customProposalType.toString(),
        ...calldata.map((data) => data.toString()),
      ],
    };
    return [tx];
  }, [customProposalType, calldata]);  

  const { writeAsync } = useContractWrite({ calls });

  function submitCustomProposal(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isConnected) {
      toast.error('Please connect your wallet');
      return;
    }

    if (!customProposalType || calldata.length === 0) {
      toast.error('Please fill out all fields');
      return;
    }

    writeAsync()
      .then(() => {
        toast.success('Custom proposal submitted');
      })
      .catch((e) => {
        toast.error('Something went wrong');
        console.error(e);
      })
      .finally(() => {
        setIsModalOpen(false);
      });
  }

  const handleCalldataChange = (index: number, value: string) => {
    const updatedCalldata = [...calldata];
    updatedCalldata[index] = value;
    setCalldata(updatedCalldata);
  };

  const addCalldataField = () => {
    if (calldata.length < MAX_CALLEDATA_FIELDS) {
      setCalldata([...calldata, '']);
    } else {
      toast.error('Maximum number of calldata fields reached');
    }
  };  

  return (
    <form onSubmit={submitCustomProposal} className='w-[75%]'>
      <label htmlFor="#customProposalType">Custom Proposal Type</label>
      <input
        id="#customProposalType"
        type="text"
        placeholder="Enter proposal type (e.g., 0, 1, 2)"
        className="w-full p-2 mb-2 border rounded-lg border-slate-300"
        onChange={(e) => setCustomProposalType(e.target.value)}
      />

      <label>Calldata</label>
      {calldata.map((data, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Calldata ${index + 1}`}
          className="w-full p-2 mb-2 border rounded-lg border-slate-300"
          value={data}
          onChange={(e) => handleCalldataChange(index, e.target.value)}
        />
      ))}

      <button
        type="button"
        onClick={addCalldataField}
        className="w-full p-2 mt-2 text-blue-500 border border-blue-500 rounded-lg"
      >
        Add Calldata Field
      </button>

      <button
        type="submit"
        className="w-full p-2 mt-4 text-white bg-blue-500 rounded-lg"
      >
        Submit
      </button>
    </form>
  );
}
