import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-vercel';
import { resolve } from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),
	
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		adapter: adapter(),
		target: '#svelte',
		vite: {
			define: {
				process: { // that variable needs for near-api-js
					env: { NEAR_NO_LOGS: true }
				}
			},
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
