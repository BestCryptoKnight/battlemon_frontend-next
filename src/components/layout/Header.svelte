<script type="ts">
  let openMainMenu: boolean = false;
  import near from '$src/utils/near'
  import { page } from '$app/stores';
  import Logo from './Logo.svelte';
  import Auth from './Auth.svelte';
  import ThemeSwitcher from '$src/components/layout/ThemeSwitcher.svelte'
</script>

<header class:nav-open={openMainMenu}>
  <div class="container">
    <div class="header-inner">
      <button class="nav-toggle" on:click={() => openMainMenu = !openMainMenu} class:active={openMainMenu}>
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
      </button>
    
      <a href="/" class="logo img-box">
        <Logo height={30} />
      </a>		
      
      <ThemeSwitcher />

      {#if $near.connected}
        <div class="nav-wrap">
          <nav class="nav">
            <ul class="nav-list">
              {#if $near.signedIn }
                <li class:active={$page.path === '/kitchen'}><a href={'/kitchen'}>Your Kitchen</a></li>
              {/if}
              <li class:active={$page.path === '/shop'}><a href={'/shop'}>Shop</a></li>
              <li class:active={$page.path === '/paid'}><a href={'/paid'}>Paid</a></li>
              <li><a href={'#'}>Game</a></li>
            </ul>
          </nav>

          <Auth />
        </div>
      {/if}
    </div>
  </div>
</header>