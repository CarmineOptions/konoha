import { TREASURY_ADDRESS, ETH_ADDRESS, STRK_ADDRESS } from '../lib/config';
import React from "react";
import TokenBalance from './TokenBalance';
import { useTokenBalances } from "../lib/useTokenBalances";

export default function TreasuryStatus() {
  const tokens = [
    { name: "ETH", address: ETH_ADDRESS },
    { name: "STRK", address: STRK_ADDRESS },
  ];
  const { balances, isLoading } = useTokenBalances(tokens, TREASURY_ADDRESS);

  console.log(isLoading)

  return (
    <TokenBalance
      balances={balances}
      isLoading={false}
      title="TRESURY"
    />
  );
}