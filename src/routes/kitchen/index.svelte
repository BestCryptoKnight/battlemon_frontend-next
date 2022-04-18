<script lang="ts">
  import TopMenu from '$src/components/filter/TopMenu.svelte'
  import near from '$src/utils/near'
  import { onMount } from 'svelte'
  import Preview from '$src/components/card/Preview.svelte'

  let listNft = []
  
  onMount(async () => {
    listNft = await $near.api.listNftByAccount($near.user.id)
  })
</script>

<style>
  .buy-more {
    background-color: var(--opacity-bg);
    border-radius: 15px;
    min-height: 150px;
  }
</style>

{#if !$near.signedIn }
  <h1>You need to sign in</h1>
{:else}
  <h1>Your kitchen</h1>

  <section class="mt-4">
    <div class="text-center">
      <TopMenu root="kitchen" />
    </div>

    <div class="row">
      {#each listNft as nft}
        <div class="col-12 col-md-3 mt-5">
          <Preview fullNft={nft} />
        </div>
      {/each}
      <div class="col-12 col-md-3 mt-5 d-flex align-items-stretch">
        <div class="buy-more flex-grow-1 d-flex justify-content-center align-items-center">
          <a href={'/shop/items'} class="btn btn-primary">Buy more</a>
        </div>
      </div>
    </div>
  </section>
{/if}