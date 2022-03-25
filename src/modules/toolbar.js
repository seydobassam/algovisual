import { reactive, toRefs } from "@vue/reactivity";

const state = reactive({
  algoTypeSelection: Object,
  selectedAlgoId: String,
  selectedViewKey: String,
});

export default function toolbar() {
  function setAlgoType(algoType) {
    state.algoTypeSelection = algoType;
    setAlgo(algoType.algorithms[0]);
    setView(algoType.virtualViews[0]);
  }
  function setAlgo(algo) {
    state.selectedAlgoId = algo.id;
  }
  function setView(view) {
    state.selectedViewKey = view.key;
  }

  return {
    toolbarState: toRefs(state),
    setAlgoType,
    setAlgo,
    setView,
  };
}
