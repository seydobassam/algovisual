<template>
  <v-app>
    <v-main>
      <Appbar />
      <GridView />
    </v-main>
  </v-app>
</template>

<script>
import Appbar from "./views/appbar.vue";
import GridView from "./views/gridView.vue";

export default {
  name: "App",
  components: {
    Appbar,
    GridView,
  },
};
</script>
