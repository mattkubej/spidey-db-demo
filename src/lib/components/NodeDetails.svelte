<script lang="ts">
import { nodeDetails } from '$lib/store';
import { getVertex } from '$lib/utils/api';

  $: details = '';

$: {
  const selectedNodeKey = $nodeDetails.selectedNodeKey;
  if (selectedNodeKey) {
    getVertex(selectedNodeKey).then((data) => {
      details = data;
    });
  }
}
</script>

<div class="node-details">{details}</div>

<style>
  .node-details {
    text-align: left;
    padding: 10px;
    background: var(--bg2);
    border: 1px solid var(--fg4);
    border-radius: 3px;
  }
</style>
