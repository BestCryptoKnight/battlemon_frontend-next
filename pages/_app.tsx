import { useEffect, useState } from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { NearContext, connectNear, INearProps } from '../utils/near-context'

function MyApp({ Component, pageProps }: AppProps) {
  let [near, setNear] = useState<INearProps | null>(null);

  useEffect(() => {
    async function connect() {
      const near: INearProps = await connectNear()
      const accountId = await near.api.getAccountId()
      setNear({
        ...near,
        signedIn: !!accountId,
        signedAccountId: accountId,
      })
    }
    connect();
  }, []);

  return (
    <NearContext.Provider value={{ near, setNear }}>
      <Component {...pageProps} />
    </NearContext.Provider>
  )
}

export default MyApp
