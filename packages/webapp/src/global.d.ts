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

type GraphSimulation = d3.Simulation<GraphNode, undefined>;
type GraphNodeDragBehavior = d3.DragBehavior<
  SVGCircleElement,
  GraphNode,
  Subject
>;
type GraphNodeDragEvent = d3.D3DragEvent<SVGCircleElement, GraphNode, Subject>;

type SpideyDbGraph = {
  vertices: string[],
  edges: string[][],
};
