export const dropdownData = [
  {
    id: 3,
    name: "Pathfinding",
    component: "Grid",
    algorithms: [
      {
        id: "1",
        name: "Dijkstra’s Algorithm",
        event: "dijkstra"
      },
      {
        id: "2",
        name: "A* Search Algorithm",
        event: "astar"
      },
      {
        id: "3",
        name: "Greedy Best-first Search",
        event: "greedyBFS"
      },
      {
        id: "4",
        name: "Bidirectional Best-first Search",
        event: "bidirectionalGreedyBFS"
      },
      {
        id: "5",
        name: "Breadth First Search",
        event: "bfs"
      },
    ],
  },
  {
    id: 1,
    name: "Binary Tree",
    component: "BinarySearchTree",
    algorithms: [
      {
        id: "1",
        name: "DFS Inorder",
        event: "inorder"
      },
      {
        id: "2",
        name: "DFS Preorder",
        event: "preOrder"
      },
      {
        id: "3",
        name: "DFS Postorder",
        event: "postOrder"
      },
      {
        id: "4",
        name: "BFS LevelOrder",
        event: "levelOrder"
      },
    ],
  },
  {
    id: 2,
    name: "Search",
    component: "List",
    algorithms: [
      {
        id: "1",
        name: "Linear Search",
        event: "runLinearSearch",
      },
      {
        id: "2",
        name: "Binary Search",
        event: "runBinarySearch",
      },
      {
        id: "3",
        name: "Jump Search",
        event: "runJumpSearch",
      },
      {
        id: "4",
        name: "Fibonacci Search",
        event: "runFibonacciSearch",
      },
    ],
  },

  {
    id: 4,
    name: "Sort",
    component: "charactersSortView",
    algorithms: [
      {
        id: "1",
        name: "Selection Sort",
      },
      {
        id: "2",
        name: "Bubble Sort",
      },
      {
        id: "3",
        name: "Insertion Sort",
      },
      {
        id: "4",
        name: "Merge Sort",
      },
      {
        id: "5",
        name: "Quick Sort",
      },
    ],
  },
];
