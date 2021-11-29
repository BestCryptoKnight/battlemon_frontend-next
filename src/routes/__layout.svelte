<script type="ts">
  import { onMount } from 'svelte';
  import Header from '$src/components/layout/Header.svelte'
  import Footer from '$src/components/layout/Footer.svelte'
  import near from '$src/utils/near'

  onMount(async() =>{
    $near.connect()
  })
</script>

<Header />
<main>
  <div class='container'>
    {#if $near.connected}
      <slot></slot>
    {/if}
  </div>
</main>
<Footer />