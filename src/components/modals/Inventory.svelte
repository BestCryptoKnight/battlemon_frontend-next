<script>
  import StaticModal from './StaticModal.svelte'
  export let isOpen = false;

  const inventoryItems = ["mix2a.png", "mix1a.png", "Big_optic2a.png", "Big_optic1a.png", "10a.png","9a.png","8a.png", "7a.png", "6a.png", "5a.png", "2a.png", "1a.png"]
</script>

<style>  
  .row .col {
    padding: 10px 10px;
    border: 1px solid var(--opacity-bg);
    background-color: var(--primary);
  }
</style>

<StaticModal bind:isOpen={isOpen}>
  <div class="row">
    {#each inventoryItems as item}
      <div class="col col-3">
        <div class="img-box">
          <img src={`/img/weapon/${item}`} alt="Card" />
        </div>
      </div>
    {/each}
  </div>
</StaticModal>