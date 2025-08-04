<script lang="ts">
	import LinkWithIcon from './link-with-icon.svelte';

	let { title, linkText, href, download, target } = $props<{
		title?: string;
		linkText: string;
		href: string;
		download?: string;
		target?: string;
	}>();
</script>

<div class="flex-col gap-sm">
	{#if title}
		<div class="title-row">
			<span class="title font-sans">{title}</span>
		</div>
	{/if}
	<div class="flex items-center">
		<LinkWithIcon {linkText} {href} {download} {target} />
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
