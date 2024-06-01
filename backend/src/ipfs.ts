import { Request, Response } from "express";
import * as dotenv from "dotenv";
import { createHelia, Helia } from "helia";
import { dagJson } from "@helia/dag-json";
import { getStarknetId } from "./starknet";

dotenv.config();

const PINATA_JWT = process.env.PINATA_JWT || "";

const pinByCID = async (ipfsHash: string) => {
  const url = "https://api.pinata.cloud/pinning/pinByHash";

  const data = JSON.stringify({
    hashToPin: ipfsHash,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${PINATA_JWT}`,
    },
    body: data,
  });

  console.log(await response.json());
};

let helia: Helia;

export const submitProposal = async (req: Request, res: Response) => {
  const { text, address } = req.body;

  if (!text || !address) {
    return res.status(400).json({ error: "Missing text or address" });
  }

  const proposalData: any = {
    text,
    address,
  };

  // const starknetId = await getStarknetId(address);

  // if (starknetId) {
  //   proposalData.starknet_id = starknetId;
  // }

  try {
    helia = await createHelia();
    const d = dagJson(helia);
    const cid = await d.add(proposalData);
    const ipfsHash = cid.toString();

    // Asynchronously pin the hash
    pinByCID(ipfsHash).catch((err) => {
      console.error("Failed to pin", err);
    });

    return res.json({ ipfs_hash: ipfsHash });
  } catch (error) {
    console.error("Error uploading to IPFS", error);
    return res.status(500).json({ error: "Error uploading to IPFS" });
  }
};
