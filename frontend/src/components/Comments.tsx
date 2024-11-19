import React, { useEffect, useState } from "react";
import { useContractRead } from "@starknet-react/core";
import { abi } from "../lib/abi";
import { fetchIpfsFile } from "../api/apiService";
import { CONTRACT_ADDR, formatIpfsHash } from "../lib/config";
import CommentCard from "./CommentCard";
type CommentProps = {
  address: string;
  text: string;
  starknet_id: string;
}[];
type Props = {
  proposalId: string;
};
export default function Comments({ proposalId }: Props) {
  
  const [comments, setComments] = useState<CommentProps>([]);
  const { data, isLoading } = useContractRead({
    functionName: "get_comments",
    args: [proposalId.toString()],
    abi,
    address: CONTRACT_ADDR,
    watch: false,
    retry: false

  });



  useEffect(() => {
    const fetchData = async () => {
      try {
        if (Array.isArray(data)) {
          const ipfsFetchPromises = data.map((item: { ipfs_hash: string }) =>
            fetchIpfsFile(formatIpfsHash(item.ipfs_hash))
          );
          const ipfsResults = await Promise.all(ipfsFetchPromises);

          setComments(ipfsResults);
        }
      } catch (e) {
        console.error("Error fetching from IPFS:", e);
      }
    };

    fetchData();
  }, [data]);




  


  return isLoading ? (
    <div>loading.... </div>
  ) : (
    <div className="w-[35rem] pt-5">
      <div className="py-2">
        {comments.length > 0 ?
          comments.map(({ address, text }, i) => (
          <div key={i}>
            <CommentCard address={address} text={text} />
          </div>
          )): <div className="flex justify-center items-center"> <p className="text-sm font-extrabold ">No comments available </p> </div>}
      </div>
    </div>
  );
}
