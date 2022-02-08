<script type='ts'>
  import { onMount } from 'svelte'
  import Filter from '$src/components/filter/Filter.svelte'
  import TopMenu from '$src/components/filter/TopMenu.svelte'
  import near from '$src/utils/near'
  import Preview from '$src/components/card/Preview.svelte'

  let listNft = []

  onMount(async () => {
    listNft = await $near.api.listNft({})
  })
</script>

<section class="catalog">
  <Filter />
  <div class="catalog-inner">
    <div class="mx-auto" style="max-width: 560px; top: -40px; position: relative;">
      <img src="/img/lemon-party.png" alt="lemon-party" class="img-fluid" />
    </div>
    <div class="text-center">
      <TopMenu root="shop" />
    </div>
    <div class="row">
      {#each listNft as nft}
        <div class="col-12 col-md-4 mt-4">
          <Preview fullNft={nft} />
        </div>
      {/each}
    </div>
  </div>
</section>