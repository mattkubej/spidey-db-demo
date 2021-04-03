<script lang="ts">
  export let onClick: svelte.JSX.MouseEventHandler<HTMLButtonElement>;
  export let label: string;
</script>

<button on:click={onClick}>{label}</button>

<style>
  button {
    background-color: var(--dark-purple);
    border: none;
    border-radius: 3px;
    color: var(--fg);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    margin-right: 15px;
    padding: 10px;
  }

  button:hover {
    background-color: var(--purple);
  }
</style>
