<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import SunIcon from '$lib/icons/sun.svelte';
	import MoonIcon from '$lib/icons/moon.svelte';
	import SettingsIcon from '$lib/icons/settings.svelte';

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

	function setTheme(newTheme: string) {
		theme = newTheme;
	}
</script>

<div class="theme-toggle">
	<button
		type="button"
		class="theme-button"
		class:active={theme === 'auto'}
		onclick={() => setTheme('auto')}
		title="Auto theme"
	>
		<SettingsIcon />
	</button>
	<button
		type="button"
		class="theme-button"
		class:active={theme === 'light'}
		onclick={() => setTheme('light')}
		title="Light theme"
	>
		<SunIcon />
	</button>
	<button
		type="button"
		class="theme-button"
		class:active={theme === 'dark'}
		onclick={() => setTheme('dark')}
		title="Dark theme"
	>
		<MoonIcon />
	</button>
</div>

<style>
	.theme-toggle {
		display: flex;
		background: var(--gray-3);
		border-radius: 9999px;
		padding: 0.125rem;
		gap: 0;
	}

	.theme-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		background: transparent;
		border: none;
		border-radius: 50%;
		color: var(--text-secondary);
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.theme-button:hover {
		background: var(--gray-4);
		transform: scale(1.05);
	}

	.theme-button.active {
		background: var(--gray-1);
		color: var(--text-primary);
		transform: scale(1.05);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.theme-button :global(svg) {
		width: 1rem;
		height: 1rem;
	}
</style>
