<script lang="ts">
  export let vertices: string[] = [];
  export let edges: string[][] = [];
</script>

<div>
  <h2>Vertices</h2>
  {#if vertices.length > 0}
    <ul>
      {#each vertices as vertex}
        <ul>{vertex}</ul>
      {/each}
    </ul>
  {:else}
    <p>none</p>
  {/if}

  <h2>Edges</h2>
  {#if edges.length > 0}
    <ul>
      {#each edges as edge}
        <ul>{edge}</ul>
      {/each}
    </ul>
  {:else}
    <p>none</p>
  {/if}
</div>

<style>
  h2 {
    color: var(--purple);
  }

  p {
    color: var(--gray);
    font-size: 14px;
    font-weight: bold;
  }

  ul {
    padding-left: 0px;
  }
</style>
