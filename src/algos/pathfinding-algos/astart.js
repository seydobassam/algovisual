import { NodeType } from "../../constants/Node-type";
import { MinHeap } from "../../dataStructures/minHeap";
import { AlgoUtil } from "../algo-utility/alog-util";

export function astar(grid, startNode, finishNode) {
  const openHeap = new MinHeap();
  const closeList = [];
  startNode.isVisited = true;
  startNode.distance = 0;
  startNode.cost = 0;
  openHeap.add(startNode);
  while (!openHeap.isEmpty()) {
    const currentNode = openHeap.pop();
    closeList.push(currentNode);
    if (currentNode === finishNode) return closeList;
    addNeighborsToHeap(grid, currentNode, finishNode);
  }
  return closeList;

  function addNeighborsToHeap(grid, currentNode, finishNode) {
    const neighbors = AlgoUtil.getNodeNeighborsFromGrid(grid, currentNode);
    neighbors.forEach((neighbor) => {
      const cost = currentNode.cost + 1;
      const heuristicDistance = AlgoUtil.getHeuristic(neighbor, finishNode);
      const distance = cost + heuristicDistance;
      if (openHeap.contains(neighbor) && neighbor.cost > cost) {
        updateAddedNode(
          neighbor,
          currentNode,
          cost,
          heuristicDistance,
          distance
        );
        return;
      }
      if (!neighbor.isVisited) {
        neighbor.previousNode = currentNode;
        neighbor.cost = cost;
        neighbor.heuristicDistance = heuristicDistance;
        neighbor.distance = distance;
        neighbor.isVisited = true;
        openHeap.add(neighbor);
      }
    });
  }

  function updateAddedNode(
    neighbor,
    currentNode,
    newCost,
    newHeuristicDistance,
    distance
  ) {
    for (let i = 0; i < openHeap.length; i++) {
      const addedNeighbor = openHeap.getAt(i);
      if (addedNeighbor === neighbor) {
        addedNeighbor.previousNode = currentNode;
        addedNeighbor.heuristicDistance = newHeuristicDistance;
        addedNeighbor.cost = newCost;
        addedNeighbor.distance = distance;
        openHeap.siftUp(openHeap.length - 1);
      }
    }
  }
}
