import { StarknetIdNavigator } from "starknetid.js";
import {RpcProvider, constants, hash} from "starknet";
import * as dotenv from "dotenv";

dotenv.config();

const NODE_URL: string = process.env.NODE_URL || "";
const START_BLOCK: number = process.env.NETWORK === 'mainnet' ? 720000 : 196000; // Started block number before vesting added
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

const cache = new Map<string, { amount: number; is_claimable: boolean, is_claimed: boolean }[]>();

export const getVestingEvents = async (contract: string, address: string): Promise<any> => {
  const vesting_milestone_add_selector = hash.getSelectorFromName('VestingMilestoneAdded');
  const vested_selector = hash.getSelectorFromName('Vested');

  // Cache key using both contract and address
  const cacheKey = `${contract}-${address}`;

  // Check if the result is already cached
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const now = Math.floor(Date.now() / 1000); // Current timestamp in seconds
  let fromBlock = START_BLOCK;
  const chunkSize = 100;
  let allEvents: any[] = [];

  try {
    while (true) {
      const eventFilter = {
        from_block: { block_number: fromBlock },
        chunk_size: chunkSize,
        address: contract,
        keys: [[hash.getSelectorFromName('VestingEvent')]],
      };

      const events = await provider.getEvents(eventFilter);

      if (!events.events || events.events.length === 0) {
        // Exit the loop if no more events are found
        break;
      }

      const newEvents = events.events.reduce((acc: any[], event: any) => {
        try {
          const grantee = event.data[0]; // Grantee (index 0)
          const timestamp = Number(BigInt(event.data[1]));  // Timestamp (index 1)
          let amount = Number(BigInt(event.data[2]));  // Amount as BigInt (index 2)

          // Apply scaling if amount > 0
          if (amount > 0) {
            amount = amount / (10 ** 18);
          }

          // Process only if the grantee matches the address
          if (grantee === address) {
            const isVestingMilestone = event.keys.includes(vesting_milestone_add_selector);
            const isVested = event.keys.includes(vested_selector);

            if (isVestingMilestone) {
              acc.push({
                amount: amount,
                claimable_at: timestamp,
                is_claimable: now >= timestamp,
                is_claimed: false,
              });
            } else if (isVested) {
              acc.push({
                amount: amount,
                is_claimable: false,
                claimable_at: null,
                is_claimed: true,
              });
            }
          }
        } catch (error) {
          console.error('Error processing event, skipping this event:', error);
        }
        return acc;
      }, []);

      // Add new events to the accumulated list
      allEvents = [...allEvents, ...newEvents];

      // Update `fromBlock` to the next block after the last fetched block
      const lastEventBlock = events.events[events.events.length - 1].block_number;
      fromBlock = lastEventBlock + 1; // Move to the next block

      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Cache the result for future requests
    cache.set(cacheKey, allEvents);

    return allEvents;
  } catch (error) {
    console.error('Error in getVestingEvents:', error);

    if (error instanceof Error) {
      throw new Error(`Error fetching events: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred while fetching events');
    }
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
