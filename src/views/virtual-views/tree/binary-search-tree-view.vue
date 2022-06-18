<template>
  <div class="tree-container">
    <div class="tree-infos-container">
      <div class="tree-infos">
        <span class="nodes-display">
          <img src="./../../../assets/tree/node.png" />
          <span class="visited-nodes-label">Visited Nodes = </span>
          <span class="visited-nodes">{{ visitedNodes }}</span>
        </span>
        <div>
          <button
            :class="[isFreeze === true ? 'disable-button' : 'btn-10']"
            @click="clearTree"
          >
            Clear Tree
          </button>
          <button
            :class="[isFreeze === true ? 'disable-button' : 'btn-10']"
            @click="newTree"
          >
            New Tree
          </button>
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
    const { visitedNodes, isFreeze, clearTree, newTree } = binarySearchTree();

    return { visitedNodes, isFreeze, clearTree, newTree };
  },
};
</script>

<style>
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
.nodes-display {
  display: flex;
  align-items: center;
}
.visited-nodes-label {
  font-size: large;
  margin-left: 15px;
}
.visited-nodes {
  color: rgb(98, 110, 227);
  font-size: large;
  margin-left: 3px;
}
.clear-tree {
  margin-right: 15px;
}

.disable-button {
  cursor: not-allowed;
  pointer-events: none;
  transition: 1s;
  border: 3px solid goldenrod;
  font-family: "Lato", sans-serif;
  width: 130px;
  height: 40px;
  cursor: pointer;
  background-color: goldenrod;
  color: #dddddd;
  font-weight: bold;
  border-radius: 3px;
}

button {
  margin: 20px;
  outline: none;
}
.btn-10 {
  border-radius: 3px;
  transition: 1s;
  border: 3px solid #1d1f1d;
  font-family: "Lato", sans-serif;
  width: 130px;
  height: 40px;
  cursor: pointer;
  background: #1d1f1d;
  color: white;
  font-weight: bold;
}
.btn-10:hover {
  color: #ffeba7;
  font-weight: bold;
}

.tree-animation {
  background: #ffeba7;
  transform-box: fill-box;
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation-duration: 4s;
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-play-state: running;
  animation-name: dash;
}

@keyframes dash {
  0% {
    stroke-dasharray: 1000;
    stroke: black;
  }
  to {
    stroke-dashoffset: 0;
    stroke: black;
  }
}
</style>
