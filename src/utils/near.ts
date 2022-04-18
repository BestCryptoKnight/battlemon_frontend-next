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
  window.global = window;
  const { keyStores, connect, providers} = await import('near-api-js')
  const keyStore = new keyStores.BrowserLocalStorageKeyStore()
  const config = getConfig(location.href)  
  const near = await connect({ keyStore, headers: {}, ...config })

  const NearWalletSelector =  (await import("@near-wallet-selector/core")).default;
  const { setupNearWallet } = await import("@near-wallet-selector/near-wallet");
  const { setupSender } = await import("@near-wallet-selector/sender");
  


  const nftWallet = await NearWalletSelector.init({
    network: "testnet",
    contractId: config.nftContract,
    wallets: [
      setupNearWallet({ iconUrl: '/img/near-wallet-icon.png' }),
      setupSender({ iconUrl: '/img/sender-icon.png' })
    ],
  });
  
  const marketWallet = await NearWalletSelector.init({
    network: "testnet",
    contractId: config.marketContract,
    wallets: [
      setupNearWallet({ iconUrl: '/img/near-wallet-icon.png' }),
      setupSender({ iconUrl: '/img/sender-icon.png' })
    ],
  });


  const provider = new providers.JsonRpcProvider({ url: config.nodeUrl });
  const api = new NearApi({ near, config, provider, marketWallet, nftWallet })

  const signedIn = await marketWallet.isSignedIn()
  let user = await api.getUser()

  nearStore.update(n => {
    return { 
      ...n,
      config,
      api, 
      connected: true,
      signedIn: signedIn,
      user
    }
  })

  marketWallet.on('signIn', async (accounts) => {
    user = await api.getUser()
    nearStore.update(n => {
      return { 
        ...n,
        signedIn: signedIn,
        user
      }
    })
  })
  
}


