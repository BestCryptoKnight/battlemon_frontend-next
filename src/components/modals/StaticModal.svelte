<script type="ts">
  import { Modal } from 'sveltestrap';
  //import near from '$src/utils/near'
  export let isOpen = false;
  const params = {
    static: true,
    scrollable: true,
    returnFocusAfterClose: false,
    size: 'lg m-0'
  }
  const toggle = () => (isOpen = !isOpen);
</script>

<style>
  .inventory-wrap {
    position: absolute;
    background-color: var(--primary);
    inset: -1px;
    display: flex;
    top: 0;
    z-index: 20;
  }

  :global(.modal-content) {
    min-height: 600px;
  }
</style>

{#if isOpen}
  <div class="inventory-wrap">
    <Modal isOpen={isOpen} {toggle} {...params} header="Inventory">
      <div class="modal-body">
        <slot></slot>
      </div>
    </Modal>
  </div>
{/if}