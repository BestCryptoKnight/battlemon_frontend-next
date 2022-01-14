<script type="ts">
  import { onMount } from 'svelte'
  import threeStore from './store'

  export let nft;

  onMount(async () => {
    const { Model } = await import('$src/components/threejs/model')
    const model = new Model({
        dom: 'threejs',
        lemon: nft.token_id % 2 == 0 ? '/media/Lemon_mecho.glb' : '/media/octopus.glb',
        rightWeapon: '/media/turel.glb',
        leftWeapon: '/media/turel.glb',
        zoom: nft.token_id % 2 == 0 ? 34 : 46,
        weaponCoord: nft.token_id % 2 == 0 ? [1.05, 0.95, 0] : [1.05, 2.35, 0],
        translateY: nft.token_id % 2 == 0 ? -0.8 : -1.2
    })
    $threeStore.init(model)
  })
</script>

<style>
  .threejs-container {
    padding-top: 90%;
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

<div class="threejs-container">
  <img src="/img/postaments/1.png" alt="postament" style="width: 100%; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); "/>
  <div id="threejs" class="threejs">
    
  </div>
  <div id="loader" style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); ">
    <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  </div>
</div>