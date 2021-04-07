<script lang="ts">
import Button from '$lib/components/Button.svelte';

import { graphStore } from '$lib/store';
import { populateGraph, getGraph } from '$lib/utils/api';

async function handleClick() {
  await populateGraph();

  const graph = await getGraph();

  $graphStore.vertices = graph.vertices;
  $graphStore.edges = graph.edges;
}
</script>

<Button onClick={handleClick} label="populate" />

<style>
</style>
