<script type="ts">
  import { onMount } from 'svelte'
  import threeStore from './store'
  import lemons from './lemons'
import download from '../svg/download';

  export let nft;

  const lemonSettings = Object.values(lemons)[nft.token_id % 4]

  const backgrounds = [
    '/img/postaments/red.jpg',
    '/img/postaments/blue.jpg',
    '/img/postaments/green.jpg',
    '/img/postaments/lightblue.jpg',
    '/img/postaments/orange.jpg',
    '/img/postaments/purple.jpg',
    '/img/postaments/yellow.jpg'
  ]

  onMount(async () => {
    const { Model } = await import('$src/components/threejs/model')
    const model = new Model({
        dom: 'threejs',
        rightWeapon: '/media/turel.glb',
        leftWeapon: '/media/turel.glb',
        cam: 12,
        globalScale: 1,
        translateY: -1.27,
        background: backgrounds[nft.token_id % 7],
        lemonSettings
    })
    $threeStore.init(model)
  })
</script>

<style>
  .threejs-container {
    padding-top: 100%;
    position: relative;
  }
  .threejs {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
</style>

<!-- <div style="width: 30px; height: 30px; position: absolute; z-index: 100; left: 35px; top: 25px; color: rgba(255,255,255,0.3); cursor: pointer;" on:click={() => {$threeStore.model.screenShot(nft.token_id)}}>{@html download}</div> -->
<div class="threejs-container">
  <div id="threejs" class="threejs">
    
  </div>
  <div id="loader" style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); pointer-events: none;">
    <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  </div>
</div>