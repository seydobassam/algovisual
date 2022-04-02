<template>
  <Toolbar />
  <Grid />
</template>

<script>
import Toolbar from "./views/toolbar.vue";
import Grid from "./views/virtual-views/pathfinding/grid.vue";

export default {
  name: "App",
  components: {
    Toolbar,
    Grid,
  },
};
</script>
