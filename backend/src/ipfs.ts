import { Request, Response } from 'express';
import { createHeliaHTTP } from '@helia/http';
import { getStarknetId } from './starknet';
import axios from 'axios';

const PINATA_API_KEY = 'your_api_key';
const PINATA_SECRET_API_KEY = 'your_secret_api_key';

const pinToPinata = async (ipfsHash: string) => {
  const url = "https://api.pinata.cloud/pinning/pinByHash";
  const headers = {
    "pinata_api_key": PINATA_API_KEY,
    "pinata_secret_api_key": PINATA_SECRET_API_KEY
  };
  const payload = {
    "hashToPin": ipfsHash
  };
  return axios.post(url, payload, { headers });
};

let helia: any;

export const initializeHelia = async () => {
  helia = await createHeliaHTTP();
};

export const submitProposal = async (req: Request, res: Response) => {
  const { text, address } = req.body;

  if (!text || !address) {
    return res.status(400).json({ error: 'Missing text or address' });
  }

  const starknetId = await getStarknetId(address);
  const proposalData: any = {
    text,
    address
  };

  if (starknetId) {
    proposalData.starknet_id = starknetId;
  }

  try {
    const buffer = Buffer.from(JSON.stringify(proposalData));
    const cid = await helia.add(buffer);
    const ipfsHash = cid.toString();

    // Asynchronously pin the hash
    pinToPinata(ipfsHash).catch(err => {
      console.error('Failed to pin to Pinata', err);
    });

    return res.json({ ipfs_hash: ipfsHash });
  } catch (error) {
    console.error('Error uploading to IPFS', error);
    return res.status(500).json({ error: 'Error uploading to IPFS' });
  }
};
