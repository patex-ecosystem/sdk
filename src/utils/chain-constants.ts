import {
  predeploys,
  getDeployedContractDefinition,
} from '@eth-patex/contracts'
import { predeploys as bedrockPredeploys } from '@eth-patex/contracts-bedrock'

import {
  L1ChainID,
  L2ChainID,
  OEContractsLike,
  OEL1ContractsLike,
  OEL2ContractsLike,
  BridgeAdapterData,
} from '../interfaces'
import { StandardBridgeAdapter, DAIBridgeAdapter } from '../adapters'

export const DEPOSIT_CONFIRMATION_BLOCKS: {
  [ChainID in L2ChainID]: number
} = {
  [L2ChainID.PATEX_SEPOLIA]: 12 as const,
}

export const CHAIN_BLOCK_TIMES: {
  [ChainID in L1ChainID]: number
} = {
  [L1ChainID.MAINNET]: 13 as const,
  [L1ChainID.GOERLI]: 15 as const,
  [L1ChainID.SEPOLIA]: 15 as const,
  [L1ChainID.HARDHAT_LOCAL]: 1 as const,
  [L1ChainID.BEDROCK_LOCAL_DEVNET]: 15 as const,
}

/**
 * Full list of default L2 contract addresses.
 * TODO(tynes): migrate to predeploys from contracts-bedrock
 */
export const DEFAULT_L2_CONTRACT_ADDRESSES: OEL2ContractsLike = {
  L2CrossDomainMessenger: predeploys.L2CrossDomainMessenger,
  L2ToL1MessagePasser: predeploys.OVM_L2ToL1MessagePasser,
  L2StandardBridge: predeploys.L2StandardBridge,
  OVM_L1BlockNumber: predeploys.OVM_L1BlockNumber,
  OVM_L2ToL1MessagePasser: predeploys.OVM_L2ToL1MessagePasser,
  OVM_DeployerWhitelist: predeploys.OVM_DeployerWhitelist,
  OVM_ETH: predeploys.OVM_ETH,
  OVM_GasPriceOracle: predeploys.OVM_GasPriceOracle,
  OVM_SequencerFeeVault: predeploys.OVM_SequencerFeeVault,
  WETH: predeploys.WETH9,
  BedrockMessagePasser: bedrockPredeploys.L2ToL1MessagePasser,
}

/**
 * Loads the L1 contracts for a given network by the network name.
 *
 * @param network The name of the network to load the contracts for.
 * @returns The L1 contracts for the given network.
 */
const getL1ContractsByNetworkName = (network: string): OEL1ContractsLike => {
  const getDeployedAddress = (name: string) => {
    return getDeployedContractDefinition(name, network).address
  }

  return {
    AddressManager: getDeployedAddress('Lib_AddressManager'),
    L1CrossDomainMessenger: getDeployedAddress(
      'Proxy__OVM_L1CrossDomainMessenger'
    ),
    L1StandardBridge: getDeployedAddress('Proxy__OVM_L1StandardBridge'),
    StateCommitmentChain: getDeployedAddress('StateCommitmentChain'),
    CanonicalTransactionChain: getDeployedAddress('CanonicalTransactionChain'),
    BondManager: getDeployedAddress('BondManager'),
    PatexPortal: '0x5b47E1A08Ea6d985D6649300584e6722Ec4B1383' as const,
    L2OutputOracle: '0xE6Dfba0953616Bacab0c9A8ecb3a9BBa77FC15c0' as const,
  }
}

/**
 * Mapping of L1 chain IDs to the appropriate contract addresses for the OE deployments to the
 * given network. Simplifies the process of getting the correct contract addresses for a given
 * contract name.
 */
export const CONTRACT_ADDRESSES: {
  [ChainID in L2ChainID]: OEContractsLike
} = {
  [L2ChainID.PATEX_SEPOLIA]: {
    l1: {
      AddressManager: '0x17248a97cE50Cb271c945E10C571038e9c8DECEE' as const,
      L1CrossDomainMessenger:
        '0xBdBeA7f90c8E234a1edA6948d9F772D4c50f5bD5' as const,
      L1StandardBridge: '0xf0D8C28F3902Fac5b6C2dBc8574339bD84535a01' as const,
      StateCommitmentChain:
        '0x0000000000000000000000000000000000000000' as const,
      CanonicalTransactionChain:
        '0x0000000000000000000000000000000000000000' as const,
      BondManager: '0x0000000000000000000000000000000000000000' as const,
      PatexPortal: '0xD7400A9E3bd054264be87443939770dcf23E5b95' as const,
      L2OutputOracle: '0x77daF3f9aC6Cfe26ad8669EC95b8A4F6ab810E72' as const,
    },
    l2: DEFAULT_L2_CONTRACT_ADDRESSES,
  },
}

/**
 * Mapping of L1 chain IDs to the list of custom bridge addresses for each chain.
 */
export const BRIDGE_ADAPTER_DATA: {
  [ChainID in L2ChainID]?: BridgeAdapterData
} = {}
