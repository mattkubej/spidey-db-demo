<script lang="ts">
import { query } from '$lib/store';
import { populateGraph, getGraph } from '$lib/utils/api';

async function handleClick() {
  await populateGraph();

  await getGraph().then((graph) => {
    $query.vertices = graph.vertices;
    $query.edges = graph.edges;
  });
}
</script>

<button on:click={handleClick}>Populate</button>

<style>
</style>
