import { reactive, toRefs } from "@vue/reactivity";

const state = reactive({
  selectedAlgorthim: Object,
  selectedVirtualView: String,
});

export default function home() {
  function setAlgorthim(algorthim) {
    state.selectedAlgorthim = algorthim;
    console.log("this is our Algorthim", state.selectedAlgorthim);
  }

  function setVirtualView(virtualView) {
    state.selectedVirtualView = virtualView;
    console.log("this is our view",  state.selectedVirtualView);
  }

  return {
    homeState: toRefs(state),
    setVirtualView,
    setAlgorthim,
  };
}
