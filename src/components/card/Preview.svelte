<script>
  import { onMount } from 'svelte'
  import near from '$src/utils/near'

  export let shortNft = null; 
  export let fullNft = null;
  fullNft.metadata.media = '/img/example.png'
  
  onMount(async () => {
    if (shortNft) {
      fullNft = await $near.api.nftInfo(shortNft.token_id)
    }
  })
</script>

{#if fullNft}
  <div class="img-box">
    <a href={`/card/${fullNft.token_id}`}>
      <img class="cursor-pointer" src={fullNft.metadata.media} alt={fullNft.metadata.title} />
    </a>
  </div>
{/if}