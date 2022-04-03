import { reactive, toRefs } from "@vue/reactivity";

const state = reactive({
  selectedHomeView: Object,
});

export default function home() {
  const { toolbarState } = toolbar();

  return {
    homeState: toRefs(state),
  };
}
