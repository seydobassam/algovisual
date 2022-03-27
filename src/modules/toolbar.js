import { reactive, toRefs } from "@vue/reactivity";

const state = reactive({
  selectedAlgoType: Object,
  selectedAlgo: Object,
  selectedView: Object,
});

export default function toolbar() {
  function setAlgoType(algoType) {
    state.selectedAlgoType = algoType;
    setAlgo(algoType.algorithms[0]);
    setView(algoType.virtualViews[0]);
  }
  function setAlgo(algo) {
    state.selectedAlgo = algo;
  }
  function setView(view) {
    state.selectedView = view;
  }

  return {
    toolbarState: toRefs(state),
    setAlgoType,
    setAlgo,
    setView,
  };
}
