<template>
  <Toolbar />
  <keep-alive>
    <component :is="selectedVirtualView.component" />
  </keep-alive>
</template>

<script>
import home from "../modules/views-modules/home";
import Toolbar from "./toolbar.vue";
import Grid from "./virtual-views/pathfinding/grid.vue";
import List from "./virtual-views/search/list.vue";

export default {
  name: "Home",
  components: {
    Toolbar,
    Grid,
    List,
  },
  setup() {
    const { homeState } = home();

    return {
      ...homeState,
    };
  },
};
</script>
