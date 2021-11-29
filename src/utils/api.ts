import type { Near, WalletConnection, Contract } from 'near-api-esm'
import type { NearConfig } from './config'

export const fromNear = (amount: string): number => parseFloat(amount.slice(0, -20) || '0') / 10000
export const toYoctoNear = (amount: number): string => (amount * 10e8) + '000000000000000' || '0'

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

  async getUser(): Promise<{ id: string, balance: string} | null> {
    const accountId = await this.walletConnection.getAccountId()
    if (!accountId) return null
    const userAccount = await this.near.account(accountId)
    const balance = (await userAccount.getAccountBalance()).total
    return {
      id: accountId,
      balance: fromNear(balance).toFixed(2)
    }
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