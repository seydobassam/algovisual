import { getCurrentInstance } from "vue";
import { NodeType } from "../../constants/Node-type";

let startNode = null;
let finishNode = null;
let leavedNode = null;
let clickedType = null;
export default function node() {
  const { emit } = getCurrentInstance();

  function onMouseDown(downNode) {
    const downNodeType = downNode.type;
    if (downNodeType === NodeType.empty) {
      downNode.type = NodeType.block;
      emit("onSelectNode", downNode);
    } else if (downNodeType === NodeType.block) {
      downNode.type = NodeType.empty;
      emit("onSelectNode", downNode);
    }
    clickedType = downNode.type;
  }

  function onMouseEnter(enterNode) {
    if (!clickedType) return;
    const enterNodeType = enterNode.type;
    handleEnterStartNode(enterNodeType, enterNode);
    handleEnterFinishNode(enterNodeType, enterNode);
    handleEnterBlockNodes(enterNodeType, enterNode);
    handleEnterEmptyNodes(enterNodeType, enterNode);
  }

  function handleEnterStartNode(enterNodeType, enterNode) {
    if (clickedType !== NodeType.start) return;
    handleNodeAllowedToChange(enterNodeType, enterNode, NodeType.start);
    handlePrevNode(enterNodeType, NodeType.start);
  }

  function handleEnterFinishNode(enterNodeType, enterNode) {
      if (clickedType != NodeType.finish) return;
      handleNodeAllowedToChange(enterNodeType, enterNode, NodeType.finish);
      handlePrevNode(enterNodeType, NodeType.finish);
  }

  // Handle Start or Finish node to be changed 
  function handleNodeAllowedToChange(enterNodeType, enterNode, newType) {
    if (enterNodeType !== NodeType.empty) return;
    // if start or finish node is allowed to be changed then set the prev node to empty.
    handlePrevNode(enterNodeType);
    enterNode.type = newType;
    setNode(enterNode)
  }

  function handlePrevNode(enterNodeType, prevNodeType){
    if (!leavedNode) return;
    if (enterNodeType !== NodeType.empty) {
      leavedNode.type = prevNodeType;
      return;
    }  
    leavedNode.type = NodeType.empty;
  }

  function setNode(node) {
    if (node.type === NodeType.start) {
      startNode = node;
    } 
    if (node.type === NodeType.finish) {
      finishNode = node;
    }
  }

  function handleEnterBlockNodes(enterNodeType, enterNode) {
    if (clickedType !== NodeType.block || enterNodeType !== NodeType.empty) return
    enterNode.type = NodeType.block;
    emit("onSelectNode", enterNode);
  }

  function handleEnterEmptyNodes(enterNodeType, enterNode) {
    if (clickedType !==  NodeType.empty || enterNodeType !== NodeType.block) return;
    enterNode.type = NodeType.empty;
    emit("onSelectNode", enterNode);
  }

  function onMouseLeave(currentLeaveNode) {
    if (!clickedType) return;
    const currentLeaveNodeType = currentLeaveNode.type;
    if (clickedType !== NodeType.start 
      && clickedType !== NodeType.finish 
      || currentLeaveNodeType !== clickedType) return;
    currentLeaveNode.type = NodeType.empty;
    leavedNode = currentLeaveNode;
    return;
  }

  function onMouseUp() {
    clickedType = null;
    if (startNode) {
      emit("selectStartNode", startNode);
    }  else if (finishNode) {
      emit("selectFinishNode", finishNode);
    }
    startNode = null;
    finishNode = null;
  }

  return {
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onMouseUp,
  };
}