import { reactive, toRefs, computed } from "@vue/reactivity";
import { onMounted, ref, watch } from "vue";
import { dijkstra } from "../../../algos/pathfinding-algos/dijkstra";
import GraphNode from "../../../models/graph-node-model";
import toolbar from "../toolbar";

export default function pathfindingGrid() {
  const grid = reactive({
    nodes: [],
    startNode: GraphNode,
    finishNode: GraphNode,
  });

  const { toolbarState } = toolbar();
  const gridHeight = Math.floor(window.innerHeight / 37);
  const gridWidth = Math.floor(window.innerWidth / 31);
  const isLoading = ref(true);

  onMounted(() => {
    initGrid();
    stopLoading();
  });

  function initGrid() {
    const gridData = [];
    for (let row = 0; row < gridHeight; row++) {
      const currentRow = [];
      for (let col = 0; col < gridWidth; col++) {
        currentRow.push(createGraphNode(row, col));
      }
      gridData.push(currentRow);
    }
    grid.nodes = gridData;
  }

  function createGraphNode(row, col) {
    const type = getNodeType(row, col);
    const graphNode = new GraphNode(row, col, type);
    if (type === "start") grid.startNode = graphNode;
    if (type === "finish") grid.finishNode = graphNode;    
    return graphNode;
  }

  function getNodeType(row, col) {
    if (
      row === Math.floor(gridHeight / 2) &&
      col === Math.floor(gridWidth / 5)
    ) {
      return "start";
    } else if (
      row === Math.floor((gridHeight * 2) / 7) &&
      col === Math.floor((2 * gridWidth) / 3)
    ) {
      return "finish";
    }
    return "empty";
  }

  function selectStartNode(node) {
    grid.startNode = node;
  }

  function selectFinishNode(node) {    
    grid.finishNode = node;
  }

  function stopLoading() {
    setTimeout(() => (isLoading.value = false), 60);
  }

  watch(
    () => toolbarState.event.value.keys(),
    (value) => {
      switch (value.next().value) {
        case "dijkstra":
           const result = dijkstra(grid.nodes, grid.startNode, grid.finishNode);
          console.log("result: =>", result);
          break;
      }
    },
    { deep: true }
  );

  return {
    gridNodesState: toRefs(grid),
    isLoading: computed(() => isLoading.value),
    selectStartNode,
    selectFinishNode,
  };
}
