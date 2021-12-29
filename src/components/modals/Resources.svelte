<script>
  import StaticModal from './StaticModal.svelte'
  export let isOpen = false;

  const inventoryItems = ["5.png", "4.png", "3.png", "2.png", "1.png"]
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
      <div class="col col-4">
        <div class="img-box">
          <img src={`/img/${item}`} alt="Card" />
        </div>
      </div>
    {/each}
  </div>
</StaticModal>