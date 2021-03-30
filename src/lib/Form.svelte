<script lang="ts">
import { query } from '$lib/store';
</script>

<div class="container">
  <form>
    <input bind:value={$query.vector} />
  </form>
</div>

<style>
.container {
  display: flex;
  justify-content: space-around;
}
</style>
