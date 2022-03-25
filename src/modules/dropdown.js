import { toRefs, reactive } from "@vue/reactivity";
import { getCurrentInstance } from "vue";

export default function dropdown() {
  const { emit } = getCurrentInstance();

  const state = reactive({
    isChecked: false,
    selectedId: Boolean,
  });

  function onDropdown() {
    state.isChecked = !state.isChecked;
  }

  function closeDropdown() {
    state.isChecked = false;
  }

  function onSelect(selection) {
    setSelectedId(selection);
    closeDropdown();
    emit("select", selection);
  }

  function setSelectedId(selection) {
    if (selection && selection.id !== state.selectedId) {
      state.selectedId = selection.id;
    }
  }

  return {
    dropdownState: toRefs(state),
    onDropdown,
    closeDropdown,
    onSelect,
    setSelectedId,
  };
}
