<script lang="ts">
  import { onMount } from 'svelte';
  import Header from '$src/components/layout/Header.svelte'
  import { near } from '$src/utils/near'

  onMount(async() =>{
    $near.connect()
  })
</script>

<Header />	
<main>
  <div class='container' style="min-height: calc(100vh - 340px); padding-top: 80px;">
    {#if $near.connected}
      <slot></slot>
    {/if}
  </div>
</main>