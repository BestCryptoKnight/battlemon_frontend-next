<script type='ts'>
  import Filter from '$src/components/filter/Filter.svelte'
</script>

<style>
  .video-box {
    min-height: 60vh;
  }

  @media screen and (max-width:768px) {
    .video-box {
      min-height: 30vh;
    }
  }
</style>

<div class="media-wrap">
  <div class="img-box video-box text-center">
    <video src="/media/Lemon_v_720.mp4" autoPlay muted loop playsInline />
  </div>
</div>

<section class="catalog">
  <Filter />
  <div class="catalog-inner">
    <form class="catalog-sorting" action="">
      <ul class="sorting">
        <li class="active">Fighters</li>
        <li>Weapons</li>
        <li>Items</li>
        <li>Boosters</li>
        <li>Land</li>
        <li>Merchandise</li>
      </ul>

      <div class="serial-number">
        Serial number
      </div>
    </form>

    
    <div class="cards-wrap">
      {#each Array.from(Array(9).keys()) as i}
        <div class="card-preview">
          <div class="img-box">
            <picture class="lazy">
              <img src="/img/fighters-{23 + i % 5}.png" alt="Battle Lemon" />
            </picture>
          </div>
          <a href={`/card/${i + 1}`}>&nbsp;</a>
        </div>
      {/each}
    </div>
  </div>
</section>