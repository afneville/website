<script lang="ts">
	let { text, tagline, socialLinks } = $props<{
		text: string;
		tagline?: string;
		socialLinks?: Array<{ linkText: string; href: string; icon: string }>;
	}>();
	import LinkWithIcon from './link-with-icon.svelte';
</script>

<div class="heading">
	<h1 class="gradient-text heading-title">{text}</h1>
	{#if tagline}
		<p class="tagline">{tagline}</p>
	{/if}
	{#if socialLinks}
		<div class="social-links">
			{#each socialLinks as link (link.href)}
				<LinkWithIcon linkText={link.linkText} href={link.href} icon={link.icon} />
			{/each}
		</div>
	{/if}
</div>

<style>
	.heading {
		margin-bottom: 2.5rem;
		margin-top: 3rem;
		text-align: center;
	}

	.heading-title {
		display: inline-block;
		letter-spacing: 0.25rem;
		font-size: 3.5rem;
		font-weight: 700;
		line-height: 1;
		margin: 0;
	}

	.tagline {
		color: var(--text-secondary);
		font-family: 'Iosevka Etoile Web', 'Consolas', 'Monaco', monospace;
		font-size: 1.125rem;
		/* line-height: 1; */
		text-align: center;
	}

	.social-links {
		display: flex;
		justify-content: center;
		gap: 2rem;
		margin-top: 1rem;
	}
</style>
