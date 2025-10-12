import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { buildInfoPlugin } from './vite-plugin-build-info';

export default defineConfig({
	plugins: [sveltekit(), buildInfoPlugin()]
});
