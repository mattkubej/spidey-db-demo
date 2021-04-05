<script lang="ts">
  export let vertices: string[] = [];
  export let edges: string[][] = [];
</script>

<div>
  <h2>Vertices</h2>
  <ul>
    {#each vertices as vertex}
      <ul>{vertex}</ul>
    {/each}
  </ul>

  <h2>Edges</h2>
  <ul>
    {#each edges as edge}
      <ul>{edge}</ul>
    {/each}
  </ul>
</div>

<style>
  h2 {
    color: var(--purple);
  }
</style>
