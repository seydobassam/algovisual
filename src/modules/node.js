import { reactive } from '@vue/reactivity';
import pathfindingGrid from './pathfindingGrid';
import Node from "../models/node-model";

const state = reactive({
  isMouseEvent: false,
  selectedNodeType: "empty",
  prevNode: Node,
});

export default function node() {
  const { gridNodesState } = pathfindingGrid()

  // FIXME: below functions should be refactored
  const onMouseDown = (currentNode) => {
    state.isMouseEvent = true
    setSelectedNodeType(currentNode.type);
    if (state.selectedNodeType === "empty" || state.selectedNodeType === "block") {
       changeNode(currentNode, state.selectedNodeType);
    }
  }

  const onMouseEnter = (currentNode) => {    
    if (!state.isMouseEvent) {
        return;
    }

    if (currentNode.type === "empty") {
        setPrevNodeEmpty(state.prevNode);
        changeNode(currentNode, state.selectedNodeType);
    }

    if (state.selectedNodeType !== currentNode.type) {
        changeNode(state.prevNode, state.selectedNodeType);
    }
  }

  const onMouseLeave = (currentNode) => { 
    if (!state.isMouseEvent) {
        return;
    }
    
    if (state.selectedNodeType === currentNode.type) {
        state.prevNode = currentNode;
        setPrevNodeEmpty(currentNode);
    }
  }

  const onMouseUp = () => {
    state.isMouseEvent = false;
  }


  // local functions 
  const setSelectedNodeType = (nodeType) => { 
    if (nodeType === "empty") {
        state.selectedNodeType = "block";
      } else if (nodeType === "block") {
        state.selectedNodeType = "empty";
      } else {
        state.selectedNodeType = nodeType;
      }
  }

  const setPrevNodeEmpty = (currentNode) => {
    if (state.selectedNodeType === "start" || state.selectedNodeType === "end") {
        changeNode(currentNode, "empty"); 
    }
  }

  function changeNode(currentNode, newType) {
    currentNode.type = newType;
    let rowCol = currentNode.nodeID.split("-");
    let r = parseInt(rowCol[0]);
    let c = parseInt(rowCol[1]);
    gridNodesState.gridData.value[r][c]= currentNode;
  }

  return {
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onMouseUp,
  };
}