<script lang="ts">
  let openMainMenu: boolean = false;
  import { near } from '$src/utils/near'
  import { page } from '$app/stores';
  import Logo from './Logo.svelte';
  import shop from '$src/components/svg/shop';
  import guild from '$src/components/svg/guild';
  import lemon from '$src/components/svg/lemon'

  
</script>

<header class:nav-open={openMainMenu} >
  <div class="header-container" style="z-index: 20;">
    <div class="container">
      <div class="header-inner">
        <button class="nav-toggle" on:click={() => openMainMenu = !openMainMenu} class:active={openMainMenu}>
          <span class="line"></span>
          <span class="line"></span>
          <span class="line"></span>
        </button>
      
        <a href="/" class="logo-home text-center" style="position: static;">
          <Logo height={23} />
        </a>


        <div class="top-menu d-flex">
          {#if $near.accountId }
            <a class="btn btn-light d-flex one-width" href="/kitchen" class:active={$page.url.pathname === '/kitchen'}>
              <span class="icon" style="min-width: 22px; ">{@html lemon(32,22)}</span>
              <span class="">Your&nbsp;Kitchen</span>
            </a>
          {/if}
          <a class="btn btn-light d-flex one-width" href="/shop" class:active={$page.url.pathname === '/shop'}>
            <span class="icon" style="min-width: 22px; ">{@html shop}</span>
            <span class="w-100">Shop</span>
          </a>
          <a class="btn btn-light d-flex one-width" href="/paid" class:active={$page.url.pathname === '/paid'}>
            <span class="icon" style="min-width: 18px; "><svg width="16" height="16" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.42765 38.0705C5.05414 38.0705 5.67326 37.9359 6.2428 37.6759C6.81233 37.4159 7.31888 37.0365 7.72791 36.5637L37.5415 2.10778C37.1502 1.48385 36.606 0.969438 35.96 0.613021C35.314 0.256604 34.5876 0.0699198 33.8492 0.0705583C33.2262 0.0706607 32.6105 0.203793 32.0435 0.460984C31.4765 0.718175 30.9714 1.09345 30.5622 1.56153L0.597656 35.8143C0.973895 36.4984 1.52808 37.0688 2.20201 37.4659C2.87593 37.8629 3.64473 38.0717 4.42765 38.0705V38.0705Z" fill="url(#paint0_linear_3532:765)"></path><path d="M4.41392 38.0704C5.10617 38.0703 5.78836 37.9047 6.40365 37.5875V8.82365L29.4807 36.5161C29.8888 37.0038 30.3991 37.3959 30.9755 37.6645C31.552 37.9331 32.1804 38.0716 32.8163 38.0704H33.7267C34.8787 38.0704 35.9835 37.6128 36.7981 36.7982C37.6127 35.9836 38.0703 34.8788 38.0703 33.7268V4.41407C38.0703 3.26207 37.6127 2.15726 36.7981 1.34268C35.9835 0.528092 34.8787 0.0704636 33.7267 0.0704636C33.0348 0.0679257 32.3524 0.231739 31.737 0.548101V29.3252L8.6599 1.63268C8.25257 1.14353 7.74259 0.750001 7.16614 0.480017C6.58969 0.210034 5.96089 0.0702087 5.32434 0.0704636H4.41392C3.26193 0.0704636 2.15711 0.528092 1.34253 1.34268C0.527942 2.15726 0.0703125 3.26207 0.0703125 4.41407V33.7268C0.0703125 34.8788 0.527942 35.9836 1.34253 36.7982C2.15711 37.6128 3.26193 38.0704 4.41392 38.0704V38.0704Z" fill="#FFFFFF"></path><defs><linearGradient id="paint0_linear_3532:765" x1="1.34194" y1="36.796" x2="36.7951" y2="1.20852" gradientUnits="userSpaceOnUse"><stop offset="0.21" stop-color="#FFFFFF"></stop><stop offset="0.42" stop-color="#FFFFFF" stop-opacity="0"></stop><stop offset="0.59" stop-color="#FFFFFF" stop-opacity="0"></stop><stop offset="0.81" stop-color="#FFFFFF"></stop></linearGradient></defs></svg></span>
            <span class="nowrap">Paid</span>
          </a>
          <a class="btn btn-light d-flex one-width" href="/arena" class:active={$page.url.pathname === '/arena'}>
            <span class="icon" style="min-width: 21px; ">{@html guild}</span>
            <span class="w-100 nowrap">Arena</span>
          </a>

        </div>
      </div>
    </div>
  </div>
</header>