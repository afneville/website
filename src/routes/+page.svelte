<script lang="ts">
	import Heading from '$lib/components/heading.svelte';
	import MessageCircleIcon from '$lib/assets/message-circle.svg?raw';
	import LinkedInIcon from '$lib/assets/linkedin-logo.svg?raw';
	import GitHubIcon from '$lib/assets/github-logo.svg?raw';
	import AtSignIcon from '$lib/assets/at-sign.svg?raw';
	import LockIcon from '$lib/assets/lock.svg?raw';
	import CVTimeline from '$lib/components/cv-timeline.svelte';
	import { type CVEntryProps } from '$lib/components/cv-entry.svelte';
	import LinkWithIcon from '$lib/components/link-with-icon.svelte';
	const cvEntries: CVEntryProps[] = [
		{
			company: 'Google',
			role: 'Site Reliability Engineer',
			workingPattern: 'On-site',
			location: 'Dublin, Ireland',
			employmentType: 'Internship',
			dates: 'June 2025 - September 2025',
			description:
				'Implemented an interactive observability front end to visualise the availability of key ranges and submillisecond latencies in the sharding, rebalancing and tablet server failover behaviour of Bigtable cells by querying internal metadata.',
			skills: ['C++', 'Bigtable', 'Protobuf', 'RPC', 'FFI', 'TypeScript', 'Angular', 'RxJS', 'D3']
		},
		{
			company: 'Confluent',
			role: 'Cloud Infrastructure Engineer',
			workingPattern: 'Remote',
			location: 'United Kingdom',
			employmentType: 'Internship',
			dates: 'June 2024 - June 2025',
			description:
				'Contributed to the specification and implementation of custom resources and controllers to declaratively manage infrastructure by reconciling intent with cloud provider APIs. Monitored and operated the production Kubernetes fleet.',
			skills: [
				'Go',
				'Kubernetes',
				'Protobuf',
				'gRPC',
				'Prometheus',
				'AWS',
				'GCP',
				'Azure',
				'Terraform'
			]
		},
		{
			company: 'cuby',
			role: 'Full-stack Software Engineer',
			workingPattern: 'Remote',
			location: 'United Kingdom',
			employmentType: 'Freelance',
			dates: 'March 2024 - August 2024',
			description:
				'Created rich user interfaces backed by a federated GraphQL supergraph resolving queries over more than 20 subgraph microservices. Developed scripts and tooling to streamline development, testing and business operations.',
			skills: ['Kotlin', 'GraphQL', 'Spring', 'DynamoDB', 'TypeScript', 'React']
		}
	];
</script>

<header>
	<Heading
		text="Alexander Neville"
		tagline="Software / Systems / Infrastructure Engineer"
		socialLinks={[
			{ linkText: 'LinkedIn', href: 'https://linkedin.com/in/afneville', icon: LinkedInIcon },
			{ linkText: 'GitHub', href: 'https://github.com/afneville', icon: GitHubIcon },
			{
				linkText: 'Signal',
				href: 'https://signal.me/#eu/vaojnhDojUTxZPfY7OcrxXKde-0_TQoq8Ho1VGVasQ4Nx5l-27tJqbDod4z3zMfN',
				icon: MessageCircleIcon
			},
			{ linkText: 'Email', href: 'mailto:contact@afneville.com', icon: AtSignIcon },
			{ linkText: 'PGP', href: 'key.asc', icon: LockIcon }
		]}
	/>
</header>
<section aria-label="About">
	<p>
		I am an undergraduate computer science student at the University of
		Birmingham in the United Kingdom. I have contributed to the design, development and operation of cloud-scale,
		high-performance distributed systems at Google and Confluent.
	</p>
</section>
<div class="mt-lg mb-2xl"></div>
<section aria-label="Experience">
	<!-- <h2>Experience</h2> -->
	<!-- <p class="mb-lg"> -->
	<!-- 	Here is an overview of my recent startup and internship roles. Some details have been omitted; I -->
	<!-- 	would be happy to provide a full copy of my CV upon request. -->
	<!-- </p> -->
	<CVTimeline entries={cvEntries} />
</section>
<div class="mt-lg mb-lg"></div>
<section aria-label="Interests">
	<!-- <h2>About Me</h2> -->
	<p>
		I have enjoyed learning about the performance characteristics, trade-offs and implementation
		details of large-scale distributed data systems like Confluent Cloud (Kafka), Bigtable and
		Colossus (Google's distributed file system).
	</p>
	<p>
		I'm looking into Unix APIs, Linux ABIs, pseudo file systems, standard libraries, compiler
		toolchains, language runtimes etc. as part of an ongoing effort to understand a machine and its
		operating system at the byte level.
	</p>
	<p>
		I am very enthusiastic about my Arch Linux, Sway, Neovim, tmux setup - you can find the
		configuration files <LinkWithIcon
			linkText="here"
			href="https://github.com/afneville/dotfiles"
		/>. My blog/documentation website, an older project, can be read <LinkWithIcon
			linkText="here"
			href="https://docs.afneville.com"
		/>. I publish some of the photos I take <LinkWithIcon
			linkText="here"
			href="https://photos.afneville.com"
		/>.
	</p>
</section>
