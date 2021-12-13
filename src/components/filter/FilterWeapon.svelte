<button class="filter-toggle">Filter</button>

<form class="catalog-filter" action="">
  <label class="search">
    <input type="text" placeholder="Search by serial number" />
  </label>

  <details open>
    <summary>Option</summary>
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
  </details>

  <details>
    <summary>Rarity</summary>
    <ul>
      <li>
        <input type="range" />
      </li>
    </ul>
    
  </details>
</form>