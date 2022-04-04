<template>
  <Toolbar />
  <component :is="selectedVirtualView.component" />
</template>

<script>
import home from "../modules/views-modules/home";
import Toolbar from "./toolbar.vue";
import Grid from "./virtual-views/pathfinding/grid.vue";

export default {
  name: "Home",
  components: {
    Toolbar,
    Grid,
  },
  setup() {
    const { homeState } = home();

    return {
      ...homeState,
    };
  },
};
</script>
