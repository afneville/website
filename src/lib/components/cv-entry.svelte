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
	<div class="mb-sm">
		<h3>{role}&nbsp;&nbsp;<span class="font-light">{company}</span></h3>
	</div>
	<div class="employment-info text-secondary font-sans flex justify-between items-start flex-wrap mb-sm">
		<div class="flex items-center">
			<span>{employmentType} · {location}</span>
		</div>
		<div>{dates}</div>
	</div>
	<p class="mb-sm">{description}</p>
	<div class="skills text-secondary font-sans flex flex-wrap gap-sm" style="padding-left: 0.5rem;">
		{#each skills as skill, index (skill)}
			<span
				>{skill}{#if index < skills.length - 1}&nbsp;·{/if}</span
			>
		{/each}
	</div>
</div>

