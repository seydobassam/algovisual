<template>
  <div class="tree-container">
    <div class="tree-infos-container">
      <div class="tree-infos">
        <span>
          <span class="visited-nodes-label">Visited Nodes = </span>
          <span class="visited-nodes">{{ visitedNodes }}</span>
        </span>
        <div>
          <button class="clear-tree">Clear Tree</button>
          <button class="new-tree">New Tree</button>
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
    const { visitedNodes, initBinaryTree } = binarySearchTree();
    initBinaryTree();

    return { visitedNodes };
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
  width: 80%;
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
  background-color: #09c372;
  border: none;
  color: white;
  padding: 10px 22px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
</style>
