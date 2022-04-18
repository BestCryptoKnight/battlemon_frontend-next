import type { Near, WalletConnection, Contract } from 'near-api-js'
import type { NearConfig } from './config'
import type NearWalletSelector from "@near-wallet-selector/core";
import type { JsonRpcProvider } from 'near-api-js/lib/providers';
import type { CodeResult } from "near-api-js/lib/providers/provider";
import nearStore from './near';

export const fromNear = (amount: string): number => parseFloat(amount.slice(0, -20) || '0') / 10000
export const toYoctoNear = (amount: number): string => (amount * 10e8) + '000000000000000' || '0'

class NearApi {
  readonly near: Near;
  readonly config: NearConfig;
  readonly marketWallet: NearWalletSelector;
  readonly nftWallet: NearWalletSelector;
  readonly provider: JsonRpcProvider;

  constructor({ near, config, provider, marketWallet, nftWallet }: {
    near: Near,
    config: NearConfig,
    marketWallet: NearWalletSelector,
    nftWallet: NearWalletSelector
    provider: JsonRpcProvider
  }) {
    this.near = near
    this.config = config
    this.provider = provider
    this.marketWallet = marketWallet
    this.nftWallet = nftWallet
  }

  signIn(): void {
    this.marketWallet.show();
  }

  signOut(): void {
    this.marketWallet.signOut()
    nearStore.update(n => {
      return {
        ...n,
        signedIn: false,
        user: {
          id: null,
          balance: null
        }
      }
    })
  }

  async getUser(): Promise<User> {
    const accounts = await this.marketWallet.getAccounts()
    const account = accounts[0];
    let user = {
      id: null,
      balance: null
    }

    if (account) {
      const userAccount = await this.near.account(account.accountId)
      const balance = (await userAccount.getAccountBalance())

      user = {
        id: account.accountId,
        balance: fromNear(balance.available).toFixed(2)
      }
    }

    return user;
  }

  async listNft(params: { limit?: number, from_index?: number }): Promise<any> {
    const data = await this.provider.query<CodeResult>({
      request_type: "call_function",
      account_id: this.nftWallet.getContractId(),
      method_name: "nft_tokens",
      args_base64: Buffer.from(JSON.stringify(params)).toString('base64'),
      finality: "optimistic",
    })

    const result = JSON.parse(Buffer.from(data.result).toString())
    return await result
  }

  async listAsks(): Promise<any> {
    const data = await this.provider.query<CodeResult>({
      request_type: "call_function",
      account_id: this.marketWallet.getContractId(),
      method_name: "list_asks",
      args_base64: "",
      finality: "optimistic",
    })

    const result = JSON.parse(Buffer.from(data.result).toString())
    return await result
  }

  async listBids(token_id: string): Promise<any> {
    const data = await this.provider.query<CodeResult>({
      request_type: "call_function",
      account_id: this.marketWallet.getContractId(),
      method_name: "list_bids",
      args_base64: Buffer.from(JSON.stringify({ token_id })).toString('base64'),
      finality: "optimistic",
    })

    const result = JSON.parse(Buffer.from(data.result).toString())
    return await result
  }

  async nftInfo(token_id: string): Promise<any> {
    const data = await this.provider.query<CodeResult>({
      request_type: "call_function",
      account_id: this.nftWallet.getContractId(),
      method_name: "nft_token",
      args_base64: Buffer.from(JSON.stringify({ token_id })).toString('base64'),
      finality: "optimistic",
    })

    const result = JSON.parse(Buffer.from(data.result).toString())
    return await result
  }

  async buyNft(accountId: string, token_id: string, amount: number): Promise<any> {
    await this.marketWallet.signAndSendTransaction({
      signerId: accountId,
      actions: [
        {
          type: "FunctionCall",
          params: {
            methodName: "buy",
            args: { token_id },
            gas: '300000000000000',
            deposit: toYoctoNear(amount),
          },
        },
      ],
    })
  }

  async transferNft(accountId: string, token_id: string, receiver_id: string): Promise<any> {
    const params = {
      token_id,
      receiver_id
    }

    return await this.nftWallet.signAndSendTransaction({
      signerId: accountId,
      actions: [
        {
          type: "FunctionCall",
          params: {
            methodName: "nft_transfer",
            args: params,
            gas: '300000000000000',
            deposit: '1',
          },
        },
      ],
    })
  }

  async sellNft(accountId: string, token_id: string, amount: number): Promise<any> {
    const params = {
      token_id,
      account_id: this.config.marketContract,
      msg: JSON.stringify({
        sale_type: SaleType.selling,
        price: toYoctoNear(amount)
      })
    }

    return await this.nftWallet.signAndSendTransaction({
      signerId: accountId,
      actions: [
        {
          type: "FunctionCall",
          params: {
            methodName: "nft_approve",
            args: params,
            gas: '300000000000000',
            deposit: toYoctoNear(amount),
          },
        },
      ],
    })
  }

  async bidNft(accountId: string, token_id: string, amount: number): Promise<void> {
    await this.marketWallet.signAndSendTransaction({
      signerId: accountId,
      actions: [
        {
          type: "FunctionCall",
          params: {
            methodName: "bid",
            args: { token_id },
            gas: '300000000000000',
            deposit: toYoctoNear(amount),
          },
        },
      ],
    })
  }

  async listNftByAccount(account_id: string): Promise<any> {
    const data = await this.provider.query<CodeResult>({
      request_type: "call_function",
      account_id: this.nftWallet.getContractId(),
      method_name: "nft_tokens_for_owner",
      args_base64: Buffer.from(JSON.stringify({ account_id })).toString('base64'),
      finality: "optimistic",
    })

    const result = JSON.parse(Buffer.from(data.result).toString())
    return await result
  }

}

export default NearApi

export interface User {
  id: string | null,
  balance: string | null
}

interface MarketContract extends Contract {
  buy?(params: { token_id: string }, gas: string, amount: string): Promise<any>
  bid?(params: { token_id: string }, gas: string, amount: string): Promise<any>
  list_asks?(): Promise<any>
  list_bids?(params: { token_id: string }): Promise<any>
}

enum SaleType {
  selling = 'selling',
  acceptBid = 'accept_bid'
}

interface NftContract extends Contract {
  nft_approve?(params: { token_id: string, account_id: string, msg: string }, gas: string, amount: string): Promise<any>
  nft_transfer?(params: { token_id: string, receiver_id: string }, gas: string, amount: string): Promise<any>
  nft_token?(params: { token_id: string }): Promise<any>
  nft_tokens?(params: { from_index?: number, limit?: number }): Promise<any>
  nft_tokens_for_owner?(params: { account_id: string }): Promise<any>
}