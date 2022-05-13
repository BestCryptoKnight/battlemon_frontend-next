<script lang="ts">
  let openMainMenu: boolean = false;
  import near from '$src/utils/near'
  import { page } from '$app/stores';
  import Logo from './Logo.svelte';
  import Auth from './Auth.svelte';
  import { onMount } from 'svelte'

  let headerContainer: HTMLElement;

  onMount(() => {
    const listener = () => {
        if (window.scrollY > 140) {
          if (!headerContainer.classList.contains('black')) {
            headerContainer.classList.add('black')
          }
        } else {
          headerContainer.classList.remove('black')
        }
      };
    window.addEventListener("scroll", listener);
  })
  
</script>

<header class:nav-open={openMainMenu} >
  <div class="header-container" style="z-index: 20;" bind:this={headerContainer}>
    <div class="container">
      <div class="header-inner">
        <button class="nav-toggle" on:click={() => openMainMenu = !openMainMenu} class:active={openMainMenu}>
          <span class="line"></span>
          <span class="line"></span>
          <span class="line"></span>
        </button>
      
        <a href="/" class="logo-home text-center" style="position: static;">
          <Logo height={23} />
        </a>

        {#if $near.connected}
          <div class="nav-wrap">
            <nav class="nav pe-5 me-4">
              <ul class="nav-list">
                {#if $near.signedIn }
                  <li class:active={$page.url.pathname === '/kitchen'}><a href={'/kitchen'}>Your&nbsp;Kitchen</a></li>
                {/if}
                <li class:active={$page.url.pathname === '/shop'}><a href={'/shop'}>Shop</a></li>
                <li class:active={$page.url.pathname === '/paid'}><a href={'/paid'}>Paid</a></li>
                <li><a href={'/arena'}>Game</a></li>
              </ul>
            </nav>

            <Auth />
          </div>
        {/if}
      </div>
    </div>
  </div>
</header>