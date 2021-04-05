<script lang="ts">
  import * as d3 from 'd3';
  import drag from '$lib/utils/drag';
  import { nodeDetailsStore } from '$lib/store';

  export let vertices: string[] = [];
  export let edges: string[][] = [];

  const width = 400;
  const height = 400;

  let renderedNodes: GraphNode[] = [];
  let renderedLinks: GraphLink[] = [];

  let nodes: GraphNode[];
  let links: GraphLink[];

  $: nodes = vertices.map((id) => ({ id }));
  $: links = edges.map(([source, target]) => ({ source, target }));

  $: simulation = d3
    .forceSimulation(nodes)
    .force(
      'link',
      d3.forceLink<GraphNode, GraphLink>(links).id((v) => v.id)
    )
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(width / 2, height / 2))
    .on('tick', () => {
      renderedLinks = [...links];
      renderedNodes = [...nodes];
    });

  $: simNodes = [];

  $: {
    simNodes.forEach((node) => {
      d3.select(node).call(drag(simulation));
    });
  }

  function handleNodeClick(key: string) {
    $nodeDetailsStore.selectedNodeKey = key;
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
      {#each renderedNodes as { x, y, id }, i}
        <g
          bind:this={simNodes[i]}
          transform={`translate(${x},${y})`}
          on:click={() => handleNodeClick(id)}
        >
          <circle fill="var(--bg2)" r={10} />
          <text cursor="pointer" fill="white" font-size="12" y="3" x="-4"
            >{id}</text
          >
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
