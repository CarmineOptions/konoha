import React, { useState } from "react";
import { ETH_ADDRESS, STRK_ADDRESS } from '../../lib/config';
import { toast } from 'react-hot-toast';

interface DistributionProps {
  onSubmit: (calldata: string[]) => void;
}

export const Distribution: React.FC<DistributionProps> = ({ onSubmit }) => {
  const [recipient, setRecipient] = useState("");
  const [token, setToken] = useState("ETH");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let tok: string;
    if (token == "ETH") {
      tok = ETH_ADDRESS;
    } else if (token == "STRK") {
      tok = STRK_ADDRESS;
    }

    if (!recipient.startsWith("0x")) {
      toast.error('Address must start with 0x');
      return;
    }

    const [wholePart, fractionalPart = ''] = amount.split('.');
    const amountWei = BigInt(wholePart + fractionalPart.padEnd(18, '0')).toString();
    const calldata = [recipient, tok, amountWei];
    onSubmit(calldata);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="recipient" className="block mb-2">Recipient</label>
        <input
          id="recipient"
          className='border border-gray-300 rounded-lg p-2 w-full'
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="token" className="block mb-2">Token to distribute</label>
        <select
          id="token"
          className='border border-gray-300 rounded-lg p-2 w-full'
          value={token}
          onChange={(e) => setToken(e.target.value)}
        >
          <option value="ETH">ETH</option>
          <option value="STRK">STRK</option>
        </select>
      </div>
      <div>
        <label htmlFor="amount" className="block mb-2">Amount</label>
        <input
          id="amount"
          type="number"
          className='border border-gray-300 rounded-lg p-2 w-full'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full p-2 mt-4 text-white bg-blue-500 rounded-lg"
      >
        Submit
      </button>
    </form>
  );
};