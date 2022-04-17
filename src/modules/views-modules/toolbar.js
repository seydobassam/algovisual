import { reactive, toRefs } from "@vue/reactivity";
import home from "./home";

const state = reactive({
  selectedAlgoType: Object,
  isMobileMenuOpen: false,
});

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

  function toggleMobileMenu() {
    state.isMobileMenuOpen = !state.isMobileMenuOpen;
  }

  return {
    toolbarState: toRefs(state),
    toggleMobileMenu,
    setDropdownSelections,
    setAlgorthim,
    setVirtualView,
  };
}
