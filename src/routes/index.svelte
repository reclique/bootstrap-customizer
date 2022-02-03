<script>
import { onMount } from "svelte";


	let import_color = '#f26522';
	$: encoded_color = encodeURIComponent(import_color);
	let other_variables = 'min-contrast-ratio=2&link-decoration=none';
	$: encoded_other = other_variables.match(/^\&/) ? other_variables : `&${other_variables}`;

	let domain = '';
	onMount(() => {
		domain = `httsp://${window.location.host}`;
	});
</script>

<svelte:head>
	<title>Bootstrap Customizer by URL</title>
	<link rel="stylesheet" href="{`/bootstrap/5.1.3.css?primary=${encoded_color}${encoded_other}`}">
	<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
	<!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"> -->
</svelte:head>

<div class="container pt-5">
	<main>
		<h1><i class="fal fa-palette"></i> Easily customize Bootstrap without a build step</h1>
		<p>Sometimes, you want to easily link the bootstrap stylesheet and only changing some of the bootstrap variables.</p>
		
		<h2>Example</h2>
		<div class="mb-3">
			<label>Chose a color:</label>
			<input type="color" bind:value="{import_color}">
		</div>

		<h3>Insert this in your HTML</h3>
		<pre>
			&lt;link href="{domain}/bootstrap/5.1.3.css?blue={encoded_color}" rel="stylesheet"&gt;
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
</div>

<style>
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
	}
</style>
