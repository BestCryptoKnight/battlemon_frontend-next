export const getConfig = (url: string): NearConfig => {
  const env = url.includes(':30') ? 'development' : 'production';
  switch (env) {
    case 'production':
      return {
        networkId: 'testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
        explorerUrl: 'https://explorer.testnet.near.org',
        nftContract: 'dev-1637164324288-46265801137064',
        marketContract: 'market.dev-1637164324288-46265801137064'
      }
    case 'development':
    default:
      return {
        networkId: 'testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
        explorerUrl: 'https://explorer.testnet.near.org',
        nftContract: 'dev-1637164324288-46265801137064',
        marketContract: 'market.dev-1637164324288-46265801137064'
      }
  }
}

export interface NearConfig {
  networkId: string,
  nodeUrl: string,
  nftContract: string,
  marketContract: string
  walletUrl: string,
  helperUrl: string,
  explorerUrl: string
}