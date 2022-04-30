<script>
  import { onMount } from 'svelte'

  onMount(async () => {
    const { Model } = await import('$src/components/threejs/mixer')
    new Model({
      dom: 'mixer',
      arena: '/models/burn_craft_mixer.glb',
      cam: 5,
      camPos: [10, -15, -25]
    })
  })
</script>

<style>
  .mixer {
    position: absolute;
    left: -6%;
    top: -20%;
    width: 100%;
    height: 100%;
  }
</style>

<div class="mixer" id="mixer">
</div>