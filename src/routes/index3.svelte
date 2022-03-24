<script type="ts">
import { goto } from '$app/navigation';
import { onMount } from 'svelte'
import Logo from '$src/components/layout/Logo.svelte'
import Auth from '$src/components/layout/Auth.svelte'
import near from '$src/utils/near'
import Arena from '$src/components/threejs/Arena.svelte'
import Coolers from '$src/components/threejs/Coolers.svelte'
import Loader from '$src/components/layout/Loader.svelte';
import Mills from '$src/components/threejs/Mills.svelte';


onMount(async () => {
  $near.connect()
  await import("@lottiefiles/lottie-player");
})
</script>

<style>
  .layer {
    left: 0; 
    top: 50%;
    position: absolute;
    width: 100%;
    height: 120%;
    font-size: 0;
    transform: translateY(-50%);
  }
  .static {
    position: static;
  }
  .home {
    background: #54798d ;
    background-image: url(/img/home2/sky.png);
    background-size: cover;
    background-position: center;
    overflow: hidden; 
    height: 100vh;
  }
  .home2 {
    background-image: url(/img/home2/gorod.png);
    background-size: cover;
    background-position: center;
    overflow: hidden; 
    height: 100vh;
  }
  .home-inner {
    position: relative;
    height: 100vh;
  }
  .home-shop {
    left: 66.2%; 
    top: 48.5%;
    position: absolute;
    width: 38.8%;
    font-size: 0;
    padding-bottom: 20%;
  }  
  .home-arena {
    transform: translateX(-50%); 
    left: 50.3%; 
    top: 0.8%;
    position: absolute;
    width: 55.8%;
    padding-bottom: 30%;
    font-size: 0;
  }

</style>


<div class="home">
  <div class="home2">
    <div class="home-inner" style="max-width: 1600px; margin: 0 auto; position: relative;">
      <div class="layer">
        <img src="/img/home2/One_ring.png" class="w-100" alt="img" style="margin-left: -0.5%;">
      </div>
      <div class="layer">
        <Arena />
      </div>
      <div class="layer">
        <img src="/img/home2/Nizhnie_zdanie4.png" class="w-100" alt="img">
      </div>
      <div class="layer">
        <img src="/img/home2/Nizhnie_zdanie3.png" class="w-100" alt="img">
      </div>
      <div class="layer">
        <img src="/img/home2/most.png" class="w-100" alt="img">
      </div>
      <div class="layer">
        <img src="/img/home2/cloud-most.png" class="w-100" alt="img">
      </div>
      <div class="layer">
        <img src="/img/home2/Nizhnie_zdanie2.png" class="w-100" alt="img">
      </div>
      <div class="layer">
        <img src="/img/home2/Nizhnie_zdanie1.png" class="w-100" alt="img">
      </div>
      <div class="layer">
        <img src="/img/home2/Stake.png" class="w-100" alt="img">
      </div>
      <div class="layer">
        <img src="/img/home2/Bern.png" class="w-100" alt="img">
      </div>
      <div class="layer">
        <img src="/img/home2/cloud-truba.png" class="w-100" alt="img">
      </div>
      <div class="layer">
        <img src="/img/home2/Zavod.png" class="w-100" alt="img">
        <Coolers />
      </div>
      <div class="layer">
        <img src="/img/home2/Shop.png" class="w-100" alt="img">
        <Mills />
      </div>
      <div class="layer">
        <img src="/img/home2/cloud-bottom.png" class="w-100" alt="img">
      </div>
      <div class="home-arena cursor-pointer" on:click={() => goto('/arena')}>
      </div>
      <div class="home-shop cursor-pointer" on:click={() => goto('/shop')}>
      </div>
    </div>
  </div>

  <Loader />

  <a href="/" class="logo-home">
    <Logo height={24} />
  </a>		

  <div class="auth-home">
    <Auth light={true} />
  </div>  


</div>