/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />

interface Subject {
  x?: number;
  y?: number;
  fx?: number;
  fy?: number;
}

interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
}

interface GraphLink extends d3.SimulationLinkDatum<Node> {
  source: string & Subject;
  target: string & Subject;
}
