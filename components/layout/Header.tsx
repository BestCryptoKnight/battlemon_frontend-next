import { useState, useContext, Dispatch } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { NearContext, INearProps } from '../../utils/near-context'

const Header = () => {
  const { near, setNear }: { near: INearProps | null, setNear: Dispatch<INearProps | null>  } = useContext(NearContext)
  const [openMenu, setOpenMenu] = useState(false)
  const { pathname } = useRouter();


  if (!near) return null;

  const { api, signedIn, signedAccountId } = near

  const handleSignIn = async () => {
    api.signIn()
  }

  const handleSignOut = async () => {
    api.signOut()
    setNear({
      ...near,
      signedIn: false,
      signedAccountId: null
    })
  }

  const signInButton = () => {
    if (signedIn) {
      return (
        <button className="login-form-toggle signed-in btn">
          <span>{signedAccountId}</span>
        </button>
      )
    } else {
      return (
        <button className="login-form-toggle btn" onClick={handleSignIn}>
          <span>Sign In</span>
        </button>
      )
    }
  } 

  return (

    <header className={openMenu ? 'nav-open' : ''}>
      <div className="container">
        <div className="header-inner">
          <button className={`nav-toggle ${openMenu ? 'nav-open' : ''}`} onClick={() => setOpenMenu(!openMenu)}>
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </button>
        
          <Link href="/">
            <a className="logo img-box">
              <picture>
                <Image src="/img/logo.png" alt="Battlemon" width="254" height="124" />
              </picture>
            </a>
          </Link>

          <div className="nav-wrap">
            <nav className="nav">
              <ul className="nav-list">
                <li>
                  <Link href="/kitchen">
                    <a className={pathname === "/kitchen" ? 'active' : ''}>
                      Your Kitchen
                    </a>
                  </Link>
                </li>
                <li><a href={'#'}>Shop</a></li>
                <li><a href={'#'}>Paid</a></li>
                <li>
                  <Link href="/sales">
                    <a className={pathname === "/sales" ? 'active' : ''}>
                      Info
                    </a>
                  </Link>
                </li>
                <li><a href={'#'}>Game</a></li>
              </ul>
            </nav>

            {signInButton()}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;