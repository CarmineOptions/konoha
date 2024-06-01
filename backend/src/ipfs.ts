import { Request, Response } from "express";
import * as dotenv from "dotenv";
import { getStarknetId } from "./starknet";

dotenv.config();

interface Proposal {
  text: string;
  address: string;
}

const PINATA_JWT = process.env.PINATA_JWT || "";

const pinToIPFS = async (proposal: Proposal) => {
  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";

  const blob = new Blob([JSON.stringify(proposal, null, 2)], {
    type: "application/json"
  });

  const file = new File([blob], `${proposal.address}.txt`);
  const data = new FormData();
  data.append("file", file);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PINATA_JWT}`
    },
    body: data
  });

  return await response.json();
};

export const submitProposal = async (req: Request, res: Response) => {
  const { text, address } = req.body;

  if (!text || !address) {
    return res.status(400).json({ error: "Missing text or address" });
  }

  const proposalData: Proposal = {
    text,
    address
  };

  // const starknetId = await getStarknetId(address);

  // if (starknetId) {
  //   proposalData.starknet_id = starknetId;
  // }

  try {
    const pin = await pinToIPFS(proposalData);

    return res.json({ ipfs_hash: pin.IpfsHash });
  } catch (error) {
    console.error("Error uploading to IPFS", error);
    return res.status(500).json({ error: "Error uploading to IPFS" });
  }
};
