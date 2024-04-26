import { StreamClient } from "@apibara/protocol";
import {
  Filter,
  StarkNetCursor,
  v1alpha2,
  FieldElement,
} from "@apibara/starknet";

import { RpcProvider, constants, provider, uint256 } from "starknet";
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
const statusChatId = config.telegram?.status_chat_id;
const alertChatId = config.telegram?.alert_chat_id;

const tokensDecimals = [
  {
    //ETH
    ticker: "ETH",
    decimals: 18,
    address:
      "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
  },
  {
    //USDT
    ticker: "USDT",
    decimals: 6,
    address:
      "0x068f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
  },
  {
    //USDC
    ticker: "USDC",
    decimals: 6,
    address:
      "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
  },
  {
    //STRK
    ticker: "STRK",
    decimals: 18,
    address:
      "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
  },
];

async function main() {
  try {
    // Apibara streaming
    const client = new StreamClient({
      url: config.apibara.url,
      token: config.apibara.token,
      async onReconnect(err, retryCount) {
        console.log("reconnect", err, retryCount);
        // Sleep for 1 second before retrying.
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return { reconnect: true };
      },
    });

    const provider = new RpcProvider({
      nodeUrl: constants.NetworkName.SN_MAIN,
      chainId: constants.StarknetChainId.SN_MAIN,
    });

    
    const hashAndBlockNumber = await provider.getBlockLatestAccepted();
    const block_number = hashAndBlockNumber.block_number;
    // The address of governance deployment address 
    const key = FieldElement.fromBigInt(
      BigInt(
        config.starknet.gov_contract_address,
      ),
    );
    // The address of the ERC20 contract
    const address = FieldElement.fromBigInt(
      BigInt(
        config.starknet.ERC20,
      ),
    );

    //Initialize the filter
    const filter_test = Filter.create()
      .withHeader({ weak: false })
      .addEvent((ev) => ev.withFromAddress(address).withKeys([key]))
      .encode();

    // Configure the apibara client
    client.configure({
      filter: filter_test,
      batchSize: 1,
      cursor: StarkNetCursor.createWithBlockNumber(block_number),
    });

    // Start listening to messages
    for await (const message of client) {
      switch (message.message) {
        case "data": {
          if (!message.data?.data) {
            continue;
          }
          for (const data of message.data.data) {
            const block = v1alpha2.Block.decode(data);
            const { header, events, transactions } = block;
            console.log(header);
            console.log(events);
            console.log(transactions);
            if (!header || !transactions) {
              continue;
            }
            console.log("Block " + header.blockNumber);
            console.log("Events", events.length);

            for (const event of events) {
              console.log(event);
              if (event.event && event.receipt) {
                handleEventAvnuSwap(header, event.event, event.receipt);
              }
            }
          }
          break;
        }
        case "invalidate": {
          break;
        }
        case "heartbeat": {
          console.log("Received heartbeat");
          // alert("Ping from Apibara server", false);
          break;
        }
        default: {
          console.log("Unknown message", message);
          break;
        }
      }
    }
  } catch (error) {
    console.error("Initialization failed", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  const axios = require('axios'); // Ensure axios is required at the top of your script

  async function handleEventAvnuSwap(
    header: v1alpha2.IBlockHeader,
    event: v1alpha2.IEvent,
    receipt: v1alpha2.ITransactionReceipt,
  ) {
    console.log("STARTING TO HANDLE AVNUSWAP EVENT");
    
    // Ensure the event has data to process
    if (!event.data) return null;
  
    // Decode token and amount details
    const takerAddress = FieldElement.toHex(event.data[0]);
    const sellAddress = FieldElement.toHex(event.data[1]);
    const sellToken = tokensDecimals.find(token => token.address === sellAddress);
    const sellAddressDecimals = sellToken?.decimals;
  
    if (!sellAddressDecimals) return null; // Skip if sell token is not supported
  
    // Convert amounts using token decimal places
    const sellAmount = +formatUnits(
      uint256.uint256ToBN({
        low: FieldElement.toBigInt(event.data[2]),
        high: FieldElement.toBigInt(event.data[3]),
      }),
      sellAddressDecimals,
    );
  
    const buyAddress = FieldElement.toHex(event.data[4]);
    const buyToken = tokensDecimals.find(token => token.address === buyAddress);
    const buyAddressDecimals = buyToken?.decimals;
  
    if (!buyAddressDecimals) return null; // Skip if buy token is not supported
  
    const buyAmount = +formatUnits(
      uint256.uint256ToBN({
        low: FieldElement.toBigInt(event.data[5]),
        high: FieldElement.toBigInt(event.data[6]),
      }),
      buyAddressDecimals,
    );
  
    const beneficiary = FieldElement.toHex(event.data[7]);
  
    console.log("FINISHED HANDLING AVNUSWAP EVENT");
  
    // Construct the swap data and message for notification
    const message = `New swap on AvnuSwap:
      - Block: ${header.blockNumber}
      - Taker: ${takerAddress}
      - Sold ${sellAmount} ${sellToken?.ticker}
      - Bought ${buyAmount} ${buyToken?.ticker}
      - Beneficiary: ${beneficiary}`;
}

async function alert(msg: string, isAlert = false): Promise<void> {
  // Determine the appropriate chat ID based on whether it's an alert or a status message
  const chatId = isAlert ? alertChatId : statusChatId;
  // Create the URL and append query parameters for the GET request
  const url = new URL(`https://api.telegram.org/bot${BOT_API_KEY}/sendMessage`);
  url.searchParams.append('chat_id', chatId);
  url.searchParams.append('text', msg);

  try {
      // Perform the GET request without a body
      const response = await fetch(url.toString());
      const text = await response.text();
      console.log("Notifications sent to Telegram");
      console.log(text);
  } catch (e) {
      console.error("Failed to send notifications to Telegram", e);
  }
}

