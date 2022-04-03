import { toRefs, reactive } from "@vue/reactivity";
import { getCurrentInstance } from "vue";

export default function dropdown() {
  const { emit } = getCurrentInstance();

  const state = reactive({
    isChecked: false,
    selection: Object,
  });

  function onDropdown() {
    state.isChecked = !state.isChecked;
  }

  function hideDropdown() {
    state.isChecked = false;
  }

  function onSelect(selection) {
    setSelection(selection);
    hideDropdown();
    emit("select", selection);
  }

  function setSelection(selection) {
    state.selection = selection;
  }

  return {
    dropdownState: toRefs(state),
    onDropdown,
    hideDropdown,
    onSelect,
    setSelection,
  };
}
