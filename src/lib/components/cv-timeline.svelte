<script lang="ts">
	import CVEntry, { type CVEntryProps } from './cv-entry.svelte';

	let { entries }: { entries: CVEntryProps[] } = $props();
</script>

<div class="cv-timeline">
	{#each entries as entry, index (entry.company + entry.role)}
		<div class="timeline-item">
			<div class="timeline-visual">
				<div class="timeline-point"></div>
				{#if index === 0 && entries.length > 1}
					<!-- First entry: line from point to bottom + gap -->
					<div class="timeline-line timeline-line-first"></div>
				{:else if index === entries.length - 1 && entries.length > 1}
					<!-- Last entry: line from top to point -->
					<div class="timeline-line timeline-line-last"></div>
				{:else if entries.length > 1}
					<!-- Middle entries: full height line + gap -->
					<div class="timeline-line timeline-line-middle"></div>
				{/if}
			</div>
			<div class="timeline-content">
				<CVEntry {...entry} />
			</div>
		</div>
	{/each}
</div>

<style>
	.cv-timeline {
		position: relative;
	}

	.timeline-item {
		display: flex;
		align-items: stretch;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.timeline-visual {
		position: relative;
		width: 1rem;
		flex-shrink: 0;
	}

	.timeline-point {
		width: 0.75rem;
		height: 0.75rem;
		border-radius: 50%;
		background: var(--bg-primary);
		border: 2px solid var(--text-muted);
		position: absolute;
		top: 0.5rem;
		left: 0.125rem;
		z-index: 2;
	}

	.timeline-line {
		position: absolute;
		left: 50%;
		width: 2px;
		background: var(--text-muted);
		transform: translateX(-50%);
		z-index: 1;
	}

	.timeline-line-first {
		top: 1rem;
		height: calc(100% + 2rem);
	}

	.timeline-line-last {
		top: -2rem;
		height: calc(2rem + 0.5rem);
	}

	.timeline-line-middle {
		top: -2rem;
		height: calc(100% + 4rem);
	}

	.timeline-content {
		flex: 1;
		min-width: 0;
	}
</style>
