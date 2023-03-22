<script>
	import { onMount } from "svelte";
	
	let import_color = '#f26522';
	$: encoded_color = encodeURIComponent(import_color);
	let other_variables = 'min-contrast-ratio=2&link-decoration=none&body-color=#34495e';
	$: encoded_other = other_variables.match(/^\&/) ? other_variables.replace('#','%23') : `&${other_variables}`.replace('#','%23');

	let yr = (new Date()).getFullYear();

	let tags = [
		'bootstrap',
		'cdn',
		'customize',
		'primary color',
		'url',
	];

	let domain = '';
	onMount(() => {
		domain = `https://${window.location.host}`;
	});
</script>

<svelte:head>
	<title>Bootstrap Customizer by URL</title>
	<meta name="description" content="Customize bootstrap css through URL parameters without a build step" />
	<link rel="stylesheet" href="/bootstrap/5.1.3.css?primary=gray"><!-- insert once plain so context switching is not dificult -->
	<link rel="stylesheet" href="{`/bootstrap/5.1.3.css?primary=${encoded_color}${encoded_other}`}">
	<!-- <script src="https://kit.fontawesome.com/cf97b14328.js" crossorigin="anonymous"></script> -->
	<link rel="stylesheet" href="https://recliquecore.s3.amazonaws.com/ext/font-awesome/pro-6.3.0-web/css/all.min.css">
</svelte:head>

<div class="main_wrap container pt-5">
	<main>
		<header>
			<i class="fa-brands fa-bootstrap"></i>
			<i class="fa-light fa-plus opacity-50" style="font-size:.6em;"></i>
			<i class="fa-regular fa-palette"></i>
		</header>
		<h1>Easily customize Bootstrap without a build step</h1>
		<p>Sometimes, you want to easily link the bootstrap stylesheet and only changing some of the bootstrap variables. This would not be necessary if bootstrap defaulted to css variables for their components.</p>
		
		<div class="tags mb-4">
			<i class="fa-regular fa-tags"></i>
			{#each tags as tag}
				<span class="badge bg-secondary">{tag}</span>
			{/each}
		</div>

		<h2>Example</h2>
		<div class="mb-4">
			<label class="d-flex align-items-center">
				<span class="me-2">Chose the primary color:</span>
				<input type="color" bind:value="{import_color}">
			</label>
		</div>

		<h3>Insert this in your HTML</h3>
		<pre class="mb-4 bg-secondary bg-opacity-10 p-2 px-3">&lt;link href="{domain}/bootstrap/5.1.3.css?primary={encoded_color}{encoded_other}" rel="stylesheet"&gt;</pre>

		<h3>Elements will look like this</h3>
		<div class="examples mb-4">
			<div>
				<small>anchor tag</small>
				<a href="#void">My Link</a>
			</div>
			<div>
				<small>.btn .btn-primary</small>
				<button class="btn btn-primary">Primary</button>
			</div>
			<div>
				<small>.btn .btn-outline-primary</small>
				<button class="btn btn-outline-primary">Outline Primary</button>
			</div>
		</div>
		
		<h3>Other Pro Tips</h3>
		<p>You can add other paramters to the URL that would be in the <a href="https://github.com/twbs/bootstrap/blob/main/scss/_variables.scss" target="_blank">_variables.scss</a> in bootstrap. For example: &min-contrast-ratio=2</p>
		<input bind:value="{other_variables}" class="form-control mb-4">
	</main>
	<footer>
		<i class="fa-regular fa-code"></i> by <a href="https://reclique.com" target="_blank">ReClique</a>
		<i class="fa-regular fa-copyright"></i> {yr}

		<i class="fa-solid fa-circle mx-3" style="vertical-align:middle;font-size:.25em;opacity:.25;"></i>
		<a href="https://github.com/reclique/bootstrap-customizer" target="_blank"><i class="fa-brands fa-github"></i></a>
	</footer>
</div>

<style>
	.main_wrap{
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
	header{
		font-size: 3rem;
		margin-bottom: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	header i{
		margin: 0 .5rem;
	}
	.tags{
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: center;
	}
	.tags > *{
		margin-right: .5rem;
	}
	.tags > .badge{
		font-weight: normal;
		color: var(--bs-body-color);
		background: var(--bs-gray-200)!important;
	}
	.examples{
		display: flex;
		flex-wrap: wrap;
	}
	.examples > div{
		padding:1rem;
		border-radius: 0.25rem!important;
		box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
		margin: 0 2rem 2rem 0;
		white-space: nowrap;
	}
	.examples > div > small{
		display: block;
		margin-bottom: .5rem;
		color: #7a7a7a;
		font-family: var(--bs-font-monospace);
		font-size: .75rem;
	}
	footer{
		text-align: center;
		/* font-size: .8rem; */
		color: var(--bs-color-50);
		margin-top: auto;
		padding: 1rem;
	}
	footer a{
		color: var(--bs-color);
	}
	/* .fa-circle{
		opacity: .5;
		margin: 0 15px;
		font-size: .5em;
	} */
</style>
