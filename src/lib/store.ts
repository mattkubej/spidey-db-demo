import { writable } from 'svelte/store';

export const query = writable({
  vector: '',
  distance: '',
  vertices: [],
  edges: [],
});
