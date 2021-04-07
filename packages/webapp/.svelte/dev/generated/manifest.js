import * as layout from "../components/layout.svelte";

const components = [
	() => import("../../../src/routes/index.svelte")
];

const d = decodeURIComponent;
const empty = () => ({});

export const routes = [
	// src/routes/index.svelte
[/^\/$/, [components[0]]],

// src/routes/graph/neighbors.ts
[/^\/graph\/neighbors\/?$/],

// src/routes/graph/populate.ts
[/^\/graph\/populate\/?$/],

// src/routes/graph/vertex/[slug].ts
[/^\/graph\/vertex\/([^/]+?)\/?$/],

// src/routes/graph/vertex.ts
[/^\/graph\/vertex\/?$/],

// src/routes/graph/full.ts
[/^\/graph\/full\/?$/]
];

export { layout };