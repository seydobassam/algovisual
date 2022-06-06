import { reactive, toRefs, computed } from "@vue/reactivity";
import { onMounted, ref, watch } from "vue";
import { dijkstra } from "../../../algos/pathfinding-algos/dijkstra";
import { NodeType } from "../../../constants/Node-type";
import GraphNode from "../../../models/graph-node-model";
import toolbar from "../toolbar";

const state = reactive({
  grid: [],
  visitedNodes: [],
  startNode: GraphNode,
  finishNode: GraphNode,
  isVirtualizing: false,
});
export default function pathfindingGrid() {
  const { toolbarState } = toolbar();
  const gridHeight = Math.floor(window.innerHeight / 37);
  const gridWidth = Math.floor(window.innerWidth / 31);
  const isLoading = ref(true);

  onMounted(() => {
    createGrid();
    stopLoading();
  });

  function createGrid() {
    const gridData = [];
    for (let row = 0; row < gridHeight; row++) {
      const currentRow = [];
      for (let col = 0; col < gridWidth; col++) {
        currentRow.push(createGraphNode(row, col));
      }
      gridData.push(currentRow);
    }
    state.grid = gridData;
  }

  function createGraphNode(row, col) {
    const type = getNodeType(row, col);
    const graphNode = new GraphNode(row, col, type);
    if (type === NodeType.start) state.startNode = graphNode;
    if (type === NodeType.finish) state.finishNode = graphNode;
    return graphNode;
  }

  function getNodeType(row, col) {
    if (
      row === Math.floor(gridHeight / 2) &&
      col === Math.floor(gridWidth / 5)
    ) {
      return NodeType.start;
    } else if (
      row === Math.floor((gridHeight * 2) / 7) &&
      col === Math.floor((2 * gridWidth) / 3)
    ) {
      return NodeType.finish;
    }
    return NodeType.empty;
  }

  function selectStartNode(node) {
    state.startNode = node;
  }

  function selectFinishNode(node) {
    state.finishNode = node;
  }

  function stopLoading() {
    setTimeout(() => (isLoading.value = false), 60);
  }

  watch(
    () => toolbarState.event.value.keys(),
    (value) => {
      switch (value.next().value) {
        case "dijkstra":
          runDijkstraAlgo();
          break;
      }
    }
  );

  function runDijkstraAlgo() {
    if (state.isVirtualizing) return;
    resetVirtualizedNodes();
    state.visitedNodes = dijkstra(
      state.grid,
      state.startNode,
      state.finishNode
    );
    virtualizeDijkstra(state.visitedNodes);
  }

  function resetVirtualizedNodes() {
    if (state.visitedNodes?.length === 0) return;
    const grid = state.grid;
    grid.forEach((row) => {
      for (const node of row) {
        node.isVisited = false; 
        node.isAnimate = false;
      }
    });
  }

  function virtualizeDijkstra(visitedNodes) {
    if (!visitedNodes?.length) return;
    setAlgoVirtualizing(true);
    visitedNodes.forEach((node, index) => {
      setTimeout(() => {
       const animateNode = state.grid[node.row][node.col];
       animateNode.isAnimate = true; 
        if (index === visitedNodes.length - 1) {
          setAlgoVirtualizing(false);
        }
      }, 10 * index);
    });
  }

  function setAlgoVirtualizing(isVirtualizing) {
    state.isVirtualizing = isVirtualizing;
  }

  return {
    gridNodesState: toRefs(state),
    isLoading: computed(() => isLoading.value),
    selectStartNode,
    selectFinishNode,
  };
}
