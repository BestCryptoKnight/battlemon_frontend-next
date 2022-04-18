<script lang="ts">
  import FilterWeapon from '$src/components/filter/FilterWeapon.svelte'
  import WeaponPreview from '$src/components/card/WeaponPreview.svelte'
  import TopMenu from '$src/components/filter/TopMenu.svelte'

  let images = ["mix1a.png", "Big_optic2a.png", "Big_optic1a.png", "10a.png","9a.png","8a.png", "7a.png", "6a.png", "5a.png", "2a.png", "1a.png"]
</script>

<section class="catalog">
  <FilterWeapon />
  <div class="catalog-inner">
    <TopMenu root="shop" />
     
    <div class="row mt-3">
      {#each images as image}
        <div class="col-12 col-md-3 mt-4">
          <WeaponPreview image={image} />
        </div>
      {/each}
    </div>
  </div>
</section>