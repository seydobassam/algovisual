export default class Square {
  constructor(value, index) {
    this.index = index;
    this.value = value;
    this.isMin = false;
    this.isMax = false;
    this.isMid = false;
    this.isDiscard = false;
    this.isFound = false;
    this.isSelected = false;
    this.isVisited = false;
  }
}
