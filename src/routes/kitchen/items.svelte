<script lang="ts">
  import TopMenu from '$src/components/filter/TopMenu.svelte'
  import WeaponPreview from '$src/components/card/WeaponPreview.svelte'
  import near from '$src/utils/near'

  let images = ["Big_optic1a.png", "10a.png","9a.png","8a.png"]
</script>

<style>
  .buy-more {
    background-color: var(--opacity-bg);
    border-radius: 15px;
    min-height: 150px;
  }
</style>

{#if !$near.signedIn }
  <h1>You need to sign in</h1>
{:else}
  <h1>Your kitchen</h1>

  <section class="mt-4">
    <div class="text-center">
      <TopMenu root="kitchen" />
    </div>

    <div class="row mt-3">
      {#each images as image}
        <div class="col-12 col-md-3 mt-4">
          <WeaponPreview image={image} />
        </div>
      {/each}
      <div class="col-12 col-md-3 mt-4 d-flex align-items-stretch">
        <div class="buy-more flex-grow-1 d-flex justify-content-center align-items-center">
          <a href={'/shop/items'} class="btn btn-primary">Buy more</a>
        </div>
      </div>
    </div>
  </section>
{/if}