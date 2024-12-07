import React from "react";
import { formatBalance } from "../lib/erc20";
import { ETHLogo, STRKLogo } from "../assets/icons/icons";

interface TokenBalanceItem {
  name: string;
  balance: bigint;
}

interface TokenBalanceProps {
  balances: TokenBalanceItem[];
  title: string;
  isLoading: boolean;
}

export default function TokenBalance({
  balances,
  title,
  isLoading,
}: TokenBalanceProps) {
  return (
    <div className="flex justify-center flex-col bg-[#F0EEDE] py-5 px-5 space-y-2 rounded-lg w-full ">
      <p className="text-[15px] font-medium font-inter text-[#8E886A] capitalize">
        {title}
      </p>
      {isLoading ? (
        <div className="text-xs">Loading...</div>
      ) : (
        <div className="flex items-center">
          <div className="w-full grid grid-cols-2 items-center  rounded-lg bg-transparent">
            {balances.map((token, index) => (
              <div key={index} className="flex gap-x-4 items-center">
                <div className="">
                  {token.name == "ETH" ? <ETHLogo /> : <STRKLogo />}
                </div>
                <div className="flex justify-between items-center gap-20">
                  <p className="font-inter text-black text-[24px] font-medium">
                    {formatBalance(token.balance)} <span>{token.name}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <img
              src="/coin.png"
              className="w-full h-full object-contain"
              alt="wallet"
            />
          </div>
        </div>
      )}
    </div>
  );
}
