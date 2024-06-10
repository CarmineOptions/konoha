import { StarknetIdNavigator } from "starknetid.js";
import { RpcProvider, constants } from "starknet";
import * as dotenv from "dotenv";

dotenv.config();

const NODE_URL: string = process.env.NODE_URL || "";

export const getStarknetId = async (
  address: string
): Promise<string | null> => {
  const provider = new RpcProvider({
    nodeUrl: NODE_URL,
    chainId: constants.StarknetChainId.SN_MAIN
  });

  const starknetIdNavigator = new StarknetIdNavigator(
    provider,
    constants.StarknetChainId.SN_MAIN
  );

  let domain;
  let id;
  try {
    domain = await starknetIdNavigator.getStarkName(address);
    id = await starknetIdNavigator.getStarknetId(domain);
  } catch {
    return null;
  }

  return id;
};
