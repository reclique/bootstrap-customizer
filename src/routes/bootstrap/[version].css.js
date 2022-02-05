import sass from 'sass';
// import fs from 'fs';

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
		// let file = fs.readFileSync(`src/bs_versions/${version}/bootstrap.scss`);
		// let prefix = prefixes.join('\n') + '\n';
		// let to_compile = prefix + file.toString();
		// let result = await sass.compileStringAsync(to_compile, {
		// 	loadPaths: [`src/bs_versions/${version}`],
		// });
		let result = await sass.compileAsync(`src/bs_versions/${version}/bootstrap.scss`);
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
	}
	return {
		headers: headers,
		status:status,
		body: response,
	};
};