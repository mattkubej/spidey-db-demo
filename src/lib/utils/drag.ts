import * as d3 from 'd3';

export default function drag(simulation: d3.Simulation<GraphNode, undefined>): d3.DragBehavior<SVGCircleElement, GraphNode, Subject> {
	function dragsubject(event: d3.D3DragEvent<SVGCircleElement, GraphNode, Subject>) {
		return simulation.find(event.x, event.y);
	}

	function dragstarted(event: d3.D3DragEvent<SVGCircleElement, GraphNode, Subject>) {
		if (!event.active) simulation.alphaTarget(0.3).restart();
		event.subject.fx = event.subject.x;
		event.subject.fy = event.subject.y;
	}

	function dragged(event: d3.D3DragEvent<SVGCircleElement, GraphNode, Subject>) {
		event.subject.fx = event.x;
		event.subject.fy = event.y;
	}

	function dragended(event: d3.D3DragEvent<SVGCircleElement, GraphNode, Subject>) {
		if (!event.active) simulation.alphaTarget(0);
		event.subject.fx = null;
		event.subject.fy = null;
	}

	return d3.drag<SVGCircleElement, GraphNode>()
		.subject(dragsubject)
		.on('start', dragstarted)
		.on('drag', dragged)
		.on('end', dragended);
}
