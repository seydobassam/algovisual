import { BinaryTree, binaryTreeDrawer } from "binary-tree";
import { reactive, computed } from "@vue/reactivity";
import { watch, onMounted } from "vue";
import toolbar from "../toolbar";

export default function binarySearchTree() {
  const { toolbarState } = toolbar();
  const tree = reactive({
    binaryTree: null,
    root: null,
    visitedNodes: [],
    isAnimated: false,
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
    addNodesToTree(15, 30, 99);
    addNodesToTree(15, 101, 200);
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
    binaryTreeDrawer().refreshTree();
    resetStoredTreeData();
  }

  function newTree() {
    resetStoredTreeData();
    binaryTreeDrawer().removeTree();
    createTree();
  }

  watch(
    () => toolbarState.event.value.get("runLinearSearch"),
    () => {
      if (!tree.root) {
        return;
      }
      if (tree.isAnimated) {
        clearTree();
      }
      inorderTraversal(tree.root);
      tree.isAnimated = true;
    }
  );

  function resetStoredTreeData() {
    tree.isAnimated = false;
    tree.visitedNodes = [];
    tree.startVirtualDuration = 0;
  }

  // Depth-First Search (DFS)
  function inorderTraversal(node) {
    if (!node) return;
    inorderTraversal(node.left);
    virtualizeTree(node);
    inorderTraversal(node.right);
  }

  // Breadth-First Search (BFS)
  function breadthFirstSearch() {}

  function virtualizeTree(node) {
    setTimeout(async () => {
      await virtualizeNode(node);
      tree.visitedNodes.push(node.value);
      await virtualizeNodePath(node);
    }, tree.startVirtualDuration);
    tree.startVirtualDuration += 500;
  }

  async function virtualizeNode(node) {
    await binaryTreeDrawer().animateNode(node.value, 400).end();
  }

  async function virtualizeNodePath(node) {
    if (node.value === tree.root.value) return;
    await binaryTreeDrawer().animatePath(node.value, 500).end();
  }

  return { visitedNodes: computed(() => tree.visitedNodes), initBinaryTree, clearTree, newTree};
}
