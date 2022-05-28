import { reactive, toRefs } from "@vue/reactivity";

const state = reactive({
  selectedAlgorthim: Object,
  selectedVirtualView: String,
});

export default function home() {
  function setAlgorthim(algorthim) {
    state.selectedAlgorthim = algorthim;
  }

  function setVirtualView(virtualView) {
    state.selectedVirtualView = virtualView;
  }

  return {
    homeState: toRefs(state),
    setVirtualView,
    setAlgorthim,
  };
}
