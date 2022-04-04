<template>
  <div>
    <div class="square-index">2</div>
    <div class="square">1</div>
  </div>
</template>

<script>
export default {
  name: "Square",
};
</script>

<style scoped>
.square-index {
  text-align: center;
}

.square {
  height: 75px;
  width: 75px;
  font-size: larger;
  color: white;
  background-color: rgb(77, 77, 77);
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
