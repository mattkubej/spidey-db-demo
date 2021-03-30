<script lang="ts">
	import * as d3 from 'd3';

	export let vertices: string[] = [];
	export let edges: string[] = [];

	interface Subject {
		x?: number;
		y?: number;
		fx?: number;
		fy?: number;
	}

	interface Node extends d3.SimulationNodeDatum {
		id: string;
	}

	interface Link extends d3.SimulationLinkDatum<Node> {
		source: string & Subject;
		target: string & Subject;
	}

	let nodes: Node[] = vertices.map((id) => ({ id }));
	let links: Link[] = edges.map(([source, target]) => ({ source, target }));

	let renderedNodes: Node[] = [];
	let renderedLinks: Link[] = [];

	const width = 400;
	const height = 400;

	$: simulation = d3
		.forceSimulation(nodes)
		.force(
			'link',
			d3.forceLink<Node, Link>(links).id((v) => v.id)
		)
		.force('charge', d3.forceManyBody())
		.force('center', d3.forceCenter(width / 2, height / 2))
		.on('tick', () => {
			renderedLinks = [...links];
			renderedNodes = [...nodes];
		});

	$: {
	}
</script>

<div class="container">
	<svg {width} {height}>
		<g stroke="var(--fg)" stroke-width="0.6">
			{#each renderedLinks as { source, target }}
				<line x1={source.x} y1={source.y} x2={target.x} y2={target.y} />
			{/each}
		</g>
		<g stroke="var(--fg)" stroke-width="1.5">
			{#each renderedNodes as { x, y, id }}
				<g transform={`translate(${x},${y})`}>
					<circle fill="var(--bg2)" r={10} />
					<text cursor="pointer" fill="white" font-size="12" y="3" x="-4">{id}</text>
				</g>
			{/each}
		</g>
	</svg>
</div>

<style>
	.container {
		display: flex;
		justify-content: space-around;
	}
</style>
