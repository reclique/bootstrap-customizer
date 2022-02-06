import sass from 'sass';
import fs from 'fs';
import { join } from 'path';

export const get = async ({params,url}) =>{
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
		let file = fs.readFileSync(join(__dirname,`bs_versions/${version}/bootstrap.scss`));
		let prefix = prefixes.join('\n') + '\n';
		let to_compile = prefix + file.toString();
		let result = await sass.compileStringAsync(to_compile, {
			loadPaths: [`bs_versions/${version}`],
		});
		// let result = await fetch('https://raw.githubusercontent.com/twbs/bootstrap/main/scss/bootstrap.scss')
		// 	.then(res => res.text());
		// console.log()
		// let path = `static/bs_versions/${version}/bootstrap.scss`;//dev
		// path = `bs_versions/${version}/bootstrap.scss`;//prod
		// let result = await sass.compileAsync(path);
		// let result = await sass.compileAsync('https://raw.githubusercontent.com/twbs/bootstrap/main/scss/bootstrap.scss');
		response = result.css;
		status = 200;
		headers = {
			'Cache-Control': 'max-age=604800',
			'content-type': 'text/css; charset=utf-8'
		};
	}
	catch(e){
		if(e.code == 'ENOENT') response = 'Bootstrap version not found';
		else response = e.message;
		response = JSON.stringify(e);
		response = `/* ${response} */`;
	}
	return {
		headers: headers,
		status:status,
		body: response,
	};
};