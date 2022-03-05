import { createStore } from "vuex";
import Node from "../models/node-model.vue";

const state = {
  isMouseEvent: false,
  prevNode: Node,
  selectedNodeType: "empty",
  gridData: [],
};

const mutations = {
  createGrid() {
    const currentGrid = [];
    let height = Math.floor(window.outerHeight / 36);
    let width = Math.floor(window.outerWidth / 30.5);
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
    console.log(currentGrid);
    this.state.gridData = currentGrid;
  },

  triggerMouse(state, mouseEvent) {
    state.isMouseEvent = mouseEvent;
  },

  setSelectedNodeType(state, nodeType) {
    if (nodeType === "empty") {
      state.selectedNodeType = "block";
    } else if (nodeType === "block") {
      state.selectedNodeType = "empty";
    } else {
      state.selectedNodeType = nodeType;
    }
  },

  onMouseDown(state, currentNode) {
    if (state.selectedNodeType === "empty" || state.selectedNodeType === "block") {
      this.commit("setNode", {currentNode, newType: state.selectedNodeType});
    }
  },

  onMouseEnter(state, {currentNode, newType}) {
    if (currentNode.type === "empty") {
      this.commit("setPrevNodeEmpty", state.prevNode)
      this.commit("setNode", {currentNode, newType: state.selectedNodeType})
    }

    if (state.selectedNodeType !== currentNode.type) {
      this.commit("setNode", {currentNode: state.prevNode, newType})
    }
  },

  onMouseLeave(state, currentNode) {
    if(state.selectedNodeType === currentNode.type) {
      state.prevNode = currentNode;
      this.commit("setPrevNodeEmpty", currentNode)
    }
  },

  setPrevNodeEmpty(state, currentNode) {
    if (state.selectedNodeType === "start" || state.selectedNodeType === "end") {
      this.commit("setNode", {currentNode, newType: "empty"})
    }
  },

  setNode(state, {currentNode, newType}) {
    currentNode.type = newType;
    let rowCol = currentNode.nodeID.split("-");
    let r = parseInt(rowCol[0]);
    let c = parseInt(rowCol[1]);
    state.gridData[r][c] = currentNode;
  },
};

export default createStore({
  state,
  mutations,
});
