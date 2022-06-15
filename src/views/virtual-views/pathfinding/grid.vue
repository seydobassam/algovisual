<template>
  <Loading :loading="isLoading" />
  <div class="grid-container" v-if="!isLoading">
    <div class="grid">
      <div class="grid-panel">
        <div class="grid-panel-details">
          <div class="algo-info"></div>
          <div class="grid-buttons">
            <button
              :class="[isFreeze === true ? 'disable-button' : 'btn-10']"
              @click="clearWalls"
            >
              Clear Walls
            </button>
            <button
              :class="[isFreeze === true ? 'disable-button' : 'btn-10']"
              @click="clearPaths"
            >
              Clear Path
            </button>
            <button
              :class="[isFreeze === true ? 'disable-button' : 'btn-10']"
              @click="resetGrid"
            >
              Reset Grid
            </button>
          </div>
        </div>
      </div>
      <div class="algo-info">{{ algo.info }}</div>
      <div class="grid-view">
        <tr class="trs" v-for="(row, rowIndex) in grid" :key="rowIndex">
          <td v-for="(node, index) in row" :key="index">
            <Node
              @mousedown.prevent="onMouseDown(node)"
              @mouseenter.prevent="onMouseEnter(node)"
              @mouseleave.prevent="onMouseLeave(node)"
              @mouseup.prevent="onMouseUp()"
              :node="node"
            >
            </Node>
          </td>
        </tr>
      </div>
    </div>
  </div>
</template>

<script>
import Node from "../../../widgets/node.vue";
import Loading from "../../../widgets/loading.vue";
import pathfindingGrid from "../../../modules/views-modules/virtual-view-modules/pathfindingGrid";

export default {
  name: "Grid",
  components: {
    Node,
    Loading,
  },
  setup() {
    const {
      gridNodesState,
      algo,
      onMouseDown,
      onMouseEnter,
      onMouseLeave,
      onMouseUp,
      clearWalls,
      clearPaths,
      resetGrid,
    } = pathfindingGrid();

    return {
      ...gridNodesState,
      algo,
      onMouseDown,
      onMouseEnter,
      onMouseLeave,
      onMouseUp,
      clearWalls,
      clearPaths,
      resetGrid,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto+Condensed");

.grid-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow-x: auto;
}

.grid-panel {
  display: flex;
  justify-content: center;
  width: 100%;
}

.grid-panel-details {
  height: 100px;
  width: 96%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.algo-info {
  color: #34495e;
  padding: 15px 25px 15px 25px;
  font-family: "Roboto", sans-serif;
  font: bold;
}

.grid-buttons {
  display: flex;
}

.disable-button {
  cursor: not-allowed;
  pointer-events: none;
  transition: 1s;
  border: 3px solid goldenrod;
  font-family: "Lato", sans-serif;
  width: 130px;
  height: 40px;
  cursor: pointer;
  background-color: goldenrod;
  color: #dddddd;
  font-weight: bold;
  border-radius: 3px;
}

button {
  margin: 20px;
  outline: none;
}
.btn-10 {
  transition: 1s;
  border: 3px solid #1d1f1d;
  font-family: "Lato", sans-serif;
  width: 130px;
  height: 40px;
  cursor: pointer;
  background: #1d1f1d;
  color: white;
  font-weight: bold;
  border-radius: 3px;
}
.btn-10:hover {
  color: #ffeba7;
  font-weight: bold;
}
.grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.grid-view {
  margin: 200, auto, auto, auto;
}
</style>
