<template>
  <Toolbar />
  <keep-alive>
    <component :is="selectedAlgoType.component" :key="selectedAlgoType.id" />
  </keep-alive>
</template>

<script>
import Toolbar from "./toolbar.vue";
import Grid from "./virtual-views/pathfinding/grid.vue";
import List from "./virtual-views/search/list.vue";
import BinarySearchTree from "./virtual-views/tree/binary-search-tree-view.vue";
import toolbar from '../modules/views-modules/toolbar';


export default {
  name: "Home",
  components: {
    Toolbar,
    Grid,
    List,
    BinarySearchTree,
  },
  setup() {
    const { toolbarState } = toolbar();

    return {
      ...toolbarState,
    };
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
