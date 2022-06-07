export class AlgoUtil {

  static getNodeNeighborsFromGrid(grid, node) {
    const neighbors = [];
    const row = node.row;
    const col = node.col;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors;
  }

  static isNodeAllowed(node) {
    if (!node.isVisited && node.type !== "block") {
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
}
