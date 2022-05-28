import { onMounted } from "vue";
import { BinaryTree, binaryTreeDrawer } from "binary-tree";

export default function binarySearchTree() {
  const bst = new BinaryTree(100);

  function initBST() {
    onMounted(() => {
      createBST(20, 50, 99);
      createBST(20, 101, 150);
      binaryTreeDrawer().draw("#binarySearchTree", bst);
      binaryTreeDrawer().onNodeClick((_, n) => {console.log(n);});
    });
  }

  function createBST(n, min, max) {
    if ((max - min) < n) return; 
    for (let i = 0; i < n; i++) {
      bst.addNode(~~(Math.random() * (max - min + 1)) + min);
    }
  }

  return { initBST };
}
