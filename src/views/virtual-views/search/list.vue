<template>
  <div class="list-container">
    <div class="list-view">
      <div class="view" v-bind:style="{ width: getListWidth() + 'px' }">
        <div class="list-info">
          <div class="info">Duration = <span>231 ms</span></div>
          <div class="info">Found at index = <span>24</span></div>
          <div class="info">Time Complexity = <span>O(1)</span></div>
          <div class="info">Found at = <span>O(1)</span></div>
        </div>
        <div class="square-list-container">
          <div class="list">
            <td v-for="(square, index) in squareList" :key="index">
              <Square class="list-item" :square="square" />
            </td>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Square from "../../../widgets/square.vue";
import searchList from "../../../modules/views-modules/virtual-view-modules/searchList";

export default {
  name: "List",
  components: {
    Square,
  },

  setup() {
    const { squareListsState, createSquareList, getListWidth } = searchList();

    createSquareList();

    return { ...squareListsState, getListWidth };
  },
};
</script>

<style>
.list-container {
  margin-top: 0.5%;
  overflow-x: auto;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.list-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.list-info {
  display: flex;
  justify-content: space-around;
}

.list-info > .info ~ .info {
  margin-left: 10%;
}

.info {
  font-size: larger;
  color: black ;
}

.info > span {
   color: cornflowerblue;
}

.square-list-container {
  margin-top: 15px;
  border-style: solid;
  border-color: #333;
}

.list {
  margin: 10px;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(auto-fit, minmax(min(160px, 100%), 1fr));
  grid-gap: 15px;
  grid-auto-flow: dense;
}
</style>
