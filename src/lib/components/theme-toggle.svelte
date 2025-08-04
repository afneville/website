<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let theme = $state('auto');
	let mediaQuery: MediaQueryList | null = null;

	onMount(() => {
		const stored = localStorage.getItem('theme');
		if (stored) {
			theme = stored;
		}

		mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		mediaQuery.addEventListener('change', handleSystemThemeChange);

		applyTheme(theme);
	});

	onDestroy(() => {
		if (mediaQuery) {
			mediaQuery.removeEventListener('change', handleSystemThemeChange);
		}
	});

	function handleSystemThemeChange() {
		if (theme === 'auto') {
			applyTheme(theme);
		}
	}

	function applyTheme(currentTheme: string) {
		document.documentElement.classList.remove('light', 'dark');

		if (currentTheme === 'auto') {
			if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.add('light');
			}
		} else {
			document.documentElement.classList.add(currentTheme);
		}
	}

	$effect(() => {
		applyTheme(theme);
		if (theme === 'auto') {
			localStorage.removeItem('theme');
		} else {
			localStorage.setItem('theme', theme);
		}
	});
</script>

<div class="theme-toggle">
	<label for="theme-select">Theme:</label>
	<select id="theme-select" bind:value={theme}>
		<option value="auto">Auto</option>
		<option value="light">Light</option>
		<option value="dark">Dark</option>
	</select>
</div>

<style>
	.theme-toggle {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 1rem;
	}

	label {
		color: var(--text-secondary);
	}

	select {
		background: var(--bg-primary);
		color: var(--text-primary);
		border: 1px solid var(--text-muted);
		border-radius: 4px;
		padding: 0.25rem 0.5rem;
		font-family: inherit;
	}
</style>
