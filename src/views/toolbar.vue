<template>
  <header>
    <div class="title"><a href="/">Algovirtual</a></div>
    <nav>
      <ul>
        <span>
          <Dropdown
            class="dropdown"
            @select="setDropdownSelections($event)"
            :selections="algorithmsTypes"
            :width="'150px'"
        /></span>
        <span
          ><Dropdown
            class="dropdown"
            @select="setAlgorthim($event)"
            :selections="selectedAlgoType.algorithms"
            :width="'220px'"
        /></span>
        <span>
          <Dropdown
            class="dropdown"
            @select="setVirtualView($event)"
            :selections="selectedAlgoType.virtualViews"
            :width="'180px'"
        /></span>
      </ul>
    </nav>
    <div
      class="hamburger"
      :class="['hamburger-icon', { open: isMobileMenuOpen }]"
      @click.prevent="toggleMobileMenu()"
    >
      <div class="bar1 hamburger"></div>
      <div class="bar2 hamburger"></div>
      <div class="bar3 hamburger"></div>
    </div>
    <ul v-if="isMobileMenuOpen" class="mobile-menu-container">
      <div class="mobile-menu">
        <span class="span1">
          <Dropdown
            class="dropdown"
            @select="setDropdownSelections($event)"
            :selections="algorithmsTypes"
            :dropdownContentWidth="'100%'"
        /></span>
        <span class="span2">
          <Dropdown
            class="dropdown"
            @select="setAlgorthim($event)"
            :selections="selectedAlgoType.algorithms"
            :dropdownContentWidth="'100%'"
        /></span>
        <span class="span3">
          <Dropdown
            class="dropdown"
            @select="setVirtualView($event)"
            :selections="selectedAlgoType.virtualViews"
            :dropdownContentWidth="'100%'"
        /></span>
      </div>
    </ul>
  </header>
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
    const {
      toolbarState,
      toggleMobileMenu,
      setDropdownSelections,
      setAlgorthim,
      setVirtualView,
    } = toolbar();

    setDropdownSelections(algorithmsTypes[0]);

    return {
      ...toolbarState,
      algorithmsTypes,
      toggleMobileMenu,
      setDropdownSelections,
      setAlgorthim,
      setVirtualView,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap");

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  background-color: #353836;
  color: white;
  font-family: "Poppins", sans-serif;
}

header {
  padding: 0 20px;
  background-color: #1d1f1d;
  height: 50px;
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 300;
}

.title {
  font-weight: bold;
  font-size: 27px;
  display: flex;
  align-items: center;
}

.title a {
  text-decoration: none;
  color: #09c372;
}

ul {
  list-style: none;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

ul span {
  padding: 5px;
  margin-left: 10px;
}

ul a {
  color: white;
}

.hamburger-icon {
  margin: auto 0;
  display: none;
  cursor: pointer;
}

.hamburger-icon .hamburger {
  width: 35px;
  height: 3px;
  background-color: white;
  margin: 6px 0;
  transition: 0.4s;
}

.open .bar1 {
  -webkit-transform: rotate(-45deg) translate(-6px, 6px);
  transform: rotate(-45deg) translate(-6px, 6px);
}

.open .bar2 {
  opacity: 0;
}

.open .bar3 {
  -webkit-transform: rotate(45deg) translate(-6px, -8px);
  transform: rotate(45deg) translate(-6px, -8px);
}

.mobile-menu-container {
  z-index: 200;
  position: absolute;
  top: 50px;
  left: 0;
  height: calc(100vh - 50px);
  width: 100%;
  background-color: #1d1f1d;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.mobile-menu {
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.mobile-menu span {
  margin-bottom: 10px;
  width: 100%;
  margin-left: 0px;
}

.mobile-menu > span {
  position: relative;
  z-index: 100;
}

.mobile-menu > span ~ span {
  position: relative;
  z-index: 99;
}

.mobile-menu > span ~ span ~ span {
  position: relative;
  z-index: 98;
}

@media only screen and (max-width: 800px) {
  header nav {
    display: none;
  }

  .hamburger-icon {
    display: block;
  }
}

@media only screen and (min-width: 800px) {
  header nav {
    display: block;
  }

  .hamburger-icon {
    display: none;
  }

  .mobile-menu-container {
    display: none;
  }

  .mobile-menu {
    display: none;
  }
}
</style>
