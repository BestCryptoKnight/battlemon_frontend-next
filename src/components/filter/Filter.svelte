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

  <div class="details" on:click={() => activeFilter = 'century'} class:active={activeFilter === 'century'}>
    <h2>
      <span class="arrow">{@html arrowdown(30,30)}</span>
      Century
    </h2>
    <ul>
      <li>
        <label>
          <input type="radio" name="century" />
          <span class="checkbox"></span>
          <span>Ancient</span>
        </label>
      </li>
      <li>
        <label>
          <input type="radio" name="century" />
          <span class="checkbox"></span>
          <span>Our time</span>
        </label>
      </li>
      <li>
        <label>
          <input type="radio" name="century" />
          <span class="checkbox"></span>
          <span>Future</span>
        </label>
      </li>
      <li>
        <label>
          <input type="radio" name="century" />
          <span class="checkbox"></span>
          <span>Other World</span>
        </label>
      </li>
    </ul>
  </div>
  <div class="details" on:click={() => activeFilter = 'type'} class:active={activeFilter === 'type'}>
    <h2>
      <span class="arrow">{@html arrowdown(30,30)}</span>
      Type
    </h2>
    <ul>
      <li>
        <label>
          <input type="radio" name="Type" />
          <span class="checkbox"></span>
          <span>Light</span>
        </label>
      </li>
      <li>
        <label>
          <input type="radio" name="Type" />
          <span class="checkbox"></span>
          <span>Medium</span>
        </label>
      </li>
      <li>
        <label>
          <input type="radio" name="Type" />
          <span class="checkbox"></span>
          <span>Heavy</span>
        </label>
      </li>
    </ul>
  </div>

  <div class="details" on:click={() => activeFilter = 'gen'} class:active={activeFilter === 'gen'}>
    <h2>
      <span class="arrow">{@html arrowdown(30,30)}</span>
      Gen
    </h2>
    <ul>
      <li>
        <label>
          <input type="checkbox" />
          <span class="checkbox"></span>
          <span>Gen</span>
        </label>
      </li>
    </ul>
  </div>

  <div class="details" on:click={() => activeFilter = 'background'} class:active={activeFilter === 'background'}>
    <h2>
      <span class="arrow">{@html arrowdown(30,30)}</span>
      Background
    </h2>
    <ul>
      <li>
        <label>
          <input type="checkbox" />
          <span class="checkbox"></span>
          <span>Background</span>
        </label>
      </li>
    </ul>
  </div>

  <div class="details" on:click={() => activeFilter = 'top'} class:active={activeFilter === 'top'}>
    <h2>
      <span class="arrow">{@html arrowdown(30,30)}</span>
      Top
    </h2>
    <ul>
      <li>
        <label>
          <input type="checkbox" />
          <span class="checkbox"></span>
          <span>Top</span>
        </label>
      </li>
    </ul>
  </div>

  <div class="details" on:click={() => activeFilter = 'expressions'} class:active={activeFilter === 'expressions'}>
    <h2>
      <span class="arrow">{@html arrowdown(30,30)}</span>
      Expressions
    </h2>
    <ul>
      <li>
        <label>
          <input type="checkbox" />
          <span class="checkbox"></span>
          <span>Expressions</span>
        </label>
      </li>
    </ul>
  </div>

  <div class="details" on:click={() => activeFilter = 'eyes'} class:active={activeFilter === 'eyes'}>
    <h2>
      <span class="arrow">{@html arrowdown(30,30)}</span>
      Eyes
    </h2>
    <ul>
      <li>
        <label>
          <input type="checkbox" />
          <span class="checkbox"></span>
          <span>Eyes</span>
        </label>
      </li>
    </ul>
  </div>

  <div class="details" on:click={() => activeFilter = 'accessory'} class:active={activeFilter === 'accessory'}>
    <h2>
      <span class="arrow">{@html arrowdown(30,30)}</span>
      Accessory
    </h2>
    <ul>
      <li>
        <label>
          <input type="checkbox" />
          <span class="checkbox"></span>
          <span>Accessory</span>
        </label>
      </li>
    </ul>
  </div>

  <div class="details" on:click={() => activeFilter = 'winrate'} class:active={activeFilter === 'winrate'}>
    <h2>
      <span class="arrow">{@html arrowdown(30,30)}</span>
      Win Rate
    </h2>
    <ul>
      <li>
        <input type="range" />
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