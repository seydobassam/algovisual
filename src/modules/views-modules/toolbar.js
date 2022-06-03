import { reactive, toRefs } from "@vue/reactivity";

const state = reactive({
  selectedAlgoType: Object,
  selectedAlgorthim: Object,
  isMobileMenuOpen: false,
  event: new Map(),
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
    // Hack: create a new value reference in memory, so that the watcher gets trigger when the new value is the same as old one.
    state.event = new Map().set(state.selectedAlgorthim.event, {});
  }

  return {
    toolbarState: toRefs(state),
    toggleMobileMenu,
    setDropdownSelections,
    setAlgorthim,
    emitAlgorithmEvent,
  };
}
