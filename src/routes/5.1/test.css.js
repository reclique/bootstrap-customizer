import sass from 'sass';
import fs from 'fs';

export const get = async ({request,params}) =>{
	let status = 500;
	let version = 
	// try{

	// }
	// catch(e){

	// }
	let file = fs.readFileSync('src/bs_versions/5.1.3/bootstrap.scss');
	let prefix = `$blue:#33bdbd;\n`;
	let to_compile = prefix + file.toString();
	let result = await sass.compileStringAsync(to_compile,{
		loadPaths:['src/bs_versions/5.1.3'],
	});
	// const result = await sass.compileAsync('src/bs_versions/5.1.3/bootstrap.scss');
	return {
		status: 200,
		body: result.css,
		// body:data,
	};
};