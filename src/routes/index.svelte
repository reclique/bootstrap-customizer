<script>
	import { onMount } from "svelte";

	let import_color = '#f26522';
	$: encoded_color = encodeURIComponent(import_color);
	let other_variables = 'min-contrast-ratio=2&link-decoration=none&body-color=#34495e';
	$: encoded_other = other_variables.match(/^\&/) ? other_variables.replace('#','%23') : `&${other_variables}`.replace('#','%23');

	let yr = (new Date()).getFullYear();

	let domain = '';
	onMount(() => {
		domain = `httsp://${window.location.host}`;
	});
</script>

<svelte:head>
	<title>Bootstrap Customizer by URL</title>
	<meta name="description" content="Customize bootstrap css through URL parameters without a build step" />
	<link rel="stylesheet" href="/bootstrap/5.1.3.css?primary=white"><!-- insert once plain so context switching is not dificult-->
	<link rel="stylesheet" href="{`/bootstrap/5.1.3.css?primary=${encoded_color}${encoded_other}`}">
	<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
</svelte:head>

<div class="main_wrap container pt-5">
	<main>
		<h1><i class="fal fa-palette"></i> Easily customize Bootstrap without a build step</h1>
		<p>Sometimes, you want to easily link the bootstrap stylesheet and only changing some of the bootstrap variables.</p>
		
		<h2>Example</h2>
		<div class="mb-3">
			<label class="d-flex align-items-center">
				<span class="me-2">Chose the primary color:</span>
				<input type="color" bind:value="{import_color}">
			</label>
		</div>

		<h3>Insert this in your HTML</h3>
		<pre>
			&lt;link href="{domain}/bootstrap/5.1.3.css?blue={encoded_color}{encoded_other}" rel="stylesheet"&gt;
		</pre>

		<h3>Elements will look like this</h3>
		<div class="examples">
			<div>
				<label>anchor tag</label>
				<a href="#">My Link</a>
			</div>
			<div>
				<label>.btn .btn-primary</label>
				<button class="btn btn-primary">Primary</button>
			</div>
			<div>
				<label>.btn .btn-outline-primary</label>
				<button class="btn btn-outline-primary">Outline Primary</button>
			</div>
		</div>
		
		<h3>Other Pro Tips</h3>
		<p>You can add other paramters to the URL that would be in the _variables.scss in bootstrap. For example: &min-contrast-ratio=2</p>
		<input bind:value="{other_variables}" class="form-control">
	</main>
	<footer>
		<i class="far fa-code"></i> by <a href="https://reclique.com" target="_blank">ReClique</a>
		<i class="far fa-copyright"></i> {yr}
	</footer>
</div>

<style>
	.main_wrap{
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
	.examples{
		display: flex;
	}
	.examples > div{
		padding:1rem;
		border-radius: 0.25rem!important;
		box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
		margin: 0 2rem 2rem 0;
	}
	.examples > div > label{
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
</style>
