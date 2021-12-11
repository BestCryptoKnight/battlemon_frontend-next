<script type="ts">
  import { Modal } from 'sveltestrap';
  export let isOpen = false;
  const toggle = () => (isOpen = !isOpen);

  let accountId;

  const formHandler = () => {
    alert(accountId)
  }
</script>

<Modal {isOpen} {toggle} header="Sell" centered={true}>
  <form class="modal-body" on:submit|preventDefault={formHandler}>
    <div>
      <label class="form-label" for="accountId">Enter account name</label> 
      <input id="accountId" class="form-control form-control-lg" type="text" name="accountId" placeholder="example.near" required={true} bind:value={accountId} /> 
    </div>
    <div class='text-center pt-3 mt-3'>
      <button type="submit" class="btn btn-primary">CONFIRM</button>
    </div>
  </form>
</Modal>