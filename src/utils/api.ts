import type { Near, WalletConnection, Contract } from 'near-api-esm'
import type { NearConfig } from './config'

export const fromNear = (amount: string): number => parseFloat(amount.slice(0, -20) || '0') / 10000
export const toYoctoNear = (amount: number): string => (amount * 10e8) + '000000000000000' || '0'

class NearApi {
  readonly config: NearConfig;
  readonly near: Near;
  readonly walletConnection: WalletConnection;
  readonly marketContract: MarketContract;
  readonly nftContract: NftContract;

  constructor({ near, walletConnection, config, marketContract, nftContract }: {
    near: Near, 
    walletConnection: WalletConnection, 
    config: NearConfig,
    marketContract: NftContract,
    nftContract
  }) {
    this.near = near;
    this.walletConnection = walletConnection
    this.config = config
    this.marketContract = marketContract
    this.nftContract = nftContract
  }

  signIn(): void {
    this.walletConnection.requestSignIn({
      contractId: this.config.nftContract
    })
  }

  signOut(): void {
    this.walletConnection.signOut()
  }

  async getUser(): Promise<{ id: string | null, balance: string | null }> {
    const accountId = await this.walletConnection.getAccountId()
    if (!accountId) return {
      id: null,
      balance: null
    }
    const userAccount = await this.near.account(accountId)
    const balance = (await userAccount.getAccountBalance())
    return {
      id: accountId,
      balance: fromNear(balance.available).toFixed(2)
    }
  }

  async listNft(params: { limit?: number, from_index?: number }): Promise<any> {
    return await this.nftContract.nft_tokens(params)
  }

  async listAsks(): Promise<any> {
    return await this.marketContract.list_asks();
  }

  async nftInfo(token_id: string): Promise<any> {
    const nft = await this.nftContract.nft_token({ token_id: token_id })
    return { ...nft }
  }

  async buyNft(token_id: string, amount: number): Promise<void> {
    await this.marketContract.buy({ token_id }, '200000000000000', toYoctoNear(amount))
  }

  async listNftByAccount(account_id: string): Promise<any> {
    return await this.nftContract.nft_tokens_for_owner({ account_id })
  }

}

export default NearApi

interface MarketContract extends Contract {
  buy?(params: { token_id: string }, gas: string, amount: string): Promise<any>
  list_asks?(): Promise<any>
}

interface NftContract extends Contract {
  nft_approve?(params: { token_id: string, account_id: string, msg: { price: string } }, gas: string, amount: string): Promise<void>
  nft_token?(params: { token_id: string }): Promise<any>
  nft_tokens?(params: { from_index?: number, limit?: number }): Promise<any>
  nft_tokens_for_owner?(params: { account_id: string }): Promise<any>
}