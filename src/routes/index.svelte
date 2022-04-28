<script lang="ts">
import { goto } from '$app/navigation';
import { onMount } from 'svelte'
import Logo from '$src/components/layout/Logo.svelte'
import Auth from '$src/components/layout/Auth.svelte'
import near from '$src/utils/near'
import Loader from '$src/components/layout/Loader.svelte';
import Mills from '$src/components/threejs/Mills.svelte';
import Arena from '$src/components/threejs/Arena.svelte';
import Coin from '$src/components/threejs/Coin.svelte';
import Coolers from '$src/components/threejs/Coolers.svelte';
import Fans from '$src/components/threejs/Fans.svelte';


onMount(async () => {
  $near.connect()
})
</script>

<style>
  .home {
    background: #54798d ;
    background-image: url(/img/home/main.jpg);
    background-size: cover;
    background-position: center;
    overflow: hidden; 
    height: 100vh;
    padding: 0 30px;
  }
  .home-inner {
    height: 100vh;
    max-width: 1760px; 
    position: relative;
    margin: 0 auto; 
  }
  .layer {
    position: absolute;
    cursor: pointer;    
  }
  .layer .img-hover {
    position: absolute;
    transition: all 0.3s;
    opacity: 0;
    z-index: 100;
  }
  .layer:hover .img-hover {
    opacity: 1;
  }

</style>


<div class="home">
  <div class="home-inner">
    <div class="layer" style="top: 63%; width: 100%;">
      <img class="img-fluid" src="/img/home/bottom-city.png" alt="Bottom City" style="position: absolute;" />
      <img class="img-fluid" src="/img/home/bottom-city-front.png" alt="Bottom City" style="position: relative;" />
      <Fans />
    </div>
    <div class="layer" style="top: 30%; width: 48%; transform: translate(-50%, -85%); left: 50%; max-width: 700px;" on:click={() => goto('/arena')}>
      <img class="img-fluid" src="/img/home/arena-back.png" alt="Arena" style="position: absolute; width: 100%;" />
      <Arena />
      <img class="img-fluid" src="/img/home/arena-front.png" alt="Arena" style="position: relative; z-index: 99; width: 100%;" />
      <img class="img-fluid img-hover" src="/img/home/arena-glow.png" alt="Arena Glow" style="position: absolute; width: 100%; z-index: 199; left: 0;"  />
    </div>
    <div class="layer stake" style="top: 53%; width: 23%; margin-top: -16%; right: 22%; animation: soaring-stake 4.5s infinite;">
      <Coin />
      <img class="img-fluid img-hover" src="/img/home/stake-glow.png" alt="Stake Glow" />
      <img class="img-fluid" src="/img/home/stake.png" alt="Stake" style="position: relative;" />
    </div>
    <div class="layer" style="top: 55%; width: 36%; margin-top: -22%; right: -3%; animation: soaring-stake 5s infinite;" on:click={() => goto('/shop')}>
      <img class="img-fluid img-hover" src="/img/home/shop-glow.png" alt="Shop Glow" />
      <img class="img-fluid" src="/img/home/shop.png" alt="Shop" />
      <Mills />
    </div>
    <div class="layer" style="top: 53%; width: 23%; margin-top: -13%; left: 22%; animation: soaring-stake 5.5s infinite;">
      <img class="img-fluid img-hover" src="/img/home/burn-glow.png" alt="Burn Glow" />
      <img class="img-fluid" src="/img/home/burn.png" alt="Burn" />
    </div>
    <div class="layer" style="top: 53%; width: 32%; margin-top: -21%; left: -3%; animation: soaring-stake 6s infinite;">
      <img class="img-fluid img-hover" src="/img/home/factory-glow.png" alt="Factory Glow" />
      <img class="img-fluid" src="/img/home/factory.png" alt="Factory" style="position: absolute;" />
      <img class="img-fluid" src="/img/home/factory-front.png" alt="Factory"  style="position: relative;" />
      <Coolers />
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