import { StarknetIdNavigator } from "starknetid.js";
import { RpcProvider, constants, hash } from "starknet";
import * as dotenv from "dotenv";
import { getRawVestingEvents } from "./events";

dotenv.config();

const STARKNET_RPC: string = process.env.STARKNET_RPC || "";
const START_BLOCK: number = process.env.NETWORK === 'mainnet' ? 720000 : 196000; // Started block number before vesting added
const CHAIN_ID: constants.StarknetChainId = process.env.NETWORK === 'mainnet'
  ? constants.StarknetChainId.SN_MAIN
  : constants.StarknetChainId.SN_SEPOLIA;

const provider = new RpcProvider({
  nodeUrl: STARKNET_RPC,
  chainId: CHAIN_ID,
});

const starknetIdNavigator = new StarknetIdNavigator(
  provider,
  CHAIN_ID,
);


interface VestingEvent {
  amount: number;         // The amount vested
  claimable_at: number | null;   // The timestamp when the amount becomes claimable
  is_claimable: boolean;  // Whether the amount is claimable at the current time
  is_claimed: boolean;    // Whether the amount has already been claimed
}

export const getVestingEvents = async (contract: string, address: string): Promise<any> => {
  const vesting_milestone_add_selector = hash.getSelectorFromName('VestingMilestoneAdded');
  const vested_selector = hash.getSelectorFromName('Vested');

  const rawEvents = await getRawVestingEvents(contract, provider, START_BLOCK);

  try {
    const events = rawEvents.reduce((acc: VestingEvent[], event: any) => {
      try {
        const grantee = event.data[0]; // Grantee (index 0)
        const timestamp = Number(BigInt(event.data[1])); // Timestamp (index 1)
        let amount = Number(BigInt(event.data[2])); // Amount as BigInt (index 2)

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
              is_claimable: Date.now() >= timestamp,
              is_claimed: false,
            });
          } else if (isVested) {
            acc.push({
              amount: amount,
              claimable_at: timestamp,
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

    // Create a set of claimable_at values from vested events
    const vestedClaimableAts = new Set(
        events.filter(e => e.is_claimed).map(e => e.claimable_at)
    );

    // Filter events, removing is_claimable if there's a matching vested event with the same claimable_at
    const filteredEvents = events.filter(event =>
        !event.is_claimable || !vestedClaimableAts.has(event.claimable_at)
    );

    // Sort the filtered events by claimable_at in ascending order
    const sortedEvents = filteredEvents.sort((a, b) => (a.claimable_at || 0) - (b.claimable_at || 0));

    return sortedEvents;

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
