import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-cloudflare';
import { resolve } from 'path';


/** @type {import('@sveltejs/kit').Config} */

const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),
	
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
    adapter: adapter(),
		vite: {
			define: {
					global: {}
			},
			// ssr: {
			// 	noExternal: [
			// 		'@near-wallet-selector/*'
			// 	]
			// },
			resolve: {
				alias: {
					$lib: resolve('src/lib'),
					$src: resolve('src')
				}
			}
		}
	}
};

export default config;
