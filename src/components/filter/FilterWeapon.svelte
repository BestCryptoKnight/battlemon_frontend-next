<script>
import arrowdown from "../svg/arrowdown";


  let activeFilter = 'option'
</script>

<button class="filter-toggle">Filter</button>

<form class="catalog-filter" action="">
  <label class="search">
    <input type="text" placeholder="Search" />
  </label>

  <div class="details" on:click={() => activeFilter = 'option'} class:active={activeFilter === 'option'}>
    <h2>
      <span class="arrow">{@html arrowdown(30,30)}</span>
      Option
    </h2>
    <ul>
      <li>
        <label>
          <input type="checkbox" />
          <span class="checkbox"></span>
          <span>On Sale</span>
        </label>
      </li>
      <li>
        <label>
          <input type="checkbox" />
          <span class="checkbox"></span>
          <span>Auction</span>
        </label>
      </li>
      <li>
        <label>
          <input type="checkbox" />
          <span class="checkbox"></span>
          <span>For Rent</span>
        </label>
      </li>
    </ul>
  </div>

  <div class="details" on:click={() => activeFilter = 'rarity'} class:active={activeFilter === 'rarity'}>
    <h2>
      <span class="arrow">{@html arrowdown(30,30)}</span>
      Rarity
    </h2>
    <ul>
      <li>
        <input type="range" />
      </li>
    </ul>
    
  </div>
</form>