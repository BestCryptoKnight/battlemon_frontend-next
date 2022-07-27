export const getConfig = (url: string): NearConfig => {
  const env = url.includes(':30') ? 'development' : 'production';
  const testnetContract = "dev-1639312006189-41768496072291"
  switch (env) {
    case 'production':
      return {
        networkId: 'testnet',
        headers: {},
        nodeUrl: 'https://rpc.testnet.near.org',
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
        explorerUrl: 'https://explorer.testnet.near.org',
        nftContract: testnetContract,
        marketContract: 'market.' + testnetContract
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
        nftContract: testnetContract,
        marketContract: 'market.' + testnetContract
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