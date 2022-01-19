<script>
  import { onMount } from 'svelte'

  onMount(async () => {
    const { Model } = await import('$src/components/threejs/arena')
    new Model({
      dom: 'arena',
      arena: '/media/two_ring.glb',
      cam: 28,
      camPos: [0, 0, -25],
      scale: 1
    })
  })
</script>

<style>
  .arena {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
</style>

<div class="arena" id="arena">
</div>