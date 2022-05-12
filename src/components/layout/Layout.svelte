<script lang="ts">
  import { onMount } from 'svelte';
  import Header from '$src/components/layout/Header.svelte'
  import Footer from '$src/components/layout/Footer.svelte'
  import near from '$src/utils/near'

  onMount(async() =>{
    $near.connect()
  })
</script>

<div class="parallax">
  <section id="s4" class="parallax__section">
    <div class="parallax__layer parallax__layer--back">
    </div>
    <div class="parallax__layer parallax__layer--base">
    </div>
    <div class="parallax__layer parallax__layer--front">		
      <Header />	
      <main>
        <div class='container' style="min-height: calc(100vh - 340px)">
          {#if $near.connected}
            <slot></slot>
          {/if}
        </div>
      </main>
      <Footer />
    </div>
  </section>
  

</div>