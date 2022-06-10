import { MinHeap } from "../../dataStructures/minHeap";
import { AlgoUtil } from "../algo-utility/alog-util";

export function bidirectionalGreedyBFS(grid, startNode, finishNode) {
  const startOpenHeap = new MinHeap();
  const finishOpenHeap = new MinHeap();

  let startCloseList = [];
  let finishCloseList = [];

  startNode.cost = 0;
  finishNode.cost = 0;
  startNode.distance = 0;
  finishNode.distance = 0;

  startOpenHeap.add(startNode);
  finishOpenHeap.add(finishNode);

  while (!startOpenHeap.isEmpty() && !finishOpenHeap.isEmpty()) {
    let startCurrentNode = startOpenHeap.pop();
    let finishCurrentNode = finishOpenHeap.pop();

    startCurrentNode.isVisited = true;
    finishCurrentNode.isVisited = true;

    startCloseList.push(startCurrentNode);
    finishCloseList.push(finishCurrentNode);

    if (AlgoUtil.isNeighbour(startCurrentNode, finishCurrentNode)) {
      return [startCloseList, finishCloseList, true];
    }
    
    let neighbours = AlgoUtil.getNodeNeighborsFromGrid(grid, startCurrentNode);
    for (let neighbor of neighbours) {
      if (finishOpenHeap.contains(neighbor)) {
        startCloseList.push(startCurrentNode);
        finishCloseList.push(neighbor);
        return [startCloseList, finishCloseList, true];
      }
      const cost = startCurrentNode.cost + 1;
      if (!startOpenHeap.contains(neighbor)) {
        neighbor.cost = cost;
        neighbor.distance = AlgoUtil.getHeuristic(neighbor, finishNode);
        neighbor.previousNode = startCurrentNode;
        startOpenHeap.add(neighbor);
      } else if (cost < neighbor.cost) {
        neighbor.cost = cost;
        neighbor.distance = AlgoUtil.getHeuristic(neighbor, finishNode);
        neighbor.previousNode = startCurrentNode;
      }
    }

    neighbours = AlgoUtil.getNodeNeighborsFromGrid(grid, finishCurrentNode);
    for (let neighbor of neighbours) {
      if (startOpenHeap.contains(neighbor)) {
        startCloseList.push(finishCurrentNode);
        finishCloseList.push(neighbor);
        return [startCloseList, finishCloseList, true];
      }
      const cost = finishCurrentNode.cost + 1;
      if (!finishOpenHeap.contains(neighbor)) {
        neighbor.cost = cost;
        neighbor.distance = AlgoUtil.getHeuristic(neighbor, startNode);
        neighbor.previousNode = finishCurrentNode;
        finishOpenHeap.add(neighbor);
      } else if (cost < neighbor.cost) {
        neighbor.cost = cost;
        neighbor.distance = AlgoUtil.getHeuristic(neighbor, startNode);
        neighbor.previousNode = finishCurrentNode;
      }
    }
  }
  return [startCloseList, finishCloseList, false];
}