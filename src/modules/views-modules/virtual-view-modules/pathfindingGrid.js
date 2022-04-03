import { reactive, toRefs } from "@vue/reactivity";
import Node from "../../../models/node-model";

const state = reactive({
  gridData: [],
});

export default function pathfindingGrid() {
  // FIXME: refactor createGrid Nodes function, better name and single responsibility principle, and read step down
  const createGridNodes = () => {
    const currentGrid = [];
    let height = Math.floor(window.outerHeight / 37);
    let width = Math.floor(window.outerWidth / 31);
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
  };

  return {
    gridNodesState: toRefs(state),
    createGridNodes,
  };
}
