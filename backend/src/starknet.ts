import { StarknetIdNavigator } from "starknetid.js";
import {RpcProvider, constants, hash} from "starknet";
import * as dotenv from "dotenv";

dotenv.config();

const NODE_URL: string = process.env.NODE_URL || "";
const START_BLOCK: number = process.env.NETWORK === 'mainnet' ? 720000 : 177000; // Started block number before vesting added
const CHAIN_ID: constants.StarknetChainId = process.env.NETWORK === 'mainnet'
    ? constants.StarknetChainId.SN_MAIN
    : constants.StarknetChainId.SN_SEPOLIA;

const provider = new RpcProvider({
  nodeUrl: NODE_URL,
  chainId: CHAIN_ID,
});

const starknetIdNavigator = new StarknetIdNavigator(
    provider,
    CHAIN_ID,
);

const cache = new Map<string, any>();

export const getVestingEvents = async (address: string) => {

  // Check if the result is already cached
  if (cache.has(address)) {
    return cache.get(address);
  }

  try {
    const eventFilter = {
      from_block: { block_number: START_BLOCK },
      chunk_size: 100,
      address: address,
      keys: [[hash.getSelectorFromName('Vesting')]],
    };

    const events = await provider.getEvents(eventFilter);

    if (!events.events || events.events.length === 0) {
      return [];
    }

    const now = Math.floor(Date.now() / 1000); // Get current timestamp in seconds

    const results = events.events.reduce((acc: any[], event: any) => {
      try {
        const timestamp = parseInt(event.data[1]);  // Timestamp (index 1)
        const amount = parseInt(event.data[2]);     // Amount (index 2)

        if (timestamp < now && amount) {
          acc.push({
            amount: amount,
            timestamp: timestamp,
            is_claimable: true,
          });
        } else {
          acc.push({
            timestamp: timestamp,
            amount: amount,
            is_claimable: false,
          });
        }
      } catch (error) {
        console.error('Error processing event, skipping this event:', error);
      }
      return acc;
    }, []);

    // Store the result in the cache
    cache.set(address, results);

    return results;
  } catch (error) {
    console.error('Error in getVestingEvents:', error);
    throw new Error(`Error fetching events: ${error}`);
  }
};

export const getStarknetId = async (
    address: string
): Promise<string | null> => {
  try {
    const domain = await starknetIdNavigator.getStarkName(address);
    const id = await starknetIdNavigator.getStarknetId(domain);
    return id;
  } catch {
    return null;
  }
};
