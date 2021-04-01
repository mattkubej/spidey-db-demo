<script lang="ts">
  import { query } from '$lib/store';
  import { getNeighbors } from '$lib/utils/api';

  $: vector = '';
  $: distance = '';

  $: {
    if (vector && distance) {
      getNeighbors(vector, distance).then((neighbors) => {
        $query.vertices = neighbors.vertices;
        $query.edges = neighbors.edges;
      });
    }

  }
</script>

<div class="container">
  <form>
    <input bind:value={vector} />
    <input bind:value={distance} />
  </form>
</div>

<style>
  .container {
    display: flex;
    justify-content: space-around;
  }
</style>
