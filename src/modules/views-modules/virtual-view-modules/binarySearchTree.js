import { BinaryTree, binaryTreeDrawer } from "binary-tree";
import { reactive, computed } from "@vue/reactivity";
import { watch, onMounted } from "vue";
import toolbar from "../toolbar";

export default function binarySearchTree() {
  const { setRunVirtualizeFreeze, toolbarState } = toolbar();
  const tree = reactive({
    binaryTree: null,
    root: null,
    nodesToVirtualize: [],
    visitedNodes: [],
    isFreeze: false,
  });

  const treeOptions = {
    height: window.innerHeight - 135,
    linkStyleOptions: {
      strokeWidth: "5px",
      addAnimationPaths: true,
    },
    nodeStyleOptions: {
      strokeWidth: "5px",
    },
  };

  onMounted(() => {
    createTree();
  });

  function createTree() {
    tree.binaryTree = new BinaryTree(100);
    addNodesToTree(15, 30, 99);
    addNodesToTree(15, 101, 200);
    binaryTreeDrawer().draw("#binarySearchTree", tree.binaryTree, treeOptions);
    binaryTreeDrawer().selectNode(tree.binaryTree.root);
    selectRootNode(tree.binaryTree.root);
    binaryTreeDrawer().onNodeClick((node) => {
      if (tree.isFreeze) return;
      selectRootNode(node?.data);
    });
  }

  function addNodesToTree(n, min, max) {
    if (max - min < n) return;
    for (let i = 0; i < n; i++) {
      tree.binaryTree.addNode(~~(Math.random() * (max - min + 1)) + min);
    }
  }

  function selectRootNode(node) {
    tree.root = node;
  }

  function newTree() {
    if (tree.isFreeze) return;
    resetStoredTreeData();
    binaryTreeDrawer().removeTree();
    createTree();
  }

  function clearTree() {
    if (tree.isFreeze) return;
    resetStoredTreeData();
    binaryTreeDrawer().resetTree();
  }

  function resetStoredTreeData() {
    tree.nodesToVirtualize = [];
    tree.visitedNodes = [];
  }

  watch(
    () => toolbarState.event.value.keys(),
    (value) => {
      if (!tree.root || tree.isFreeze) return;

      if (tree.visitedNodes.length > 0) {
        clearTree();
      }

      switch (value.next().value) {
        case "inorder":
          inorder(tree.root);
          virtualizeTree(tree.nodesToVirtualize);
          break;
        case "preOrder":
          preOrder(tree.root);
          virtualizeTree(tree.nodesToVirtualize);
          break;
        case "postOrder":
          postOrder(tree.root);
          virtualizeTree(tree.nodesToVirtualize);
          break;
        case "levelOrder":
          levelOrder();
          break;
      }
    }
  );

  // Depth-First Search (DFS)
  function inorder(node) {
    if (!node) return;
    inorder(node.left);
    tree.nodesToVirtualize.push(node);
    inorder(node.right);
  }

  function preOrder(node) {
    if (!node) return;
    tree.nodesToVirtualize.push(node);
    inorder(node.left);
    inorder(node.right);
  }

  function postOrder(node) {
    if (!node) return;
    inorder(node.left);
    inorder(node.right);
    tree.nodesToVirtualize.push(node);
  }

  // Breadth-First Search (BFS)
  async function levelOrder() {
    if (!tree.root) return;
    setFreeze(true);
    var queue = [tree.root];
    while (queue.length) {
      queue.push(null);
      var levelNodes = [];
      var node;
      while ((node = queue.shift())) {
        levelNodes.push(node.value);
        await virtualizeNodePath(node);
        await virtualizeNode(node);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
      tree.visitedNodes.push(levelNodes);
    }
    setFreeze(false);
  }

  async function virtualizeTree(nodesToVirtualize) {
    if (!nodesToVirtualize.length) return;
    setFreeze(true);
    let pathDuration = 300;
    let nodeDuration = 750;
    for (let i = 0; i < nodesToVirtualize.length; i++) {
      const node = nodesToVirtualize[i];
      await virtualizeNodePath(node, pathDuration);
      tree.visitedNodes.push(node.value);
      await virtualizeNode(node, nodeDuration);
      if (i === 0) {
        pathDuration = 1000;
        nodeDuration = 900;
      }
    }
    setFreeze(false);
  }

  async function virtualizeNode(node, duration = 500) {
    await new Promise((resolve) => {
      setTimeout(() => {
        binaryTreeDrawer().animateNode(node.value, {
          animationClass: "tree-animation",
        });
        resolve();
      }, duration);
    });
  }

  async function virtualizeNodePath(node, duration = 500) {
    if (node.value === tree.root.value) return;
    await new Promise((resolve) => {
      setTimeout(() => {
        binaryTreeDrawer().animatePath(node.value, {
          animationClass: "tree-animation",
        });
        resolve();
      }, duration);
    });
  }

  function setFreeze(freeze) {
    setRunVirtualizeFreeze(freeze);
    tree.isFreeze = freeze;
  }

  return {
    visitedNodes: computed(() => tree.visitedNodes),
    isFreeze: computed(() => tree.isFreeze),
    clearTree,
    newTree,
  };
}
