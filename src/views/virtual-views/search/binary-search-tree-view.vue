<template>
  <div class="tree-container">
    <div class="tree-infos-container">
      <div class="tree-infos">
        <span>
          <span class="nodes-label">Visited Nodes = </span>
          <span class="visited-nodes">{{ visitedNodes }}</span>
        </span>
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
    const { visitedNodes, initBST } = binarySearchTree();
    initBST();

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
}

.nodes-label {
  font-size: large;
}
.visited-nodes {
  color: rgb(98, 110, 227);
  font-size: large;
}
</style>
