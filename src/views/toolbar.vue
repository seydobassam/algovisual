<template>
  <div class="topnav">
    <div class="title">Algovirtual</div>
    <div class="dropdown-container">
      <Dropdown
        @select="setAlgoType($event)"
        :title="'Algorithm Types '"
        :selections="algorithmsTypes"
      />
      <Dropdown
        @select="setAlgo($event)"
        :title="'Algorithms'"
        :selections="algoTypeSelection.algorithms"
      />
      <Dropdown
        @select="setView($event)"
        :title="'Views'"
        :selections="algoTypeSelection.virtualViews"
      />
    </div>
  </div>
</template>

<script>
import toolbar from "../modules/toolbar";
import Dropdown from "../widgets/dropdown.vue";
import { dropdownData } from "../data/dropdownData";

export default {
  name: "Toolbar",
  components: {
    Dropdown,
  },
  setup() {
    const algorithmsTypes = dropdownData;
    const { toolbarState, setAlgoType, setAlgo, setView } = toolbar();

    // set First algorithm type object
    setAlgoType(algorithmsTypes[0]);

    return {
      ...toolbarState,
      algorithmsTypes,
      setAlgoType,
      setAlgo,
      setView,
      close,
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
</style>
