<script type="ts">
  import { onMount } from 'svelte';
  import Header from '$src/components/layout/Header.svelte'
  import Footer from '$src/components/layout/Footer.svelte'
  import near from '$src/utils/near'

  onMount(async() =>{
    $near.connect()
  })
</script>

{#if $near.connected}
  <Header />
  <main>
    <div class='container'>
      <slot></slot>
    </div>
  </main>
  <Footer />
{/if}