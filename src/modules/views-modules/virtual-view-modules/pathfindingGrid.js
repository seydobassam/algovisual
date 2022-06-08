import { reactive, toRefs } from "@vue/reactivity";
import { onMounted, watch } from "vue";
import { AlgoUtil } from "../../../algos/algo-utility/alog-util";
import { astar } from "../../../algos/pathfinding-algos/astart";
import { bfs } from "../../../algos/pathfinding-algos/bfs";
import { dijkstra } from "../../../algos/pathfinding-algos/dijkstra";
import { greedyBFS } from "../../../algos/pathfinding-algos/greedyBFS";
import { NodeType } from "../../../constants/Node-type";
import GraphNode from "../../../models/graph-node-model";
import nodeModule from "../../widget-mouldes/node-module";
import toolbar from "../toolbar";

const state = reactive({
  grid: [],
  visitedNodes: [],
  startNode: GraphNode,
  finishNode: GraphNode,
  isFreeze: false,
  isLoading: true,
});
export default function pathfindingGrid() {
  const {
    currentNode,
    setFreezeClick,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onMouseUp,
  } = nodeModule();
  const { setRunVirtualizeFreeze, toolbarState } = toolbar();
  const gridHeight = Math.floor(window.innerHeight / 37);
  const gridWidth = Math.floor(window.innerWidth / 31);

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

  function stopLoading() {
    setTimeout(() => (state.isLoading = false), 30);
  }

  watch(
    () => currentNode.value,
    (node) => {
      switch (node.type) {
        case NodeType.start:
          state.startNode = node;
          break;
        case NodeType.finish:
          state.finishNode = node;
          break;
        case NodeType.finish:
          state.finishNode = node;
          break;
      }
      resetNode(node);
    }
  );

  watch(
    () => toolbarState.event.value.keys(),
    async (value) => {
      if (state.isFreeze) return;
      resetVirtualizedNodes();
      runAlgo(value.next().value);
      setComponentFreeze(true);
      await virtualizeNodes();
      await virtualizeShortestPath();
      setComponentFreeze(false);
    }
  );

  function runAlgo(algo) {
    switch (algo) {
      case "dijkstra":
        runDijkstraAlgo();
        break;
      case "bfs":
        runBfsAlgo();
        break;
      case "astar":
        runAstarAlgo();
        break;
      case "greedyBFS":
        runGreedyBFS();
        break;
    }
  }

  function runDijkstraAlgo() {
    state.visitedNodes = dijkstra(
      state.grid,
      state.startNode,
      state.finishNode
    );
  }

  function runBfsAlgo() {
    state.visitedNodes = bfs(state.grid, state.startNode, state.finishNode);
  }

  function runAstarAlgo() {
    state.visitedNodes = astar(state.grid, state.startNode, state.finishNode);
  }

  function runGreedyBFS() {
    state.visitedNodes = greedyBFS(state.grid, state.startNode, state.finishNode);
  }

  function setComponentFreeze(freeze) {
    state.isFreeze = freeze;
    setRunVirtualizeFreeze(freeze);
    setFreezeClick(freeze);
  }

  function resetNode(node) {
    node.isVisited = false;
    node.isAnimate = false;
    node.isShortPath = false;
    node.previousNode = null;
  }

  function resetVirtualizedNodes() {
    if (state.visitedNodes?.length === 0) return;
    const grid = state.grid;
    grid.forEach((row) => {
      for (const node of row) {
        resetNode(node);
      }
    });
  }

  async function virtualizeNodes() {
    const visitedNodes = state.visitedNodes;
    if (!visitedNodes?.length) return;
    await new Promise((resolve) => {
      visitedNodes.forEach((node, index) => {
        setTimeout(() => {
          const animateNode = state.grid[node.row][node.col];
          animateNode.isAnimate = true;
          if (index === visitedNodes.length - 1) resolve();
        }, 10 * index);
      });
    });
  }

  async function virtualizeShortestPath() {
    const shortestPathNodes = AlgoUtil.getShortestPathNodes(state.finishNode);
    if (shortestPathNodes?.length <= 1) return;
    await new Promise((resolve) => {
      shortestPathNodes.forEach((node, index) => {
        setTimeout(() => {
          const pathNode = state.grid[node.row][node.col];
          pathNode.isShortPath = true;
          if (index === shortestPathNodes.length - 1) resolve();
        }, 100 * index);
      });
    });
  }

  return {
    gridNodesState: toRefs(state),
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onMouseUp,
  };
}
