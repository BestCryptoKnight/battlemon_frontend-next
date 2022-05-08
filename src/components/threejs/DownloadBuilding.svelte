<script>
  import { onMount } from 'svelte'

  onMount(async () => {
    const { Model } = await import('$src/components/threejs/download-building')
    new Model({
      dom: 'download-building',
      arena: '/models/dowload_building.glb',
      cam: 3,
      camPos: [-12, -50, -10]
    })
  })
</script>

<style>
  .download-building {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>

<div class="download-building" id="download-building">
</div>