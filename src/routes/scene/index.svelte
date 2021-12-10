<script type="ts">
  import { onMount } from 'svelte'
  

  onMount(async () => {
    await import('../../utils/three')
  })
</script>

<style>
  #threejs {
    background: url('/img/postaments/1.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
</style>

<div id="threejs">

</div>