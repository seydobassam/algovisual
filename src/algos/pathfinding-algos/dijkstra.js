import { MinHeap } from "../../dataStructures/minHeap";

export function dijkstra(myGrid, startNode, finishNode) {
  var minHeap = new MinHeap();
  const visitedNodes = [];
  startNode.isVisited = true;
  startNode.distance = 0;
  minHeap.add(startNode);
  while (!minHeap.isEmpty()) {
    const currentNode = minHeap.pop();
    currentNode.isVisited = true;
    visitedNodes.push(currentNode);
    if (currentNode === finishNode) return visitedNodes;
    addNeighborsToHeap(myGrid, currentNode);
  }
  return visitedNodes;

  function addNeighborsToHeap(grid, currentNode) {
    let neighbors = [];
    const row = currentNode.row;
    const col = currentNode.col;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    neighbors.forEach((neighbor) => {
       if (isNodeAllowed(neighbor)) {
        minHeap.add(getChangedNeighborNode(neighbor, currentNode));    
       }
    });
  }

  function isNodeAllowed(node) {
    if (!node.isVisited && node.type !== "block") {
      return true;
    }
    return false;
  }

  function getChangedNeighborNode(neighbor, currentNode) {
    neighbor.distance = currentNode.distance + 1;
    neighbor.isVisited = true;
    neighbor.previousNode = currentNode;
    return neighbor;
  }
}