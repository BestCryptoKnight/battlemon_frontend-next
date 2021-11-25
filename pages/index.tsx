import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layout'
import Image from 'next/image'
import Link from 'next/link'
import { NearContext, INearProps } from '../utils/near-context'


const Home: NextPage = () => {

  const items = Array.from(Array(10).keys()).map((i) => {
    return (
      <div className="card-preview" key={i}>
        <div className="img-box">
          <Image src="/img/fighters-23.png" width="269" height="357" alt="Fighter Lemon" layout="responsive" />
        </div>
        <Link href={`/item/${i + 1}`}><a></a></Link>
      </div>
    )
  })

  return (
    <Layout>
      <>
        <div className="media-wrap">
          <div className="img-box video-box text-center">
            <video src="/media/Lemon_v_720.mp4" autoPlay muted loop playsInline />
          </div>
        </div>

        <section className="catalog">

          <button className="filter-toggle">Filter</button>

          <form className="catalog-filter" action="">
            <label className="search">
              <input type="text" placeholder="Search by serial number" />
            </label>

            <details open>
              <summary>Option</summary>
              <ul>
                <li>
                  <label>
                    <input type="checkbox" />
                    <span className="checkbox"></span>
                    <span>On Sale</span>
                  </label>
                </li>
                <li>
                  <label>
                    <input type="checkbox" />
                    <span className="checkbox"></span>
                    <span>Auction</span>
                  </label>
                </li>
                <li>
                  <label>
                    <input type="checkbox" />
                    <span className="checkbox"></span>
                    <span>For Rent</span>
                  </label>
                </li>
              </ul>
            </details>

            <details>
              <summary>Century</summary>
              <ul>
                <li>
                  <label>
                    <input type="radio" name="century" />
                    <span className="checkbox"></span>
                    <span>Ancient</span>
                  </label>
                </li>
                <li>
                  <label>
                    <input type="radio" name="century" />
                    <span className="checkbox"></span>
                    <span>Our time</span>
                  </label>
                </li>
                <li>
                  <label>
                    <input type="radio" name="century" />
                    <span className="checkbox"></span>
                    <span>Future</span>
                  </label>
                </li>
                <li>
                  <label>
                    <input type="radio" name="century" />
                    <span className="checkbox"></span>
                    <span>Other World</span>
                  </label>
                </li>
              </ul>
            </details>

            <details>
              <summary>Type</summary>
              <ul>
                <li>
                  <label>
                    <input type="radio" name="Type" />
                    <span className="checkbox"></span>
                    <span>Light</span>
                  </label>
                </li>
                <li>
                  <label>
                    <input type="radio" name="Type" />
                    <span className="checkbox"></span>
                    <span>Medium</span>
                  </label>
                </li>
                <li>
                  <label>
                    <input type="radio" name="Type" />
                    <span className="checkbox"></span>
                    <span>Heavy</span>
                  </label>
                </li>
              </ul>
            </details>

            <details>
              <summary>Lemon Gen</summary>
              <ul>
                <li>
                  <label>
                    <input type="checkbox" />
                    <span className="checkbox"></span>
                    <span>Lemon Gen</span>
                  </label>
                </li>
              </ul>
            </details>

            <details>
              <summary>Background</summary>
              <ul>
                <li>
                  <label>
                    <input type="checkbox" />
                    <span className="checkbox"></span>
                    <span>Background</span>
                  </label>
                </li>
              </ul>
            </details>

            <details>
              <summary>Top</summary>
              <ul>
                <li>
                  <label>
                    <input type="checkbox" />
                    <span className="checkbox"></span>
                    <span>Top</span>
                  </label>
                </li>
              </ul>
            </details>

            <details>
              <summary>Expressions</summary>
              <ul>
                <li>
                  <label>
                    <input type="checkbox" />
                    <span className="checkbox"></span>
                    <span>Expressions</span>
                  </label>
                </li>
              </ul>
            </details>

            <details>
              <summary>Eyes</summary>
              <ul>
                <li>
                  <label>
                    <input type="checkbox" />
                    <span className="checkbox"></span>
                    <span>Eyes</span>
                  </label>
                </li>
              </ul>
            </details>

            <details>
              <summary>Accessory</summary>
              <ul>
                <li>
                  <label>
                    <input type="checkbox" />
                    <span className="checkbox"></span>
                    <span>Accessory</span>
                  </label>
                </li>
              </ul>
            </details>

            <details>
              <summary>Win Rate</summary>
              <ul>
                <li>
                  <input type="range" />
                </li>
              </ul>
            </details>

            <details>
              <summary>Rarity</summary>
              <ul>
                <li>
                  <input type="range" />
                </li>
              </ul>
              
            </details>
          </form>

          <div className="catalog-inner">
            <form className="catalog-sorting" action="">
              <ul className="sorting">
                <li className="active">Fighters</li>
                <li>Weapons</li>
                <li>Items</li>
                <li>Boosters</li>
                <li>Land</li>
                <li>Merchandise</li>
              </ul>

              <div className="serial-number">
                Serial number
              </div>
            </form>

            
            <div className="cards-wrap">
              {items}
            </div>
          </div>
        </section>
      </>
    </Layout>
  )
}

export default Home
