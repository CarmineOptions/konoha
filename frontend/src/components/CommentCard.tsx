import { useContractRead } from '@starknet-react/core';
import React, { } from 'react';
import { VOTING_TOKEN_CONTRACT } from '../lib/config';
import { TokenABI } from '../lib/tokenContractABI';

interface CommentCardProps {
  address: string;
  text: string;

}
const CommentCard = ({ address, text }: CommentCardProps) => {

  const { data, isSuccess } = useContractRead({
    functionName: "balance_of",
    args: [address.toString()],
    abi: TokenABI,
    address: VOTING_TOKEN_CONTRACT,
    watch: false,
    retry: false
  });

  return (
    <div>
      <div className="grid grid-cols-[1fr_3fr] gap-3 ">
        <p className="text-sm font-[400] ">Senders Address:</p>
        <div className="flex items-center gap-2">
          <p className="font-[600]  text-sm">{address.slice(0, 20)}</p>

        </div>

        <p className="text-sm font-[400] ">Comment:</p>
        <p className="font-[600]  text-sm">{text}</p>

        <p className="text-sm font-[400]">Token Balance:</p>
        <p className="font-[600]  text-sm">{isSuccess && parseInt(data?.toString()) / 10 ** 18}</p>
      </div>
      <div className="border border-b-gray-200 mt-2" />
    </div>
  );
}

export default CommentCard;
