import { reactive, toRefs } from "@vue/reactivity";
import { watch } from "vue";
import Square from "../../../models/square-model";
import toolbar from "../toolbar";

export default function searchList() {
  const { setRunVirtualizeFreeze, toolbarState } = toolbar();

  const state = reactive({
    squareList: [],
    left: 0,
    right: searchList.length - 1,
    middleSquare: Math.floor((0 + searchList.length - 1) / 2),
  });

  function createSquareList() {
    const columns = getColumns();
    let squareList = [];
    for (var col = 0; col < 54; ++col) {
      let square = new Square(col, col);
      squareList.push(square);
    }
    state.squareList = squareList;
  }

  function getColumns() {
    return Math.floor(getListWidth() / 174.5);
  }

  function getListWidth() {
    return Math.floor(window.innerWidth * 0.8);
  }

  watch(
    () => toolbarState.event.value.keys(),
    (value) => {
      console.log(value.next().value);
    }
  );

  async function binarySearchAlgo(array, targetValue) {
    var index = 0;
    var left = 0;
    var right = array.length - 1;
    var middle;

    while (left <= right) {
      index++;
      middle = Math.floor((left + right) / 2);
      var square = array[middle];
      setSquareMiddle(middle);
      await wait(1000);
      if (square.value === targetValue) {
        if (index === 1) {
          setSquaresDiscard(middle + 1, right + 1);
          await wait(800);
          setSquaresDiscard(left, middle);
          await wait(800);
        }
        setSquareFound(middle);
        return middle;
      } else if (targetValue < square.value) {
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

  async function wait(time) {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }

  function setSquareFound(index) {
    state.squareList[index].isMid = false;
    state.squareList[index].isFound = true;
  }

  function setSquareMiddle(index) {
    state.squareList[index].isMid = true;
  }

  function setSquaresDiscard(from, to) {
    for (let i = from; i < to; i++) {
      const square = state.squareList[i];
      square.isDiscard = true;
    }
  }

  return {
    squareListsState: toRefs(state),
    createSquareList,
    getListWidth,
  };
}
