import { StreamClient } from "@apibara/protocol";
import {
  Filter,
  StarkNetCursor,
  v1alpha2,
  FieldElement,
  EventFilter,
  FilterBuilder,
} from "@apibara/starknet";

import { RpcProvider, constants, number, provider, uint256 } from "starknet";
import { formatUnits } from "ethers";
import * as dotenv from "dotenv";
import { BlockNumber } from "starknet";
import * as fs from "fs";
import * as toml from "toml";
import { Logger } from 'logger';
dotenv.config();

const configPath = process.env.CONFIG_PATH || 'config.toml';
const config = toml.parse(fs.readFileSync(configPath, 'utf-8'));

const BOT_API_KEY = config.telegram?.bot_api_key;
const CHATID = config.telegram?.chat_id;
const CLIENT_URL = config.apibara?.url;
const CLIENT_TOKEN = config.apibara?.token;
const GOV_CONTRACT_ADDRESS = config.governance?.gov_contract_address;
const PROPOSAL_HASH = "0x01b5f21c50bf3288fb310446824298a349f0ed9e28fb480cc9a4d54d034652e1"


/**
 * Initializes the StreamClient with configuration loaded from environment variables.
 * @returns {StreamClient} Configured StreamClient instance for connecting to Apibara.
 */
function initializeStreamClient() {
  return new StreamClient({
    url: CLIENT_URL,
    token: CLIENT_TOKEN,
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
  const governance_contract_address = FieldElement.fromBigInt(BigInt(GOV_CONTRACT_ADDRESS));
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
      nodeUrl: constants.NetworkName.SN_SEPOLIA,
      chainId: constants.StarknetChainId.SN_SEPOLIA,
    });

    const hashAndBlockNumber = await provider.getBlockLatestAccepted();
    const block_number = hashAndBlockNumber.block_number;

    //Initialize the filter
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
 * Listens to blockchain events and handles each submit proposel event as they are received.
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
          console.log(event.event)
          if (event.event && event.event.keys && event.event.data) {
            for (let evtkey of event.event!.keys) {
              let evtkey_hex = FieldElement.toHex(evtkey);

              let submit_proposal_hash = PROPOSAL_HASH;
              let isSame = evtkey_hex === submit_proposal_hash;

              if (isSame) {
                handleEventSubmitProposal(header, event.event);
              }
            }
          }
          break;
        }
      }
    }
  }
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

/**
 * Converts a hexadecimal string to a decimal string.
 * @param {string | number} hex The hexadecimal string or number to convert.
 * @returns {string} The decimal string representation of the hex input.
 */
function hexToDecimalString(hex: string | number): string {
  const hexString = hex.toString().startsWith('0x') ? hex.toString().substring(2) : hex.toString();

  const decimalNumber = parseInt(hexString, 16);

  return decimalNumber.toString();
}

/**
 * Handles individual blockchain events, and notifies user for proposal submission events.
 * @param {v1alpha2.IBlockHeader} header The header of the blockchain block containing the event.
 * @param {v1alpha2.IEvent} event The event to process.
 */
async function handleEventSubmitProposal(
  header: v1alpha2.IBlockHeader,
  event: v1alpha2.IEvent,
) {
  console.log("STARTING TO HANDLE PROPOSAL");

  console.log(event);

  const sender = event.fromAddress ? FieldElement.toHex(event.fromAddress) : null;
  const payload = event.data ? FieldElement.toHex(event.data[1]) : null;
  const to_upgrade_hex = event.data ? FieldElement.toHex(event.data[2]) : null;
  const prop_id_hex = event.data ? FieldElement.toHex(event.data[0]) : null;

  const to_upgrade = to_upgrade_hex ? hexToDecimalString(to_upgrade_hex) : null;
  const prop_id = prop_id_hex ? hexToDecimalString(prop_id_hex) : null;

  if (sender && payload && to_upgrade) {
    const message = `New proposal:
      - Sender: ${sender}
      - Payload: ${payload}
      - Proposal ID: ${prop_id}
      - To upgrade: ${to_upgrade}`;
    console.log(message);
    alert(message);
  }

  return null;
}

/**
 * Sends a notification message via Telegram API.
 * @param {string} msg The message to send.
 */
async function alert(msg: string): Promise<void> {
  const chatId = CHATID;

  const url = new URL(`https://api.telegram.org/bot${BOT_API_KEY}/sendMessage`);
  url.searchParams.append('chat_id', chatId);
  url.searchParams.append('text', msg);

  try {
    const response = await fetch(url.toString());
    const text = await response.text();

  } catch (e) {
    console.error("Failed to send notifications to Telegram", e);
  }
}

