import { ReactElement } from 'react'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <Head>
        <title>Battlemon</title>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
      </Head>
      <Header />
      
      <main>
        <div className='container'>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;