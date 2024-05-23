import { mainnet } from "@starknet-react/chains";
import {
    StarknetConfig,
    argent,
    braavos,
    // publicProvider,
    useInjectedConnectors,
    jsonRpcProvider,
    // publicProvider,
} from "@starknet-react/core";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./globals.css";
import { RpcProviderOptions } from "starknet";
import { Toaster } from "react-hot-toast";
// import { apiUrl } from "./api";

function Root({ children }: { children: React.ReactNode }) {
    const chains = [mainnet];

    // const SN_SEPOLIA_CHAINID =
    //     "0x534e5f5345504f4c4941" as constants.StarknetChainId;

    const testnetOptions: RpcProviderOptions = {
        // nodeUrl: apiUrl("call", { network: "testnet" }),
        nodeUrl: "https://free-rpc.nethermind.io/sepolia-juno",
        // chainId: SN_SEPOLIA_CHAINID,
    };

    const provider = jsonRpcProvider({
        rpc: () => testnetOptions,
    });
    // const provider = publicProvider();
    const { connectors } = useInjectedConnectors({
        // Show these connectors if the user has no connector installed.
        recommended: [argent(), braavos()],
        // Randomize the order of the connectors.
        order: "random",
    });

    return (
        <StarknetConfig
            autoConnect
            chains={chains}
            provider={provider}
            connectors={connectors}
        >
            {children}
        </StarknetConfig>
    );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    // <React.StrictMode>
    <Root>
        <div>
            <Toaster />
        </div>
        <App />
    </Root>
    // </React.StrictMode>
);
