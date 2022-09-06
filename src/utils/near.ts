import { writable, get } from "svelte/store";
import { Buffer } from 'buffer';
import type { Contract, WalletConnection } from "near-api-js";


interface NftContract extends Contract {
  nft_tokens_for_owner: (params: any) => any;
  nft_mint_full: (params: any) => any;
}

interface MarketContract  extends Contract {
  nft_approve: (params: any) => any;
}

interface NearProps {
  connect: typeof nearConnection,
  connected: boolean,
  accountId?: string
  wallet?: WalletConnection
  nftContract?: NftContract
  marketContract?: MarketContract,
  utils?: any
  contracts?: {
    top_contract_id: string,
    nft_contract_id: string,
    market_contract_id: string
  }
}

export const near = writable<NearProps>({
  connect: nearConnection,
  connected: false
})

async function nearConnection () {
  window.Buffer = Buffer;
  window.global = window;
  
  const { keyStores, connect, Contract, WalletConnection, utils } = await import('near-api-js')

  const connectionConfig = {
    networkId: "testnet",
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
    headers: {}
  };

  const responseContracts = await fetch('/api?url=/rest/contracts');
  const contracts = await responseContracts.json()
  const connection = await connect(connectionConfig);
  const wallet = new WalletConnection(connection, 'Battlemon')
  //await wallet.isSignedInAsync()
  const accountId = wallet.getAccountId()

  const nftContract = new Contract(
    wallet.account(),
    contracts.nft_contract_id,
    {
      viewMethods: ['nft_tokens_for_owner'],
      changeMethods: ['nft_mint_full']
    }
  ) as NftContract
  
  const marketContract = new Contract(
    wallet.account(),
    contracts.market_contract_id,
    {
      viewMethods: [],
      changeMethods: ['nft_approve']
    }
  ) as MarketContract

  near.update(store => {
    return {
      ...store,
      connected: true,
      accountId,
      wallet,
      nftContract,
      marketContract,
      utils,
      contracts
    }
  })

  return true
}

export const signIn = async () => {
  const { wallet, contracts } = get(near)
  await wallet!.requestSignIn({
    contractId: contracts!.nft_contract_id
  });
}

export const nftTokensForOwner = async (accountId: string) => {
  const { nftContract } = get(near)
  return await nftContract!.nft_tokens_for_owner({
    account_id: accountId
  });
}

export const nftMintFull = async () => {
  const { accountId, nftContract, utils } = get(near)
  return await nftContract!.nft_mint_full({
    args: { receiver_id: accountId },
    amount: utils.format.parseNearAmount("0.1"),
    gas: "150000000000000"
  });
}