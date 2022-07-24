<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import Logo from '$src/components/layout/Logo.svelte'
import Auth from '$src/components/layout/Auth.svelte'
import near from '$src/utils/near'
import Loader from '$src/components/layout/Loader.svelte';
import Lemterprise from '$src/components/threejs/Lemterprise.svelte';
import { actions } from '$src/components/threejs/lemterprise';

let isBackVisible: boolean = false

const unsubscribe = actions.subscribe(acts => {
	isBackVisible = acts.isBackVisible
});


const goBack = () => {
    actions.update(acts => ({...acts, activateBack: true}))
}

const goCapsule = (capsule: string) => () => {
    actions.update(acts => ({...acts, activateCapsule: capsule}))
}

onMount(async () => {
    $near.connect()
})

onDestroy(unsubscribe);
</script>

<style>
    .home {
        background: #000 ;
        /* background-image: url(/img/home/main.jpg);
        background-size: cover;
        background-position: center; */
        overflow: hidden; 
        height: 100vh;
        width: 100vw; 
    }
    .home-inner {
        height: 100vh;
        width: 101vw; 
        position: relative;
        margin: 0 auto; 
    }
    .layer {
        position: absolute;
    }
    .back-btn {
        margin: 30px 0 0 0;
        width: 15vw;
        max-width: 198px;
        background: #fff;
        color: #000;
    }
</style>


<div class="home">
    <div class="home-inner">
    <div class="layer" style="top: 0%; width: 100%; height: 100vh;">
        <Lemterprise />
    </div>
    </div>

    <Loader />
    <header>
    <div class="header-container" style="background: none;">
        <div class="container">
            <div class="header-inner">
                <a href="/" class="logo-home text-center" style="position: static;">
                    <Logo height={23} />
                </a>		
                
                <div class="top-menu d-flex">
                    <button class="btn btn-light d-flex one-width" class:active={$actions.currentCapsule == 'a'} on:click|preventDefault={goCapsule('a')}>
                        <span class="w-100 nowrap">Advisers</span>
                    </button>
                    <button class="btn btn-light d-flex one-width" class:active={$actions.currentCapsule == 'c'} on:click|preventDefault={goCapsule('c')}>
                        <span class="w-100 nowrap">Team</span>
                    </button>
                    <button class="btn btn-light d-flex one-width" class:active={$actions.currentCapsule == 'b'} on:click|preventDefault={goCapsule('b')}>
                        <span class="w-100 nowrap">Roadmap</span>
                    </button>
                    <button class="btn btn-light d-flex one-width" class:active={$actions.currentCapsule == 'd'} on:click|preventDefault={goCapsule('d')}>
                        <span class="w-100 nowrap">Backers</span>
                    </button>
                    <button class="btn btn-light d-flex one-width" class:active={$actions.currentCapsule == 'e'} on:click|preventDefault={goCapsule('e')}>
                        <span class="w-100 nowrap">Tokenomics</span>
                    </button>
                </div>

                {#if $near.connected}
                    <Auth light={true} />
                {/if}
            </div>
            
            {#if isBackVisible}
                <div class="header-inner">
                    <button class="btn btn-light d-flex back-btn" on:click|preventDefault={goBack}>
                        <span class="w-100 nowrap">
                            <span style="position: relative; top: 0px; left: -2px; font-size: 22px; line-height: 14px;">&larr</span> 
                            Return back
                        </span>
                    </button>
                </div>
            {/if}
        </div>

          
    </div>
    </header>


</div>