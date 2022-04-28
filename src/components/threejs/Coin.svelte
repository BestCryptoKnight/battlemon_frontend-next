<script>
  import { onMount } from 'svelte'

  onMount(async () => {
    const { Model } = await import('$src/components/threejs/coin')
    new Model({
      dom: 'coin',
      arena: '/models/coin_a.glb',
      cam: 5,
      camPos: [10, -15, -25]
    })
  })
</script>

<style>
  .coin {
    position: absolute;
    left: -1%;
    top: -10%;
    width: 100%;
    height: 100%;
  }
</style>

<div class="coin" id="coin">
</div>