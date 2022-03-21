<script>
  import { onMount } from 'svelte'

  onMount(async () => {
    const { Model } = await import('$src/components/threejs/mills')
    new Model({
      dom: 'shop',
      model: '/constructor/assets/models/vetrak.glb'
    })
  })
</script>

<style>
  .shop {
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
</style>

<div class="shop" id="shop">
</div>