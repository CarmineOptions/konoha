import React, { useState } from "react";
import { ETH_ADDRESS, STRK_ADDRESS } from "../../lib/config";
import { toast } from "react-hot-toast";

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
      toast.error("Address must start with 0x");
      return;
    }

    const [wholePart, fractionalPart = ""] = amount.split(".");
    const amountWei = BigInt(
      wholePart + fractionalPart.padEnd(18, "0")
    ).toString();
    const calldata = [recipient, tok, amountWei];
    onSubmit(calldata);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="recipient" className="block font-inter text-[12px]">
          Recipient
        </label>
        <input
          id="recipient"
          className=" w-full h-[41px] bg-transparent focus:outline-secondary border-[0.25px] px-3 py-2 border-[#837E69] rounded-[5px] placeholder:text-[#837E69] placeholder:text-[14px] font-inter font-medium"
          type="text"
          placeholder="0x01214144141414"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="token" className="block font-inter text-[12px]">
          Token to distribute
        </label>
        <select
          id="token"
          className=" w-full h-[41px] bg-transparent focus:outline-secondary border-[0.25px] px-3 py-2 border-[#837E69] rounded-[5px] placeholder:text-[#837E69] placeholder:text-[14px] font-inter font-medium"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        >
          <option value="ETH">ETH</option>
          <option value="STRK">STRK</option>
        </select>
      </div>
      <div>
        <label htmlFor="amount" className="block font-inter text-[12px]">
          Amount
        </label>
        <input
          id="amount"
          type="number"
          className=" w-full h-[41px] bg-transparent focus:outline-secondary border-[0.25px] px-3 py-2 border-[#837E69] rounded-[5px] placeholder:text-[#837E69] placeholder:text-[14px] font-inter font-medium"
          value={amount}
          placeholder="128.21STRK"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-x-4 py-4">
        <button
          type="submit"
          disabled={true}
          className=" bg-secondary text-sm text-white py-2 px-3"
        >
          Submit Proposal
        </button>

        <button
          type="button"
          className=" bg-[#6C6C6C] text-sm text-white py-2 px-3"
        >
          Save Draft
        </button>
      </div>
    </form>
  );
};
