import type { Preview } from "@storybook/react";
import { argent, braavos, jsonRpcProvider, StarknetConfig, useInjectedConnectors } from "@starknet-react/core";
import { sepolia, Chain } from "@starknet-react/chains";
import React from "react";
import "../src/globals.css"


const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
    },
    options: {
      storySort: {
        order: ['Button', 'Dailog', 'ConnectModal', 'Header', 'Proposal', 'Comments']
      }
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },

    },

  },
  decorators: [
    (Story) => {
      const chains = [sepolia];
      function rpc(chain: Chain) {
        return {
          nodeUrl: `https://starknet-${chain.network}.public.blastapi.io/rpc/v0_7`
        }
      }
      const provider = jsonRpcProvider({ rpc });
      const { connectors } = useInjectedConnectors({
        recommended: [argent(), braavos()],
        order: "random",
      });
      return (

        <StarknetConfig
          autoConnect
          chains={chains}
          provider={provider}
          connectors={connectors}
        >
          <div className="h-[100vh] mt-10 flex flex-col items-center justify-center">
            {Story()}
          </div>

        </StarknetConfig>

      )
    }
  ],
};

export default preview;
