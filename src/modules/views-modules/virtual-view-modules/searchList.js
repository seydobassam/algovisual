import { reactive, toRefs } from "@vue/reactivity";
import { onMounted, watch } from "vue";
import { SquareType } from "../../../constants/square-type";
import Square from "../../../models/square-model";
import toolbar from "../toolbar";

export default function searchList() {
  const { setRunVirtualizeFreeze, toolbarState } = toolbar();

  const state = reactive({
    squareList: [],
    selectedSquare: null,
    isAlgoStarted: false,
    isFreeze: false,
    left: null,
    right: null,
    middle: null,
    start: null,
    jump: null,
    foundAt: null,
  });

  onMounted(() => {
    createSquareList();
  });

  function createSquareList() {
    let squareList = [];
    for (var i = 0; i < 77; ++i) {
      let r = Math.floor(Math.random() * 1000) + 1;
      let square = new Square(r, i);
      if (i === 7) {
        selectSquare(square);
      }
      if (squareList.indexOf(r) === -1) squareList.push(square);
    }
    squareList.sort((a, b) => a.value - b.value);
    state.squareList = squareList;
  }

  watch(
    () => toolbarState.event.value.keys(),
    (value) => {
      if (state.isAlgoStarted) {
        resetState();
        resetSquaresState();
      }
      runAlgo(value.next().value);
    }
  );

  async function runAlgo(algo) {
    setAlgoStarted(true);
    setComponentFreeze(true);
    switch (algo) {
      case "linearSearch":
        await runLinearSearchAlgo(state.squareList, state.selectedSquare.value);
        break;
      case "binarySearch":
        await runBinarySearchAlgo(state.squareList, state.selectedSquare.value);
        break;
      case "jumpSearch":
        await runJumpSearchAlgo(state.squareList, state.selectedSquare.value);
        break;
      case "fibonacciSearch":
        break;
    }
    setComponentFreeze(false);
  }

  async function runLinearSearchAlgo(array, targetValue) {
    for (let i = 0; i < array.length; i++) {
      const value = array[i].value;
      if (value === targetValue) {
        setStateFoundAt(i);
        setSquareType(i, SquareType.found);
        return i;
      } else {
        setSquareType(i, SquareType.discard);
        await wait(800);
      }
    }
    return -1;
  }

  async function runBinarySearchAlgo(array, targetValue) {
    var index = 0;
    var left = 0;
    var right = array.length - 1;
    var middle;
    while (left <= right) {
      index++;
      middle = Math.floor((left + right) / 2);
      var squareValue = array[middle].value;

      setStateLeft(left);
      setStateRight(right);
      setStateMiddle(middle);
      setSquareType(middle, SquareType.middle);
      await wait(1000);

      if (squareValue === targetValue) {
        if (index === 1) {
          setSquaresDiscard(middle + 1, right + 1);
          await wait(800);
          setSquaresDiscard(left, middle);
          await wait(800);
        }
        setStateFoundAt(middle);
        setSquareType(middle, SquareType.found);
        return middle;
      } else if (targetValue < squareValue) {
        setSquaresDiscard(middle + 1, right + 1);
        await wait(800);
        right = middle - 1;
      } else {
        setSquaresDiscard(left, middle);
        await wait(800);
        left = middle + 1;
      }
    }
    return -1;
  }

  async function runJumpSearchAlgo(array, target) {
    let len = array.length;
    let jump = Math.floor(Math.sqrt(len));
    let start = 0;
    let currentJump = jump;

    // virtualize first block, from start to the jump.
    setJumpBlock(start, currentJump);
    await wait(1100);

    while (array[Math.min(currentJump, len) - 1].value < target) {
      setSquaresDiscard(start, currentJump);
      await wait(800);
      start = currentJump;
      currentJump += jump;
      setJumpBlock(start, currentJump);
      await wait(1100);
      if (start >= len) return -1;
    }

    for (let i = start; i < currentJump; i++) {
      const square = array[i];
      if (square?.value === target) {
        setStateFoundAt(i);
        setSquareType(i, SquareType.found);
        return i;
      } else if (square?.type === null) {
        setSquareType(i, SquareType.discard);
        await wait(700);
      }
    }

    return -1;
  }

  function resetState() {
    setStateLeft(null);
    setStateMiddle(null);
    setStateStart(null);
    setStateJump(null);
    setStateRight(null);
    setStateFoundAt(null);
  }

  function resetSquaresState() {
    for (const square of state.squareList) {
      square.type = null;
    }
    setAlgoStarted(false);
  }

  function setAlgoStarted(isAlgoStarted) {
    state.isAlgoStarted = isAlgoStarted;
  }

  function setJumpBlock(start, currentJump) {
    setStateStart(start);
    setStateJump(currentJump);
    setSquareType(start, SquareType.left);
    setSquareType(currentJump, SquareType.jump);
  }

  function setSquaresDiscard(from, to) {
    for (let i = from; i < to; i++) {
      setSquareType(i, SquareType.discard);
    }
  }

  function setSquareType(index, type) {
    if (index < 0 || index > state.squareList.length - 1) return;
    state.squareList[index].type = type;
  }

  function setStateLeft(val) {
    state.left = val;
  }

  function setStateMiddle(val) {
    state.middle = val;
  }

  function setStateStart(val) {
    state.start = val;
  }

  function setStateJump(val) {
    state.jump = val;
  }

  function setStateRight(val) {
    state.right = val;
  }

  function setStateFoundAt(val) {
    state.foundAt = val;
  }

  function selectSquare(square) {
    if (state.isAlgoStarted) {
      resetState();
      resetSquaresState();
    }
    state.selectedSquare = square;
  }

  function setComponentFreeze(freeze) {
    state.isFreeze = freeze;
    setRunVirtualizeFreeze(freeze);
  }

  async function wait(time) {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }

  function getListWidth() {
    return Math.floor(window.innerWidth * 0.8);
  }

  return {
    squareListsState: toRefs(state),
    selectSquare,
    getListWidth,
  };
}
