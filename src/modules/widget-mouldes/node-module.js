import { computed, reactive } from "vue";
import { NodeType } from "../../constants/Node-type";


const state = reactive({
  currentNode: null,
  leavedNode: null,
  clickedType: null,
  freezeClick: false,
});
export default function nodeModule() {
  function onMouseDown(downNode) {
    if (state.freezeClick) return; 
    const downNodeType = downNode.type;
    if (downNodeType === NodeType.empty) {
      downNode.type = NodeType.block;
      setCurrentNode(downNode);
    } else if (downNodeType === NodeType.block) {
      downNode.type = NodeType.empty;
      setCurrentNode(downNode);
    }
    state.clickedType = downNode.type;
  }

  function onMouseEnter(enterNode) {
    if (!state.clickedType) return;
    const enterNodeType = enterNode.type;
    handleEnterStartNode(enterNodeType, enterNode);
    handleEnterFinishNode(enterNodeType, enterNode);
    handleEnterBlockNodes(enterNodeType, enterNode);
    handleEnterEmptyNodes(enterNodeType, enterNode);
  }

  function handleEnterStartNode(enterNodeType, enterNode) {
    if (state.clickedType !== NodeType.start) return;
    handleNodeAllowedToChange(enterNodeType, enterNode, NodeType.start);
    handlePrevNode(enterNodeType, NodeType.start);
  }

  function handleEnterFinishNode(enterNodeType, enterNode) {
      if (state.clickedType != NodeType.finish) return;
      handleNodeAllowedToChange(enterNodeType, enterNode, NodeType.finish);
      handlePrevNode(enterNodeType, NodeType.finish);
  }

  // Handle Start or Finish node to be changed 
  function handleNodeAllowedToChange(enterNodeType, enterNode, newType) {
    if (enterNodeType !== NodeType.empty) return;
    // if start or finish node is allowed to be changed then set the prev node to empty.
    handlePrevNode(enterNodeType);
    enterNode.type = newType;
    setCurrentNode(enterNode);
  }

  function handlePrevNode(enterNodeType, prevNodeType){
    if (!state.leavedNode) return;
    if (enterNodeType !== NodeType.empty) {
      state.leavedNode.type = prevNodeType;
      return;
    }  
    state.leavedNode.type = NodeType.empty;
  }

  function handleEnterBlockNodes(enterNodeType, enterNode) {
    if (state.clickedType !== NodeType.block || enterNodeType !== NodeType.empty) return
    enterNode.type = NodeType.block;
    setCurrentNode(enterNode);
  }

  function handleEnterEmptyNodes(enterNodeType, enterNode) {
    if (state.clickedType !==  NodeType.empty || enterNodeType !== NodeType.block) return;
    enterNode.type = NodeType.empty;
    setCurrentNode(enterNode);
  }

  function onMouseLeave(currentLeaveNode) {
    if (!state.clickedType) return;
    const currentLeaveNodeType = currentLeaveNode.type;
    if (state.clickedType !== NodeType.start 
      && state.clickedType !== NodeType.finish 
      || currentLeaveNodeType !== state.clickedType) return;
    currentLeaveNode.type = NodeType.empty;
    state.leavedNode = currentLeaveNode;
    return;
  }

  function onMouseUp() {
    state.clickedType = null;
  }

  function setCurrentNode(node) {
    state.currentNode = node;
  }

  function setFreezeClick(freeze) {
    state.freezeClick = freeze;
  }

  return {
    currentNode: computed(() => state.currentNode),
    setFreezeClick,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onMouseUp,
  };
}