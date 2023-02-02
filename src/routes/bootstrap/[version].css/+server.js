import sass from 'sass';
import fs from 'fs';

export const GET = async ({params,url}) =>{
	let status = 500;
	let response = 'Undefined error';
	let headers = {};
	try{
		let {version} = params;
		if(!version) throw new Error('`version` is not defined');
		let query = url.searchParams;
		let prefixes = [];
		for(let key of query.keys()){
			let val = query.get(key);
			prefixes.push(`$${key}:${val};`);
		}
		let file = fs.readFileSync(`src/bs_versions/${version}/bootstrap.scss`);
		let prefix = prefixes.join('\n') + '\n';
		let to_compile = prefix + file.toString();
		let result = await sass.compileStringAsync(to_compile, {
			loadPaths: [`src/bs_versions/${version}`],
		});

		// let result = await sass.compileStringAsync(prefix+'body{color:$primary;}');
		// let result = await sass.compileAsync(`src/bs_versions/${version}/bootstrap.scss`);
		// let result = await sass.compileAsync('https://raw.githubusercontent.com/twbs/bootstrap/main/scss/bootstrap.scss');

		response = result.css;
		
	}
	catch(e){
		// if(e.code == 'ENOENT') response = 'Bootstrap version not found';
		// else response = e.message;
		response = JSON.stringify(e);
		response = `/* ${response} */`;
	}
	const resp = new Response(response);
	resp.headers.set('content-type', 'text/css; charset=utf-8');
	resp.headers.append('Cache-Control', 'max-age=15552000');
	resp.headers.append('CDN-Cache-Control', 'max-age=15552000');//cdns cache for 6 months = 6 months * 30 days * 24 hours * 60 minutes * 60 seconds
	resp.headers.append('Access-Control-Allow-Origin', '*');//allow cross-origin requests
	return resp;
	
};