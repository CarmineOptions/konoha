# FloatingToken

## Description
**FloatingToken** is a freely tradable ERC20 token designed to be used on the Starknet network. This token is part of the Konoha toolkit and is based on OpenZeppelin components.

## Key Features
* **Freely Tradable:** You can transfer this token between users without restrictions.
* **ERC20-Based:** Complies with the ERC20 standard, ensuring compatibility with various applications and tools that support this standard.
* **Simple Initialization:** Initialized with a fixed supply and assigned to a specific recipient.

## How to Use FloatingToken

Before using FloatingToken, make sure you have the following:

* **Knowledge of Starknet:** Basic familiarity with the Starknet network and how to deploy contracts on it.
* **Cairo and Starknet CLI:** Tools installed and configured to interact with Starknet.
* **Contract Address:** Address of the contract where the FloatingToken will be deployed.

## Steps to Deploy and Use FloatingToken

1. **Clone the Konoha Repository:**
```sh  
git clone https://github.com/CarmineOptions/konoha.git
cd konoha 
```


2. **Compile the Contract:**
Ensure you compile the contract to generate the necessary files for deployment.
```sh 
starknet-compile contracts/FloatingToken.cairo --output floating_token.json
```


3. **Deploy the Contract:**
Deploy the contract on the Starknet network with the initial token supply and the recipient's address.
```sh 
starknet deploy --contract floating_token.json --inputs <supply> <recipient_address>
```

4. **Initialize the Token:**
During deployment, the token will be automatically initialized with a name **("Konoha Freely Floating Token")** and a symbol **("KONOHA")**.


5. **Interact with the Token:**
Once deployed, you can interact with the contract using Starknet tools to perform standard ERC20 operations like transfers, balance inquiries, and more.

## Additional Notes
* **Compatibility:** This token can be integrated with other solutions on Starknet that support the ERC20 standard.
* **Konoha Requirements:** You do not need the entire Konoha framework to use FloatingToken, but it is part of the Konoha toolkit, making it easier to integrate with other Konoha components.
