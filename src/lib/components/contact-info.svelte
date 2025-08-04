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

<div class="contact-info">
	{#if title}
		<div class="title-row">
			<span class="title">{title}</span>
		</div>
	{/if}
	<div class="link-row">
		<LinkWithIcon {linkText} {href} {download} {target} />
	</div>
</div>

<style>
	.contact-info {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.title-row {
		margin-bottom: 0.25rem;
	}

	.title {
		color: var(--text-primary);
		font-family: 'Iosevka Aile Web', sans-serif;
		font-weight: 400;
	}

	.link-row {
		display: flex;
		align-items: center;
	}
</style>
