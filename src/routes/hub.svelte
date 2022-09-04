<script lang="ts">
  import { onMount } from 'svelte'
  import Header from '$src/components/Header.svelte'
  import Loader from '$src/components/Loader.svelte';
  import Footer from '$src/components/Footer.svelte';
  import type { LemonNFT } from '$src/threejs/lemon'
  import { near, nftTokensForOwner, nftMintFull } from '$src/utils/near'

  let lemons: LemonNFT[] = [];

  onMount(async () => {
    await $near.connect()

    if ($near.accountId) {
      const nftTokens = await nftTokensForOwner($near.accountId) as LemonNFT[];
      lemons = nftTokens.filter(token => token?.model?.kind === 'lemon')
    }

    const { Model } = await import('$src/threejs/hub')
    new Model({
      lemons,
      dom: 'threejs',
      cam: 90,
      globalScale: 6,
      translateY: -6.87
    })
  })
</script>

<style>
  .home {
    background: #000 ;
    overflow: hidden; 
    height: 100vh;
    width: 100vw; 
  }
  .home-inner {
    height: 100vh;
    width: 101vw; 
    position: relative;
    margin: 0 auto; 
  }
  .layer {
    color: #fff;
    position: absolute;
  }
</style>

<div class="home">
  <div class="home-inner">
    
    <Header />
    <div class="container sticky-top text-center" style="z-index: 980;">
      <button class="btn btn-lg btn-light px-4" on:click={nftMintFull}>
        Mint new Lemon
      </button>
    </div>
    <div class="layer" style="top: 0%; width: 100%; height: 100vh;">
      <div id="threejs" style="position: absolute; left: 0; top: 0; width: 100%; height: 100%;"></div>
    </div>
  </div>

  <Loader />
  <Footer />
</div>
