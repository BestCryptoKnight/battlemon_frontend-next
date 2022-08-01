export const getConfig = (url: string): NearConfig => {
  const env = url.includes(':30') ? 'development' : 'production';
  switch (env) {
    case 'production':
      return {
        networkId: 'testnet',
        headers: {},
        nodeUrl: 'https://rpc.testnet.near.org',
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
        explorerUrl: 'https://explorer.testnet.near.org',
        nftContract: 'nft_contract.dev-20220727145116-77929438989174',
        marketContract: 'market_contract.dev-20220727145116-77929438989174'
      }
    case 'development':
    default:
      return {
        networkId: 'testnet',
        headers: {},
        nodeUrl: 'https://rpc.testnet.near.org',
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
        explorerUrl: 'https://explorer.testnet.near.org',
        nftContract: 'nft_contract.dev-20220727145116-77929438989174',
        marketContract: 'market_contract.dev-20220727145116-77929438989174'
      }
  }
}

export interface NearConfig {
  networkId: string,
  nodeUrl: string,
  headers: { [key: string]: string | number; },
  nftContract: string,
  marketContract: string
  walletUrl: string,
  helperUrl: string,
  explorerUrl: string
}