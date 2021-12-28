<script type="ts">
  import { onMount } from 'svelte'
  import Logo from '$src/components/layout/Logo.svelte'
  import Auth from '$src/components/layout/Auth.svelte'
  import near from '$src/utils/near'
  onMount(async () => {
    $near.connect()
  })
</script>

<style>
  .link {
    position: absolute;
    background: transparent;
    padding: 20px;
  }
  .logo-home {
    position: absolute;
    top: 4%;
    left: 4%;
  }
  .auth-home {
    position: absolute;
    top: 5%;
    right: 4%;
  }
  .home {
    overflow: hidden; 
    height: 100vh;
  }
  .home-inner {
    position: relative; 
    height: 100vh;
  }
  .home-image {
    position: relative; 
    left: 50%; 
    top: 50%; 
    transform: translate(-50%, -50%); 
    width: 120vw;
    height: 120vh;
    object-fit: cover;
  }
  .home-stake {
    transform: translate(-50%, -50%); 
    left: 67%; 
    top: 53%;
    position: absolute;
    width: 16%;
    object-fit: contain;
  }
  .home-shop {
    transform: translate(-50%, -50%); 
    left: 85%; 
    top: 58%;
    position: absolute;
    width: 45%;
    object-fit: contain;
  }
  .home-burn {
    transform: translate(-50%, -50%); 
    left: 32%; 
    top: 51%;
    position: absolute;
    width: 18%;
    object-fit: contain;
  }
  .home-factory {
    left: 0; 
    top: 0;
    position: absolute;
    width: 49.8%;
    height: 100%;
    object-fit: contain;
  }

  .shop-lights {
    transform: translate(-50%, -50%); 
    left: 83%; 
    top: 48.6%;
    position: absolute;
    width: 30%;
    object-fit: contain;
    opacity: 0;
    transition: 0.2s;
  }


  .shop-lights-link {
    position: absolute;
    left: 71.4%; 
    top: 20.8%; 
    width: 28%; 
    height: 45%;
    z-index: 10;
  }

  .shop-lights-link:hover + .shop-lights {
    opacity: 0.3;
  }
</style>


<div class="home">
  <div class="home-inner">
    <img src="/img/home/main.jpg" class="home-image" alt="Home page">
    <img src="/img/home/stake.png" class="home-stake" alt="Home stake">
    <img src="/img/home/shop.png" class="home-shop" alt="Home shop">
    <img src="/img/home/burn.png" class="home-burn" alt="Home burn">
    <img src="/img/home/factory.png" class="home-factory" alt="Home factory">

    <a href="/" class="logo-home" style="color: #f0f0f0;">
      <Logo height={50} />
    </a>		

    <div class="auth-home">
      <Auth />
    </div>

    <a href="/shop" class="shop-lights-link">&nbsp;</a>
    <img src="/img/home/shop_lights.png" class="shop-lights" alt="shop lights">

  </div>
</div>