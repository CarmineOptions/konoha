# VotingToken

## Description
**VotingToken** is a locked ERC20 token specifically designed for voting functions within Konoha governance. Voting tokens are locked and cannot be freely transferred until they are unlocked following certain criteria or governance rules.

## Key Features
* **Voting Token:** Designed to be used in voting processes within governance.
* **Locked:** Tokens are locked and cannot be freely transferred.
* **ERC20-Based:** Complies with the ERC20 standard, ensuring compatibility with various tools that support this standard.

## How to Use VotingToken

Before using VotingToken, make sure you have the following:

* **Knowledge of Starknet:** Basic familiarity with the Starknet network and how to deploy contracts on it.
* **Cairo and Starknet CLI:** Tools installed and configured to interact with Starknet.
* **Contract Address:** Address of the contract where the VotingToken will be deployed.

## Steps to Deploy and Use VotingToken

1. **Clone the Konoha Repository:**
```sh  
git clone https://github.com/CarmineOptions/konoha.git
cd konoha 
```


2. **Compile the Contract:**
Ensure you compile the contract to generate the necessary files for deployment.
```sh 
starknet-compile contracts/VotingToken.cairo --output voting_token.json
```


3. **Deploy the Contract:**
Deploy the contract on the Starknet network with the initial token supply and the recipient's address.
```sh 
starknet deploy --contract voting_token.json --inputs <supply> <recipient_address>
```

4. **Initialize the Token:**
During deployment, the token will be automatically initialized with a name **("Konoha Voting Token")** and a symbol **("VOTE")**.


5. **Interact with the Token:**
Once deployed, you can interact with the contract using Starknet tools to perform standard ERC20 operations like balance inquiries.

## Additional Notes
* **Compatibility:** This token is specifically designed to integrate with Konoha governance.
* **Transfer Restrictions:** Transfer functions are disabled for this token, meaning it cannot be transferred until it is unlocked following Konoha governance rules.
* **Unlocking Rules:** Tokens may be subject to specific unlocking rules defined by Konoha governance.