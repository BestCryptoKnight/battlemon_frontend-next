
import * as nearAPI from 'near-api-js'
import { createContext } from 'react';
import { config, INearConfig } from './config'
import NearApi from './api'

export interface INearProps {
  connected: boolean;
  api: NearApi;
  config: INearConfig;
  signedIn: boolean;
  signedAccountId: string | null;
}

export const NearContext = createContext<any>(null);

export const connectNear = async (): Promise<INearProps> => {
  const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore()
  const near = await nearAPI.connect(Object.assign({ deps: { keyStore } }, config))
  const api = new NearApi(near)

  return {
    connected: true,
    config: config,
    api: api,
    signedIn: false,
    signedAccountId: null
  }
}
