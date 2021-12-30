<script>
  import { page } from '$app/stores';

  export let root
  const fightersPath = '/' + root + ''
  const itemsPath = '/' + root + '/items'
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
  <a class="filter-menu-link" href={fightersPath} class:active={$page.path === fightersPath}>Heroes</a>
  <a class="filter-menu-link" href={itemsPath} class:active={$page.path === itemsPath}>Items</a>
  <a class="filter-menu-link" href={''}>Battle Pass</a>
  <a class="filter-menu-link" href={''}>Skins</a>
  <a class="filter-menu-link" href={''}>Land</a>
</div>