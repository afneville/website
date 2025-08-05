<script lang="ts">
	import ContactInfo from '$lib/components/contact-info.svelte';
	import Heading from '$lib/components/heading.svelte';
	import MessageCircleIcon from '$lib/assets/message-circle.svg?raw';
	import LinkedInIcon from '$lib/assets/linkedin-logo.svg?raw';
	import GitHubIcon from '$lib/assets/github-logo.svg?raw';
	import CVTimeline from '$lib/components/cv-timeline.svelte';
	import LinkWithIcon from '$lib/components/link-with-icon.svelte';
	const cvEntries = [
		{
			company: 'Google',
			role: 'Site Reliability Engineer',
			location: 'On-site, Dublin, Ireland',
			employmentType: 'Internship',
			dates: 'June 2025 - September 2025',
			description:
				'Implemented an observability front end to visualise the availability of key ranges and microsecond-accurate latencies in the sharding, rebalancing and failover behaviour of Bigtable cells by querying internal metadata.',
			skills: ['C++', 'Bigtable', 'Protobuf', 'RPC', 'FFI', 'TypeScript', 'Angular']
		},
		{
			company: 'Confluent',
			role: 'Cloud Infrastructure Engineer',
			location: 'Remote, United Kingdom',
			employmentType: 'Internship',
			dates: 'June 2024 - June 2025',
			description:
				'Contributed to the specification and implementation of custom resources and controllers to declaratively manage infrastructure by reconciling objects with cloud provider APIs. Monitored and operated the production Kubernetes fleet.',
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
			location: 'Remote, United Kingdom',
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
			}
		]}
	/>
</header>
<section aria-label="About">
	<p>
		Hello, my name is Alexander. I am an undergraduate computer science student at the University of
		Birmingham in the United Kingdom. I have contributed to the design, development and operation of
		cloud-scale, high-performance distributed software systems at <strong>Google</strong> and
		<strong>Confluent</strong>.
	</p>
</section>
<div class="mt-lg mb-lg"></div>
<section aria-label="Contact Information">
	<div class="email-pgp flex flex-wrap justify-center gap-2xl">
		<ContactInfo
			title="Email"
			linkText="contact@afneville.com"
			href="mailto:contact@afneville.com"
		/>
		<ContactInfo title="PGP" href="key.asc" download="alexander-neville-pgp-key.asc">
			<span class="no-break">BB30 2E2E 1E84 6017 3DD8</span>
			<span class="no-break">69A0 E584 CD0E 64E2 6B84</span>
		</ContactInfo>
	</div>
</section>
<div class="mt-lg mb-2xl"></div>
<section aria-label="Experience">
	<h2>Experience</h2>
	<p class="mb-lg">
		An overview of my recent startup and internship roles. Some details have been omitted; I would
		be happy to provide a full copy of my CV upon request.
	</p>
	<CVTimeline entries={cvEntries} />
</section>
<div class="mt-lg mb-lg"></div>
<section aria-label="Interests">
	<h2>About Me</h2>
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
		/>.
	</p>
</section>

<style>
	@media (max-width: 85ch) {
		.email-pgp {
			flex-direction: column;
			align-items: flex-start;
			justify-content: flex-start;
			margin-left: 1rem;
		}
	}
</style>
