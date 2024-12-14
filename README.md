# 🏡 Konoha
## A toolkit for DAO-like governance on Starknet

Many projects on Starknet will need the same functionality: DAO-like governance, upgrades, token vesting, staking and airdrops,  treasury management, etc. On Ethereum, they can use adapt open-source solutions such as [Compound Governance](https://github.com/compound-finance/compound-protocol/tree/master/contracts/Governance). No such solution currently exists for Starknet (with the noble exception of [Ekubo governance](https://github.com/EkuboProtocol/governance/tree/main/src)).

Originally, it was a rewrite of [Carmine Governance contracts](https://github.com/CarmineOptions/carmine-protocol/tree/master/contracts/governance) to Cairo 1.0, while also making them generic and useful for the rest of the community.

Currently, this is being developed mainly with community-wide use in mind.

## Interested in using Konoha?

Reach out to us via [Telegram](https://t.me/+_BpaFo4iarszZmQ0)

## Contributing

See [CONTRIBUTING.md](docs/src/CONTRIBUTING.md) for contributor guidelines

We're rewarding contributors with fiat and STRK tokens through [OnlyDust](https://app.onlydust.com/p/konoha).

## Frontend

A demo frontend accessing a deployment on Sepolia is available at https://konoha.vote/

## Proposal notification service

A Telegram bot sending notifications when a new proposal appears is operated by Carmine Finance for everyone, ping us on Telegram for access.

## Development setup

Run this in a Devcontainer or on Codespaces in VSCode. Cairo, Scarb and the Cairo extension comes installed.

### Useful links

[C1.0 docs](https://www.cairo-lang.org/)

[StarkNet docs](https://docs.starknet.io/documentation/)
