import { NodeType } from "../../constants/Node-type";

export class AlgoUtil {
  static getNodeNeighborsFromGrid(grid, node) {
    const neighbours = [];
    let { row, col } = node;
    if (row > 0) neighbours.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
    if (col > 0) neighbours.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);
    return neighbours.filter((neighbour) => neighbour.type !== NodeType.block && !neighbour.isVisited);
  }

  static isNodeAllowed(node) {
    if (!node.isVisited) {
      return true;
    }
    return false;
  }

  static isNeighbour(currentStartNode, currentFinishNode) {
    let { row: startRow, col: startCol } = currentStartNode;
    let { row: finishRow, col: finishCol } = currentFinishNode;
    if (
      (startRow - 1 === finishRow && startCol === finishCol) ||
      (startRow === finishRow && startCol + 1 === finishCol) ||
      (startRow + 1 === finishRow && startCol === finishCol) ||
      (startRow === finishRow && startCol - 1 === finishCol)
    ) {
      return true;
    }
    return false;
  }

  static getShortestPathFromNode(node) {
    const shortestPathNodes = [];
    let currentNode = node;
    while (currentNode) {
      shortestPathNodes.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return shortestPathNodes;
  }

  static getShortestPathFromBidirectionalNodes(
    lastStartNode,
    lastFinishNode
  ) {
    let nodesInShortestPathOrder = [];
    let currentNode = lastFinishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.push(currentNode);
      currentNode = currentNode.previousNode;
    }
    currentNode = lastStartNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }

  static getLastVisitedNodeByIndex(nodes, index) {
    return nodes[index][nodes[index].length - 1]
  }

  // Using manhattan distance Heuristic between 2 incomming nodes
  static getHeuristic(currentNode, finishNode) {
    return (
      Math.abs(currentNode.row - finishNode.row) +
      Math.abs(currentNode.col - finishNode.col)
    );
  }
}
