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

	let { company, role, location, employmentType, dates, description, skills }: CVEntryProps =
		$props();
</script>

<div>
	<div style="margin-bottom: 0.75rem;">
		<h3>{role}&nbsp;&nbsp;<span style="font-weight: 300;">{company}</span></h3>
	</div>
	<div
		style="color: var(--text-secondary); margin-bottom: 0.75rem; font-family: 'Iosevka Aile Web', 'Consolas', 'Monaco', monospace; display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap;"
	>
		<div style="display: flex; align-items: center;">
			<span>{employmentType} · {location}</span>
		</div>
		<div>{dates}</div>
	</div>
	<p style="margin-bottom: 0.75rem;">{description}</p>
	<div
		style="color: var(--text-secondary); font-family: 'Iosevka Aile Web', 'Consolas', 'Monaco', monospace; padding-left: 0.5rem; display: flex; flex-wrap: wrap; gap: 0.25rem;"
	>
		{#each skills as skill, index (skill)}
			<span
				>{skill}{#if index < skills.length - 1}&nbsp;·{/if}</span
			>
		{/each}
	</div>
</div>

<style>
	h3 {
		font-size: 1.25rem;
		font-weight: 400;
		margin: 0;
	}
</style>
