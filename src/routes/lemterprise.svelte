<script lang="ts">
import { onMount } from 'svelte'
import Logo from '$src/components/layout/Logo.svelte'
import Auth from '$src/components/layout/Auth.svelte'
import near from '$src/utils/near'
import Loader from '$src/components/layout/Loader.svelte';
import Lemterprise from '$src/components/threejs/Lemterprise.svelte';


onMount(async () => {
    $near.connect()
})
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

            {#if $near.connected}
                <Auth light={true} />
            {/if}
        </div>
        </div>
    </div>
    </header>


</div>