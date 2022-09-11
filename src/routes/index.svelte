<script lang="ts">
  import { onMount } from 'svelte'
  import Loader from '$src/components/Loader.svelte';
  import Header from '$src/components/Header.svelte'
  import Footer from '$src/components/Footer.svelte';
  import type { LemonNFT } from '$src/utils/types'
  import { near, nftMintFull, nftTokensForOwner } from '$src/utils/near'

  let showMint = false
  let tutorialStep: string | null;
  let lemons: LemonNFT[] = []

  const handleMintNft = () => {
    if ($near.accountId) {
      localStorage.setItem('tutorialStep', 'nftHub')
    }
    nftMintFull()
  }

  onMount(async () => {
    await $near.connect()

    tutorialStep = localStorage.getItem('tutorialStep') || null;

    if ($near.accountId) {
      const nftTokens = await nftTokensForOwner($near.accountId) as LemonNFT[];
      lemons = nftTokens.filter(token => token?.model?.kind === 'lemon')
      if (lemons.length > 0 && tutorialStep == null) {
        tutorialStep = 'nftHub';
        localStorage.setItem('tutorialStep', 'nftHub');
      }
    }
    
    const { Model } = await import('$src/threejs/homepage')
    const scene = new Model({
      dom: 'threejs',
      model: '/models/MainMenu_Stripes_Export_lemonprise.glb?00001',
      hdr: '/models/venice_sunset_1k.hdr?00001',
      events: {
        onLoadModels: () => {
          showMint = true
        },
        onClickHub: () => {
          if (tutorialStep == 'nftHub') {
            localStorage.setItem('tutorialStep', 'downloadClient')
          }
        },
        onClickDownloadClient: () => {
          if (tutorialStep == 'downloadClient') {
            localStorage.setItem('tutorialStep', 'allStepsFinished09092022')
          }
        }
      }
    })
  })
</script>

<style>
  :global(.swal-modal) {
    background-color: rgba(255,255,255,0.84);
    border: 2px solid white;
  }
  :global(.swal-button--cancel) {
    background-color: #fff;
    border: 1px solid #888;
  }

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
    {#if showMint}
      {#if tutorialStep == null}
        <button class="btn btn-lg btn-light px-4 py-3 ms-2" on:click={handleMintNft} style="position: fixed; z-index: 1040; left: 50%; top: 50%; transform: translate(-50%, -50%);">
          Mint NFT (Testnet)
        </button>
      {/if}
      {#if tutorialStep == 'nftHub'}
        <button class="btn btn-lg btn-light pt-2 pb-3 ms-2" style="position: fixed; z-index: 1040; left: 50%; top: 50%; transform: translate(-50%, -50%);">
          <svg version="1.1" id="Layer_1" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          	 viewBox="0 0 330 330" style="enable-background:new 0 0 330 330;" xml:space="preserve">
            <path id="XMLID_29_" d="M100.606,100.606L150,51.212V315c0,8.284,6.716,15,15,15c8.284,0,15-6.716,15-15V51.212l49.394,49.394
            	C232.322,103.535,236.161,105,240,105c3.839,0,7.678-1.465,10.606-4.394c5.858-5.857,5.858-15.355,0-21.213l-75-75
            	c-5.857-5.858-15.355-5.858-21.213,0l-75,75c-5.858,5.857-5.858,15.355,0,21.213C85.251,106.463,94.749,106.463,100.606,100.606z"/>
            <g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
          </svg>
          <span class="d-block pt-2">Open NFT HUB</span>
        </button>
      {/if}
      {#if tutorialStep == 'downloadClient'}
        <button class="btn btn-lg btn-light pt-2 pb-3 ms-2" style="position: fixed; z-index: 1040; left: 50%; top: 50%; transform: translate(-50%, -50%);">
          <span class="d-block pb-1">Download Game <br /> Launcher</span>
          <svg version="1.1" id="Layer_1" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          	 viewBox="0 0 330 330" style="enable-background:new 0 0 330 330; transform: rotate(180deg);" xml:space="preserve">
            <path id="XMLID_29_" d="M100.606,100.606L150,51.212V315c0,8.284,6.716,15,15,15c8.284,0,15-6.716,15-15V51.212l49.394,49.394
            	C232.322,103.535,236.161,105,240,105c3.839,0,7.678-1.465,10.606-4.394c5.858-5.857,5.858-15.355,0-21.213l-75-75
            	c-5.857-5.858-15.355-5.858-21.213,0l-75,75c-5.858,5.857-5.858,15.355,0,21.213C85.251,106.463,94.749,106.463,100.606,100.606z"/>
            <g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
          </svg>
        </button>
      {/if}
    {/if}
    <div class="layer" style="top: 0%; width: 100%; height: 100vh;">
      <div id="threejs" style="position: absolute; left: 0; top: 0; width: 100%; height: 100%;"></div>
    </div>
  </div>

  <Loader />
  <Footer />
</div>