<script>
  export let checked = false
  export let disabled = false
  export let onChange;
</script>

<style>
  .svelteit-switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  .svelteit-switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .svelteit-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
    transition: 0.4s;
    border-radius: 34px;
    border: 1px solid #fff;
  }

  .svelteit-slider:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 3px;
    background-color: #fff;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + .svelteit-slider {
    box-shadow: 0 0 1px #fff;
    border-color: #000;
    background-color: #fff;
  }

  input:checked + .svelteit-slider:before {
    transform: translateX(26px);
    background-color: #000;
  }
</style>

<label class="svelteit-switch">
  <input type="checkbox" bind:checked {disabled} on:change={onChange} />
  <span class="svelteit-slider" />
</label>