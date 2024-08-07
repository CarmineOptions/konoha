import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAccount } from "@starknet-react/core";
import { CONTRACT_ADDR, formatAddress } from "../lib/config";
import { CallData, Contract } from "starknet";

import { submitCommentApi } from "../api/apiService";
import { abi } from "../lib/abi";
export default function NewcommentCommentForm({
  setIsModalOpen,
  propId,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  propId: string;
}) {
  const { isConnected, address, account } = useAccount();
  const [comment, setComment] = React.useState<string>("");
  const [ipfsHash, setIpfsHash] = useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const konoha_contract = new Contract(abi, CONTRACT_ADDR, account);
  async function submitComment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isConnected) {
      toast.error("Please connect your wallet");
      return;
    }

    if (!comment) {
      toast.error("Please fill out all fields");
      return;
    }

    const payload = {
      text: comment,
      address: formatAddress(address),
    };

    setIsLoading(true);
    try {
      const result = await submitCommentApi(payload);
      if (result) {
        setIpfsHash(result?.ipfs_hash);
      }
    } catch (error) {
      toast.error("Something went wrong");
      setIsModalOpen(false);
      console.error(error);
    }
  }

  useEffect(() => {
    const updateProposal = async () => {
      try {
        await konoha_contract.add_comment(
          CallData.compile([propId.toString(), ipfsHash.toString()])
        );
        toast.success("Proposal updated successfully");
        setIsModalOpen(false);
      } catch (error) {
        toast.error("Unable to update proposal with comment");
        console.error(error);
        setIsModalOpen(false);
      }
    };

    if (ipfsHash.length > 0) {
      updateProposal();
    }
  }, [ipfsHash]);

  return (
    <div className="w-[35rem]">
      <form onSubmit={submitComment}>
        <label htmlFor="#comment">Comment</label>
        <input
          id="#comment"
          type="text"
          placeholder="Leave a comment here"
          className="w-full p-2 mb-2 border rounded-lg border-slate-300"
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          type="submit"
          className="w-full p-2 mt-4 text-white bg-blue-500 rounded-lg"
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
