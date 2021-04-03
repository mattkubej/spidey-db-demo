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
  <div>
    <input placeholder="vector" bind:value={$queryStore.vector} />
  </div>

  <div>
    <input placeholder="distance" bind:value={$queryStore.distance} />
  </div>

  <button on:click={handleSearch}>search</button>
  <button on:click={handleClear}>clear</button>
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
  }

  input {
    background: transparent;
    border: 1px solid var(--purple);
    border-radius: 3px;

    padding: 10px;
    color: var(--fg2);

    margin-right: 15px;
  }

  ::placeholder {
    color: var(--gray);
    opacity: 1;
  }

  button {
    background-color: var(--dark-purple);
    border: none;
    border-radius: 3px;
    color: var(--fg);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    margin-right: 15px;
  }

  button:hover {
    background-color: var(--purple);
  }
</style>
