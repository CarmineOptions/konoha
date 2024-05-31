import { StarknetIdNavigator } from "starknetid.js";
import { RpcProvider, constants } from "starknet";

export const getStarknetId = async (
  address: string
): Promise<string | null> => {
  const provider = new RpcProvider({
    nodeUrl: "your_mainnet_node_url",
  });

  const starknetIdNavigator = new StarknetIdNavigator(
    provider,
    constants.StarknetChainId.SN_MAIN
  );

  const domain = await provider.getStarkName(address);
  const id = await starknetIdNavigator.getStarknetId(domain);

  return id;
};
