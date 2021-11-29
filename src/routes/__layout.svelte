<script type="ts">
  import { onMount } from 'svelte';
  import Header from '$src/components/layout/Header.svelte'
  import near from '$src/utils/near'

  onMount(async() =>{
    $near.connect()
  })
</script>

{#if $near.connected}
  <Header />
  <slot></slot>
{/if}