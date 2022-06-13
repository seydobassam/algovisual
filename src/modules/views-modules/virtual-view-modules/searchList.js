import { reactive, toRefs } from "@vue/reactivity";
import Square from "../../../models/square-model";

export default function searchList() {
  const state = reactive({
    squareList: [],
  });

  function createSquareList() {
    // FIXME: use dynamic rows 
    const fixedSizeRows = 6;
    const columns = getColumns();
    let squareList = []
    for (var row = 0; row < fixedSizeRows; row++) {
      for (var col = 0; col < columns; ++col) {
        let square = new Square(`${row}-${col}`, squareList.length, "unselected");
        squareList.push(square);
      }
    }
    state.squareList = squareList;
  }

  function getColumns(){
    return Math.floor(getListWidth() / 174.5);
  }

  function getListWidth(){
    return Math.floor((window.innerWidth * 0.8));
  }

  return {
    squareListsState: toRefs(state),
    createSquareList,
    getListWidth,
  };
}
