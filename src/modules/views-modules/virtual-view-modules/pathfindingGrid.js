import { reactive, toRefs } from "@vue/reactivity";
import { computed, onMounted, watch } from "vue";
import { AlgoUtil } from "../../../algos/algo-utility/alog-util";
import { astar } from "../../../algos/pathfinding-algos/astart";
import { bfs } from "../../../algos/pathfinding-algos/bfs";
import { bidirectionalGreedyBFS } from "../../../algos/pathfinding-algos/bidirectionalBfs";
import { dijkstra } from "../../../algos/pathfinding-algos/dijkstra";
import { greedyBFS } from "../../../algos/pathfinding-algos/greedyBFS";
import { NodeType } from "../../../constants/Node-type";
import GraphNode from "../../../models/graph-node-model";
import nodeModule from "../../widget-mouldes/node-module";
import toolbar from "../toolbar";

const state = reactive({
  grid: [],
  startNode: GraphNode,
  finishNode: GraphNode,
  isVisitedNodes: false,
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
  const gridHeight = Math.floor(window.innerHeight / 30) - 7.5;
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
    }
  );

  function runAlgo(algo) {
    switch (algo) {
      case "dijkstra":
        runDijkstraAlgo();
        break;
      case "astar":
        runAstarAlgo();
        break;
      case "greedyBFS":
        runGreedyBFS();
        break;
      case "bidirectionalGreedyBFS":
        runBidirectionalGreedyBFS();
        break;
      case "bfs":
        runBfsAlgo();
        break;
    }
  }

  async function runDijkstraAlgo() {
   const visitedNodes = dijkstra(state.grid, state.startNode, state.finishNode);
   await runVirtualizer(visitedNodes);
  }

  async function runAstarAlgo() {
    const visitedNodes = astar(state.grid, state.startNode, state.finishNode);
    await runVirtualizer(visitedNodes);
  }

  async function runGreedyBFS() {
    const visitedNodes = greedyBFS(state.grid, state.startNode, state.finishNode);
    await runVirtualizer(visitedNodes);
  }

  async function runBidirectionalGreedyBFS() {
    const visitedNodes = bidirectionalGreedyBFS(state.grid, state.startNode, state.finishNode);
    await runBidirectionalVirtualizer(visitedNodes);
  }

  async function runBfsAlgo() {
    const visitedNodes = bfs(state.grid, state.startNode, state.finishNode);
    await runVirtualizer(visitedNodes);
  }

  async function runVirtualizer(visitedNodes){
    setComponentFreeze(true);
    setNodesVisited(true);
    const shortestPathNodes = AlgoUtil.getShortestPathFromNode(state.finishNode);
    await virtualizeVisitedNodes(visitedNodes);
    await virtualizeShortestPath(shortestPathNodes);
    setComponentFreeze(false);
  }

  async function runBidirectionalVirtualizer(visitedNodes){
    setComponentFreeze(true);
    setNodesVisited(true);
    virtualizeVisitedNodes(visitedNodes[0]);
    await virtualizeVisitedNodes(visitedNodes[1]);
    if (!visitedNodes[2]) return;
    const lastStartVisitedNode = AlgoUtil.getLastVisitedNodeByIndex(visitedNodes, 0);
    const lastFinishVisitedNode = AlgoUtil.getLastVisitedNodeByIndex(visitedNodes, 1);
    const shortestPathNodes = AlgoUtil.getShortestPathFromBidirectionalNodes(lastStartVisitedNode, lastFinishVisitedNode);
    await virtualizeShortestPath(shortestPathNodes)
    setComponentFreeze(false);
  }

  async function virtualizeVisitedNodes(visitedNodes) {
    if (!visitedNodes.length > 0) return;
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

  async function virtualizeShortestPath(shortestPathNodes) {
    if (!shortestPathNodes.length) return;
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

  function resetVirtualizedNodes() {
    if (!state.isVisitedNodes) return;
    const grid = state.grid;
    grid.forEach((row) => {
      for (const node of row) {
        resetNode(node);
      }
    });
    setNodesVisited(false);
  }

  function resetNode(node) {
    node.isAnimate = false;
    node.isShortPath = false;
    node.isVisited = false;
    node.previousNode = null;
  }

  function setNodesVisited(visited){
    state.isVisitedNodes = visited;
  }

  function setComponentFreeze(freeze) {
    state.isFreeze = freeze;
    setRunVirtualizeFreeze(freeze);
    setFreezeClick(freeze);
  }

  function clearWalls(){
    const grid = state.grid;
    grid.forEach((row) => {
      for (const node of row) {
        if (node.type === NodeType.block) {
          node.type = NodeType.empty;
        }
      }
    });
  }

  function clearPaths(){
    const grid = state.grid;
    grid.forEach((row) => {
      for (const node of row) {
        if (node.isShortPath) {
          resetNode(node);
        }
      }
    });
  }

  function resetGrid(){
    createGrid();
  }

  return {
    gridNodesState: toRefs(state),
    algo: computed(()=> toolbarState.selectedAlgorthim.value),
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onMouseUp,
    clearWalls,
    clearPaths,
    resetGrid,
  };
}
