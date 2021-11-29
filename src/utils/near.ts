import { writable } from "svelte/store";
import NearApi from './api'
import { getConfig } from './config'
import type { NearConfig } from './config'

const nearStore = writable<NearProps>({
  connect: nearConnect,
  connected: false,
  api: undefined,
  config: undefined,
  signedIn: false,
  user: null
})

export default nearStore

interface NearProps {
  connect(): Promise<void>;
  connected: boolean;
  api: NearApi | undefined;
  config: NearConfig | undefined;
  signedIn: boolean;
  user: { id: string, balance: string } | null;
}

async function nearConnect(): Promise<void> {
  const nearApi = (await import('near-api-esm')).default
  const keyStore = new nearApi.keyStores.BrowserLocalStorageKeyStore()
  const config = getConfig(location.href)
  const near = await nearApi.connect(Object.assign({ deps: { keyStore } }, config))
  const walletConnection = new nearApi.WalletConnection(near, config.marketContract)

  const marketContract = new nearApi.Contract(walletConnection.account(), config.marketContract, {
    viewMethods: [],
    changeMethods: [
      'buy'
    ]
  })

  const api = new NearApi({ near, walletConnection, config, marketContract })

  const user = await api.getUser()
  nearStore.update(n => {
    return { 
      ...n,
      config,
      api, 
      connected: true,
      signedIn: !!user,
      user
    }
  })
}


