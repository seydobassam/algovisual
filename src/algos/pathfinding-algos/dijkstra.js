import { MinHeap } from "../../dataStructures/minHeap";
import { AlgoUtil } from "../algo-utility/alog-util";

export function dijkstra(grid, startNode, finishNode) {
  var minHeap = new MinHeap();
  const visitedNodes = [];
  startNode.isVisited = true;
  startNode.distance = 0;
  minHeap.add(startNode);
  while (!minHeap.isEmpty()) {
    const currentNode = minHeap.pop();
    visitedNodes.push(currentNode);
    if (currentNode === finishNode) return visitedNodes;
    addNeighborsToHeap(grid, currentNode);
  }
  return visitedNodes;

  function addNeighborsToHeap(grid, currentNode) {
    const neighbors = AlgoUtil.getNodeNeighborsFromGrid(grid, currentNode);
    neighbors.forEach((neighbor) => {
       if (AlgoUtil.isNodeAllowed(neighbor)) {
        minHeap.add(getChangedNeighborNode(neighbor, currentNode));    
       }
    });
  }

  function getChangedNeighborNode(neighbor, currentNode) {
    neighbor.distance = currentNode.distance + 1;
    neighbor.isVisited = true;
    neighbor.previousNode = currentNode;
    return neighbor;
  }
}