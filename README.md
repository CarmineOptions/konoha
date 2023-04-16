This is a rewrite of [Carmine Governance contracts](https://github.com/CarmineOptions/carmine-protocol/tree/master/contracts/governance) to Cairo 1.0, while also making them generic and useful for the rest of the community.

This first version attempts to preserve interface- and storage-compatibility with Cairo 0 code for a seamless upgrade, which is why it often doesn't use the correct data types or all the features offered by Cairo 1.0.

## Setup

Run this in a Devcontainer or on Codespaces. Cairo 1.0 and Scarbcomes installed.

Install [vscode-cairo](https://github.com/starkware-libs/cairo/tree/main/vscode-cairo) , run the `npm install` and `vsce package` on your local machine and then only find the Extension in your Extension sidebar and select Install in Devcontainer.

### Useful links

[C1.0 docs](https://cairo-lang.org/docs/v1.0/index.html)

[StarkNet docs](https://docs.starknet.io/documentation/)
