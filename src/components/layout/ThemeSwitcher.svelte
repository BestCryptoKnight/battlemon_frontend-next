<script lang="ts">
  import Switch from '$src/components/form/Switch.svelte'
  let themeColor = typeof localStorage !== 'undefined' && localStorage.getItem('theme-color')
  export let light = themeColor && themeColor == 'light';

  const toggleTheme = () => {
    const currentTheme = light ? 'light' : 'dark';
    localStorage.setItem('theme-color', currentTheme)
    document.dispatchEvent(new CustomEvent('changeTheme', { detail: currentTheme }))
  }
</script>

<style>
  .theme-switcher {
    margin: 0 20px;
    min-height: 60px;
    justify-content: center;
    display: flex;
    align-items: center;
  }
</style>

<div class="theme-switcher">
  <Switch bind:checked={light} onChange={toggleTheme} />
</div>