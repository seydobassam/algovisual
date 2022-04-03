<template>
  <Toolbar />
  <!-- <component :is="selectedComponent" /> -->
  <GridView />
</template>

<script>
import Toolbar from "./toolbar.vue";
import GridView from "./virtual-views/pathfinding/grid.vue";

export default {
  name: "Home",
  components: {
    Toolbar,
    GridView,
  },
};
</script>
