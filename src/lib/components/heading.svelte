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
		<p class="tagline text-secondary font-mono">{tagline}</p>
	{/if}
	{#if socialLinks}
		<div class="social-links flex justify-center gap-xl flex-wrap">
			{#each socialLinks as link (link.href)}
				<div>
					<LinkWithIcon linkText={link.linkText} href={link.href} icon={link.icon} />
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.heading {
		margin-bottom: 3rem;
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
		font-size: 1.125rem;
		text-align: center;
	}

	.social-links {
		margin-top: 1rem;
	}

	@media (max-width: 480px) {
		.heading-title {
			font-size: 2.5rem;
		}
	}
</style>
