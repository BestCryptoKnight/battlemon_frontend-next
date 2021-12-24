<script type="ts">
  import { onMount } from 'svelte'
  import Logo from '$src/components/layout/Logo.svelte'
  import Auth from '$src/components/layout/Auth.svelte'
  import near from '$src/utils/near'
  onMount(async () => {
    $near.connect()
    const imageMapResize = (await import('image-map-resizer/js/imageMapResizer')).default
    imageMapResize();
  })
</script>

<style>
  .link {
    position: absolute;
    background: transparent;
    padding: 20px;
    transition: 0.3s;
    cursor:url(/img/cash-on-delivery.png), auto;
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
</style>


<div style="position: relative">
  <a href="/" class="logo-home" style="color: #f0f0f0;">
    <Logo height={50} />
  </a>		

  <div class="auth-home">
    <Auth />
  </div>

  <img src="/img/home_main_image.jpg" usemap="#image-map" alt="Home page" class="img-fluid">

  <a href="/shop" class="link clip" style="left: 71.4%; top: 20.8%; width: 28%; height: 45%;">&nbsp;</a>
</div>