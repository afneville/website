import { execSync } from 'child_process';

export function buildInfoPlugin() {
	return {
		name: 'build-info',
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		config(config: any) {
			// Get git information
			let commitHash = '';
			let shortCommitHash = '';

			try {
				commitHash = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
				shortCommitHash = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (error: any) {
				console.warn('Could not get git information:', error.message);
			}

			// Define build info globals
			config.define = {
				...config.define,
				__BUILD_INFO__: JSON.stringify({
					commitHash: commitHash,
					shortCommitHash: shortCommitHash,
					githubRepo: 'afneville/website',
					buildTime: new Date().toISOString()
				})
			};
		}
	};
}
