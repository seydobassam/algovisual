<template>
  <Toolbar />
  <GridView />
</template>

<script>
import Toolbar from "./views/toolbar.vue";
import GridView from "./views/gridView.vue";

export default {
  name: "home",
  components: {
    Toolbar,
    GridView,
  },
};
</script>
