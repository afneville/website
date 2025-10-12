<script lang="ts">
	export interface CVEntryProps {
		company: string;
		role: string;
		location: string;
		workingPattern: string;
		employmentType: string;
		dates: string;
		description: string;
		skills: string[];
	}

	let {
		company,
		role,
		location,
		workingPattern,
		employmentType,
		dates,
		description,
		skills
	}: CVEntryProps = $props();
</script>

<div>
	<div class="mb-sm">
		<h3>{role}</h3>
	</div>
	<div
		class="employment-info text-secondary font-sans flex justify-between items-start flex-wrap mb-sm indent-xs gap-lg"
	>
		<div class="flex flex-wrap gap-lg">
			<span>{company}</span>
			<span>{employmentType}</span>
			<span class="no-break">{workingPattern}, {location}</span>
		</div>
		<div>{dates}</div>
	</div>
	<p class="mb-sm">{description}</p>
	<div class="skills text-secondary font-sans flex flex-wrap gap-sm indent-xs">
		{#each skills as skill, index (skill)}
			<span
				>{skill}{#if index < skills.length - 1}&nbsp;·{/if}</span
			>
		{/each}
	</div>
</div>
