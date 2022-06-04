import { reactive } from '@vue/reactivity';
import { getCurrentInstance, watch } from 'vue';
import Node from "../../models/node-model";

const state = reactive({
  isMouseEvent: false,
  selectedNodeType: "empty",
  prevNode: Node,
  startNode: null,
  finishNode: null
});

export default function node() {
  const { emit } = getCurrentInstance();

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
      console.log("reset");
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

    if (state.startNode) {
      emit("selectStartNode", state.startNode);  
    } else if (state.finishNode){
      emit("selectFinishNode", state.finishNode);  
    }

    state.startNode = null;
    state.finishNode = null;
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
    if (newType === "start") {
      state.startNode = currentNode;
    } else if (newType  === "end") {
      state.finishNode = currentNode;
    }
  }

  return {
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onMouseUp,
  };
}