import React, { useEffect, useState } from "react";
import CopyIcon from "../assets/icons/copy";
import { useContractRead } from "@starknet-react/core";
import { abi } from "../lib/abi";
import { fetchIpfsFile } from "../api/apiService";
import { CONTRACT_ADDR } from "../lib/config";
import { TEST_FILE } from "../constants/amm";
type CommentProps = {
  address: string;
  text: string;
  starknet_id: string;
};
export default function Comments() {
  const [comments, setComments] = useState<CommentProps>();
  const { data, isLoading } = useContractRead({
    functionName: "get_comment",
    args: [""],
    abi,
    address: CONTRACT_ADDR,
    watch: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchIpfsFile(TEST_FILE);
        if (result != null) {
          setComments(result);
        }
      } catch (e) {
        console.error("Error from IPFS:", e);
      }
    };

    fetchData();
  }, []);

  console.log(data);

  return isLoading ? (
    <div>loading.... </div>
  ) : (
    <div className="w-[35rem] pt-5">
      <div className="py-2">
        <div className="grid grid-cols-[1fr_3fr] gap-3 ">
          <p className="text-sm font-[400] ">Senders Address:</p>
          <div className="flex gap-2">
            <p className="font-[600]  text-sm">
              {comments?.address.slice(0, 20)}
            </p>
            <CopyIcon />
          </div>

          <p className="text-sm font-[400] ">Comment:</p>
          <p className="font-[600]  text-sm">{comments?.text}</p>

          <p className="text-sm font-[400">Token Balance:</p>
          <p className="font-[600]  text-sm">0</p>
        </div>
        <div className="border border-b-gray-200 mt-2" />
      </div>
    </div>
  );
}
