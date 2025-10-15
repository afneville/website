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
		class="employment-info text-secondary flex justify-between items-start flex-wrap mb-sm indent-xs gap-lg"
	>
		<div class="flex flex-wrap gap-lg">
			<span>{company}</span>
			<span>{employmentType}</span>
			<span class="no-break">{workingPattern}, {location}</span>
		</div>
		<div>{dates}</div>
	</div>
	<p>{description}</p>
	<div class="skills text-secondary flex flex-wrap gap-lg indent-xs">
		{#each skills as skill (skill)}
			<span>{skill}</span>
		{/each}
	</div>
</div>
