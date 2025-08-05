<script lang="ts">
	import LinkWithIcon from './link-with-icon.svelte';

	let { title, linkText, href, download, target, children } = $props<{
		title?: string;
		linkText?: string;
		href: string;
		download?: string;
		target?: string;
		children?: import('svelte').Snippet;
	}>();
</script>

<div class="flex flex-col gap-sm">
	{#if title}
		<div class="title-row">
			<span class="title font-sans">{title}</span>
		</div>
	{/if}
	<div class="flex items-center">
		<LinkWithIcon {linkText} {href} {download} {target}>
			{#if children}
				{@render children()}
			{:else}
				{linkText}
			{/if}
		</LinkWithIcon>
	</div>
</div>

<style>
	.title-row {
		margin-bottom: 0.25rem;
	}

	.title {
		font-weight: 400;
	}
</style>
