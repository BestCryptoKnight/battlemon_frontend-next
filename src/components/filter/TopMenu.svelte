<script>
  import { page } from '$app/stores';

  export let root
  const fightersPath = '/' + root + ''
  const weaponPath = '/' + root + '/weapon'
</script>

<style>
  .filter-menu-link {
    margin:0 5px;
  }
  .filter-menu-link:hover, .filter-menu-link.active {
    color: #cda77f;
  }
</style>

<div class="fs-5">
  <a class="filter-menu-link" href={fightersPath} class:active={$page.path === fightersPath}>Fighters</a>
  <a class="filter-menu-link" href={weaponPath} class:active={$page.path === weaponPath}>Weapons</a>
  <a class="filter-menu-link" href={''}>Items</a>
  <a class="filter-menu-link" href={''}>Boosters</a>
  <a class="filter-menu-link" href={''}>Land</a>
  <a class="filter-menu-link" href={''}>Merchandise</a>
</div>