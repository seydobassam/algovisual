<template>
  <div class="topnav">
    <div class="title">Algovirtual</div>
    <div class="dropdown-container">
      <Dropdown
        class="dropdown"
        @select="setDropdownSelections($event)"
        :selections="algorithmsTypes"
        :width="'150px'"
      />
      <Dropdown
        class="dropdown"
        @select="setAlgorthim($event)"
        :selections="selectedAlgoType.algorithms"
        :width="'220px'"
      />
      <Dropdown
        class="dropdown"
        @select="setVirtualView($event)"
        :selections="selectedAlgoType.virtualViews"
        :width="'180px'"
      />
    </div>
  </div>
</template>

<script>
import toolbar from "../modules/views-modules/toolbar.js";
import Dropdown from "../widgets/dropdown.vue";
import { dropdownData } from "../data/dropdownData.js";

export default {
  name: "Toolbar",
  components: {
    Dropdown,
  },
  setup() {
    const algorithmsTypes = dropdownData;
    const { toolbarState, setDropdownSelections, setAlgorthim, setVirtualView } = toolbar();

    setDropdownSelections(algorithmsTypes[0]);

    return {
      ...toolbarState,
      algorithmsTypes,
      setDropdownSelections,
      setAlgorthim,
      setVirtualView,
    };
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.topnav {
  background-color: #333;
  height: 60px;
  display: flex;
  align-items: center;
}

.title {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 10px 20px;
  text-decoration: none;
  font-size: 27px;
}

.dropdown-container {
  display: flex;
}

.dropdown-container .Dropdown {
  margin-left: 10px;
}

.dropdown {
  margin-left: 10px;
}
</style>
