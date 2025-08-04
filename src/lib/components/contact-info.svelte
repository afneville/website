<script lang="ts">
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
		<a {href} class="link" {target} {download} rel="noopener noreferrer">{linkText}</a>
	</div>
</div>

<style>
	.contact-info {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		font-size: 1rem;
	}

	.title-row {
		margin-bottom: 0.25rem;
	}
	
	.title {
		color: var(--text-primary);
		font-family: 'Iosevka Aile Web', sans-serif;
		font-size: 1rem;
		font-weight: 400;
	}
	
	.link-row {
		display: flex;
		align-items: center;
	}

	.link {
		color: var(--text-secondary);
		font-family: 'Iosevka Etoile Web', 'Consolas', 'Monaco', monospace;
		font-size: 1rem;
		font-weight: 300;
		text-decoration: underline;
		text-decoration-style: dotted;
		text-decoration-thickness: 2px;
		text-underline-offset: 0.4em;
		transition: all 0.2s ease;
	}

	.link:visited {
		color: var(--text-secondary);
	}
</style>