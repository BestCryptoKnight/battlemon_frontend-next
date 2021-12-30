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
    height: 800px;
  }
  @media screen and (max-width:768px) {
    #threejs {
      height: 500px;
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
  <section class="row">
    <div class="col-md-6 position-relative">
      <div class="img-box" style="margin: -70px 0 -100px">
        <div id="threejs" class="position-relative" style="background-image: url(/img/postaments/1.png);">
          <div style="position: absolute; left: 50%; top: 50%; margin: -60px 0 0 -40px">
            <div id="loader" class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
        </div>
      </div>

      <div style="z-index: 10; position: relative">
        <div class="text-center" style="position: absolute; width: 100%; margin-top: -80px">
          <button class="btn btn-primary px-2 py-1" on:click={openInventory}>
            <svg height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" fill="currentColor"><path d="M 9 5 C 8.707031 5 8.429688 5.128906 8.242188 5.351563 L 6.335938 7.574219 C 3.539063 10.835938 2 14.992188 2 19.289063 L 2 44 C 2 44.550781 2.449219 45 3 45 L 47 45 C 47.550781 45 48 44.550781 48 44 L 48 19.289063 C 48 14.992188 46.460938 10.839844 43.667969 7.578125 L 43.667969 7.574219 L 41.761719 5.351563 C 41.570313 5.128906 41.292969 5 41 5 Z M 9.460938 7 L 40.539063 7 L 42.148438 8.875 C 44.632813 11.777344 46 15.46875 46 19.289063 L 46 20 L 29.898438 20 C 29.429688 17.726563 27.40625 16 25 16 C 22.59375 16 20.570313 17.726563 20.101563 20 L 4 20 L 4 19.289063 C 4 15.46875 5.367188 11.773438 7.851563 8.875 Z M 25 18 C 26.667969 18 28 19.332031 28 21 L 28 26.023438 C 28 27.691406 26.667969 29.023438 25 29.023438 C 23.332031 29.023438 22 27.691406 22 26.023438 L 22 21 C 22 19.332031 23.332031 18 25 18 Z M 4 22 L 20 22 L 20 26.023438 C 20 28.773438 22.25 31.023438 25 31.023438 C 27.75 31.023438 30 28.773438 30 26.023438 L 30 22 L 46 22 L 46 38.09375 C 43.496094 38.515625 41.515625 40.496094 41.09375 43 L 8.90625 43 C 8.484375 40.496094 6.503906 38.515625 4 38.09375 Z M 24 24 L 24 26 C 24 26.550781 24.449219 27 25 27 C 25.550781 27 26 26.550781 26 26 L 26 24 Z M 4 40.140625 C 5.40625 40.5 6.5 41.59375 6.859375 43 L 4 43 Z M 46 40.140625 L 46 43 L 43.140625 43 C 43.5 41.59375 44.59375 40.5 46 40.140625 Z"></path></svg>
          </button>
          <button class="btn btn-primary px-2 py-1" on:click={openResources}>
            <svg height="24"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480" fill="currentColor">
            <path d="M 228.7168 0 C 213.4158 0 201.68023 13.259969 203.86523 28.042969 C 210.00323 69.565969 209.54328 66.812203 209.86328 67.783203 C 211.33628 72.249203 216.35278 74.499562 220.67578 72.601562 C 229.31378 68.807563 235.79889 69 242.08789 69 C 261.56789 69 278.04758 82.052188 283.26758 99.867188 C 265.38358 94.981188 246.51767 93.119469 228.01367 94.480469 C 223.60667 94.802469 220.29419 98.635969 220.61719 103.04297 C 220.93919 107.44997 224.78164 110.7695 229.18164 110.4375 C 247.95964 109.0625 267.133 111.36117 285 117.07617 L 285 141.08984 C 285 164.74984 265.74989 184 242.08789 184 L 237.91211 184 C 214.25011 184 195 164.74989 195 141.08789 L 195 111.91211 C 195 105.11611 196.54012 98.620516 199.57812 92.603516 C 201.56913 88.659516 199.98697 83.846469 196.04297 81.855469 C 192.10097 79.865469 187.28692 81.447578 185.29492 85.392578 C 181.11792 93.665578 179 102.58711 179 111.91211 L 179 141.08789 C 179 173.57189 205.42811 200 237.91211 200 L 242.08789 200 C 253.55789 200 264.26317 196.693 273.32617 191 L 290 191 L 290 368 L 246.32422 368 C 245.62322 367.89 244.89916 367.86327 244.16016 367.94727 C 243.51016 368.02527 246.46064 368 219.80664 368 C 215.38864 368 211.80664 371.582 211.80664 376 C 211.80664 380.418 215.38864 384 219.80664 384 L 237.97656 384 L 246.14453 454.02734 C 247.87153 468.83434 260.69561 480 275.97461 480 C 292.53061 480 306 466.8628 306 450.7168 L 306 411.19336 C 306 406.77536 302.418 403.19336 298 403.19336 C 293.582 403.19336 290 406.77536 290 411.19336 L 290 450.7168 C 290 458.0408 283.70856 464 275.97656 464 C 268.81656 464 262.82606 458.91583 262.03906 452.17383 L 254.08789 384 L 298 384 C 302.418 384 306 380.418 306 376 L 306 191 L 316.81641 191 C 329.60041 191 340 201.39959 340 214.18359 L 340 315.7832 C 340 324.4382 333.23652 331.55447 324.60352 331.98047 C 321.55552 332.13047 318.7445 334.05006 317.5625 337.03906 C 316.8045 338.95506 317 338.221 317 364 C 317 368.418 320.582 372 325 372 L 362.80273 372 L 355.87891 431.36133 C 355.23791 436.85533 350.33366 441 344.47266 441 C 338.14666 441 332.99805 436.14569 332.99805 430.17969 L 332.99805 403.06445 C 332.99805 398.64645 329.41605 395.06445 324.99805 395.06445 C 320.58005 395.06445 316.99805 398.64645 316.99805 403.06445 L 316.99805 430.17969 C 316.99805 444.96869 329.32266 457 344.47266 457 C 358.45366 457 370.19048 446.77384 371.77148 433.21484 L 378.91211 372 L 400.09766 372 C 404.51566 372 408.09766 368.418 408.09766 364 C 408.09766 359.582 404.51566 356 400.09766 356 L 333 356 L 333 346.66406 C 346.366 342.69606 356 330.3372 356 315.7832 C 356 205.8842 356.43939 211.37014 354.90039 204.99414 C 361.13639 207.57014 367.96219 209.00195 375.11719 209.00195 L 377.88281 209.00195 C 388.09581 209.00195 397.75847 206.11495 405.98047 201.00195 L 420 201.00195 L 420 277.00195 L 385.77344 277.00195 C 381.35544 277.00195 377.77344 280.58395 377.77344 285.00195 C 377.77344 289.41995 381.35544 293.00195 385.77344 293.00195 L 420 293.00195 L 420 430.18164 C 420 436.14864 414.85239 441.00195 408.52539 441.00195 C 402.66439 441.00195 397.76109 436.85633 397.12109 431.36133 L 394.79688 411.43945 C 394.28388 407.04945 390.30583 403.91492 385.92383 404.41992 C 381.53483 404.93192 378.3933 408.90397 378.9043 413.29297 L 381.22852 433.21484 C 382.81052 446.77484 394.54439 457 408.52539 457 C 423.67539 457 436 444.96869 436 430.17969 L 436 201 L 444.47656 201 C 455.24256 201 464 209.75844 464 220.52344 L 464 310.62305 C 464 314.70505 462.16952 318.51431 458.97852 321.07031 C 453.08252 325.79331 456.46033 335.31445 463.98633 335.31445 C 465.74133 335.31445 467.50642 334.73964 468.98242 333.55664 C 475.98442 327.94664 480.00195 319.58805 480.00195 310.62305 L 480.00195 220.52148 C 480.00095 200.93548 464.06356 185 444.47656 185 L 422.33398 185 C 424.87298 181.112 426.93883 176.84863 428.42383 172.26562 C 429.78583 168.06262 427.48234 163.55045 423.27734 162.18945 C 419.07834 160.82645 414.56117 163.13094 413.20117 167.33594 C 410.67017 175.14794 405.75039 181.6512 399.40039 186.1582 C 399.08739 186.3472 398.78691 186.55225 398.50391 186.78125 C 392.55191 190.74725 385.43181 193.00195 377.88281 193.00195 L 375.11523 193.00195 C 354.64923 193.00095 338 176.34981 338 155.88281 L 338 130.11719 C 338 109.65019 354.65019 93 375.11719 93 L 377.88281 93 C 394.34381 93 408.32978 103.77562 413.17578 118.64062 C 397.13678 114.41863 380.27833 112.95573 363.73633 114.42773 C 359.33533 114.81973 356.08556 118.70447 356.47656 123.10547 C 356.86856 127.50647 360.7543 130.76023 365.1543 130.36523 C 383.5733 128.72223 402.43519 131.16792 419.74219 137.41992 C 425.06019 139.79592 430.99805 135.84919 430.99805 130.11719 C 430.99805 113.12119 421.85166 94.622656 405.22266 84.597656 L 409.36719 56.5625 C 411.37419 42.9845 400.62256 30.705078 386.47656 30.705078 L 366.52148 30.705078 C 352.34948 30.705078 341.62686 43.0075 343.63086 56.5625 C 344.27686 60.9315 348.34284 63.960641 352.71484 63.306641 C 357.08484 62.660641 360.10498 58.593656 359.45898 54.222656 C 358.85998 50.172656 362.28948 46.703125 366.52148 46.703125 L 386.47656 46.703125 C 390.72056 46.703125 394.13606 50.184656 393.53906 54.222656 L 389.96484 78.402344 C 383.67084 76.932344 379.41719 77 375.11719 77 C 345.82819 77 322 100.82819 322 130.11719 L 322 155.88281 C 322 163.03781 323.43181 169.86361 326.00781 176.09961 C 320.01681 174.65361 318.69084 175 290.21484 175 C 296.99784 165.402 301 153.70789 301 141.08789 C 301 141.08789 300.9947 111.02384 300.9707 110.71484 C 300.3267 78.783844 274.16989 53 242.08789 53 C 235.92089 53 231.30956 52.891828 223.97656 54.673828 L 219.69531 25.703125 C 218.93031 20.531125 223.2388 16 228.7168 16 L 251.2832 16 C 256.7662 16 261.06869 20.536125 260.30469 25.703125 L 259.01172 34.451172 C 258.36572 38.822172 261.38586 42.889156 265.75586 43.535156 C 270.14986 44.186156 274.19484 41.162969 274.83984 36.792969 L 276.13281 28.042969 C 278.31781 13.266969 266.5912 -4.7369516e-15 251.2832 0 L 228.7168 0 z M 93.521484 30.705078 C 79.349484 30.705078 68.626859 43.0075 70.630859 56.5625 L 71.460938 62.169922 C 72.106938 66.540922 76.173922 69.566063 80.544922 68.914062 C 84.915922 68.268062 87.934109 64.200078 87.287109 59.830078 L 86.458984 54.222656 C 85.859984 50.172656 89.289484 46.703125 93.521484 46.703125 L 113.47656 46.703125 C 117.72056 46.703125 121.13606 50.184656 120.53906 54.222656 L 116.96875 78.382812 C 110.72275 76.934813 106.41619 77 102.11719 77 C 72.828187 77 49 100.82819 49 130.11719 L 49 155.88281 C 49 166.62781 52.217609 176.632 57.724609 185 L 35.523438 185 C 15.936437 185 4.7369516e-15 200.93644 0 220.52344 L 0 310.62305 C 0 320.63105 5.0216406 329.85583 13.431641 335.29883 C 14.775641 336.16883 16.280531 336.58203 17.769531 336.58203 C 25.719531 336.58203 28.801047 326.18923 22.123047 321.86523 C 18.288047 319.38423 16 315.18105 16 310.62305 L 16 220.52344 C 16 209.75844 24.758437 201 35.523438 201 L 44 201 L 44 364 C 44 368.418 47.582 372 52 372 L 89.802734 372 L 82.878906 431.36133 C 82.238906 436.85533 77.335609 441 71.474609 441 C 65.147609 441 60 436.14569 60 430.17969 L 60 399.96875 C 60 395.55075 56.418 391.96875 52 391.96875 C 47.582 391.96875 44 395.55075 44 399.96875 L 44 430.17969 C 44 444.96869 56.324609 457 71.474609 457 C 85.455609 457 97.190484 446.77384 98.771484 433.21484 L 105.91211 372 L 125.25781 372 C 129.67581 372 133.25781 368.418 133.25781 364 C 133.25781 359.582 129.67581 356 125.25781 356 L 60 356 L 60 293 L 100.48242 293 C 104.90042 293 108.48242 289.418 108.48242 285 C 108.48242 280.582 104.90042 277 100.48242 277 L 60 277 L 60 201 L 74.128906 201 C 82.261906 206.064 91.851187 209 102.11719 209 L 104.88281 209 C 112.04181 209 118.87037 207.56728 125.10938 204.98828 C 123.53238 211.47128 124 206.20825 124 315.78125 C 124 330.34325 133.714 342.67344 147 346.64844 L 147 430.17969 C 147 436.14669 141.85239 440.99805 135.52539 440.99805 C 129.66439 440.99805 124.76109 436.85438 124.12109 431.35938 L 121.47461 408.68555 C 120.96161 404.29555 116.97756 401.16306 112.60156 401.66406 C 108.21256 402.17606 105.07103 406.14811 105.58203 410.53711 L 108.22852 433.21289 C 109.81052 446.77489 121.54439 457 135.52539 457 C 150.67539 457 163 444.96869 163 430.17969 L 163 347.57227 C 166.954 346.92527 170.666 345.55552 174 343.60352 L 174 450.7168 C 174 466.8628 187.46944 480 204.02344 480 C 219.30244 480 232.12752 468.83434 233.85352 454.02734 L 236.99023 427.13086 C 237.50223 422.74286 234.36066 418.77177 229.97266 418.25977 C 225.58366 417.74677 221.61261 420.8893 221.09961 425.2793 L 217.96094 452.17578 C 217.17494 458.91778 211.18444 464.00195 204.02344 464.00195 C 196.29144 464.00195 190 458.04275 190 450.71875 L 190 295 L 257.61328 295 C 262.03128 295 265.61328 291.418 265.61328 287 C 265.61328 282.582 262.03128 279 257.61328 279 L 190 279 L 190 209.25781 C 190 204.83981 186.418 201.25781 182 201.25781 C 177.582 201.25781 174 204.83981 174 209.25781 L 174 315.78125 C 174 324.72325 166.72425 332 157.78125 332 L 156.21875 332 C 147.27675 332 140 324.72425 140 315.78125 L 140 214.18164 C 140 203.21464 147.78195 193.6637 158.50195 191.4707 C 162.83095 190.5847 165.62037 186.3573 164.73438 182.0293 C 163.84838 177.6993 159.61892 174.91588 155.29492 175.79688 C 154.85792 175.88587 154.42709 175.9878 153.99609 176.0918 C 156.57009 169.8578 158 163.03481 158 155.88281 C 158 128.60481 158.02931 129.96494 157.94531 129.21094 C 157.61931 126.25994 155.66595 123.63731 152.75195 122.57031 C 134.20095 115.77931 114.7465 112.93423 94.9375 114.11523 C 90.5265 114.37823 87.164734 118.16617 87.427734 122.57617 C 87.690734 126.98617 91.500672 130.34889 95.888672 130.08789 C 111.63267 129.15089 127.118 131.0805 142 135.8125 L 142 155.88281 C 142 176.34981 125.34981 193 104.88281 193 L 102.11719 193 C 81.650188 193 65 176.34981 65 155.88281 L 65 130.11719 C 65 109.65019 81.650188 93 102.11719 93 L 104.88281 93 C 113.00781 93 120.72145 95.574313 127.18945 100.44531 C 130.71645 103.10131 135.73358 102.39619 138.39258 98.867188 C 141.05058 95.339187 140.34345 90.322062 136.81445 87.664062 C 135.33145 86.547062 133.79656 85.524125 132.22656 84.578125 L 136.36914 56.5625 C 138.37614 42.9845 127.62452 30.705078 113.47852 30.705078 L 93.521484 30.705078 z"></path></svg>
          </button>
        </div>

        {#if nftOnSale}
          <div class="near-value justify-content-center mt-0 pb-3">
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
          </div>
        {:else}
          {#if nft.owner_id !== $near.user.id}
            <div class="near-value justify-content-center mt-5 pb-3">
              <b style="color: #585656;">not sale</b>
            </div>
          {/if}
        {/if}

        <div class="d-flex gap-3 justify-content-around pt-3" class:disabled={!$near.signedIn}>
          {#if nft.owner_id === $near.user.id}
          
            {#if nftOnSale}
              <div class="w-100">
                <div class="d-flex gap-3 justify-content-around">
                  <button class="btn btn-primary col" on:click={sellNft}>change price</button>
                  <button class="btn btn-primary col" on:click={transferNft}>transfer</button>
                </div>
                <div class="d-flex gap-3 justify-content-around pt-3">
                  <button class="btn btn-primary col">cancel price</button>
                  <button class="btn btn-primary col">rent</button>
                </div>
              </div>
            {:else}
              <button class="btn btn-primary col" on:click={sellNft}>sell</button>
              <button class="btn btn-primary col" on:click={transferNft}>transfer</button>
              <button class="btn btn-primary col">rent</button>
            {/if}
              
            
          {:else}
            <button class="btn btn-primary col" on:click={buyNft} class:disabled={!nftOnSale}>buy now</button>
            <button class="btn btn-primary col" on:click={offerNft}>make offer</button>
            <button class="btn btn-primary col" class:disabled={!nftOnSale} on:click={rentNft}>rent</button>
          {/if}
        </div>
      </div>
    </div>

    <div class="col-md-6 position-relative">

      <div class="mt-1">

        <TabContent>
          <TabPane tabId="stats" tab="Stats" active>
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
          </TabPane>
          <TabPane tabId="details" tab="Details">
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
          </TabPane>
        </TabContent>
      </div>

      <div class="mt-5">

        <TabContent>
          <TabPane tabId="alpha" tab="Offer history" active>
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
          </TabPane>
        </TabContent>

      </div>

      <InventoryModal bind:isOpen={openInventoryModal} />
      <ResourcesModal bind:isOpen={openResourcesModal} />
    </div>
  </section>
{/if}