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

<div class="card-preview">
  {#if fullNft}
    <div class="img-box">
      <picture class="lazy">
        <img src={fullNft.metadata.media} alt={fullNft.metadata.title} />
      </picture>
    </div>
    <a href={`/card/${fullNft.token_id}`} rel="external">&nbsp;</a>
  {/if}
</div>