export interface INearConfig {
  networkId: string,
  nodeUrl: string,
  contractName: string,
  marketName: string
  walletUrl: string,
  helperUrl: string,
  explorerUrl: string
}

export const config = getConfig()

function getConfig(): INearConfig {
  const env = process.env.REACT_APP_ENVIRONMENT || 'development';
  switch (env) {
    case 'production':
    case 'mainnet':
      return {
        networkId: 'testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
        explorerUrl: 'https://explorer.testnet.near.org',
        contractName: 'dev-1637164324288-46265801137064',
        marketName: 'market.dev-1637164324288-46265801137064'
      }
    case 'development':
    case 'testnet':
    default:
      return {
        networkId: 'testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
        explorerUrl: 'https://explorer.testnet.near.org',
        contractName: 'dev-1637164324288-46265801137064',
        marketName: 'market.dev-1637164324288-46265801137064'
      }
  }
}


