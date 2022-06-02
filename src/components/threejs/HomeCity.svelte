<script>
  import { onMount } from 'svelte'
  
  onMount(async () => {
    const { Model } = await import('$src/components/threejs/homecity')
    new Model({
      dom: 'homecity',
      arena: '/models/MainMenu_Stripes_animated.glb',
      cam: 28,
      camPos: [0, -10, 120]
    })
  })
</script>

<style>
  .homecity {
    position: absolute;
    left: 0; top: 0; width: 100%; height: 100%;
  }
</style>

<div class="homecity" id="homecity">
</div>