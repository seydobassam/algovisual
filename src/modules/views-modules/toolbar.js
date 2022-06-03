import { reactive, toRefs } from "@vue/reactivity";

const state = reactive({
  selectedAlgoType: Object,
  selectedAlgorthim: Object,
  isMobileMenuOpen: false,
  event: null
});

export default function toolbar() {

  function setDropdownSelections(algorithmType) {
    setAlgorithmType(algorithmType);
    setAlgorthim(algorithmType.algorithms[0]);
  }

  function setAlgorithmType(algorithmType) {
    state.selectedAlgoType = algorithmType;
  }

  function setAlgorthim(algorithm) {
    state.selectedAlgorthim = algorithm;
  }

  function toggleMobileMenu() {
    state.isMobileMenuOpen = !state.isMobileMenuOpen;
  }

  function emitAlgorithmEvent() {
    state.event = state.selectedAlgorthim.event;
  }

  return {
    toolbarState: toRefs(state),
    toggleMobileMenu,
    setDropdownSelections,
    setAlgorthim,
    emitAlgorithmEvent,
  };
}
