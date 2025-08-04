<script lang="ts">
	export interface CVEntryProps {
		company: string;
		role: string;
		location: string;
		employmentType: string;
		dates: string;
		description: string;
		skills: string[];
	}

	let { company, role, location, employmentType, dates, description, skills }: CVEntryProps = $props();
</script>

<div>
	<div style="margin-bottom: 0.75rem;">
		<div>{role} <span style="font-weight: 300;">·</span> {company}</div>
	</div>
	<div style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.75rem; font-family: 'Iosevka Aile Web', 'Consolas', 'Monaco', monospace; display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap;">
		<div style="display: flex; align-items: center;">
			<span>{employmentType} · {location}</span>
		</div>
		<div>{dates}</div>
	</div>
	<p style="margin-bottom: 0.75rem;">{description}</p>
	<div style="color: var(--text-secondary); font-size: 0.85rem; font-family: 'Iosevka Aile Web', 'Consolas', 'Monaco', monospace; padding-left: 0.5rem; display: flex; flex-wrap: wrap; gap: 0.25rem;">
		{#each skills as skill, index}
			<span>{skill}{#if index < skills.length - 1}&nbsp;·{/if}</span>
		{/each}
	</div>
</div>