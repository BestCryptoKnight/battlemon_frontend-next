<script type="ts">
  import { Modal } from 'sveltestrap';
  import near from '$src/utils/near'
  export let tokenId: string;
  export let isOpen = false;
  const toggle = () => (isOpen = !isOpen);

  let accountId: string;

  const formHandler = async () => {
    const result = await $near.api.transferNft($near.user.id, tokenId, accountId)
    console.log(result)
  }
</script>

<Modal {isOpen} {toggle} header="Transfer" centered={true}>
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