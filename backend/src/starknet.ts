import { StarknetIdNavigator } from "starknetid.js";
import {RpcProvider, constants, starknetId} from "starknet";
import * as dotenv from "dotenv";

dotenv.config();

const NODE_URL: string = process.env.NODE_URL || "";
const CHAIN_ID: string = process.env.NETWORK === 'mainnet'
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

export const getVestingEvents = async (address: string) => {
  try {
    const eventFilter = {
      from_block: { block_number: 0 },
      chunk_size: 1000,
      address: address,
      key: ['Vesting'],
    };

    const events = await provider.getEvents(eventFilter);

    // Check if events are empty and return an empty array
    if (!events.events || events.events.length === 0) {
      return [];
    }

    const now = Math.floor(Date.now() / 1000); // Get current timestamp in seconds

    const results = events.events.reduce((acc: any[], event: any) => {
      try {
        // VEST: {grantee, timestamp, amount}
        const grantee = event.data[0];         // Grantee (index 0)
        const timestamp = parseInt(event.data[1]);  // Timestamp (index 1)
        const amount = parseInt(event.data[2]);     // Amount (index 2)

        // Processing based on the timestamp
        if (timestamp < now && amount) {
          acc.push({
            amount: amount,
            timestamp: timestamp,
            is_claimable: true
          });
        } else {
          acc.push({
            timestamp: timestamp,
            amount: amount,
            is_claimable: false
          });
        }
      } catch (error) {
        // Log the error and continue with the next event
        console.error('Error processing event, skipping this event:', error);
      }
      return acc;
    }, []);

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
