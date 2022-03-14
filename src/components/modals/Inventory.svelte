<script type="ts">
  import StaticModal from './StaticModal.svelte'
  import tippyMenu from '$src/utils/tippy-menu'
  import { onMount } from 'svelte'
  import tippy from 'tippy.js';
  import threeStore from '$src/components/threejs/store'
  import 'tippy.js/dist/tippy.css'; 
  export let isOpen = false;

  const inventoryItems = [
    { image: "/img/weapon/mix1a.png", model: "/constructor/assets/models/turel.glb", scale: 1 },
    { image: "/img/weapon/flamethrower.png", model: "/constructor/assets/models/flamethrower.glb", scale: 0.8 },
    { image: "/img/weapon/lazergun.png", model: "/constructor/assets/models/lazergun.glb", scale: 0.7 }
  ]

  onMount(() => {
    setTimeout(() => {
      tippy('.inventory-item', {
        allowHTML: true,
        placement: 'right',
        interactive: true,
        trigger: 'manual',
        hideOnClick: false,
        onClickOutside(instance, event) {
          instance.hide()
        },
      });
    })
  })

  const eqip = (name, item, tippy) => async (e: Event) => {
    e.preventDefault();
    tippy.hide();
    if (name == 'leftWeapon') {
      await $threeStore.model.changeEquipment(name, item)
    }
    if (name == 'rightWeapon') {
      await $threeStore.model.changeEquipment(name, item)
    }
    threeStore.update(s => ({...s, changed: true}))
  }

  const openInShop = (item, tippy) => async (e: Event) => {
    e.preventDefault();
    tippy.hide();
  }

  const apply = async () => {
    threeStore.update(s => ({...s, changed: false}))
  }

  const discard = async () => {
    $threeStore.model.changeEquipment('leftWeapon', '/constructor/assets/models/turel.glb')
    $threeStore.model.changeEquipment('rightWeapon', '/constructor/assets/models/turel.glb')
    threeStore.update(s => ({...s, changed: false}))
  }

  const openTippy = (item) => (event) => {
    if (!event.target._tippy.props.content?.length) {
      const menu = tippyMenu([
        { title: 'Open in shop', handle: openInShop(item, event.target._tippy) },
        { title: 'Equip to right hand', handle: eqip('rightWeapon', item, event.target._tippy) },
        { title: 'Equip to left hand', handle: eqip('leftWeapon', item, event.target._tippy) }
      ])
      event.target._tippy.setContent(menu)
    }

    if (event.target._tippy.state.isVisible) {
      event.target._tippy.hide()
    } else {
      event.target._tippy.show()
    }
  }

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
    {#each inventoryItems as item, index}
      <div class="col col-3">
        <div class="img-box">
          <img src={item.image} alt="Card" class="inventory-item cursor-pointer" on:click={openTippy(item)} />
        </div>
      </div>
    {/each}
  </div>
  {#if $threeStore.changed }
    <div class="text-center mt-5">
      <button class="btn btn-primary px-4" on:click={apply}>
        Apply
      </button>
      &nbsp;&nbsp;
      <button class="btn btn-primary px-4" on:click={discard}>
        Discard
      </button>
    </div>
  {/if}
</StaticModal>