import { MinHeap } from "./minheap";

export function dijkstra(grid, startNode, finishNode) {
  const minHeap = new MinHeap();
  const visitedNodes = [];
  startNode.isVisited = true;
  startNode.distance = 0;
  minHeap.add(startNode);
  while (!minHeap.isEmpty()) {
    const node = minHeap.pop();
    node.isVisited = true;
    visitedNodes.push(node);
    if (node === finishNode) return visitedNodes;
    addNeighborsToHeap(grid, node);
  }

  function addNeighborsToHeap(grid, node) {
    let neighbors = [];
    const row = node.row;
    const col = node.col;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    neighbors.forEach((node) => {
       if (isNodeAllowed(node)) {
        minHeap.add(getChangedNode(node));    
       }
    });
  }

  function isNodeAllowed(node) {
    if (!node.isVisited && node.type !== "block") {
      return true;
    }
    return false;
  }

  function getChangedNode(node) {
    node.distance = node.distance + 1;
    node.isVisited = true;
    return node;
  }
}
