export const CONTRACT_ADDR =
	// mainnet: "0x001405ab78ab6ec90fba09e6116f373cda53b0ba557789a4578d8c1ec374ba0f";
	"0x02ba6e05d06a9e7398ae71c330b018415f93710c58e99fb04fa761f97712ec76"; // sepolia with treasury
export const VOTING_TOKEN_CONTRACT =
	"0x4ff1af47bb9659aa83bbd33e13c25e8fb1b5ecf8359320251f03e1440e8890a";
export const FLOATING_TOKEN_CONTRACT = "0x31868056874ad7629055ddd00eb0931cb92167851702abf6b441cb8ea02d02b";
export const TREASURY_ADDRESS = "0x072c5c218a1ecfdd8ba10ef9b1b55af4994f2cad2210d14270ff9824fadabd70";

export const formatAddress = (addr: string) =>
	addr.length === 66
		? addr
		: addr.replace(/^0x/, "0x" + "0".repeat(66 - addr.length));

export const formatIpfsHash = (hash: string) => {
	return hash.replace(/,/g, "");
};

export const BASE_API_URL = "https://konoha.vote/discussion-api/api/"
export const NETWORK: string = "sepolia";

export const ETH_ADDRESS = "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"
export const USDC_ADDRESS = "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8"
export const BTC_ADDRESS = "0x03fe2b97c1fd336e750087d68b9b867997fd64a2661ff3ca5a7c771641e8e7ac"
export const STRK_ADDRESS = "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d"