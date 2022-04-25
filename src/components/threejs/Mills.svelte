<script>
  import { onMount } from 'svelte'

  onMount(async () => {
    const { Model } = await import('$src/components/threejs/mills')
    new Model({
      dom: 'shop',
      model: '/models/windmill_propeller.glb'
    })
  })
</script>

<style>
  .shop {
    position: absolute;
    right: 0;
    
    bottom: 0px;
    width: 100%;
    height: 110%;
  }
</style>

<div class="shop" id="shop">
</div>