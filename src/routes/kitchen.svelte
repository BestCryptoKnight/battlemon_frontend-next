<script type="ts">
  import near from '$src/utils/near'
  import { onMount } from 'svelte'
  import Preview from '$src/components/card/Preview.svelte'

  let listNft = []
  
  onMount(async () => {
    listNft = await $near.api.listNftByAccount($near.user.id)
  })
</script>

{#if !$near.signedIn }
  <h1>You need to sign in</h1>
{:else}
  <h1>Your kitchen</h1>

  <section class="catalog kitchen">			
    <div class="catalog-inner">
      <form class="catalog-sorting" action="">
        <ul class="sorting">
          <li class="active">Fighters</li>
          <li>Weapons</li>
          <li>Items</li>
          <li>Boosters</li>
          <li>Land</li>
          <li>Merchandise</li>
        </ul>
      </form>

      <div class="item-cards-wrap">
        {#each listNft as nft}
          <Preview fullNft={nft} />
        {/each}
        <div class="buy-more">
          <span class="button">{ listNft && listNft.length ? 'buy more' : 'buy first' }</span>
          <a href={"/shop"}>&nbsp;</a>
        </div>
      </div>
    </div>
  </section>
{/if}