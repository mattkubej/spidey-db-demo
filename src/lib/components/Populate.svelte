<script lang="ts">
import { graphStore } from '$lib/store';
import { populateGraph, getGraph } from '$lib/utils/api';

async function handleClick() {
  await populateGraph();

  await getGraph().then((graph) => {
    $graphStore.vertices = graph.vertices;
    $graphStore.edges = graph.edges;
  });
}
</script>

<button on:click={handleClick}>Populate</button>

<style>
</style>
