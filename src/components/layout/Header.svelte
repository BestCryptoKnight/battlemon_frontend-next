<script type="ts">
  let openMenu: boolean = false;
  import near from '$src/utils/near'
</script>

<header class:nav-open={openMenu}>
  <div class="container">
    <div class="header-inner">
      <button class="nav-toggle" on:click={() => openMenu = !openMenu} class:active={openMenu}>
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
      </button>
    
      <a href="/" class="logo img-box">
        <img src="/img/logo.png" alt="Battlemon">
      </a>		

      <div class="nav-wrap">
        <nav class="nav">
          <ul class="nav-list">
            <li><a href={'#'}>Your Kitchen</a></li>
            <li><a href={'#'}>Shop</a></li>
            <li><a href={'#'}>Paid</a></li>
            <li><a href={'#'}>Info</a></li>
            <li><a href={'#'}>Game</a></li>
          </ul>
        </nav>

        <button class="login-form-toggle btn">
          {#if $near.signedIn }
            <span>{ $near.signedAccountId }</span>
          {:else}
            <span on:click={() => $near.api.signIn()}>Sign In</span>
          {/if}
        </button>
      </div>
    </div>
  </div>
</header>