<script lang="ts">
  import { onMount } from 'svelte'
  
  onMount(async () => {
    const { Model } = await import('$src/components/threejs/lemterprise')
    new Model({
      dom: 'lemterprise',
      arena: '/models/lemterprise_only.glb',
      cam: 28,
      camPos: [0, -10, 120]
    })
  })
</script>

<style>
  .lemterprise {
    position: absolute;
    left: 0; top: 0; width: 100%; height: 100%;
  }
</style>

<div class="lemterprise" id="lemterprise">
</div>