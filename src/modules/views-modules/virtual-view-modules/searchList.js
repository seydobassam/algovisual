import { reactive, toRefs } from "@vue/reactivity";
import { onMounted, watch } from "vue";
import Square from "../../../models/square-model";
import toolbar from "../toolbar";

export default function searchList() {
  const { setRunVirtualizeFreeze, toolbarState } = toolbar();

  const state = reactive({
    squareList: [],
    isAlgoStarted: false,
    left: null,
    right: null,
    middle: null,
    foundAt: null,
  });

  onMounted(() => {
    createSquareList();
  });

  function createSquareList() {
    const columns = getColumns();
    let squareList = [];
    for (var col = 0; col < 66; ++col) {
      let square = new Square(col, col);
      squareList.push(square);
    }
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

  function runAlgo(algo) {
    setAlgoStarted(true);
    switch (algo) {
      case "linearSearch":
        runLinearSearchAlgo(state.squareList, 5);
        break;
      case "binarySearch":
        runBinarySearchAlgo(state.squareList, 25);
        break;
      case "jumpSearch":
        break;
      case "fibonacciSearch":
        break;
    }
  }

  async function runLinearSearchAlgo(array, targetValue) {
    for (let i = 0; i < array.length; i++) {
      const value = array[i].value;
      if (value === targetValue) {
        setSquareFound(i);
        await wait(1000);
        return i;
      } else {
        setSquareDiscardByIndex(i, true);
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
      setSquareMiddle(middle, true);
      await wait(1000);

      if (squareValue === targetValue) {
        if (index === 1) {
          setSquaresDiscard(middle + 1, right + 1);
          await wait(800);
          setSquaresDiscard(left, middle);
          await wait(800);
        }
        setSquareDiscardByIndex(middle, false);
        setSquareFound(middle);
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

  function resetState() {
    setStateLeft(null);
    setStateMiddle(null);
    setStateRight(null);
    setStateFoundAt(null);
  }

  function resetSquaresState() {
    for (const square of state.squareList) {
      square.isMid = false;
      square.isDiscard = false;
      square.isFound = false;
    }
    setAlgoStarted(false);
  }

  function setAlgoStarted(isAlgoStarted) {
    state.isAlgoStarted = isAlgoStarted;
  }

  function setSquaresDiscard(from, to) {
    for (let i = from; i < to; i++) {
      setSquareDiscardByIndex(i, true);
    }
  }

  function setSquareDiscardByIndex(index, isDiscard) {
    state.squareList[index].isDiscard = isDiscard;
  }

  function setSquareMiddle(index, isMid) {
    state.squareList[index].isMid = isMid;
  }

  function setSquareFound(index) {
    setStateFoundAt(index);
    state.squareList[index].isFound = true;
  }

  function setStateLeft(val) {
    state.left = val;
  }

  function setStateMiddle(val) {
    state.middle = val;
  }

  function setStateRight(val) {
    state.right = val;
  }

  function setStateFoundAt(val) {
    state.foundAt = val;
  }

  async function wait(time) {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }

  function getColumns() {
    return Math.floor(getListWidth() / 174.5);
  }

  function getListWidth() {
    return Math.floor(window.innerWidth * 0.8);
  }

  return {
    squareListsState: toRefs(state),
    createSquareList,
    getListWidth,
  };
}
