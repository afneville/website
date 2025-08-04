<script lang="ts">
	import ContactInfo from '$lib/components/contact-info.svelte';
	import Heading from '$lib/components/heading.svelte';
	import SendIcon from '$lib/assets/send.svg?raw';
	import LockIcon from '$lib/assets/lock.svg?raw';
	import MessageCircleIcon from '$lib/assets/message-circle.svg?raw';
	import LinkedInIcon from '$lib/assets/linkedin-logo.svg?raw';
	import GitHubIcon from '$lib/assets/github-logo.svg?raw';
	import Divider from '$lib/components/divider.svelte';
	import CVTimeline from '$lib/components/cv-timeline.svelte';
	import DottedLine from '$lib/components/dotted-line.svelte';
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
				'Contributed to the specification and implementation of custom resources and controllers to declaratively manage infrastructure by reconciling objects with cloud provider APIs. Monitored and operated the production multicloud Kubernetes fleet.',
			skills: ['Go', 'Kubernetes', 'Protobuf', 'gRPC', 'Prometheus', 'AWS', 'GCP', 'Azure']
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
		// ... more entries
	];
</script>

<header>
	<Heading
		text="Alexander Neville"
		tagline="Software / Systems / Infrastructure Engineer"
		socialLinks={[
			{ linkText: 'LinkedIn', href: 'https://linkedin.com/in/afneville', icon: LinkedInIcon },
			{ linkText: 'GitHub', href: 'https://github.com/afneville', icon: GitHubIcon },
			{ linkText: 'Signal', href: 'https://signal.me/#eu/vaojnhDojUTxZPfY7OcrxXKde-0_TQoq8Ho1VGVasQ4Nx5l-27tJqbDod4z3zMfN', icon: MessageCircleIcon }
		]}
	/>
</header>
<section aria-label="About">
	<p>
		Hello, my name is Alexander. I am a computer science student at the University of Birmingham. I
		have contributed to the design, development and operation of cloud-scale, high-performance
		software systems at <strong>Google</strong> and <strong>Confluent</strong>.
	</p>
</section>
<DottedLine marginTop="2rem" marginBottom="2rem" />
<section aria-label="Contact Information">
	<div class="contact-buttons">
		<ContactInfo
			title="Email"
			linkText="contact@afneville.com"
			href="mailto:contact@afneville.com"
		/>
		<ContactInfo
			title="PGP"
			linkText="BB30 2E2E 1E84 6017 3DD8  69A0 E584 CD0E 64E2 6B84"
			href="key.asc"
			download="alexander-neville-pgp-key.asc"
		/>
	</div>
</section>
<DottedLine marginBottom="2rem" marginTop="2.5rem" />
<section aria-label="Experience">
	<p style="margin-bottom: 2rem;">
		An overview of the startup and internship work that I have undertaken recently, some
		details omitted (I would be happy to provide a full copy of my CV upon
		request):
	</p>
	<CVTimeline entries={cvEntries} />
</section>

<style>
	p {
		/* text-align: justify; */
		/* text-justify: inter-word; */
		text-wrap: pretty;
	}
	.contact-buttons {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		gap: 3rem;
		margin-left: 1rem;
	}
</style>
