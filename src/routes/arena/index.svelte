<script type="ts">
import { onMount } from 'svelte'
import "./arena.scss"
import { TabContent, TabPane } from 'sveltestrap'
import lemons from '$src/components/threejs/lemons'
import Logo from '$src/components/layout/Logo.svelte'
import Auth from '$src/components/layout/Auth.svelte'
import near from '$src/utils/near'
import Preview from '$src/components/card/Preview.svelte'
import type { Model } from '$src/components/threejs/model'
import lemon from '$src/components/svg/lemon'
import Loader from '$src/components/layout/Loader.svelte'
import battlepass from '$src/components/svg/battlepass';
import shop from '$src/components/svg/shop';
import guild from '$src/components/svg/guild';
import progress from '$src/components/svg/progress';
import statistic from '$src/components/svg/statistic';
import people from '$src/components/svg/people';
import settings from '$src/components/svg/settings';
import world from '$src/components/svg/world';
import Countdown from './Countdown.svelte';
import weapon from '$src/components/svg/weapon';
import bag from '$src/components/svg/bag';
import discord from '$src/components/svg/discord';
import medium from '$src/components/svg/medium';
import github from '$src/components/svg/github';
import twitter from '$src/components/svg/twitter';
import telegram from '$src/components/svg/telegram';

let model: Model | null = null
let listNft = []
let heroesDom = null
let currentNft = null

const changeLemon = (nft) => async (e) => {
  e.preventDefault();
  currentNft = nft
  if (model) {
    model.changeLemon(Object.values(lemons)[nft.token_id % 4])
  }
}

const toggleHeroes = (e) => {
  e.preventDefault();
  e.target.classList.toggle("active")
  if (e.target.classList.contains('active')) {
    heroesDom.style.left = '3%';
  } else {
    heroesDom.style.left = '-16%';
  }
}

onMount(async () => {
  await $near.connect()
  const unsortedList = await $near.api.listNft({})
  listNft = unsortedList.sort((a,b) => a.token_id - b.token_id)
  currentNft = listNft[0]

  let lemonSettings = Object.values(lemons)[currentNft.token_id % 4]
  const { Model } = await import('$src/components/threejs/model')
  model = new Model({
    dom: 'threejs',
    rightWeapon: '/constructor/assets/models/turel.glb',
    leftWeapon: '/constructor/assets/models/turel.glb',
    cam: 70,
    globalScale: 6,
    translateY: -6.87,
    arenaBg: true,
    lemonSettings
  })
})
</script>

<div class="arena">
  <div class="threejs-container">
    <div id="threejs" class="threejs"></div>

    <div class="three-buttons d-flex">
      <button class="btn btn-light d-flex mx-1 active" style="padding-left: 13px; padding-right: 13px;" on:click={toggleHeroes}>
        <div class="icon pointer-events-none" style="min-width: 32px;">{@html lemon(32,30)}</div>
      </button>
      <button class="btn btn-light d-flex mx-1" style="padding-left: 13px; padding-right: 13px;">
        <div class="icon" style="min-width: 32px;">{@html weapon(30,30)}</div>
      </button>
      <button class="btn btn-light d-flex mx-1" style="padding-left: 16px; padding-right: 16px;">
        <div class="icon" style="min-width: 25px;">{@html bag(25,30)}</div>
      </button>
    </div>

    <div class="socials">
      <a href={'https://twitter.com/BATTLEM0N'}>{@html twitter}</a>
      <a href={'https://medium.com/@Battlemon'}>{@html medium}</a>
      <a href={'https://github.com/battlemon-project'}>{@html github}</a>
      <a href={'https://dsc.gg/battlemon'}>{@html discord}</a>
      <a href={'https://t.me/Battlemon'}>{@html telegram}</a>
    </div>
    
    <div bind:this={heroesDom} class="d-flex my-heroes-block">
      <TabContent class="d-flex flex-column w-100">
        <TabPane tabId="nft" tab="NFT" active class="h-100">
          <div class="my-heroes-block-bg">
            {#each listNft as nft}
              <div class="col-12 cursor-pointer my-heroes-link" on:click={changeLemon(nft)} class:active={currentNft === nft}>
                <div class="pointer-events-none">
                  <Preview fullNft={nft} />
                </div>
              </div>
            {/each}
          </div>
        </TabPane>
        <TabPane tabId="game" tab="Game" class="h-100">
          <div class="my-heroes-block-bg">
            {#each listNft.slice(3,6) as nft}
              <div class="col-12 cursor-pointer my-heroes-link" on:click={changeLemon(nft)} class:active={currentNft === nft}>
                <div class="pointer-events-none">
                  <Preview fullNft={nft} />
                </div>
              </div>
            {/each}
          </div>
        </TabPane>
      </TabContent>
    </div>

    <a href="/" class="logo-home">
      <Logo height={24} />
    </a>		

    <div class="juice">
      JUICE &nbsp; 32 940
    </div>

    <div class="top-menu d-flex">
      <a class="btn btn-light d-flex one-width" href="/shop">
        <span class="icon" style="min-width: 22px; ">{@html shop}</span>
        <span class="w-100">Shop</span>
      </a>
      <button class="btn btn-light d-flex one-width">
        <span class="icon" style="min-width: 27px; ">{@html battlepass}</span>
        <span class="w-100 nowrap">Battle pass</span>
      </button>
      <button class="btn btn-light d-flex one-width">
        <span class="icon" style="min-width: 21px; ">{@html guild}</span>
        <span class="w-100">Guild</span>
      </button>
      <button class="btn btn-light d-flex one-width">
        <span class="icon" style="min-width: 26px; ">{@html progress}</span>
        <span class="w-100">Progress</span>
      </button>
      <button class="btn btn-light d-flex">
        <span class="icon" style="min-width: 16px; ">{@html statistic}</span>
      </button>
      <button class="btn btn-light d-flex">
        <span class="icon" style="min-width: 20px; ">{@html people}</span>
      </button>
      <button class="btn btn-light d-flex">
        <span class="icon" style="min-width: 20px; ">{@html settings}</span>
      </button>
      <button class="btn btn-light d-flex">
        <span class="icon" style="min-width: 20px; ">{@html world}</span>
      </button>
    </div>

    <div class="right-col">
      <div class="trials-block">
        <div class="trials-hoverable">
          <h2>
            Task
          </h2>
          <div class="trial">
            <h3>Defeat the Viking enemy in "Capture" battle mode 10 times</h3>
            <div class="progress">
              <div class="progress-bar" role="progressbar" style="width: 80%;"><span>8/10</span></div>
            </div>
          </div>
          <div class="text-center">
            <a class="more" href={'#'}>Open</a>
          </div>
        </div>
        <div class="trials-hoverable">
          <h2>
            Trials of the Day
          </h2>
          <div class="trial">
            <h3>Win 5 fights</h3>
            <div class="progress">
              <div class="progress-bar" role="progressbar" style="width: 66%;"><span>3/5</span></div>
            </div>
          </div>
          <div class="trial">
            <h3>Increase the rank of weapons</h3>
            <div class="progress">
              <div class="progress-bar" role="progressbar" style="width: 100%;"><span>1/1</span></div>
            </div>
          </div>
          <div class="trial">
            <h3>Play 7 matches</h3>
            <div class="progress">
              <div class="progress-bar" role="progressbar" style="width: 15%;"><span>1/7</span></div>
            </div>
          </div>
          <div class="text-center">
            <a class="more" href={'#'}>View all</a>
          </div>
        </div>
      </div>
    </div>

    <div class="fight-block">
      <div class="countdown"><Countdown /></div>
      <a href="http://161.156.38.90:5050/" class="fight-btn">
        <img src="/img/fight1.png" alt="Fight" />
      </a>
    </div>

    <div class="props">
      <div class="level">
        <div class="row">
          <div class="col-6 level-text orange">15</div>
          <div class="col-6 level-text text-end gray">16</div>
        </div>
        <div class="progress">
          <div class="progress-bar" role="progressbar" style="width: 75%;"></div>
        </div>
      </div>
      <div class="props-stats">
        <div class="row">
          <div class="col-6 left-col">
            <table class="w-100">
              <tr>
                <td class="text-end">Class</td>
                <td class="w-100 px-4">
                  <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: 80%;"></div>
                  </div>
                </td>
                <td>Heavy</td>
              </tr>
              <tr>
                <td class="text-end">Attack</td>
                <td class="w-100 px-4">
                  <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: 71%;"></div>
                  </div>
                </td>
                <td>71%</td>
              </tr>
            </table>
          </div>
          <div class="col-6">
            <table class="w-100">
              <tr>
                <td class="text-end">Move</td>
                <td class="w-100 px-4">
                  <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: 25%;"></div>
                  </div>
                </td>
                <td>Slow</td>
              </tr>
              <tr>
                <td class="text-end">Protection</td>
                <td class="w-100 px-4">
                  <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: 97%;"></div>
                  </div>
                </td>
                <td>97%</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="auth-home d-flex">
      <Auth light={true} />
    </div>    

    <Loader />
  </div>
</div>