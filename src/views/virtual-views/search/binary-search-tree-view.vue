<template>
  <div class="tree-container">
    <div class="tree-infos-container">
      <div class="tree-infos">
        <span>
          <span class="visited-nodes-label">Visited Nodes = </span>
          <span class="visited-nodes">{{ visitedNodes }}</span>
        </span>
        <div>
          <button class="custom-btn btn-10" @click="clearTree">Clear Tree</button>
          <button class="custom-btn btn-10" @click="newTree">New Tree</button>
        </div>
      </div>
    </div>
    <div id="binarySearchTree" />
  </div>
</template>

<script>
import binarySearchTree from "../../../modules/views-modules/virtual-view-modules/binarySearchTree";

export default {
  name: "BinarySearchTree",
  setup() {
    const { visitedNodes, initBinaryTree, clearTree, newTree } = binarySearchTree();
    initBinaryTree();

    return { visitedNodes, clearTree, newTree};
  },
};
</script>

<style scoped>
.tree-container {
  overflow: hidden;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.tree-infos-container {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tree-infos {
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.visited-nodes-label {
  font-size: large;
}
.visited-nodes {
  color: rgb(98, 110, 227);
  font-size: large;
}
.clear-tree {
  margin-right: 15px;
}

button {
  margin: 20px;
  outline: none;
}
.btn-10 {
  border: 3px solid #000;
  font-family: "Lato", sans-serif;
  width: 130px;
  height: 40px;
  cursor: pointer;
  background: #000;
  color: white;
  font-weight: bold;
}
.btn-10:hover {
  color: #ffeba7;
  font-weight: bold;
}
</style>
