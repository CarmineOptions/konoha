export const CONTRACT_ADDR =
	"0x03a71a6e71f77fce28191f7ec4ea5f134a73ea0130033af3d6989816b230023e";
export const TOKEN_CONTRACT =
	"0x2b91dd683bc4bcae7a9c5d0cbeba0e8d62fa657742e4640f1e8163dc10e9bd7";

// export const formatAddress = (addr: string) => {
// 	if (addr.length === 66) return addr;
// 	return addr.padStart(66, "0");
// };

export const formatAddress = (addr: string) =>
	addr.length === 66
		? addr
		: addr.replace(/^0x/, "0x" + "0".repeat(66 - addr.length));

export const formatIpfsHash = (hash: string) => {
	return hash.replace(/,/g, "");
};
