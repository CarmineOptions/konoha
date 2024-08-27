import { TREASURY_ADDRESS, ETH_ADDRESS, STRK_ADDRESS } from '../lib/config';
import React from "react";
import TokenBalance from './TokenBalance';

export default function TreasuryStatus() {
  const tokens = [
    { name: "ETH", address: ETH_ADDRESS },
    { name: "STRK", address: STRK_ADDRESS },
  ];

  return (
    <TokenBalance
      tokens={tokens}
      accountAddress={TREASURY_ADDRESS}
      title="Treasury status"
    />
  );
}