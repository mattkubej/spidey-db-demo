import * as d3 from 'd3';

export default function drag(
  simulation: GraphSimulation
): GraphNodeDragBehavior {
  function dragsubject(event: GraphNodeDragEvent) {
    return simulation.find(event.x, event.y);
  }

  function dragstarted(event: GraphNodeDragEvent) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  function dragged(event: GraphNodeDragEvent) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  function dragended(event: GraphNodeDragEvent) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }

  return d3
    .drag<SVGCircleElement, GraphNode>()
    .subject(dragsubject)
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended);
}
