import { useAccount, useDisconnect } from "@starknet-react/core";
import React from "react";
import ConnectModal from "./starknet/ConnectModal";
import { Logo } from "../assets/icons/icons";

export default function Header() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div className="w-full fixed top-0 bg-primary flex flex-col items-center justify-center">
      <div className="w-full md:max-w-[50rem]">
        <div className="w-full flex flex-row items-center justify-between p-2 px-4  border ">
          <div className="flex flex-row items-center flex-grow gap-2 text-xl">
            <Logo />
          </div>
          {address ? (
            <div className="flex flex-col items-end px-6 py-2 rounded-md bg-zinc-100">
              <p className="font-semibold">{`${address.slice(
                0,
                6
              )}...${address.slice(-4)}`}</p>
              <p
                onClick={() => disconnect()}
                className="cursor-pointer text-black/50"
              >
                Disconnect
              </p>
            </div>
          ) : (
            <ConnectModal />
          )}
        </div>
      </div>
    </div>
  );
}
