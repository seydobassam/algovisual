<template>
  <div class="grid-container">
    <div class="grid">
      <tr v-for="(record, rowIndex) in gridData" :key="rowIndex">
        <td v-for="(col, index) in record" :key="index">
          <NodeWidget :nodeProp="col"> </NodeWidget>
        </td>
      </tr>
    </div>
  </div>
</template>

<script>
import NodeWidget from "../widgets/nodeWidget.vue";
import pathfindingGrid from "../modules/pathfindingGrid";

 export default {
  name: "GridView",
  components: {
    NodeWidget,
  },

  setup() {
    const {gridNodesState, createGridNodes} = pathfindingGrid()

    createGridNodes();

    return {...gridNodesState}
  },
};
</script>

<style>
.grid-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 50px;
}
</style>
