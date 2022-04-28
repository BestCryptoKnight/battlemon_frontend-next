<script>
  import { onMount } from 'svelte'

  onMount(async () => {
    const { Model } = await import('$src/components/threejs/fans')
    new Model({
      dom: 'fans',
      model: '/models/bottom_house_fan.glb'
    })
  })
</script>

<style>
  .fans {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
</style>

<div class="fans" id="fans">
</div>