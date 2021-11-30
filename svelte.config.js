import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-vercel';
import { resolve } from 'path';


/** @type {import('@sveltejs/kit').Config} */

let define = {}
if (process.env.NODE_ENV == "development") {
	// that variable needs for near-api-js
	define = {
		process: { 
			env: { NEAR_NO_LOGS: true }
		}
	}
}

const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),
	
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		adapter: adapter(),
		target: '#svelte',
		vite: {
			define,
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
