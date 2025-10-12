<script lang="ts">
	let { linkText, href, icon, iconComponent, download, target, noUnderline, iconSize, children } =
		$props<{
			linkText: string;
			href: string;
			icon?: string;
			iconComponent?: import('svelte').Component;
			download?: string;
			target?: string;
			noUnderline?: boolean;
			iconSize?: string;
			children?: import('svelte').Snippet;
		}>();
</script>

<a
	{href}
	class="link-with-icon items-center gap-md text-secondary"
	target={target || '_blank'}
	{download}
	rel="noopener noreferrer"
>
	{#if iconComponent}
		<span class="icon" style:width={iconSize} style:height={iconSize}>
			<!-- svelte-ignore svelte_component_deprecated -->
			<svelte:component this={iconComponent} />
		</span>
	{:else if icon}
		<span class="icon" style:width={iconSize} style:height={iconSize}>
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html icon}
		</span>
	{/if}
	<span class="link-text" class:no-underline={noUnderline}>
		{#if children}
			{@render children()}
		{:else}
			{linkText}
		{/if}
	</span>
</a>

<style>
	.link-with-icon {
		display: inline-flex;
		text-decoration: none;
		transition: all 0.2s ease;
		min-height: 2.25rem;
		align-items: center;
	}

	.link-with-icon:visited {
		color: var(--text-secondary);
	}

	.link-text {
		text-decoration: none;
		line-height: 1.7;
	}

	.link-text :global(span) {
		text-decoration: underline;
		text-decoration-style: dotted;
		text-decoration-thickness: 2px;
		text-underline-offset: 0.4em;
	}

	.link-text:not(:has(:global(span))) {
		text-decoration: underline;
		text-decoration-style: dotted;
		text-decoration-thickness: 2px;
		text-underline-offset: 0.4em;
	}

	.link-text.no-underline {
		text-decoration: none !important;
	}

	.link-text.no-underline :global(span) {
		text-decoration: none !important;
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

	.icon[style*='width'] :global(svg) {
		width: 100%;
		height: 100%;
	}
</style>
