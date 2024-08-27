export const CONTRACT_ADDR =
	// mainnet: "0x001405ab78ab6ec90fba09e6116f373cda53b0ba557789a4578d8c1ec374ba0f";
	"0x02ba6e05d06a9e7398ae71c330b018415f93710c58e99fb04fa761f97712ec76"; // sepolia with treasury
export const VOTING_TOKEN_CONTRACT =
	"0x4ff1af47bb9659aa83bbd33e13c25e8fb1b5ecf8359320251f03e1440e8890a";
export const FLOATING_TOKEN_CONTRACT = "0x31868056874ad7629055ddd00eb0931cb92167851702abf6b441cb8ea02d02b";

export const formatAddress = (addr: string) =>
	addr.length === 66
		? addr
		: addr.replace(/^0x/, "0x" + "0".repeat(66 - addr.length));

export const formatIpfsHash = (hash: string) => {
	return hash.replace(/,/g, "");
};
