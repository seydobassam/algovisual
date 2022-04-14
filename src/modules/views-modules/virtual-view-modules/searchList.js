import { reactive, toRefs, computed } from "@vue/reactivity";
import Square from "../../../models/square-model";

export default function searchList() {
  const state = reactive({
    squareList: [],
  });

  function createSquareList() {
    // FIXME: use dynamic rows 
    const fixedSizeRows = 6;
    const columns = _getColumns();
    let squareList = []
    for (var row = 0; row < fixedSizeRows; row++) {
      for (var col = 0; col < columns; ++col) {
        let square = new Square(`${row}-${col}`, squareList.length, "unselected");
        squareList.push(square);
      }
    }
    console.log(squareList);
    state.squareList = squareList;
  }

  function _getColumns(){
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
