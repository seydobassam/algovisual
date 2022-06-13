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
    startVirtualDuration: 0,
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

  function initBinaryTree() {
    onMounted(() => {
      createTree();
    });
  }

  function createTree() {
    tree.binaryTree = new BinaryTree(100);
    addNodesToTree(15, 30, 99);
    addNodesToTree(15, 101, 200);
    binaryTreeDrawer().draw("#binarySearchTree", tree.binaryTree, treeOptions);
    binaryTreeDrawer().selectNode(tree.binaryTree.root);
    selectRootNode(tree.binaryTree.root);
    binaryTreeDrawer().onNodeClick((node) => {
      selectRootNode(node);
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
    resetStoredTreeData();
    binaryTreeDrawer().removeTree();
    createTree();
  }

  function clearTree() {
    resetStoredTreeData();
    binaryTreeDrawer().refreshTree();
  }

  function resetStoredTreeData() {
    tree.nodesToVirtualize = [];
    tree.visitedNodes = [];
    tree.startVirtualDuration = 0;
  }

  watch(
    () => toolbarState.event.value.keys(),
    (value) => {
      if (!tree.root) return;

      if (tree.visitedNodes.length > 0) {
        clearTree();
      }

      switch (value.next().value) {
        case "inorder":
          inorder(tree.root);
          virtualizeTree();
          break;
        case "preOrder":
          preOrder(tree.root);
          virtualizeTree();
          break;
        case "postOrder":
          postOrder(tree.root);
          virtualizeTree();
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
    for (const node of tree.nodesToVirtualize) {
      await virtualizeNode(node);
      tree.visitedNodes.push(node.value);
      await virtualizeNodePath(node);
    }
  }

  async function virtualizeNode(node) {
    binaryTreeDrawer().animateNode(node.value, {
      animationClass: "path",
    });
  }

  async function virtualizeNodePath(node) {
    if (node.value === tree.root.value) return;
    binaryTreeDrawer().animatePath(node.value, {
      animationClass: "path",
    });
  }

  return {
    visitedNodes: computed(() => tree.visitedNodes),
    initBinaryTree,
    clearTree,
    newTree,
  };
}
