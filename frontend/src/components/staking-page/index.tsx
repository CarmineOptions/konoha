import React, { useState } from "react";
import Breadcrumb from "../bread-crumb";
import { formatBalance } from "../../lib/erc20";
import { VOTING_TOKEN_CONTRACT } from "../../lib/config";
import { useTokenBalances } from "../../lib/useTokenBalances";
import { useAccount } from "@starknet-react/core";
import { StakeIcon } from "../../assets/icons/icons";
import { stakingTabs, stakingTokens } from "../../lib/constants";
import ProgressModal from "../modals/progress-modal";
import SuccessModal from "../modals/sucess-modal";

export default function StakingPage() {
  const { address } = useAccount();

  const [token, setToken] = useState<string>(stakingTokens[0].token);
  const [isProgress, setProgress] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);


  const tokens = [
    { name: "VOTING", address: VOTING_TOKEN_CONTRACT },
    { name: "FLOATING", address: VOTING_TOKEN_CONTRACT },
  ];
  const { balances, isLoading } = useTokenBalances(tokens, address);
  const [activeTab, setActiveTab] = useState<number>(0);

  const floatingBalance =
    balances.find((b) => b.name === "FLOATING")?.balance || "0";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToken(e.target.value);
  };

  return (
    <div className="w-full">
      <Breadcrumb page="Staking" route="/staking" />

      <div className="py-10">
        <div className="flex-grow md:text-[54px] font-default font-medium">
          Staking
        </div>
        <p className="font-inter  font-normal text-base text-black">
          Your staked tokens let you manage your voting power.
        </p>
      </div>

      <div className="flex  justify-center flex-col bg-[#F0EEDE] py-5 px-5 space-y-2 rounded-lg w-full">
        <div className="relative ">
          {isLoading ? (
            <div className="text-xs">Loading...</div>
          ) : (
            <div className="space-y-5">
              <p className="text-[#8E886A] font-inter text-[15px] font-normal">
                VOTING POWER
              </p>
              <div className="w-full grid grid-cols-2 items-center  rounded-lg bg-transparent">
                <div className="space-y-2">
                  <p className="text-[#8E886A] font-inter text-base font-normal">
                    Voting
                  </p>
                  <div className="flex gap-x-3 items-center">
                    <div className="w-6 h-6 ">
                      <img className="w-full h-full object-cover" src="/strk.png" alt="alt" />
                    </div>
                    <p className="font-inter text-black text-[24px]  font-medium">
                      {formatBalance(floatingBalance[1])}<span>STRK</span>
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[#8E886A] font-inter text-base font-normal">
                    Floating
                  </p>
                  <div>
                    <div className="flex gap-x-3 items-center">
                    <div className="w-6 h-6 ">
                      <img className="w-full h-full object-cover" src="/strk.png" alt="alt" />
                    </div>
                      <p className="font-inter text-black text-[24px]  font-medium">
                        {formatBalance(floatingBalance[0])}<span>STRK</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* {balances.map((token, index) => (
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
              ))} */}
              </div>
              <div className="absolute right-0 bottom-0">
                <img
                  src="/coin.png"
                  className="w-full h-full object-contain"
                  alt="wallet"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="py-10">
        <div className="bg-white w-fit px-5 flex items-center  gap-x-5 h-[50px]">
          {stakingTabs.map((tab, i) => (
            <div
              onClick={() => setActiveTab(i)}
              className={`cursor-pointer flex items-center justify-center gap-x-2 ${
                activeTab == i ? "bg-[#FDE8C1] px-2" : ""
              }`}
              key={i}
            >
              <div className="rounded-full h-4 w-4 bg-[#403C30]">
                <StakeIcon />
              </div>
              <p className="font-inter text-base">{tab}</p>
            </div>
          ))}
        </div>

         <div className="py-5 space-y-2">
         <label htmlFor="payload" className="block font-inter text-[12px]">
            Amount
          </label>
          <div className="w-full flex items-center h-[51px] bg-transparent focus:outline-secondary border-[0.25px] px-3 py-5 border-[#837E69] rounded-[5px] placeholder:text-[#837E69] placeholder:text-[14px] font-inter font-medium">
            <input
              className="w-full bg-transparent outline-none"
              id="amount"
              type="text"
              placeholder="0.0 STRK"
              value=""
            />

            <select
              className="bg-[#F5F1D9] py-2 px-2 outline-none"
              id="options"
              value={token}
              onChange={handleChange}
            >
              <option value="" disabled>
                {token}
              </option>
              {stakingTokens.map(({ token }, i) => (
                <option key={i} value={token}>
                  {token}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-x-2 py-2">
            <p className="font-inter text-[14px] text-[#606060]">
              Available: <span>21.12 STRK</span>
            </p>
            <button className=" bg-[#101010] rounded px-2 py-[2px] text-white">
              MAX
            </button>
          </div>
         </div>

          <div className="flex items-center gap-x-4 py-4">
            <button
              type="button"
              onClick={() => setProgress(true)}
              className=" bg-secondary cursor-pointer text-sm text-white py-2 px-3"
            >
              Stake {token}
            </button>

            <button
              type="button"
              onClick={() => setIsSuccess(true)}
              className=" bg-secondary cursor-pointer text-sm text-white py-2 px-3"
            >
              Success {token}
            </button>
          </div>

       

        {isProgress && <ProgressModal type="unstaking" amount="8.179" token={token}  handleClose={() => setProgress(false)} />}

        {isSuccess && <SuccessModal type="Successfully unstaked" amount="8.179" token={token}  handleClose={() => setProgress(false)} />}

      </div>
    </div>
  );
}
