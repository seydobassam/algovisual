export default class GraphNode {
  constructor(row, col, type) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.isVisited = false;
    this.distance = Infinity;
    this.previousNode = Node;
  }
}


/* 
function addUnvisitedNeighborsOfCurrentNodeToMinHeap1(grid, node) {
  const row = node.row;
  const col = node.col;
  // From the above row at the same line the node
  if (row > 0 && isNodeAllowed(grid[row - 1][col])) {
      minHeap.add(getChangedNode(grid[row - 1][col]));
  }
  // From the blow row at the same line the node
  if (row < grid.length - 1 && isNodeAllowed(grid[row + 1][col])) {
      minHeap.add(getChangedNode(grid[row + 1][col]));
  }
  // at the same row left Neighbor Node
  if (col > 0 && isNodeAllowed(grid[row][col - 1])) {
      minHeap.add(getChangedNode(grid[row][col - 1]));
  }
  // at the same row left Neighbor Node
  if (col < grid[0].length - 1 && isNodeAllowed(grid[row][col + 1])) {
      minHeap.add(getChangedNode(grid[row][col + 1]));
  }
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
} */