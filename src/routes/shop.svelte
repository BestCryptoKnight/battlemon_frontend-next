<script type='ts'>
  import { onMount } from 'svelte'
  import Filter from '$src/components/filter/Filter.svelte'
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
    <form class="catalog-sorting" action="">
      <ul class="sorting">
        <li class="active">Fighters</li>
        <li>Weapons</li>
        <li>Items</li>
        <li>Boosters</li>
        <li>Land</li>
        <li>Merchandise</li>
      </ul>

      <div class="serial-number">
        Serial number
      </div>
    </form>

    
    <div class="cards-wrap">
      {#each listNft as nft}
        <Preview fullNft={nft} />
      {/each}
    </div>
  </div>
</section>