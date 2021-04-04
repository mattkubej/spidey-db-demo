<script lang="ts">
import Button from '$lib/components/Button.svelte';

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

<Button onClick={handleClick} label="populate" />

<style>
</style>
