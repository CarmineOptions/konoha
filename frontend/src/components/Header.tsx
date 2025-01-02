import { useAccount, useDisconnect } from "@starknet-react/core";
import React from "react";
import ConnectModal from "./starknet/ConnectModal";
import { Logo } from "../assets/icons/icons";
import { Link } from "react-router-dom";

export default function Header() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div className="w-full fixed top-0 bg-primary flex flex-col items-center justify-center">
      <div className="w-full md:max-w-[50rem]">
        <div className="w-full flex flex-row items-center justify-between p-2 px-4  border ">
          <Link to="/">
            <div className="flex flex-row items-center flex-grow gap-2 text-xl">
              <Logo />
            </div>
          </Link>
          {address ? (
            <div
              onClick={() => disconnect()}
              className="flex text-white items-end px-6 py-2 rounded-md bg-black"
            >
              <p className=" font-inter text-[15px] font-semibold">{`${address.slice(
                0,
                6
              )}...${address.slice(-4)}`}</p>
            </div>
          ) : (
            <ConnectModal />
          )}
        </div>
      </div>
    </div>
  );
}
