import { reactive, toRefs } from "@vue/reactivity";
import { ref } from "vue";

const state = reactive({
  selectedAlgoType: Object,
  selectedAlgorthim: Object,
  selectedVirtualView: Object,
  isMobileMenuOpen: false,
  isStarted: false,
  event: new Map()
});

export default function toolbar() {

  function setDropdownSelections(algorithmType) {
    setAlgorithmType(algorithmType);
    setAlgorthim(algorithmType.algorithms[0]);
    setVirtualView(algorithmType.virtualViews[0]);
  }

  function setAlgorithmType(algorithmType) {
    state.selectedAlgoType = algorithmType;
  }

  function setAlgorthim(algorithm) {
    state.selectedAlgorthim = algorithm;
  }

  function setVirtualView(virtualView) {
    state.selectedVirtualView = virtualView;
  }

  function toggleMobileMenu() {
    state.isMobileMenuOpen = !state.isMobileMenuOpen;
  }

  function emitAlgorithmEvent() {
    state.isStarted = !state.isStarted;
    state.event.set(state.selectedAlgorthim.event, {});
  }

  return {
    toolbarState: toRefs(state),
    toggleMobileMenu,
    setDropdownSelections,
    setAlgorthim,
    setVirtualView,
    emitAlgorithmEvent,
  };
}
