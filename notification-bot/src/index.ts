import { StreamClient } from "@apibara/protocol";
import {
  Filter,
  StarkNetCursor,
  v1alpha2,
  FieldElement,
  EventFilter,
} from "@apibara/starknet";

import { RpcProvider, constants } from "starknet";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as toml from "toml";

function getConfig() {
  dotenv.config();

  const configPath = process.env.CONFIG_PATH || 'config.toml';
  const config = toml.parse(fs.readFileSync(configPath, 'utf-8'));

  const BOT_API_KEY = config.telegram?.bot_api_key;
  const CHAT_ID = config.telegram?.chat_id;
  const CLIENT_URL = config.apibara?.url;
  const CLIENT_TOKEN = config.apibara?.token;
  const GOV_CONTRACT_ADDRESS = config.governance?.gov_contract_address;
  const configured_chain_name = config.starknet?.chain as ChainName;
  if (!BOT_API_KEY || !CHAT_ID || !CLIENT_URL || !CLIENT_TOKEN || !GOV_CONTRACT_ADDRESS || !configured_chain_name) {
    alert('required fields in configuration file not found')
    console.error('required fields in configuration file not found'); process.exit(1)
  }


  const SUPPORTED_CHAINS = {
    'sepolia': (constants.StarknetChainId.SN_SEPOLIA, constants.NetworkName.SN_SEPOLIA),
    'mainnet': (constants.StarknetChainId.SN_MAIN, constants.NetworkName.SN_MAIN)
  };
  type ChainName = keyof typeof SUPPORTED_CHAINS;
  if (!SUPPORTED_CHAINS[configured_chain_name]) {
    throw new Error('Invalid chain name in configuration file');
  }
  const CHAIN_ID = SUPPORTED_CHAINS[configured_chain_name][0];
  const NODE_URL = config.starknet?.nodeUrl ?? SUPPORTED_CHAINS[configured_chain_name][1];

  const PROPOSED_EVENT_SELECTOR = config.governance!.event_selector ?? "0x01b5f21c50bf3288fb310446824298a349f0ed9e28fb480cc9a4d54d034652e1";


  const result = {
    'BOT_API_KEY': BOT_API_KEY,
    'CHAT_ID': CHAT_ID,
    'CLIENT_URL': CLIENT_URL,
    'CLIENT_TOKEN': CLIENT_TOKEN,
    'GOV_CONTRACT_ADDRESS': GOV_CONTRACT_ADDRESS,
    'NODE_URL': NODE_URL,
    'CHAIN_ID': CHAIN_ID as constants.StarknetChainId, // typescript could be smarter... :/
    'PROPOSED_EVENT_SELECTOR': PROPOSED_EVENT_SELECTOR
  }

  return result;
}

const conf = getConfig();


/**
 * Initializes the StreamClient with configuration loaded from environment variables.
 * @returns {StreamClient} Configured StreamClient instance for connecting to Apibara.
 */
function initializeStreamClient() {
  return new StreamClient({
    url: conf.CLIENT_URL,
    token: conf.CLIENT_TOKEN,
    async onReconnect(err, retryCount) {
      console.log("reconnect", err, retryCount);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { reconnect: true };
    },
  });
}

/**
 * Initializes the event filter configuration for the Apibara client.
 * @returns {string} Encoded filter string used to specify which blockchain events to listen to.
 */
function initializeFilter() {
  const governance_contract_address = FieldElement.fromBigInt(conf.GOV_CONTRACT_ADDRESS);
  return Filter.create()
    .withHeader({ weak: true })
    .addEvent(new EventFilter().withFromAddress(governance_contract_address))
    .encode();
}

/**
 * Configures the Apibara client with a specific filter and block number.
 * @param {StreamClient} client The Apibara client instance to configure.
 * @param {string} filter The encoded filter specifying the events to listen for.
 * @param {number} block_number The blockchain block number from which to start listening.
 */
function configureClient(client: StreamClient, filter: Uint8Array, block_number: number) {
  client.configure({
    filter: filter,
    batchSize: 1,
    cursor: StarkNetCursor.createWithBlockNumber(block_number),
  });
}

/**
 * Main entry point for the event monitoring script.
 * Initializes the StreamClient and RpcProvider for connecting to the StarkNet blockchain.
 * Configures the Apibara client to listen for specific blockchain events and processes them accordingly.
 */
async function main() {
  try {
    // Apibara streaming
    const client = initializeStreamClient();

    const provider = new RpcProvider({
      nodeUrl: conf.NODE_URL,
      chainId: conf.CHAIN_ID,
    });

    const hashAndBlockNumber = await provider.getBlockLatestAccepted();
    const block_number = hashAndBlockNumber.block_number;

    const filter_test = initializeFilter();

    // Configure the apibara client
    configureClient(client, filter_test, block_number);
    await listenToMessages(client);

  } catch (error) {
    console.error("Initialization failed", error);
    process.exit(1);
  }
}

/**
 * Listens to blockchain events and handles each submit proposal event as they are received.
 * @param {StreamClient} client The Apibara client instance from which to listen for messages.
 */
async function listenToMessages(client: StreamClient) {
  for await (const message of client) {
    if (message.message === "data" && message.data?.data) {
      for (const data of message.data.data) {
        const block = v1alpha2.Block.decode(data);

        const { header, events, transactions } = block;

        if (!header || !transactions) {
          continue;
        }

        for (const event of events) {
          if (event.event && event.event.keys && event.event.data) {
            for (let evtkey of event.event!.keys) {
              let evtkey_hex = FieldElement.toHex(evtkey);
              if (evtkey_hex === conf.PROPOSED_EVENT_SELECTOR) {
                handleEventSubmitProposal(event.event);
              }
            }
          }
        }
      }
    }
  }
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    alert(error.message);
    process.exit(1);
  });

/**
 * Handles individual blockchain events, and notifies user for proposal submission events.
 * @param {v1alpha2.IBlockHeader} header The header of the blockchain block containing the event.
 * @param {v1alpha2.IEvent} event The event to process.
 */
async function handleEventSubmitProposal(
  event: v1alpha2.IEvent,
) {
  console.log("STARTING TO HANDLE PROPOSAL");
  const sender = event.fromAddress ? FieldElement.toHex(event.fromAddress) : null;

  if (!Array.isArray(event.data) || event.data.length < 3) {
    const message = `No sufficient data found in event from Sender: ${sender}`;
    console.log(message);
    alert(message);
    return;
  }

  const payload = FieldElement.toHex(event.data[1]);
  const to_upgrade = FieldElement.toBigInt(event.data[2]).toString();
  const prop_id = FieldElement.toBigInt(event.data[0]).toString();

  if (sender && payload && to_upgrade) {
    const message = `New proposal:
      - Sender: ${sender}
      - Payload: ${payload}
      - Proposal ID: ${prop_id}
      - To upgrade: ${to_upgrade}`;
    console.log(message);
    alert(message);
  } else {

  alert('aborting proposal handling due to missing data in event');
  
  }
}

/**
 * Sends a notification message via Telegram API.
 * @param {string} msg The message to send.
 */
async function alert(msg: string): Promise<void> {

  const url = new URL(`https://api.telegram.org/bot${conf.BOT_API_KEY}/sendMessage`);
  url.searchParams.append('chat_id', conf.CHAT_ID);
  url.searchParams.append('text', msg);

  try {
    const response = await fetch(url.toString());
    const text = await response.text();
    response.ok ? console.log("Notification sent to Telegram") : console.error(`Failed to send notifications to Telegram.Status ${response.status}, response ${text}`);
  } catch (e) {
    console.error("Failed to send notifications to Telegram", e);
  }
}

