import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';

// import adapter from '@sveltejs/adapter-node';
// import adapter from '@sveltejs/adapter-cloudflare';
// import adapter from './override_module/adapter-cloudflare/index.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	}
};

export default config;
