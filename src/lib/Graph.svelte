<script lang="ts">
	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	export let vertices: string[] = [];
	export let edges: string[] = [];

	const width = 400;
	const height = 400;
	let svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;

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

	onMount(() => {
		svg = d3
			.select('.graph')
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.attr('viewBox', `0,0,${width},${height}`);

		const link = svg
			.append('g')
			.attr('stroke', 'var(--fg)')
			.attr('stroke-opacity', 0.6)
			.selectAll('line')
			.data(links)
			.join('line');

		const node = svg
			.append('g')
			.attr('stroke', 'var(--fg)')
			.attr('stroke-width', 1.5)
			.selectAll('g')
			.data(nodes)
			.enter()
			.append('g');

		node.append('circle').attr('r', 10).attr('fill', 'var(--bg2)');

		node
			.append('text')
			.text((d) => d.id)
			.attr('cursor', 'pointer')
			.attr('fill', 'white')
			.attr('font-size', 12)
			.attr('y', 3)
			.attr('x', -4);

		function simulationUpdate() {
			link
				.attr('x1', (d) => d.source.x)
				.attr('y1', (d) => d.source.y)
				.attr('x2', (d) => d.target.x)
				.attr('y2', (d) => d.target.y);

			node.attr('transform', (d) => `translate(${d.x},${d.y})`);
		}

		const simulation = d3
			.forceSimulation(nodes)
			.force(
				'link',
				d3.forceLink<Node, Link>(links).id((v) => v.id)
			)
			.force('charge', d3.forceManyBody())
			.force('center', d3.forceCenter(width / 2, height / 2))
			.on('tick', simulationUpdate);

		function dragstarted(event: d3.D3DragEvent<SVGCircleElement, Node, Subject>) {
			if (!event.active) simulation.alphaTarget(0.3).restart();
			event.subject.fx = event.subject.x;
			event.subject.fy = event.subject.y;
		}

		function dragged(event: d3.D3DragEvent<SVGCircleElement, Node, Subject>) {
			event.subject.fx = event.x;
			event.subject.fy = event.y;
		}

		function dragended(event: d3.D3DragEvent<SVGCircleElement, Node, Subject>) {
			if (!event.active) simulation.alphaTarget(0);
			event.subject.fx = null;
			event.subject.fy = null;
		}

		node.call(
			d3
				.drag<SVGCircleElement, Node>()
				.on('start', dragstarted)
				.on('drag', dragged)
				.on('end', dragended)
		);
	});
</script>

<div class="container">
	<div>
		<h2>Vertices</h2>
		<ul>
			{#each vertices as vertex}
				<ul>{vertex}</ul>
			{/each}
		</ul>

		<h2>Edges</h2>
		<ul>
			{#each edges as edge}
				<ul>{edge}</ul>
			{/each}
		</ul>
	</div>

	<div class="graph" style="height: {height}px; width: {width}px;" />
</div>

<style>
	.container {
		display: flex;
		justify-content: space-around;
	}

  h2 {
    color: var(--purple);
  }
</style>
