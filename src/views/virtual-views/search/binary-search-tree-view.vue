<template>
  <div id="binarySearchTree" />
</template>

<script>
import binarySearchTree from "../../../modules/views-modules/virtual-view-modules/binarySearchTree";

export default {
  name: "BinarySearchTree",
  setup() {
    const { initBST } = binarySearchTree();
    initBST();
  },
};
</script>

<style></style>
