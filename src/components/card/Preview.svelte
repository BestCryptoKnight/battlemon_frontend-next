<script lang="ts">
  import { onMount } from 'svelte'
  import near from '$src/utils/near'
  import Lemon from '$src/components/threejs/Lemon.svelte'

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
    <a href={`/card/${fullNft.token_id}`} style="user-select: none;-webkit-user-drag: none;">
      <Lemon nft={fullNft} />
    </a>
  </div>
{/if}