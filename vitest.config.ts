import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [svelte({ hot: false })],
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./src/test/setup.ts']
	},
	resolve: {
		conditions: ['browser'],
		alias: {
			$lib: new URL('./src/lib', import.meta.url).pathname
		}
	},
	assetsInclude: ['**/*.svg']
});
