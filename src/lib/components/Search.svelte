<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import PopulateButton from '$lib/components/PopulateButton.svelte';

  import { queryStore, graphStore, nodeDetailsStore } from '$lib/store';
  import { getNeighbors, getGraph } from '$lib/utils/api';

  function handleSearch() {
    $nodeDetailsStore.selectedNodeKey = '';

    if (($queryStore.vector, $queryStore.distance)) {
      getNeighbors($queryStore.vector, $queryStore.distance).then((neighbors) => {
        $graphStore.vertices = neighbors.vertices;
        $graphStore.edges = neighbors.edges;
      });
    }
  }

  function handleClear() {
    $nodeDetailsStore.selectedNodeKey = '';

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
    <PopulateButton />
  </div>
  <div class="search">
    <input id="vector" placeholder="vector" bind:value={$queryStore.vector} />
    <input id="distance" placeholder="distance" bind:value={$queryStore.distance} />
    <Button onClick={handleSearch} label="search" />
    <Button onClick={handleClear} label="clear" />
  </div>
</div>

<style>
  .container {
    display: flex;
    justify-content: space-around;
  }

  input {
    background: var(--bg2);
    border: 1px solid var(--fg4);
    border-radius: 3px;

    padding: 10px;
    color: var(--fg2);

    margin-right: 15px;
  }

  input:focus {
    outline: none;
    border-color: var(--purple);
  }

  ::placeholder {
    color: var(--gray);
    opacity: 1;
  }

  input#distance {
    width: 60px;
  }
</style>
