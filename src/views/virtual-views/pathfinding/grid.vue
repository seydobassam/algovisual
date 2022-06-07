<template>
  <Loading :loading="isLoading" />
  <div class="grid-container" v-if="!isLoading">
    <div class="grid">
      <div class="grid-view">
        <tr class="trs" v-for="(record, rowIndex) in grid" :key="rowIndex">
          <td v-for="(col, index) in record" :key="index">
            <Node @selectStartNode="selectStartNode($event)" @selectFinishNode="selectFinishNode($event)" @onSelectNode="resetNode($event)" :nodeProp="col"> </Node>
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
import { NodeType } from '../../../constants/Node-type';

export default {
  name: "Grid",
  components: {
    Node,
    Loading,
  },

  setup() {
    const { gridNodesState, isLoading, selectStartNode, selectFinishNode, resetNode } = pathfindingGrid();

    return { ...gridNodesState, isLoading, selectStartNode, selectFinishNode, resetNode};
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
