<script lang="ts">
	let { linkText, href, icon, download, target } = $props<{
		linkText: string;
		href: string;
		icon?: string;
		download?: string;
		target?: string;
	}>();
</script>

<a {href} class="link-with-icon items-center gap-md font-mono font-light text-secondary" target={target || '_blank'} {download} rel="noopener noreferrer">
	{#if icon}
		<span class="icon">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html icon}
		</span>
	{/if}
	<span class="link-text">{linkText}</span>
</a>

<style>
	.link-with-icon {
		display: inline-flex;
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.link-with-icon:visited {
		color: var(--text-secondary);
	}

	.link-text {
		text-decoration: underline;
		text-decoration-style: dotted;
		text-decoration-thickness: 2px;
		text-underline-offset: 0.4em;
	}

	.icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1rem;
		height: 1rem;
	}

	.icon :global(svg) {
		width: 1rem;
		height: 1rem;
		stroke: var(--text-secondary);
	}
</style>
