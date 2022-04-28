<script>
  import { onMount } from 'svelte'

  onMount(async () => {
    const { Model } = await import('$src/components/threejs/arena')
    new Model({
      dom: 'arena',
      arena: '/models/arena_juicer.glb',
      cam: 16.5,
      camPos: [0, 5, -25]
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