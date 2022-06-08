import { MinHeap } from "../../dataStructures/minHeap";
import { AlgoUtil } from "../algo-utility/alog-util";

export function greedyBFS(grid, startNode, finishNode) {
  const openHeap = new MinHeap();
  const closeList = [];
  startNode.isVisited = true;
  startNode.cost = 0;
  startNode.distance = 0;
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
      const distance = AlgoUtil.getHeuristic(neighbor, finishNode);
      if (openHeap.contains(neighbor) && neighbor.cost > cost) {
        updateAddedNode(neighbor, currentNode, cost, distance);
        return;
      }
      if (!neighbor.isVisited) {
        neighbor.previousNode = currentNode;
        neighbor.cost = cost;
        neighbor.distance = distance;
        neighbor.isVisited = true;
        openHeap.add(neighbor);
      }
    });
  }

  function updateAddedNode(neighbor, currentNode, newCost, distance) {
    for (let i = 0; i < openHeap.length; i++) {
      const addedNeighbor = openHeap.getAt(i);
      if (addedNeighbor === neighbor) {
        addedNeighbor.previousNode = currentNode;
        addedNeighbor.cost = newCost;
        addedNeighbor.distance = distance;
        openHeap.siftUp(openHeap.length - 1);
      }
    }
  }
}
