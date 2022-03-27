<template>
  <div class="topnav">
    <div class="title">Algovirtual</div>
    <div class="dropdown-container">
      <Dropdown
        class="dropdown"
        @select="setAlgoType($event)"
        :title="selectedAlgoType.name"
        :selections="algorithmsTypes"
        :width="'150px'"
      />
      <Dropdown
        class="dropdown"
        @select="setAlgo($event)"
        :title="selectedAlgo.name"
        :selections="selectedAlgoType.algorithms"
        :width="'220px'"
      />
      <Dropdown
        class="dropdown"
        @select="setView($event)"
        :title="selectedView.name"
        :selections="selectedAlgoType.virtualViews"
        :width="'180px'"
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
