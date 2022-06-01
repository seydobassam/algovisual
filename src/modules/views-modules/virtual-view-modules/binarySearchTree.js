import { BinaryTree, binaryTreeDrawer } from "binary-tree";
import { reactive, toRefs, computed } from "@vue/reactivity";
import { watch, onMounted, ref } from "vue";
import toolbar from "../toolbar";

export default function binarySearchTree() {
  const { toolbarState } = toolbar();
  const tree = reactive({
    root: null,
    visitedNodes: [],
    isAnimated: false,
    startVirtualDuration: 0,
  });

  const treeOptions = {
    height: window.innerHeight - 135,
    duration: 0,
  };

  const bst = new BinaryTree(100);
/*   bst.addNode(51);
  bst.addNode(12);
  bst.addNode(11);
  bst.addNode(58);
  bst.addNode(150);
  bst.addNode(149);
  bst.addNode(152); */
  createBST(15, 30, 99);
  createBST(15, 101, 200);
  function initBST() {
    onMounted(() => {
      binaryTreeDrawer().draw("#binarySearchTree", bst, treeOptions);
      binaryTreeDrawer().onNodeClick((node) => {
        tree.root = node?.data;
      });
    });
  }

  function createBST(n, min, max) {
    if (max - min < n) return;
    for (let i = 0; i < n; i++) {
      bst.addNode(~~(Math.random() * (max - min + 1)) + min);
    }
  }

  watch(
    () => toolbarState.event.value.get("runLinearSearch"),
    () => {
      if (!tree.root) {
        return;
      }
      if (tree.isAnimated) {
        binaryTreeDrawer().refreshTree();
        resetStoredTreeData();
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
      await virtualizePath(node);
      tree.visitedNodes.push(node.value);
    }, tree.startVirtualDuration);
    tree.startVirtualDuration += 500;
  }

  async function virtualizeNode(node) {
    await binaryTreeDrawer().animateNode(node.value, 400).end();
  }

  async function virtualizePath(node) {
    if (node.value === tree.root.value) return;
    await binaryTreeDrawer().animatePath(node.value, 500).end();
  }

  return { visitedNodes: computed(() => tree.visitedNodes), initBST };
}
