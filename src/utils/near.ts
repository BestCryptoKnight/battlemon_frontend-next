import { writable } from "svelte/store";
import NearApi from './api'
import { getConfig } from './config'
import type { NearConfig } from './config'
import { Buffer } from 'buffer';

const nearStore = writable<NearProps>({
  connect: nearConnect,
  connected: false,
  api: undefined,
  config: undefined,
  signedIn: false,
  user: {
    id: null,
    balance: null
  }
})

export default nearStore

interface NearProps {
  connect(): Promise<void>;
  connected: boolean;
  api: NearApi | undefined;
  config: NearConfig | undefined;
  signedIn: boolean;
  user: { id: string | null, balance: string | null };
}

async function nearConnect(): Promise<void> {
  window.Buffer = Buffer;
  const { keyStores, connect, Contract, WalletConnection} = await import('near-api-js')
  const keyStore = new keyStores.BrowserLocalStorageKeyStore()
  const config = getConfig(location.href)
  const near = await connect({ keyStore, ...config })
  const walletConnection = new WalletConnection(near, config.marketContract)

  const marketContract = new Contract(walletConnection.account(), config.marketContract, {
    viewMethods: [
      'list_asks',
      'list_bids'
    ],
    changeMethods: [
      'buy',
      'bid'
    ]
  })

  const nftContract = new Contract(walletConnection.account(), config.nftContract, {
    viewMethods: [
      'nft_token',
      'nft_tokens',
      'nft_tokens_for_owner'
    ],
    changeMethods: [
      'nft_approve',
      'nft_transfer'
    ]
  })

  const api = new NearApi({ near, walletConnection, config, marketContract, nftContract })

  const user = await api.getUser()
  nearStore.update(n => {
    return { 
      ...n,
      config,
      api, 
      connected: true,
      signedIn: !!user.id,
      user
    }
  })
}


