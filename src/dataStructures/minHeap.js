export class MinHeap {
  constructor() {
    this.array = [null];
  }

  getParentNodeIndex(idx) {
    return Math.floor(idx / 2);
  }

  getLeftKidIndex(idx) {
    return idx * 2;
  }

  getRightKidIndex(idx) {
    return idx * 2 + 1;
  }

  add(node) {
    this.array.push(node);
    this.siftUp(this.array.length - 1);
  }

  pop() {
    if (this.array.length <= 1) return null;
    if (this.array.length === 2) return this.array.pop();
    const min = this.array[1];
    this.array[1] = this.array.pop();

    this.siftDown(1);
    return min;
  }

  siftUp(index) {
    if (index === 1) return;
    const parentIndex = this.getParentNodeIndex(index);
    const parentNode = this.array[parentIndex];
    const node = this.array[index];
    if (!parentNode || parentNode.distance < node.distance) return;
    // Swap the nodes 
    [this.array[index], this.array[parentIndex]] = [
      this.array[parentIndex],
      this.array[index],
    ];
    this.siftUp(parentIndex);
  }

  siftDown(index) {
    if (this.array.length <= 2) return;
    const node = this.array[index];
    if (!node) return;

    const leftKidIndex = this.getLeftKidIndex(index);
    const rightKidIndex = this.getRightKidIndex(index);

    const leftKidNodeDistance = this.getNodeDistance(leftKidIndex);
    const rightKidNodeDistance = this.getNodeDistance(rightKidIndex);

    if (
      node.distance <= leftKidNodeDistance &&
      node.distance <= rightKidNodeDistance
    )
      return;

    let swapingIndex = this.getChildMinDistanceIndex(
      leftKidNodeDistance,
      rightKidNodeDistance,
      leftKidIndex,
      rightKidIndex
    );

    // Swap the nodes 
    [this.array[swapingIndex], this.array[index]] = [
      this.array[index],
      this.array[swapingIndex],
    ];
    this.siftDown(swapingIndex);
  }

  isEmpty() {
    return this.array.length <= 1;
  }

  getNodeDistance(index) {
    return this.array[index]?.distance ?? Infinity;
  }

  getChildMinDistanceIndex(
    leftKidNodeDistance,
    rightKidNodeDistance,
    leftKidIndex,
    rightKidIndex
  ) {
    return leftKidNodeDistance < rightKidNodeDistance
      ? leftKidIndex
      : rightKidIndex;
  }
}