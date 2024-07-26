export const CONTRACT_ADDR ="0x03a71a6e71f77fce28191f7ec4ea5f134a73ea0130033af3d6989816b230023e";
export const TOKEN_CONTRACT = "0x2b91dd683bc4bcae7a9c5d0cbeba0e8d62fa657742e4640f1e8163dc10e9bd7";

export const formatAddressBravoos = (addr: string) => {
    return addr.replace(/^0x/, "0x0");
};

export const formatAddressArgent = (addr: string) => {
    return addr.replace(/^0x/, "0x00");
};



export const formatIpfsHash = (hash: string) => {
    return hash.replace(/,/g, ''); 
}

