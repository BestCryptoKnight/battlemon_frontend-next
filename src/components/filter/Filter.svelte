<style>
  input[type=range] {
    height: 32px;
    -webkit-appearance: none;
    margin: 10px 0;
    width: 100%;
  }
  input[type=range]:focus {
    outline: none;
  }
  input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 3px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #CDA77F;
    background: #FFFFFF;
    border-radius: 3px;
    border: 0px solid #000000;
  }
  input[type=range]::-webkit-slider-thumb {
    box-shadow: 0px 0px 0px #CDA77F;
    border: 1px solid #CDA77F;
    height: 25px;
    width: 25px;
    border-radius: 25px;
    background: #F2F2F2;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -11.5px;
  }
  input[type=range]:focus::-webkit-slider-runnable-track {
    background: #FFFFFF;
  }
  input[type=range]::-moz-range-track {
    width: 100%;
    height: 3px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #CDA77F;
    background: #FFFFFF;
    border-radius: 3px;
    border: 0px solid #000000;
  }
  input[type=range]::-moz-range-thumb {
    box-shadow: 0px 0px 0px #CDA77F;
    border: 1px solid #CDA77F;
    height: 25px;
    width: 25px;
    border-radius: 25px;
    background: #F2F2F2;
    cursor: pointer;
  }
  input[type=range]::-ms-track {
    width: 100%;
    height: 3px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  input[type=range]::-ms-fill-lower {
    background: #FFFFFF;
    border: 0px solid #000000;
    border-radius: 6px;
    box-shadow: 1px 1px 1px #CDA77F;
  }
  input[type=range]::-ms-fill-upper {
    background: #FFFFFF;
    border: 0px solid #000000;
    border-radius: 6px;
    box-shadow: 1px 1px 1px #CDA77F;
  }
  input[type=range]::-ms-thumb {
    margin-top: 1px;
    box-shadow: 0px 0px 0px #CDA77F;
    border: 1px solid #CDA77F;
    height: 25px;
    width: 25px;
    border-radius: 25px;
    background: #F2F2F2;
    cursor: pointer;
  }
  input[type=range]:focus::-ms-fill-lower {
    background: #FFFFFF;
  }
  input[type=range]:focus::-ms-fill-upper {
    background: #FFFFFF;
  }
</style>

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
    <summary>Century</summary>
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
  </details>

  <details>
    <summary>Type</summary>
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
  </details>

  <details>
    <summary>Gen</summary>
    <ul>
      <li>
        <label>
          <input type="checkbox" />
          <span class="checkbox"></span>
          <span>Gen</span>
        </label>
      </li>
    </ul>
  </details>

  <details>
    <summary>Background</summary>
    <ul>
      <li>
        <label>
          <input type="checkbox" />
          <span class="checkbox"></span>
          <span>Background</span>
        </label>
      </li>
    </ul>
  </details>

  <details>
    <summary>Top</summary>
    <ul>
      <li>
        <label>
          <input type="checkbox" />
          <span class="checkbox"></span>
          <span>Top</span>
        </label>
      </li>
    </ul>
  </details>

  <details>
    <summary>Expressions</summary>
    <ul>
      <li>
        <label>
          <input type="checkbox" />
          <span class="checkbox"></span>
          <span>Expressions</span>
        </label>
      </li>
    </ul>
  </details>

  <details>
    <summary>Eyes</summary>
    <ul>
      <li>
        <label>
          <input type="checkbox" />
          <span class="checkbox"></span>
          <span>Eyes</span>
        </label>
      </li>
    </ul>
  </details>

  <details>
    <summary>Accessory</summary>
    <ul>
      <li>
        <label>
          <input type="checkbox" />
          <span class="checkbox"></span>
          <span>Accessory</span>
        </label>
      </li>
    </ul>
  </details>

  <details>
    <summary>Win Rate</summary>
    <ul>
      <li>
        <input type="range" />
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