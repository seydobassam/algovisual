<template>
  <Loading :loading="isLoading" />
  <div class="grid-container" v-if="!isLoading">
    <div class="grid">
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
      isLoading,
      onMouseDown,
      onMouseEnter,
      onMouseLeave,
      onMouseUp,
    } = pathfindingGrid();

    return {
      ...gridNodesState,
      onMouseDown,
      onMouseEnter,
      onMouseLeave,
      onMouseUp,
    };
  },
};
</script>

<style>
.grid-container {
  margin-top: 100px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow-x: auto;
}

.grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.grid-view {
  margin: auto;
}
</style>
