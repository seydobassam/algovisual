import { NodeType } from "../../constants/Node-type";

export class AlgoUtil {
  static getNodeNeighborsFromGrid(grid, node) {
    const neighbours = [];
    let { row, col } = node;
    if (row > 0) neighbours.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
    if (col > 0) neighbours.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);
    return neighbours.filter((neighbour) => neighbour.type !== NodeType.block);
  }

  static isNodeAllowed(node) {
    if (!node.isVisited) {
      return true;
    }
    return false;
  }

  static getShortestPathNodes(node) {
    const shortestPathNodes = [];
    let currentNode = node;
    while (currentNode) {
      shortestPathNodes.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return shortestPathNodes;
  }

  // Using manhattan distance Heuristic between 2 incomming nodes
  static getHeuristic(currentNode, finishNode) {
    return (
      Math.abs(currentNode.row - finishNode.row) +
      Math.abs(currentNode.col - finishNode.col)
    );
  }
}
