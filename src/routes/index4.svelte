<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte'
  import near from '$src/utils/near'
  import Arena from '$src/components/threejs/Arena.svelte'
  import Coolers from '$src/components/threejs/Coolers.svelte'
  import Loader from '$src/components/layout/Loader.svelte';
  import Mills from '$src/components/threejs/Mills.svelte';
  import Auth from '$src/components/layout/Auth.svelte'
  
  
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
    .home {
      background: #54798d ;
      background-image: url(/img/home2/sky.png);
      background-size: cover;
      background-position: center;
      overflow: hidden; 
      height: 100vh;
    }
    .home2 {
      background-image: url(/img/index/litle_town.png);
      background-size: 120%;
      background-position: center;
      overflow: hidden; 
      height: 100vh;
    }
    .home-inner {
      position: relative;
      height: 100vh;
      background-image: url(/img/index/litle_town2.png);
      background-size: 130%;
      background-position: center 30%;
    }
    .fluid-img {
    }
    
    .index {
      height: 100vh;
      width: 100vw;
      overflow: hidden;
      position: absolute;
      top: 0;
      left: 0;
    }

    .index-container {
      position: absolute;
      left:50%;
      transform: translateX(-50%);
      top:0;
      z-index: 1;
      width: 110%;
      height: 120%;
      max-width: 2000px;
    }

    .index-image {
      position: absolute;
    }

    .index-image-container {
      position: relative;
      cursor: pointer;
    }
    .index-image-container .hover-img {
      opacity: 0;
      position: absolute;
      transition: 0.5s all;
    }
    .index-image-container:hover .hover-img {
      opacity: 1;
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
          <img src="/img/index/One_ring.png" class="w-100" alt="img" style="margin-left: -0.5%;">
        </div>
        <div class="layer">
          <Arena />
        </div>
        <!-- <div class="home-arena cursor-pointer" on:click={() => goto('/arena')}>
        </div>
        <div class="home-shop cursor-pointer" on:click={() => goto('/shop')}>
        </div> -->
      </div>
    </div>
  
    <div class="index">
      <div class="index-container">
        <div class="index-image" style="right: 34%; top: 59%;">
          <div class="index-image-container"><img src="/img/index/stake2-bot.png" class="fluid-img" alt="img"></div>
        </div>
        <div class="index-image" style="left: 18%; top: 61%;">
          <div class="index-image-container"><img src="/img/index/burn-bot.png" class="fluid-img" alt="img"></div>
        </div>
        <div class="index-image" style="right: 26%; top: 61%;">
          <div class="index-image-container"><img src="/img/index/stake-bot.png" class="fluid-img" alt="img"></div>
        </div>
        <div class="index-image" style="left: 48%; top: 67%; transform: rotate(-5deg); margin-left: -500px;">
          <div class="index-image-container"><img src="/img/index/most.png" class="fluid-img" alt="img"></div>
        </div>
        <div class="index-image" style="left: 18%; top: 61%;">
          <div class="index-image-container"><img src="/img/index/burn-bot-r.png" class="fluid-img" alt="img"></div>
        </div>
        <div class="index-image" style="right: 26%; top: 61%;">
          <div class="index-image-container"><img src="/img/index/stake-bot-l.png" class="fluid-img" alt="img"></div>
        </div>
        <div class="index-image" style="left: 5%; top: 69%;">
          <div class="index-image-container">
            <img src="/img/index/factory-bot.png" class="fluid-img" alt="img">
          </div>
        </div>
        <div class="index-image" style="right: 8%; top: 68%;">
          <div class="index-image-container">
            <img src="/img/index/shop-bot.png" class="fluid-img" alt="img">
          </div>
        </div>
        <div class="index-image" style="left: 18%; top: 39%;">
          <div class="index-image-container">
            <img src="/img/index/burn-glow.png" class="hover-img" alt="img">
            <img src="/img/index/burn.png" class="fluid-img" alt="img">
          </div>
        </div>
        <div class="index-image" style="left: 5%; top: 24%;">
          <div class="index-image-container">
            <img src="/img/index/factory-glow.png" class="hover-img" alt="img">
            <img src="/img/index/factory.png" class="fluid-img" alt="img">
          </div>
        </div>
        <div class="index-image" style="right: 24%; top: 41%;">
          <div class="index-image-container">
            <img src="/img/index/stake-glow.png" class="hover-img" alt="img">
            <img src="/img/index/stake.png" class="fluid-img" alt="img">
          </div>
        </div>
        <div class="index-image" style="right: 8%; top: 28%;">
          <div class="index-image-container" on:click={() => goto('/arena')} >
            <img src="/img/index/shop-glow.png" class="hover-img" alt="img">
            <img src="/img/index/shop.png" class="fluid-img" alt="img">
            <Mills />
          </div>
        </div>
      </div>
    </div>
    <Loader />

    <div class="home-arena cursor-pointer" on:click={() => goto('/arena')} style="z-index: 15; height: 40%; padding: 0;">
    </div>
  
  </div>
  <div class="auth-home" style="position: absolute; z-index: 20;">
    <Auth light={true} />
  </div>  