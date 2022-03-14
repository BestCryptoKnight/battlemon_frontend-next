<script type="ts">
import { goto } from '$app/navigation';
import { onMount } from 'svelte'
import Logo from '$src/components/layout/Logo.svelte'
import Auth from '$src/components/layout/Auth.svelte'
import near from '$src/utils/near'
import Arena from '$src/components/threejs/Arena.svelte'
import Coolers from '$src/components/threejs/Coolers.svelte'
import Loader from '$src/components/layout/Loader.svelte';


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
    width: 100vw;
    height: 120vh;
    font-size: 0;
    transform: translateY(-50%);
  }
  .static {
    position: static;
  }
  .home {
    background: #54798d ;
    background: linear-gradient(to bottom, #626690 0%,#517586  50%,#517586  50%,#517586  100%);
    overflow: hidden; 
    height: 100vh;
  }
  .home-inner {
    position: relative; 
    left: 50%; 
    top: 50%; 
    transform: translate(-50%, -50%); 
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

  <div class="home-inner">
    <div class="layer static">
      <img src="/img/home2/plan_gorod.png" class="w-100" alt="img" style="opacity: 0;">
    </div>
    <div class="layer">
      <img src="/img/home2/plan_gorod.png" class="w-100" alt="img">
    </div>
    <div class="layer">
      <img src="/img/home2/plan_gorod(big_zdania).png" class="w-100" alt="img">
    </div>
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
    </div>
    <div class="layer">
      <img src="/img/home2/cloud-bottom.png" class="w-100" alt="img">
    </div>
    <div class="home-arena cursor-pointer" on:click={() => goto('/arena')}>
    </div>
    <div class="home-shop cursor-pointer" on:click={() => goto('/shop')}>
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