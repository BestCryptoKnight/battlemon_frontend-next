<script type="ts">
  import { onMount } from 'svelte'
  

  onMount(async () => {
    const { Model } = await import('../../utils/three-model')
    new Model('threejs')
  })
</script>

<style>
  #threejs {
    background: url('/img/postaments/1.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    height: 800px;
  }
</style>

<div id="threejs" >

</div>