export default class GraphNode {
  constructor(row, col, type) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.isVisited = false;
    this.isAnimate = false;
    this.isShortPath = false;
    this.distance = Infinity;
    this.previousNode = null;
  }
}