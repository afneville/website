<script lang="ts">
	let { margin = '2rem 0' } = $props<{
		margin?: string;
	}>();
</script>

<div class="divider" style="margin: {margin}"></div>

<style>
	.divider {
		width: 100%;
		height: 1px;
		background-color: var(--text-secondary);
		opacity: 0.3;
	}
</style>
