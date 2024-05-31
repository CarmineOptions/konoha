import { Request, Response } from "express";
import { createHelia, Helia } from "helia";
import { dagJson } from "@helia/dag-json";
import { getStarknetId } from "./starknet.js";

const PINATA_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmYjMxZmY2Ny0wNGZmLTQ2YWYtOTc1NC00MDZiNTQ5MDhlOWYiLCJlbWFpbCI6ImVqZW1iaW9jaGU1MEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMjQ1ZDhkMmExMjg1ZWM1YWZlNjAiLCJzY29wZWRLZXlTZWNyZXQiOiI3OWI1NWM3MzZkZjBkODI2MjNiOWMxZDBhMzkxMjNlOTljNjhiNjE0ZDgwZGI2ZWI5OGM0MzIzZWM3MzI1OWUzIiwiaWF0IjoxNzE3MTAxNjU2fQ.N3pHXlmJsN0HZpkHUp2RMYF49C90WmwzNBTSjLxNzNc";

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
