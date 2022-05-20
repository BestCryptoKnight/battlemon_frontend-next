<script>
  import { onMount } from 'svelte'
  import { clientLink } from '$src/utils/helpers'

  export const downloadClient = () => {
    location.href = clientLink()
  }

  onMount(async () => {
    const { Model } = await import('$src/components/threejs/download-building')
    new Model({
      dom: 'download-building',
      arena: '/models/DC_b.glb',
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
    display: block;
    cursor: pointer;
  }
</style>

<a class="download-building" id="download-building" on:click|preventDefault={downloadClient}>
</a>