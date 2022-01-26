<script type="ts">
  import { onMount } from 'svelte'
  
  import { TabContent, TabPane } from 'sveltestrap'
  import lemons from '$src/components/threejs/lemons'
  import Logo from '$src/components/layout/Logo.svelte'
  import Auth from '$src/components/layout/Auth.svelte'
  import near from '$src/utils/near'
  import Preview from '$src/components/card/Preview.svelte'
  import type { Model } from '$src/components/threejs/model'

  let lemonSettings = lemons.octopus
  let model: Model | null = null
  let listNft = []
  let heroesDom = null

  const changeLemon = (nft) => async (e) => {
    e.preventDefault();
    if (model) {
      model.changeLemon(Object.values(lemons)[nft.token_id % 3])
    }
  }

  const toggleHeroes = (e) => {
    e.preventDefault();
    e.target.classList.toggle("active")
    if (e.target.classList.contains('active')) {
      heroesDom.style.right = '3%';
    } else {
      heroesDom.style.right = '-16%';
    }
  }

  onMount(async () => {
    const { Model } = await import('$src/components/threejs/model')
    model = new Model({
        dom: 'threejs',
        rightWeapon: '/media/turel.glb',
        leftWeapon: '/media/turel.glb',
        cam: 70,
        globalScale: 5,
        translateY: -6.87,
        arenaBg: true,
        lemonSettings
    })
    await $near.connect()
    const unsortedList = await $near.api.listNft({})
    listNft = unsortedList.sort((a,b) => a.token_id - b.token_id)

  })
</script>


<style>
  .threejs-container {
    position: relative;
    height: 100vh; 
    width: 100vw;
    overflow: hidden;
  }
  .threejs {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  .logo-home {
    position: absolute;
    top: 4%;
    left: 4%;
    color: #f0f0f0;
  }
  @media screen and (max-width:768px) {
    .logo-home {
      display: none;
    }
  }
  .auth-home {
    position: absolute;
    top: 3.8%;
    right: 3%;
  }
</style>

<div class="threejs-container">
  <div id="threejs" class="threejs">
    
  </div>

  <div bind:this={heroesDom} class="d-flex battle-arena" style="width: 15%;  bottom: 5%; top: calc(9% + 40px); right: -16%; position: absolute; transition: all 0.5s;">

      <TabContent class="d-flex flex-column" style="height: 96%; width: 100%;">
        <TabPane tabId="nft" tab="NFT" active class="h-100">
          <div style="height: 100%; background: rgba(255,255,255,0.2);  overflow: hidden scroll; border-radius: 0 0 0 8px;">
            {#each listNft as nft}
              <div class="col-12 cursor-pointer" on:click={changeLemon(nft)}>
                <div style="pointer-events: none;">
                  <Preview fullNft={nft} />
                </div>
              </div>
            {/each}
          </div>
        </TabPane>
        <TabPane tabId="game" tab="Game" class="h-100">
          <div style="height: 100%; background: rgba(255,255,255,0.2);  overflow: hidden scroll; border-radius: 0 0 0 8px;">
            {#each listNft.slice(3,6) as nft}
              <div class="col-12 cursor-pointer" on:click={changeLemon(nft)}>
                <div style="pointer-events: none;">
                  <Preview fullNft={nft} />
                </div>
              </div>
            {/each}
          </div>
        </TabPane>
      </TabContent>
  </div>

  <div id="loader" style="background: #000; position: absolute; left: 0; top: 0; height: 100%; width: 100%; pointer-events: none; transition: all 1s;">
    <div style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); ">
      <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  </div>


  <a href="/" class="logo-home">
    <Logo height={36} />
  </a>		

  <a href="http://161.156.38.90:5011/" class="btn btn-primary" style="position: absolute; left: 50%; top: 4%; transform: translate(-50%, 0); font-size: 23px; letter-spacing: 0.1; padding-left: 30px; padding-right: 30px;">FIGHT</a>

  <div class="auth-home d-flex">
    <button class="btn btn-light px-3 py-2" on:click={toggleHeroes}>My Heroes</button>
    &nbsp;&nbsp;
    <Auth light={true} />
  </div>    
</div>