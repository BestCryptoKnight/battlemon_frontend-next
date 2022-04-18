<script lang="ts">
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
  .home {
    background: #626690;
    background: linear-gradient(to bottom, #626690 0%,#626690 50%,#6a90b1 50%,#6a90b1 100%);
    overflow: hidden; 
    height: 100vh;
  }
  .home-inner {
    position: relative; 
    left: 50%; 
    top: 50%; 
    transform: translate(-50%, -50%); 
  }
  .home-image {
    position: relative; 
    width: 100%;
    font-size: 0;
  }
  .home-secondary {
    left: 0; 
    bottom: 0;
    position: absolute;
    width: 100%;
    font-size: 0;
  }
  .home-stake {
    transform: translate(-50%, -50%); 
    left: 66.25%; 
    top: 52%;
    position: absolute;
    width: 18.5%;
    font-size: 0;
  }
  .home-shop {
    transform: translate(-50%, -50%); 
    left: 79.2%; 
    top: 52.5%;
    position: absolute;
    width: 38.8%;
    font-size: 0;
  }
  .home-burn {
    transform: translate(-50%, -50%); 
    left: 28.3%; 
    top: 51.75%;
    position: absolute;
    width: 25.6%;
    font-size: 0;
  }
  .home-factory {
    transform: translate(-50%, -50%); 
    top: 41.5%;
    left: 17.6%; 
    position: absolute;
    width: 35.8%;
    font-size: 0;
  }
  .bottom-gradient {
    background: linear-gradient(to bottom, rgba(152,154,160,0) 0%,rgba(106,144,177,1) 100%); 
    position: absolute; 
    bottom: -1px; 
    width: 100%; 
    left: 0; 
    height: 50px;
  }
  
  .home-arena {
    transform: translate(-50%, -50%); 
    left: 52.3%; 
    top: 33.8%;
    position: absolute;
    width: 52.8%;
    font-size: 0;
  }
  .home-bottom-clouds {
    right: 0; 
    bottom: 0;
    position: absolute;
    width: 100%;
    pointer-events: none;
  }

  .home-top-clouds {
    left: 59%; 
    top: 30%;
    position: absolute;
    width: 80%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
  .lottie {
    position: absolute;
    left: 0; 
    top: 0;
    width: 100%;
    height: 100%;
  }
  @media screen and (max-width:768px) {
    .auth-home {
      top: 1%;
    }
    .home-secondary {
      top: 52%;
      left: 1%;
      bottom: auto;
    }
    .home-burn {
      left: 28%; 
      top: 40%;
      width: 50%;
    }
    .home-factory {
      width: 80%;
      top: 50%;
      left: 10%; 
    }
    
    .home-stake {
      left: 72.25%; 
      top: 43%;
      width: 32.5%;
    }
    .home-shop {
      left: 79.2%; 
      top: 82.5%;
      width: 67.8%;
    }
    .home-bottom-clouds {
      bottom: -63%;
      transform: scale(2.8, 2.3);
      top: auto;
      right: auto;
      left: 7%;
    }
    .bottom-gradient {
      bottom: -94.6%;
      top: auto;
    }
    .home-arena {
      left: 52.3%; 
      top: -5.8%;
      width: 69.8%;
    }
    .home-top-clouds {
      top: -5.8%;
    }
  }
</style>


<div class="home">

  <div class="home-inner">
    <img src="/img/home/main.jpg" class="home-image" alt="Home page">
    <div class="home-arena cursor-pointer" on:click={() => goto('/arena')}>
      <img src="/img/home/arena.png" class="w-100" alt="Home arena">
      <Arena />
      <img src="/img/home/whitelightning.png" style="position: absolute; left: 50%; top:78%; transform: translate(-50%, -50%); width: 34%" alt="Home arena">
      <lottie-player
        autoplay
        loop
        mode="normal"
        src="/lottie/molnii.json"
        class="lottie"

      >
      </lottie-player> 
    </div>
    <img src="/img/home/secondary.png" class="home-secondary" alt="Home secondary">
    <div class="home-stake cursor-pointer">
      <img src="/img/home/stake5.gif" class="w-100" alt="Home stake">
      <img src="/img/home/stake2.png" class="lottie" alt="Home stake">
    </div>
    <div class="home-shop cursor-pointer" on:click={() => goto('/shop')}>
      <img src="/img/home/shop.png" class="w-100" alt="Home shop">
      <lottie-player
        autoplay
        loop
        mode="normal"
        src="/lottie/shop.json"
        class="lottie"

      >
      </lottie-player>      
    </div>
    <div class="home-burn cursor-pointer">
      <img src="/img/home/burn.png" class="w-100" alt="Home burn">
      <lottie-player
        autoplay
        loop
        mode="normal"
        src="/lottie/burn.json"
        class="lottie"

      >
      </lottie-player>   
    </div>
    <div class="home-factory cursor-pointer">
      <img src="/img/home/factory.png" class="w-100" alt="Home factory">
      <Coolers />
      <lottie-player
        autoplay
        loop
        mode="normal"
        src="/lottie/factory.json"
        class="lottie"

      >
      </lottie-player>   
      <img src="/img/home/factorytop.png" class="lottie" alt="Home factory">
    </div>
    <img src="/img/home/bottom_clouds.png" class="home-bottom-clouds" alt="Home bottom clouds">
    <img src="/img/home/top-clouds.png" class="home-top-clouds" alt="Home top clouds">
    <div class="bottom-gradient"></div>

  </div>

  <Loader />

  <a href="/" class="logo-home">
    <Logo height={24} />
  </a>		

  <div class="auth-home">
    <Auth light={true} />
  </div>  


</div>