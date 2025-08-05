<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import ThemeToggle from '$lib/components/theme-toggle.svelte';
	import '@radix-ui/colors/gray.css';
	import '@radix-ui/colors/gray-dark.css';
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Alexander Neville</title>
	<meta
		name="description"
		content="Alexander Neville's Personal Site"
	/>
	<meta name="author" content="Alexander Neville" />
</svelte:head>

<main>
	{@render children?.()}
</main>

<footer class="flex justify-center items-center">
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
	}

	:global(p) {
		font-weight: 300;
		line-height: 1.7;
		text-align: left;
		letter-spacing: 0.01em;
		word-spacing: 0.05em;
		margin-inline: auto;
	}

	:global(h2) {
		font-size: 1.5rem;
		font-weight: 400;
	}

	:global(h3) {
		font-size: 1.25rem;
		font-weight: 400;
		margin: 0;
	}

	/* Typography utilities */
	:global(.font-mono) {
		font-family: 'Iosevka Etoile Web', 'Consolas', 'Monaco', monospace;
	}

	:global(.font-sans) {
		font-family: 'Iosevka Aile Web', system-ui, -apple-system, sans-serif;
	}

	:global(.text-secondary) {
		color: var(--text-secondary);
	}

	:global(.font-light) {
		font-weight: 300;
	}

	/* Layout utilities */
	:global(.flex) {
		display: flex;
	}

	:global(.flex-col) {
		flex-direction: column;
	}

	:global(.items-center) {
		align-items: center;
	}

	:global(.justify-center) {
		justify-content: center;
	}

	:global(.justify-between) {
		justify-content: space-between;
	}

	:global(.flex-wrap) {
		flex-wrap: wrap;
	}

	/* Gap utilities */
	:global(.gap-sm) {
		gap: 0.25rem;
	}

	:global(.gap-md) {
		gap: 0.5rem;
	}

	:global(.gap-lg) {
		gap: 1rem;
	}

	:global(.gap-xl) {
		gap: 1.5rem;
	}

	:global(.gap-2xl) {
		gap: 3rem;
	}

	/* Spacing utilities */
	:global(.mb-sm) {
		margin-bottom: 0.75rem;
	}

	:global(.mb-lg) {
		margin-bottom: 2rem;
	}

	:global(.mt-lg) {
		margin-top: 2rem;
	}

	:global(.mt-xl) {
		margin-top: 2.5rem;
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
