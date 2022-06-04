import { reactive, toRefs, computed } from "@vue/reactivity";
import { ref, watch } from "vue";
import Node from "../../../models/node-model";
import toolbar from "../toolbar";

const state = reactive({
  gridData: [],
  startNode: Node,
  finishNode: Node,
});

export default function pathfindingGrid() {
  const { toolbarState } = toolbar();

  const isLoading = ref(true);

  // FIXME: refactor createGrid Nodes function
  function createGridNodes() {
    const currentGrid = [];
    let height = Math.floor(window.innerHeight / 37);
    let width = Math.floor(window.innerWidth / 31);
    for (let r = 0; r < height; r++) {
      let arrayRows = [];
      for (let c = 0; c < width; c++) {
        let nodeID = `${r}-${c}`;
        let nodeType = "empty";
        if (r === Math.floor(height / 2) && c === Math.floor(width / 5)) {
          nodeType = "start";
        } else if (
          r === Math.floor((height * 2) / 3) &&
          c === Math.floor((2 * width) / 3)
        ) {
          nodeType = "end";
        }
        let newNode = new Node(nodeID, nodeType);
        arrayRows.push(newNode);
      }
      currentGrid.push(arrayRows);
    }
    state.gridData = currentGrid;
  }

  function selectStartNode(node) {
    state.startNode = node;
    console.log("startNode:", node);
  }

  function selectFinishNode(node) {
    state.finishNode = node;
    console.log("finishNode: ", node);
  }

  function stopLoading() {
    setTimeout(() => (isLoading.value = false), 60);
  }

  watch(
    () => toolbarState.event.value.keys(),
    (value) => {
      console.log(value);
    },
    { deep: true }
  );

  return {
    gridNodesState: toRefs(state),
    isLoading: computed(() => isLoading.value),
    createGridNodes,
    stopLoading,
    selectStartNode,
    selectFinishNode,
  };
}
