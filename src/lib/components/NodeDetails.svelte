<script lang="ts">
  import { nodeDetails } from '$lib/store';
  import { getVertex } from '$lib/utils/api';

  $: details = '';

  $: {
    const selectedNodeKey = $nodeDetails.selectedNodeKey;
    if (selectedNodeKey) {
      getVertex(selectedNodeKey).then((data) => {
        try {
          details = JSON.stringify(JSON.parse(data), null, 2);
        } catch (e) {
          details = data;
        }
      });
    } else {
      details = '';
    }
  }
</script>

{#if details !== ''}
  <div class="node-details">
    <pre>{details}</pre>
  </div>
{/if}

<style>
  .node-details {
    color: var(--fg2);
    font-size: 12px;
    text-align: left;
    padding: 10px;
    background: var(--bg2);
    border: 1px solid var(--fg4);
    border-radius: 3px;
  }

  pre {
    margin: 5px;
  }
</style>
