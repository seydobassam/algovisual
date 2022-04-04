export const dropdownData = [
    {
      id: "1",
      name: "Pathfinding",
      algorithms: [
        {
          id: "1",
          name: "Dijkstra’s Algorithm",
        },
        {
          id: "2",
          name: "A* Search Algorithm",
        },
        {
          id: "3",
          name: "Greedy Best-first Search",
        },
        {
          id: "4",
          name: "Swarm Algorithm",
        },
        {
          id: "5",
          name: "Breadth First Search",
        },
        {
          id: "6",
          name: "Depth First Search",
        },
      ],
      virtualViews: [
        {
          id: "1",
          component: "Grid",
          name: "Pathfinding Grid",
        },
        {
          id: "2",
          component: "GridView",
          name: "Grid View",
        },
      ],
    },
    {
      id: "2",
      name: "Search",
      algorithms: [
        {
          id: "1",
          name: "Linear Search",
        },
        {
          id: "2",
          name: "Binary Search",
        },
        {
          id: "3",
          name: "Jump Search",
        },
        {
          id: "4",
          name: "Fibonacci Search",
        },
      ],
      virtualViews: [
        {
          id: "1",
          component: "List",
          name: "Search List",
        },
      ],
    },
    {
      id: "3",
      name: "Sort",
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
      virtualViews: [
        {
          id: "1",
          component: "charactersSortView",
          name: "Characters",
        },
      ],
    },
  ];
  