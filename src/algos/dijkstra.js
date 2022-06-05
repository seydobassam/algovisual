import { MinHeap } from "./test/minheap";

export function dijkstra(grid, startNode, finishNode) {
  const minHeap = new MinHeap();
  const visitedNodes = [];
  startNode.isVisited = true;
  minHeap.add(startNode);
  while (!minHeap.isEmpty()) {
    const node = minHeap.pop();
    visitedNodes.push(node);
    if (node === finishNode) return visitedNodes;
    addUnvisitedNeighborsOfCurrentNodeToMinHeap(grid, node);
  }

  function addUnvisitedNeighborsOfCurrentNodeToMinHeap(grid, node) {
    const row = node.row;
    const col = node.col;
    // From the above row at the same line the node
    if (row > 0) {
      const aboveNode = grid[row - 1][col];
      if (!aboveNode.isVisited && aboveNode.type !== "block") {
        aboveNode.distance = node.distance + 1;
        aboveNode.isVisited = true;
        minHeap.add(aboveNode);
      }
    }
    // From the blow row at the same line the node
    if (row < grid.length - 1) {
      const blowNode = grid[row + 1][col];
      if (!blowNode.isVisited && blowNode.type !== "block") {
        blowNode.distance = node.distance + 1;
        blowNode.isVisited = true;
        minHeap.add(blowNode);
      }
    }

    // at the same row left Neighbor Node
    if (col > 0) {
      const leftNode = grid[row][col - 1];
      if (!leftNode.isVisited && leftNode.type !== "block") {
        leftNode.distance = node.distance + 1;
        leftNode.isVisited = true;
        minHeap.add(leftNode);
      }
    }

    // at the same row left Neighbor Node
    if (col < grid[0].length - 1) {
      const rightNode = grid[row][col + 1];
      if (!rightNode.isVisited && rightNode.type === "empty") {
        rightNode.distance = node.distance + 1;
        rightNode.isVisited = true;
        minHeap.add(rightNode);
      }
    }
  }
}
