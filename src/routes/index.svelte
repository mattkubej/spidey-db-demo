<script context="module">
  export async function load({ fetch }) {
    // fetch only available through dependency injection on load
    const res = await fetch('/graph/full');
    const { vertices, edges } = await res.json();
    return {
      props: {
        vertices,
        edges,
      },
    };
  }
</script>

<script lang="ts">
  import Graph from '$lib/components/Graph.svelte';
  import Populate from '$lib/components/Populate.svelte';
  import Form from '$lib/components/Form.svelte';
  import { graphStore } from '$lib/store';

  export let vertices: string[];
  export let edges: string[][];

  $: {
    if ($graphStore.vertices.length > 0 || $graphStore.edges.length > 0) {
      vertices = $graphStore.vertices;
      edges = $graphStore.edges;
    }
  }
</script>

<svelte:head>
  <title>Spidey DB Demo</title>
</svelte:head>

<main>
  <h1>Spidey DB Demo</h1>
  <Populate />
  <Form />
  <Graph {vertices} {edges} />
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

    --bg: #1d2021;
    --bg2: #504945;
    --bg3: #665c54;
    --bg4: #7c6f64;
    --fg: #fbf1c7;
    --fg2: #d5c4a1;
    --fg3: #bdae93;
    --fg4: #a89984;
    --purple: #d3869b;
    --dark-purple: #b16286;
    --blue: #83a598;
    --red: #fb4934;
    --green: #b8bb26;
    --yellow: #fabd2f;
    --aqua: #8ec07c;
    --orange: #fe8019;
    --gray: #928374;

    --textNormal: var(--fg);
    --textLink: var(--purple);
    --textTitle: var(--purple);
    --hr: var(--blue);

    background-color: var(--bg);
    color: var(--textNormal);
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  h1 {
    color: var(--purple);
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 4rem auto;
    max-width: 14rem;
  }

  p {
    max-width: 14rem;
    margin: 2rem auto;
    line-height: 1.35;
  }

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }

    p {
      max-width: none;
    }
  }
</style>
