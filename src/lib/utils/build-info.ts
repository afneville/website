declare global {
	const __BUILD_INFO__: {
		commitHash: string;
		shortCommitHash: string;
		githubRepo: string;
		buildTime: string;
	};
}

export const buildInfo =
	typeof __BUILD_INFO__ !== 'undefined'
		? __BUILD_INFO__
		: {
				commitHash: '',
				shortCommitHash: '',
				githubRepo: 'afneville/website',
				buildTime: ''
			};
