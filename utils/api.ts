import { Near, Account, Contract, utils, WalletConnection } from 'near-api-js'
import { config } from './config'

export const fromNear = (amount: string): number => parseFloat(utils.format.formatNearAmount(amount || '0'))
export const toYoctoNear = (amount: number): string => utils.format.parseNearAmount(String(amount)) || '0'

export interface NearContract extends Contract {
  buy?(params: { token_id: string }, gas: string, amount: string): void
}

class NearApi {
  readonly near: Near;
  readonly marketContract: NearContract;
  readonly walletConnection: WalletConnection;

  constructor(near: Near) {
    this.near = near;
    this.walletConnection = new WalletConnection(near, config.contractName)
    this.marketContract = this.getMarketContract(this.walletConnection.account())
  }

  getMarketContract(account: Account): NearContract {
    return new Contract(account, config.marketName, {
      viewMethods: [],
      changeMethods: [
        'buy'
      ]
    })
  }

  async getAccountId(): Promise<string> {
    return await this.walletConnection.getAccountId()
  }

  signIn(): void {
    this.walletConnection.requestSignIn({
      contractId: config.contractName,
      methodNames: ['buy']
    })
  }

  signOut(): void {
    this.walletConnection.signOut()
  }
}

export default NearApi