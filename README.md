This is a rewrite of [Carmine Governance contracts](https://github.com/CarmineOptions/carmine-protocol/tree/master/contracts/governance) to Cairo 1.0, while also making them generic and useful for the rest of the community.

This first version attempts to preserve interface- and storage-compatibility with Cairo 0 code for a seamless upgrade, which is why it often doesn't use the correct data types or all the features offered by Cairo 1.0.

## Setup

Run this in a Devcontainer or on Codespaces in VSCode. Cairo, Scarb and the Cairo extension comes installed.


### Useful links

[C1.0 docs](https://cairo-lang.org/docs/v1.0/index.html)

[StarkNet docs](https://docs.starknet.io/documentation/)
