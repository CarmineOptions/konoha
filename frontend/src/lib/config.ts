export const CONTRACT_ADDR =
	// mainnet: "0x001405ab78ab6ec90fba09e6116f373cda53b0ba557789a4578d8c1ec374ba0f";
	"0x057dfabb5a506bfd1937062562a1adf45c7c4c62d0377ccfc59a0b42d7ab3212"; // sepolia with treasury
export const TOKEN_CONTRACT =
	"0x2b91dd683bc4bcae7a9c5d0cbeba0e8d62fa657742e4640f1e8163dc10e9bd7";

export const formatAddress = (addr: string) =>
	addr.length === 66
		? addr
		: addr.replace(/^0x/, "0x" + "0".repeat(66 - addr.length));

export const formatIpfsHash = (hash: string) => {
	return hash.replace(/,/g, "");
};
