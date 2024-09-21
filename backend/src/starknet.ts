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

  try {
    const eventFilter = {
      from_block: { block_number: START_BLOCK },
      chunk_size: 100,
      address: contract,
      keys: [[hash.getSelectorFromName('VestingEvent')]],
    };

    const events = await provider.getEvents(eventFilter);

    if (!events.events || events.events.length === 0) {
      console.log(`No events found for contract: ${contract} and address: ${address}`);
      return [];
    }

    const now = Math.floor(Date.now() / 1000); // Current timestamp in seconds

    const results = events.events.reduce((acc: any[], event: any) => {
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
              is_claimable: now >= timestamp,
              is_claimed: false,
            });
          } else if (isVested) {
            acc.push({
              amount: amount,
              is_claimable: false,
              is_claimed: true,
            });
          }
        }
      } catch (error) {
        console.error('Error processing event, skipping this event:', error);
      }
      return acc;
    }, []);

    // Cache the result for future requests
    cache.set(cacheKey, results);

    return results;
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
