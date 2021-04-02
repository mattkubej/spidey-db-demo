<script lang="ts">
  import { query } from '$lib/store';
  import { getNeighbors } from '$lib/utils/api';

  export let vector: string;
  export let distance: string;

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
  <input bind:value={vector} />
  <input bind:value={distance} />
  <button>cancel</button>
</div>

<style>
  .container {
    display: flex;
    justify-content: space-around;
  }
</style>
