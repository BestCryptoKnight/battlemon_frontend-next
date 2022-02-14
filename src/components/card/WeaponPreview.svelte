<script>
  export let image;
</script>

<style>
  .img-box {
    padding: 5px;
    border-radius: 1px;
    background-color: var(--opacity-bg);
  }
</style>

<div class="img-box">
  <img src={`/img/weapon/${image}`} alt="Weapon" />
</div>