<script type="ts">
  import { onMount } from 'svelte'
  import { TabContent, TabPane } from 'sveltestrap'
  import { page } from '$app/stores'
  import { fromNear } from '$src/utils/api';
  import near from '$src/utils/near'
  import Preview from '$src/components/card/Preview.svelte'
  import OfferModal from '$src/components/modals/Offer.svelte'
  import TransferModal from '$src/components/modals/Transfer.svelte'
  import SellModal from '$src/components/modals/Sell.svelte'
  import InventoryModal from '$src/components/modals/Inventory.svelte'
  import ResourcesModal from '$src/components/modals/Resources.svelte'
  

  let { id: token_id }: {id: string} = $page.params
  let nft = null, 
      moreNft = null, 
      nftOnSale = null,
      listBids = null,
      openInventoryModal = null,
      openResourcesModal = null,
      openOfferModal = null,
      openSellModal = null,
      openTransferModal = null;

  const buyNft = async () => {
    $near.api.buyNft(token_id, nft.price as number)
  }

  const sellNft = async () => {
    openSellModal = true
  }

  const transferNft = async () => {
    openTransferModal = true
  }

  const offerNft = async () => {
    openOfferModal = true
  }

  const rentNft = async () => {
    alert('work in progress')
  }

  const openInventory = async () => {
    openInventoryModal = true
    openResourcesModal = false
  }

  const openResources = async () => {
    openResourcesModal = true
    openInventoryModal = false
  }

  onMount(async () => {
    nft = await $near.api.nftInfo(token_id)
    moreNft = await $near.api.listAsks()
    const listAllBids = await $near.api.listBids(token_id)
    listBids = listAllBids.find(bids => bids[0] == token_id)

    if (listBids) {
      listBids = listBids[1]
      listBids.forEach((bid, index) => {
        const prevBid = listBids[index + 1]
        if (prevBid) {
          bid.difference = (bid.price * 100 / prevBid.price).toFixed()
        }
      });
    }

    nftOnSale = moreNft.find(n => n.token_id == nft.token_id) || false
    if (nftOnSale) { 
      nft.price = fromNear(nftOnSale.price).toFixed(2)
    }

    const { Model } = await import('../../utils/three-model')
    new Model('threejs')
  })
</script>

<style>
  .disabled {
    opacity: 0.2;
    pointer-events: none;
  }
  #threejs {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    height: 600px;
  }
  @media screen and (max-width:768px) {
    #threejs {
      height: 400px;
      background: var(--primary);
    }
  }
</style>

<svelte:head>
  <title>{nft?.metadata.title || ''}</title>
</svelte:head>

<OfferModal tokenId={token_id} bind:isOpen={openOfferModal} />
<TransferModal tokenId={token_id} bind:isOpen={openTransferModal} />
<SellModal tokenId={token_id} bind:isOpen={openSellModal} />

{#if nft && nftOnSale !== null } 
  <section class="item-card">
    <div class="preview">
      <div class="img-box" style="margin: -50px 0">
        <div id="threejs" style="background-image: url(/img/postaments/1.png)"></div>
      </div>

      <div class="d-flex gap-3 justify-content-around">
        <button class="btn btn-primary col" on:click={openInventory}>Inventory</button>
        <button class="btn btn-primary col" on:click={openResources}>NFT resources</button>
      </div>
    </div>

    <div class="chars">
      <div class="chars-block">
        <InventoryModal bind:isOpen={openInventoryModal} />
        <ResourcesModal bind:isOpen={openResourcesModal} />
        <ul class="chars-list">
          <li class="token">
            <div class="img-box">
              <picture class="lazy">
                <img src="/img/token.png" alt="Card" />
              </picture>
            </div>
            <div class="token-text">
              <p>gen</p>
              <p>Jobs</p>
              <p>5% feature</p>
              <p>In stock</p>
            </div>
          </li>
          <li class="token">
            <div class="img-box">          
              <picture class="lazy">
                <img src="/img/token.png" alt="Card" />
              </picture>
            </div>
            <div class="token-text">
              <p>Century</p>
              <p>Our time</p>
              <p>17% feature</p>
              <p>In stock</p>
            </div>
          </li>
          <li class="token">
            <div class="img-box">          
              <picture class="lazy">
                <img src="/img/token.png" alt="Card" />
              </picture>
            </div>
            <div class="token-text">
              <p>EYES</p>
              <p>Close</p>
              <p>29% feature</p>
              <p>In stock</p>
            </div>
          </li>
          <li class="token">
            <div class="img-box">          
              <picture class="lazy">
                <img src="/img/token.png" alt="Card" />
              </picture>
            </div>
            <div class="token-text">
              <p>Accessory</p>
              <p>Cigar</p>
              <p>7% feature</p>
              <p>In stock</p>
            </div>
          </li>
          <li class="token">
            <div class="img-box">          
              <picture class="lazy">
                <img src="/img/token.png" alt="Card" />
              </picture>
            </div>
            <div class="token-text">
              <p>Type</p>
              <p>Heavy</p>
              <p>33% feature</p>
              <p>In stock</p>
            </div>
          </li>
          <li class="token">
            <div class="img-box">          
              <picture class="lazy">
                <img src="/img/token.png" alt="Card" />
              </picture>
            </div>
            <div class="token-text">
              <p>Cyber suit</p>
              <p>Gold</p>
              <p>0.7% feature</p>
              <p>In stock</p>
            </div>
          </li>
          <li class="token">
            <div class="img-box">          
              <picture class="lazy">
                <img src="/img/token.png" alt="Card" />
              </picture>
            </div>
            <div class="token-text">
              <p>Background</p>
              <p>Green</p>
              <p>20% feature</p>
              <p>In stock</p>
            </div>
          </li>
          <li class="token">
            <div class="img-box">          
              <picture class="lazy">
                <img src="/img/token.png" alt="Card" />
              </picture>
            </div>
            <div class="token-text">
              <p>Expressions</p>
              <p>Calm</p>
              <p>55% feature</p>
              <p>In stock</p>
            </div>
          </li>
          <li class="token">
            <div class="img-box">          
              <picture class="lazy">
                <img src="/img/token.png" alt="Card" />
              </picture>
            </div>
            <div class="token-text">
              <p>Top</p>
              <p>Elvis Presley</p>
              <p>0.5% feature</p>
              <p>In stock</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="near-value">
        {#if nftOnSale}
          { nft.price }
          <span>
            <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.42765 38.0705C5.05414 38.0705 5.67326 37.9359 6.2428 37.6759C6.81233 37.4159 7.31888 37.0365 7.72791 36.5637L37.5415 2.10778C37.1502 1.48385 36.606 0.969438 35.96 0.613021C35.314 0.256604 34.5876 0.0699198 33.8492 0.0705583C33.2262 0.0706607 32.6105 0.203793 32.0435 0.460984C31.4765 0.718175 30.9714 1.09345 30.5622 1.56153L0.597656 35.8143C0.973895 36.4984 1.52808 37.0688 2.20201 37.4659C2.87593 37.8629 3.64473 38.0717 4.42765 38.0705V38.0705Z" fill="url(#paint0_linear_3532:765)"/>
            <path d="M4.41392 38.0704C5.10617 38.0703 5.78836 37.9047 6.40365 37.5875V8.82365L29.4807 36.5161C29.8888 37.0038 30.3991 37.3959 30.9755 37.6645C31.552 37.9331 32.1804 38.0716 32.8163 38.0704H33.7267C34.8787 38.0704 35.9835 37.6128 36.7981 36.7982C37.6127 35.9836 38.0703 34.8788 38.0703 33.7268V4.41407C38.0703 3.26207 37.6127 2.15726 36.7981 1.34268C35.9835 0.528092 34.8787 0.0704636 33.7267 0.0704636C33.0348 0.0679257 32.3524 0.231739 31.737 0.548101V29.3252L8.6599 1.63268C8.25257 1.14353 7.74259 0.750001 7.16614 0.480017C6.58969 0.210034 5.96089 0.0702087 5.32434 0.0704636H4.41392C3.26193 0.0704636 2.15711 0.528092 1.34253 1.34268C0.527942 2.15726 0.0703125 3.26207 0.0703125 4.41407V33.7268C0.0703125 34.8788 0.527942 35.9836 1.34253 36.7982C2.15711 37.6128 3.26193 38.0704 4.41392 38.0704V38.0704Z" fill="#4CC551"/>
            <defs>
            <linearGradient id="paint0_linear_3532:765" x1="1.34194" y1="36.796" x2="36.7951" y2="1.20852" gradientUnits="userSpaceOnUse">
            <stop offset="0.21" stop-color="#4CC551"/>
            <stop offset="0.42" stop-color="#4CC551" stop-opacity="0"/>
            <stop offset="0.59" stop-color="#4CC551" stop-opacity="0"/>
            <stop offset="0.81" stop-color="#4CC551"/>
            </linearGradient>
            </defs>
            </svg>
          </span>
        {:else}
          {#if nft.owner_id !== $near.user.id}
            <b style="color: #585656;">not sale</b>
          {/if}
        {/if}
      </div>

      <div class="d-flex gap-3 justify-content-around pt-5" class:disabled={!$near.signedIn}>
        {#if nft.owner_id === $near.user.id}
          <button class="btn btn-primary col" on:click={sellNft}>
            {#if nftOnSale}
              change price
            {:else}
              sell
            {/if}
            
          </button>
          <button class="btn btn-primary col" on:click={transferNft}>transfer</button>
        {:else}
          <button class="btn btn-primary col" on:click={buyNft} class:disabled={!nftOnSale}>buy now</button>
          <button class="btn btn-primary col" on:click={offerNft}>make offer</button>
          <button class="btn btn-primary col" class:disabled={!nftOnSale} on:click={rentNft}>rent</button>
        {/if}
      </div>

    </div>

    <div class="info mt-5 text-center d-inline-block me-lg-5 pe-lg-4">
      <h3>0027JMXBTL23051645</h3>

      <div class="d-flex justify-content-around fs-4 mt-4">
        <div class="">
          <p>Win Rate</p>
          <p>52%</p>
        </div>
        <div class="">
          <p>Sowing</p>
          <p>2/5</p>
        </div>
      </div>
    </div>

    <div class="history mt-5">

      <TabContent>
        <TabPane tabId="alpha" tab="Offer history" active>
            <table class="table table-borderless">
              <thead>
                <tr>
                  <th>Price</th>
                  <th>From</th>
                  <th>Difference</th>
                  <th>Expiration</th>
                </tr>
              </thead>
              <tbody>
                {#if listBids}
                  {#each listBids as bid}
                    <tr>
                      <td>
                        <span>{fromNear(bid.price).toFixed(2)}</span>
                      </td>
                      <td>
                        <span>{bid.bidder_id}</span>
                      </td>
                      <td>
                        {bid.difference ? bid.difference + '%' : '-'}
                      </td>
                      <td>
                        <span>1 day</span>
                      </td>
                    </tr>
                  {/each}
                {:else}
                  <tr>
                    <td colspan="4" class="py-3">
                      No offers yet
                    </td>
                  </tr>
                {/if}
              </tbody>
            </table>
        </TabPane>
        <TabPane tabId="bravo" tab="Trading history">
          <table class="table table-borderless">
            <thead>
              <tr>
                <th>
                  <span>Price</span>
                </th>
                <th>
                  <span>From</span>
                </th>
                <th>
                  <span>To</span>
                </th>
                <th>
                  <span>Date</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>22.50</td>
                <td>trackoon.near</td>
                <td>angrylemon.near</td>
                <td>a day ago</td>
              </tr>
              <tr>
                <td>5.00</td>
                <td>bodyflex.near</td>
                <td>trackoon.near</td>
                <td>a day ago</td>
              </tr>
              <tr>
                <td>1.00</td>
                <td>cartooncat.near</td>
                <td>bodyflex.near</td>
                <td>a day ago</td>
              </tr>
            </tbody>
          </table>
        </TabPane>
      </TabContent>

    </div>
  </section>

  {#if moreNft}
    <section class="mt-5">
      <h3>More from this coolection</h3>

      <div class="row">
        {#each moreNft.filter(n => n.token_id !== nft.token_id).slice(0, 4) as nft }
          <div class="col-6 col-md-3">
            <Preview shortNft={nft} />
          </div>
        {/each}
      </div>
    </section>
  {/if}
{/if}