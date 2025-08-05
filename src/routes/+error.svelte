<script lang="ts">
	import { page } from '$app/stores';
	import LinkWithIcon from '$lib/components/link-with-icon.svelte';

	$: status = $page.status;

	const homeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"></path><polyline points="9,22 9,12 15,12 15,22"></polyline></svg>`;
</script>

<svelte:head>
	<title>Alexander Neville - Error {status}</title>
	<meta name="description" content="Alexander Neville's Personal Site" />
</svelte:head>

<div class="error-container">
	<div class="error-block">
		<h1 class="error-title">Error {status}</h1>

		<LinkWithIcon linkText="Return Home" href="/" icon={homeIcon} />
	</div>
</div>

<style>
	.error-container {
		min-height: 80vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
	}

	.error-block {
		text-align: center;
		padding: 3rem 2rem;
		border-radius: 0.5rem;
		background: var(--accent-2);
		border: 1px solid var(--accent-6);
		max-width: 400px;
	}

	.error-title {
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: 2rem;
		font-family: 'Iosevka Aile Web', system-ui, -apple-system, sans-serif;
	}
</style>
