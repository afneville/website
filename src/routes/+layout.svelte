<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import ThemeToggle from '$lib/components/theme-toggle.svelte';
	import '@radix-ui/colors/gray.css';
	import '@radix-ui/colors/gray-dark.css';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="stylesheet" href="/fonts/IosevkaEtoile.css" />
	<link rel="stylesheet" href="/fonts/IosevkaAile.css" />
	<title>Alexander Neville</title>
	<meta
		name="description"
		content="Alexander Neville is a computer science student and software engineer with experience in cloud-scale systems at Google and Confluent."
	/>
	<meta name="author" content="Alexander Neville" />
</svelte:head>

<main>
	{@render children?.()}
</main>

<footer>
	<ThemeToggle />
</footer>

<style>
	:global(:root) {
		--bg-primary: var(--gray-1);
		--text-primary: var(--gray-12);
		--text-secondary: var(--gray-11);
		--text-muted: var(--gray-9);
	}

	:global(.dark) {
		--text-secondary: var(--gray-11);
	}

	:global(body) {
		font-family:
			'Iosevka Aile Web',
			system-ui,
			-apple-system,
			sans-serif;
		font-weight: 400;
		margin: 0;
		padding: 0;
		line-height: 1.6;
		background-color: var(--bg-primary);
		color: var(--text-primary);
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	/* Enable transitions only after page load to prevent flash */
	:global(body.loaded) {
		transition:
			background-color 0.2s ease,
			color 0.2s ease;
	}

	:global(*) {
		box-sizing: border-box;
	}

	main {
		max-width: 80ch;
		margin-inline: auto;
		padding: 1rem;
		flex: 1;
	}

	footer {
		margin-top: auto;
		padding: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	:global(p) {
		font-weight: 300;
		line-height: 1.7;
		text-align: left;
		letter-spacing: 0.01em;
		word-spacing: 0.05em;
		margin-inline: auto;
	}

	:global(::selection) {
		background: #654ea3;
		color: white;
	}

	:global(.gradient-text) {
		background-image: linear-gradient(45deg, #0052d4, #654ea3);
		background-clip: text;
		-webkit-background-clip: text;
		color: transparent;
	}
</style>
