<script>
  import { onMount } from 'svelte'
  import near from '$src/utils/near'

  export let shortNft = null; 
  export let fullNft = null;
  
  onMount(async () => {
    if (shortNft) {
      fullNft = await $near.api.nftInfo(shortNft.token_id)
    }
  })
</script>

{#if fullNft}
  <div class="img-box">
    <a href={`/card/${fullNft.token_id}`}>
      <img class="cursor-pointer" src={`/img/${fullNft.token_id % 2}.jpg`} alt={fullNft.metadata.title} />
    </a>
  </div>
{/if}