import { BinaryTree, binaryTreeDrawer } from "binary-tree";
import { reactive, computed } from "@vue/reactivity";
import { watch, onMounted } from "vue";
import toolbar from "../toolbar";

export default function binarySearchTree() {
  const { toolbarState } = toolbar();
  const tree = reactive({
    binaryTree: null,
    root: null,
    nodesToVirtualize: [],
    visitedNodes: [],
    isVirtualaizing: false,
    startVirtualDuration: 0,
  });

  const treeOptions = {
    height: window.innerHeight - 135,
  };

  function initBinaryTree() {
    onMounted(() => {
      createTree();
    });
  }

  function createTree() {
    tree.binaryTree = new BinaryTree(100);
    tree.binaryTree.addNode(51);
    tree.binaryTree.addNode(150);
    tree.binaryTree.addNode(12);
    tree.binaryTree.addNode(152);
    tree.binaryTree.addNode(2);
    tree.binaryTree.addNode(144);
    tree.binaryTree.addNode(12);
    tree.binaryTree.addNode(61);
    tree.binaryTree.addNode(62);
    tree.binaryTree.addNode(63);
    tree.binaryTree.addNode(234);
    tree.binaryTree.addNode(22);
    tree.binaryTree.addNode(123);
    tree.binaryTree.addNode(122);
    tree.binaryTree.addNode(125);
    tree.binaryTree.addNode(57);
    tree.binaryTree.addNode(233);
    tree.binaryTree.addNode(235);
    tree.binaryTree.addNode(149);
    /* addNodesToTree(15, 30, 99);
    addNodesToTree(15, 101, 200); */
    binaryTreeDrawer().draw("#binarySearchTree", tree.binaryTree, treeOptions);
    binaryTreeDrawer().onNodeClick((node) => {
      tree.root = node?.data;
    });
  }

  function addNodesToTree(n, min, max) {
    if (max - min < n) return;
    for (let i = 0; i < n; i++) {
      tree.binaryTree.addNode(~~(Math.random() * (max - min + 1)) + min);
    }
  }

  function clearTree() {
    if (!tree.isVirtualaizing) {
      resetTree();
      return;
    }
    stopVirtualization();
  }

  function newTree() {
    resetStoredTreeData();
    binaryTreeDrawer().removeTree();
    createTree();
  }

  function resetTree() {
    resetStoredTreeData();
    binaryTreeDrawer().refreshTree();
  }

  function stopVirtualization() {
    tree.isVirtualaizing = false;
  }

  watch(
    () => toolbarState.event.value.get("runLinearSearch"),
    () => {
      if (!tree.root || tree.isVirtualaizing) {
        return;
      }
      if (tree.visitedNodes.length > 0) {
        resetTree();
      }
      levelOrder();
      /*  inorderTraversal(tree.root);
      virtualizeTree();  */
    }
  );

  function resetStoredTreeData() {
    tree.nodesToVirtualize = [];
    tree.visitedNodes = [];
    tree.startVirtualDuration = 0;
  }

  // Depth-First Search (DFS)
  function inorderTraversal(node) {
    if (!node) return;
    inorderTraversal(node.left);
    tree.nodesToVirtualize.push(node);
    inorderTraversal(node.right);
  }

  // Breadth-First Search (BFS)
  async function levelOrder() {
    if (!tree.root) return;

    var queue = [tree.root];
    while (queue.length) {
      queue.push(null);
      var levelNodes = [];
      var node;
      while ((node = queue.shift())) {
        levelNodes.push(node.value);
        await virtualizeNode(node);
        await virtualizeNodePath(node);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
      tree.visitedNodes.push(levelNodes);
    }
  }

  async function virtualizeTree() {
    tree.isVirtualaizing = true;
    for (const node of tree.nodesToVirtualize) {
      if (!tree.isVirtualaizing) {
        console.log("cancel");
        resetTree();
        break;
      }
      await virtualizeNode(node);
      tree.visitedNodes.push(node.value);
      await virtualizeNodePath(node);
    }
    tree.isVirtualaizing = false;
  }

  async function virtualizeNode(node) {
    await binaryTreeDrawer().animateNode(node.value, 300).end();
  }

  async function virtualizeNodePath(node) {
    if (node.value === tree.root.value) return;
    await binaryTreeDrawer().animatePath(node.value, 300).end();
  }

  return {
    visitedNodes: computed(() => tree.visitedNodes),
    initBinaryTree,
    clearTree,
    newTree,
  };
}
