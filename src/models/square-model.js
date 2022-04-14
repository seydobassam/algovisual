export default class Square {
  constructor(id, index, type) {
    this.id = id;
    this.index = index;
    this.type = type;
    this.visited = false;
  }
}