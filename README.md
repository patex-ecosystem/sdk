
# @eth-patex/sdk

The `@eth-patex/sdk` package provides a set of tools for interacting with Patex.

## Installation

```
npm install @eth-patex/sdk
```

## Docs

You can find auto-generated API documentation over at [sdk.patex.io](https://sdk.patex.io).

## Using the SDK

### CrossChainMessenger

The [`CrossChainMessenger`](https://github.com/patex-ecosystem/sdk/src/cross-chain-messenger.ts) class simplifies the process of moving assets and data between Ethereum and Patex.
You can use this class to, for example, initiate a withdrawal of ERC20 tokens from Patex back to Ethereum, accurately track when the withdrawal is ready to be finalized on Ethereum, and execute the finalization transaction after the challenge period has elapsed.
The `CrossChainMessenger` can handle deposits and withdrawals of ETH and any ERC20-compatible token.
Detailed API descriptions can be found at [sdk.patex.io](https://sdk.patex.io/classes/crosschainmessenger).
The `CrossChainMessenger` automatically connects to all relevant contracts so complex configuration is not necessary.

### L2Provider and related utilities

The Patex SDK includes [various utilities](https://github.com/patex-ecosystem/sdk/src/l2-provider.ts) for handling Patex's transaction fee model.
For instance, [`estimateTotalGasCost`](https://sdk.patex.io/modules.html#estimateTotalGasCost) will estimate the total cost (in wei) to send at transaction on Patex including both the L2 execution cost and the L1 data cost.
You can also use the [`asL2Provider`](https://sdk.patex.io/modules.html#asL2Provider) function to wrap an ethers Provider object into an `L2Provider` which will have all of these helper functions attached.

### Other utilities

The SDK contains other useful helper functions and constants.
For a complete list, refer to the auto-generated [SDK documentation](https://sdk.patex.io/)
