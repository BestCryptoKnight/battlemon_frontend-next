<script type="ts">
  import { onMount } from 'svelte'
  import lemons from '$src/components/threejs/lemons'
  import Logo from '$src/components/layout/Logo.svelte'
  import Auth from '$src/components/layout/Auth.svelte'
  import near from '$src/utils/near'

  const lemonSettings = lemons.octopus

  onMount(async () => {
    const { Model } = await import('$src/components/threejs/model')
    const model = new Model({
        dom: 'threejs',
        lemon: lemonSettings.model,
        rightWeapon: '/media/turel.glb',
        leftWeapon: '/media/turel.glb',
        cam: 70,
        globalScale: 5,
        scale: lemonSettings.scale,
        weaponCoord: lemonSettings.weaponCoord,
        translateY: -6.87,
        arenaBg: true,
        light: lemonSettings.light
    })
    $near.connect()
  })
</script>


<style>
  .threejs-container {
    position: relative;
    height: 100vh; 
    width: 100vw;
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
  <div id="loader" style="background: #000; position: absolute; left: 0; top: 0; height: 100%; width: 100%; pointer-events: none; transition: all 1s;">
    <div style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); ">
      <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  </div>


  <a href="/" class="logo-home">
    <Logo height={36} />
  </a>		

  <div class="auth-home">
    <Auth />
  </div>    
</div>