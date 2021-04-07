<script lang="ts">
  export let onClick: svelte.JSX.MouseEventHandler<HTMLButtonElement>;
  export let label: string;
  export { className as class };
  let className = '';
</script>

<button class={className} on:click={onClick}>{label}</button>

<style>
  button {
    background-color: var(--dark-purple);
    border: none;
    border-radius: 3px;
    color: var(--fg);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    padding: 10px;
    font-weight: 600;
  }

  button:hover {
    background-color: var(--purple);
  }
</style>
