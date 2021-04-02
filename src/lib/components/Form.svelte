<script lang="ts">
  import { queryStore, graphStore } from '$lib/store';
  import { getNeighbors, getGraph } from '$lib/utils/api';

  function handleSearch() {
    if (($queryStore.vector, $queryStore.distance)) {
      getNeighbors($queryStore.vector, $queryStore.distance).then((neighbors) => {
        $graphStore.vertices = neighbors.vertices;
        $graphStore.edges = neighbors.edges;
      });
    }
  }

  function handleClear() {
    $queryStore.vector = '';
    $queryStore.distance = '';

    getGraph().then((graph) => {
      $graphStore.vertices = graph.vertices;
      $graphStore.edges = graph.edges;
    });
  }
</script>

<div class="container">
  <input bind:value={$queryStore.vector} />
  <input bind:value={$queryStore.distance} />
  <button on:click={handleSearch}>search</button>
  <button on:click={handleClear}>clear</button>
</div>

<style>
  .container {
    display: flex;
    justify-content: space-around;
  }
</style>
