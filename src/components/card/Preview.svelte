<script lang="ts">
  import Lemon from '$src/components/threejs/Lemon.svelte'
  import type { NFT } from '$src/utils/helpers'

  export let nft: NFT; 
</script>


<div class="img-box">
  <a href={`/card/${nft.token_id}`} style="user-select: none;-webkit-user-drag: none;">
    <Lemon nft={nft} />
  </a>
</div>