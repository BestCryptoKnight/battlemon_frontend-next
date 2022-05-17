<script>
  import { onMount } from 'svelte'

  const downloadClient = () => {
    let link = 'https://drive.google.com/uc?export=download&id=1v1Z2hbiWBO4Vk1Xihu6JrUi8T-lCHlNb'
    if (navigator.platform.indexOf('Mac') > -1) {
      link = 'https://drive.google.com/uc?export=download&id=1MXXLig1xHDSkolUvs7kRHPBSTFPPPxvR'
    }
    location.href = link
  }

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
    display: block;
    cursor: pointer;
  }
</style>

<a class="download-building" id="download-building" on:click|preventDefault={downloadClient}>
</a>