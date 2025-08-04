<script lang="ts">
	let { marginTop = '0.4em', marginBottom = '0.4em' } = $props<{
		marginTop?: string;
		marginBottom?: string;
	}>();
</script>

<div class="dotted-line" style="margin-top: {marginTop}; margin-bottom: {marginBottom};"></div>

<style>
	.dotted-line {
		width: 100%;
		height: 2px;
		border-bottom: 2px dotted var(--text-muted);
	}
</style>
