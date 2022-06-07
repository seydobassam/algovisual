import { AlgoUtil } from "../algo-utility/alog-util";

export function bfs(grid, startNode, finishNode) {
  startNode.isVisited = true;
  const queue = [startNode];
  const visitedNodes = [];
  while (queue.length) {
    const currentNode = queue.shift();
    visitedNodes.push(currentNode);
    if (currentNode === finishNode) return visitedNodes;
    addNodeNeiboursToQueue(grid, currentNode);
  }
  return queue;

  function addNodeNeiboursToQueue(grid, currentNode) {
    const neighbors = AlgoUtil.getNodeNeighborsFromGrid(grid, currentNode);
    neighbors.forEach((neighbor) => {
      if (AlgoUtil.isNodeAllowed(neighbor)) {
        queue.push(getChangedNeighborNode(neighbor, currentNode));
      }
    });
  }

  function getChangedNeighborNode(neighbor, currentNode) {
    neighbor.isVisited = true;
    neighbor.previousNode = currentNode;
    return neighbor;
  }
}
