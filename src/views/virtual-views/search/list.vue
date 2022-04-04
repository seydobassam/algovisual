<template>
  <div class="list-container">
    <div class="list">
      <Square class="list-item" />
      <Square class="list-item" />
      <Square class="list-item" />
      <Square class="list-item" />
      <Square class="list-item" />
      <Square class="list-item" />
      <Square class="list-item" />
      <Square class="list-item" />
      <Square class="list-item" />
      <Square class="list-item" />
      <Square class="list-item" />
      <Square class="list-item" />
      <Square class="list-item" />
      <Square class="list-item" />
      <Square class="list-item" />
      <Square class="list-item" />
      <Square class="list-item" />
      <Square class="list-item" />
      <Square class="list-item" />
      <Square class="list-item" />
      <Square class="list-item" />
      <Square class="list-item" />
      <Square class="list-item" />
      <Square class="list-item" />
      <Square class="list-item" />
      <Square class="list-item" />
      <Square class="list-item" />
      <Square class="list-item" />
      <Square class="list-item" />
      <Square class="list-item" />
    </div>
  </div>
</template>

<script>
import Square from "../../../widgets/square.vue";

export default {
  name: "List",
  components: {
    Square,
  },

  setup() {
    return {};
  },
};
</script>

<style>
.list-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.list {
  display: flex;
}

.list-item {
  margin: 2px;
}
</style>
