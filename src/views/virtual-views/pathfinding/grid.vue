<template>
  <Loading :loading="isLoading" />
  <div class="grid-container" v-if="!isLoading">
    <div class="grid">
      <div class="grid-view">
        <tr class="trs" v-for="(record, rowIndex) in gridData" :key="rowIndex">
          <td v-for="(col, index) in record" :key="index">
            <Node :nodeProp="col"> </Node>
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
    const { gridNodesState, isLoading, createGridNodes, stopLoading } = pathfindingGrid();

    createGridNodes();
    stopLoading();

    return { ...gridNodesState, isLoading };
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
