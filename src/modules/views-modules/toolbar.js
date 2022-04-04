import { reactive, toRefs } from "@vue/reactivity";
import home from "./home";

const state = reactive({
  selectedAlgoType: Object,
});

// SOLID Pricple: Single Responsibility-Principle is used in this module.
// And One level of abstraction, plus step down
export default function toolbar() {
  const { setAlgorthim, setVirtualView } = home();

  function setDropdownSelections(algorithmType) {
    setAlgorithmType(algorithmType);
    setAlgorthim(algorithmType.algorithms[0]);
    setVirtualView(algorithmType.virtualViews[0]);
  }

  function setAlgorithmType(algorithmType) {
    state.selectedAlgoType = algorithmType;
  }

  return {
    toolbarState: toRefs(state),
    setDropdownSelections,
    setAlgorthim,
    setVirtualView,
  };
}
