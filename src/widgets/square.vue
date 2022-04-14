<template>
  <div class="square" v-bind:class="{ 'visited-square': square.visited }">
    <span>{{ square.index }}</span>
  </div>
</template>

<script>
import Square from "../models/square-model";

export default {
  name: "Square",
  props: {
    square: {
      type: Square,
    },
  },
};
</script>

<style scoped>
.square-index {
  text-align: center;
}

.square {
  height: 125px;
  width: 125px;
  font-size: larger;
  color: white;
  background-color: rgb(77, 77, 77);
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.square:hover {
  cursor: pointer;
  background: cornflowerblue;
}

.visited-square {
  color: rgb(77, 77, 77);
  background: deepskyblue;
}
</style>
