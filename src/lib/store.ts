import { writable } from 'svelte/store';

export const queryStore = writable({
  vector: '',
  distance: '',
});

export const graphStore = writable({
  vertices: [],
  edges: [],
});

export const nodeDetailsStore = writable({
  selectedNodeKey: '',
});
