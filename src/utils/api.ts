import type { Near, WalletConnection, Contract } from 'near-api-esm'
import type { NearConfig } from './config'

class NearApi {
  readonly config: NearConfig;
  readonly near: Near;
  readonly walletConnection: WalletConnection;
  readonly marketContract: MarketContract;

  constructor({ near, walletConnection, config, marketContract }: { 
    near: Near, 
    walletConnection: WalletConnection, 
    config: NearConfig,
    marketContract: MarketContract 
  }) {
    this.near = near;
    this.walletConnection = walletConnection
    this.config = config
    this.marketContract = marketContract
  }

  async getAccountId(): Promise<string> {
    return await this.walletConnection.getAccountId()
  }

  signIn(): void {
    this.walletConnection.requestSignIn({
      contractId: this.config.nftContract
    })
  }

  signOut(): void {
    this.walletConnection.signOut()
  }
}

export default NearApi

interface MarketContract extends Contract {
  buy?(params: { token_id: string }, gas: string, amount: string): void
}