<script type="ts">
  import { onMount } from 'svelte'
  import { TabContent, TabPane } from 'sveltestrap'
  import { page } from '$app/stores'
  import { fromNear } from '$src/utils/api';
  import near from '$src/utils/near'
  import OfferModal from '$src/components/modals/Offer.svelte'
  import TransferModal from '$src/components/modals/Transfer.svelte'
  import SellModal from '$src/components/modals/Sell.svelte'
  import InventoryModal from '$src/components/modals/Inventory.svelte'
  import ResourcesModal from '$src/components/modals/Resources.svelte'
  import Lemon from '$src/components/threejs/Lemon.svelte'
import bag from '$src/components/svg/bag';
import lemon from '$src/components/svg/lemon';
import weapon from '$src/components/svg/weapon';
  

  let { id: token_id }: {id: string} = $page.params
  let nft = null, 
      moreNft = null, 
      nftOnSale = null,
      listBids = null,
      openInventoryModal = null,
      openResourcesModal = null,
      openOfferModal = null,
      openSellModal = null,
      openTransferModal = null,
      nftProperties = [];

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

    const keysProperties = {
      lemon_gen: 'Gen',
      century: 'Century',
      top: 'Top',
      cyber_suit: 'Cyber suit',
      background: 'Background',
      expression: 'Expression',
      eyes: 'Eyes',
      hair: 'Hair',
      accessory: 'Accessory',
      type: 'Type'
    }
    nftProperties = Object.keys(nft.properties).map(key => {
      const value = (nft.properties[key] + '').split('_').join(' ')
      const title = keysProperties[key]
      if (title) {
        return {
          title,
          value
        }
      }
    }).filter(a => a)

    console.log(nftProperties)
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
  })
</script>

<style>
  .disabled {
    opacity: 0.2;
    pointer-events: none;
  }
  @media screen and (max-width:768px) {
    .left-column :global(a), .left-column td, .left-column th {
      font-size: 70%;
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
  <section class="row">
    <div class="col-md-6 position-relative">
      <Lemon nft={nft} />

      <div style="z-index: 10; position: relative">
        <div class="text-center mb-4" style="width: 100%;">
          <button class="btn btn-primary px-2 pt-1 pb-2" on:click={openResources}>
            <div style="min-width: 38px;">{@html lemon}</div>
          </button>
          &nbsp;
          <button class="btn btn-primary pt-1 pb-2" style="padding-left: 12px; padding-right: 12px;" on:click={openInventory}>
            <div style="min-width: 28px;">{@html weapon}</div>
          </button>
          &nbsp;
          <button class="btn btn-primary px-3 pt-1 pb-2" on:click={openInventory}>
            <div style="min-width: 24px;">{@html bag}</div>
          </button>
        </div>

        {#if nftOnSale}
          <div class="near-value justify-content-center mt-0 pb-3">
            <span style="overflow-wrap:break-word;word-break: break-word;">{ nft.price }</span>
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
          </div>
        {:else}
          {#if nft.owner_id !== $near.user.id}
            <div class="near-value justify-content-center mt-5 pb-3">
              <b style="color: #585656;">not sale</b>
            </div>
          {/if}
        {/if}

        <div class="d-flex gap-3 justify-content-around pt-3 mb-4" class:disabled={!$near.signedIn}>
          {#if nft.owner_id === $near.user.id}
          
            {#if nftOnSale}
              <div class="w-100">
                <div class="d-flex gap-3 justify-content-around">
                  <button class="btn btn-primary col" on:click={sellNft}>Change price</button>
                  <button class="btn btn-primary col" on:click={transferNft}>Transfer</button>
                </div>
                <div class="d-flex gap-3 justify-content-around pt-3">
                  <button class="btn btn-primary col">Cancel price</button>
                  <button class="btn btn-primary col">Rent</button>
                </div>
              </div>
            {:else}
              <button class="btn btn-primary col" on:click={sellNft}>Sell</button>
              <button class="btn btn-primary col" on:click={transferNft}>Transfer</button>
              <button class="btn btn-primary col">Rent</button>
            {/if}
              
            
          {:else}
            <button class="btn btn-primary col" on:click={buyNft} class:disabled={!nftOnSale}>Buy now</button>
            <button class="btn btn-primary col" on:click={offerNft}>Make offer</button>
            <button class="btn btn-primary col" class:disabled={!nftOnSale} on:click={rentNft}>Rent</button>
          {/if}
        </div>
      </div>
    </div>

    <div class="col-md-6 position-relative left-column battle-card">

      <div class="mt-1">

        <TabContent>
          <TabPane tabId="stats" tab="Stats" active>
            <div class="table-responsive">
              <table class="table table-borderless">
                <tbody>
                  {#each nftProperties as property}
                    <tr>
                      <td>{property.title}</td>
                      <td style="text-transform: capitalize;">{property.value}</td>
                      <td>{property.value.length}%</td>
                      <td>in stock</td>
                    </tr>
                  {/each}
                  
                  
                </tbody>
              </table>
            </div>
          </TabPane>
          <TabPane tabId="details" tab="Details">
            <div class="table-responsive">
              <table class="table table-borderless">
                <tbody>
                  <tr>
                    <td class="text-start" width="10%">Collection&nbsp;id:</td>
                    <td>0027JMXBTL23051645</td>
                  </tr>
                  <tr>
                    <td class="text-start">Serial&nbsp;number:</td>
                    <td>#0019</td>
                  </tr>
                  <tr>
                    <td class="text-start">Win Rate:</td>
                    <td>52%</td>
                  </tr>
                  <tr>
                    <td class="text-start">Showing:</td>
                    <td>2/5</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabPane>
        </TabContent>
      </div>

      <div class="mt-5">

        <TabContent>
          <TabPane tabId="alpha" tab="Offer history" active>
            <div class="table-responsive">
              <table class="table table-borderless">
                <thead>
                  <tr>
                    <th>Price</th>
                    <th>From</th>
                    <th>Diff</th>
                    <th>Exp</th>
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
            </div>
          </TabPane>
          <TabPane tabId="bravo" tab="Trading history">
            <div class="table-responsive">
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
                    <td>trackoon</td>
                    <td>angrylemon</td>
                    <td>a day ago</td>
                  </tr>
                  <tr>
                    <td>5.00</td>
                    <td>bodyflex</td>
                    <td>trackoon</td>
                    <td>a day ago</td>
                  </tr>
                  <tr>
                    <td>1.00</td>
                    <td>cartooncat</td>
                    <td>bodyflex</td>
                    <td>a day ago</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabPane>
        </TabContent>

      </div>

      {#if openInventoryModal}
        <InventoryModal bind:isOpen={openInventoryModal} />
      {/if}
      <ResourcesModal bind:isOpen={openResourcesModal} />
    </div>
  </section>
{/if}