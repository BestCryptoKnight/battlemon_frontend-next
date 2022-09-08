<script lang="ts">
  import Logo from '$src/components/Logo.svelte'
  import { page } from '$app/stores';
  import { near, signIn } from '$src/utils/near'

  const handleSignOut = () => {
    $near.wallet!.signOut(); 
    location.href = location.href
  }

</script>

<style>
  .btn-outline-light {
    border-radius: 10px;
    padding: 9px 20px;
    font-size: 17px;
    min-width: 200px;
  }
</style>

<nav class="navbar navbar-expand-lg sticky-top navbar-dark">
  <div class="container">
    <Logo />
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain" aria-controls="navbarMain" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarMain">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0 fs-5">
        <!-- <li class="nav-item">
          <a class="nav-link" class:active={$page.url.pathname === '/hub'}  href="/hub">NFT Hub</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" class:active={$page.url.pathname === '/history'} href="/history">History</a>
        </li> -->
      </ul>
      <ul class="navbar-nav mb-2 mb-lg-0 fs-5">
        
        <li class="nav-item dropdown">
          {#if $near.accountId}
            <button class="btn btn-lg btn-outline-light dropdown-toggle" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              {$near.accountId}
            </button>
            <ul class="dropdown-menu w-100" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href={"#"} on:click|preventDefault={handleSignOut}>Sign Out</a></li>
            </ul>
          {:else}
            <button class="btn btn-lg btn-outline-light" on:click={() => signIn()}>
              Sign In
            </button>
          {/if}
        </li>
      </ul>
    </div>
  </div>
</nav>