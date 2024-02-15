/*
custom server to hanlde headers outside of the svelte kit app
*/
import { handler } from './build/handler.js';
import express from 'express';

const app = express();

// handle static folder ourselves which allows us to set custom headers
app.use(express.static(
	'static',
	{
		setHeaders: (res, pathname, stats) => {
			if (pathname.match(/\.(png|woff2?)$/))
				res.setHeader('Access-Control-Allow-Origin', '*');
		}
	}
));

// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);

app.listen(3000, () => {
	console.log('listening on port 3000');
});