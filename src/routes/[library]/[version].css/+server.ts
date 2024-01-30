import sass from 'sass';
import fs from 'fs';
import type { RequestEvent } from '@sveltejs/kit';

export const GET = async ({params,url}:RequestEvent) =>{
	let response_body = 'Undefined error';
	try{
		interface Library{
			entry:string;
		}
		const libraries:Record<string,Library> = {
			bootstrap:{
				entry:'bootstrap.scss',
			},
			dreamcoat:{
				entry:'styles.scss'
			}
		};

		const {version,library} = params;
		if(!version) throw new Error('`version` is not defined');
		if(!library || !libraries[library]) throw new Error('`library` is not defined');

		const entry_file = libraries[library].entry;

		const query = url.searchParams;
		const prefixes = [];
		for(const key of query.keys()){
			if(key.match(/theme\[/)) continue;
			const val = query.get(key);
			prefixes.push(`$${key}:${val};`);
		}

		//#region cache
		const sha_for_cache = await sha256(url.toString());
		const folder_of_cache = `./static/cache`;
		const path_of_cache_file = `${folder_of_cache}/${sha_for_cache}.css`;
		const has_cache_file = fs.existsSync(path_of_cache_file)
		//#endregion cache

		if(has_cache_file){//read file
			response_body = fs.readFileSync(path_of_cache_file).toString()
		}
		else{//generate dynamically
			const theme_request = [];
			url.searchParams.forEach((value,key)=>{
				const match = key.match(/theme\[(.+)\]/)
				if(!match) return;
				theme_request.push({key:match[1],value})
			});
			let theme = '';
			if(theme_request){
				try {
					theme = theme_request.map(({key,value})=>`"${key}": ${value}`).join(',');
					theme = `
						$theme-colors : (
							"primary":    $primary,
							"secondary":  $secondary,
							"success":    $success,
							"info":       $info,
							"warning":    $warning,
							"danger":     $danger,
							"light":      $light,
							"dark":       $dark,
							${theme}
						);`;
				} catch (error) {
					theme = '';
				}
			}

			

			let file = fs.readFileSync(`src/libraries/${library}/${version}/${entry_file}`).toString();
			if(theme){
				file = file.replace('@import "variables";','@import "variables";\n'+theme)
			}
			const prefix = prefixes.join('\n') + '\n';
			const to_compile = prefix + file;
			const result = await sass.compileStringAsync(to_compile, {
				loadPaths: [`src/libraries/${library}/${version}`],
			});
	
			// let result = await sass.compileStringAsync(prefix+'body{color:$primary;}');
			// let result = await sass.compileAsync(`src/bs_versions/${version}/bootstrap.scss`);
			// let result = await sass.compileAsync('https://raw.githubusercontent.com/twbs/bootstrap/main/scss/bootstrap.scss');
	
			response_body = result.css;

			//#region write file to cache
			if(!fs.existsSync(folder_of_cache)){
				fs.mkdirSync(folder_of_cache);
			}
			if(fs.readdirSync(folder_of_cache).length > 1000){
				fs.rmdirSync(folder_of_cache,{recursive:true});
				fs.mkdirSync(folder_of_cache);
			}
			fs.writeFileSync(path_of_cache_file,response_body)
			//#endregion write file to cache
			
		}
	}
	catch(e){
		// if(e.code == 'ENOENT') response = 'Bootstrap version not found';
		// else response = e.message;
		response_body = JSON.stringify(e);
		response_body = `/* ${response_body} */`;
	}
	const resp = new Response(response_body);
	resp.headers.set('content-type', 'text/css; charset=utf-8');
	resp.headers.append('Cache-Control', 'max-age=15552000');
	resp.headers.append('CDN-Cache-Control', 'max-age=15552000');//cdns cache for 6 months = 6 months * 30 days * 24 hours * 60 minutes * 60 seconds
	resp.headers.append('Access-Control-Allow-Origin', '*');//allow cross-origin requests
	return resp;
	
};

async function sha256(message) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message);

  // hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string
  const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
  return hashHex;
}