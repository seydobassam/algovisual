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
          <div
            v-bind:class="{ 'disable-btn-pointer': isRunVirtualizeFreeze }"
            class="btn"
            @click="emitAlgorithmEvent()"
          >
            <div
              v-bind:class="{ fondo: !isRunVirtualizeFreeze }"
              class="disable-btn"
            ></div>
            <div class="icono" width="200" height="200">
              <div
                class="parte izquierda"
                x="0"
                y="0"
                width="200"
                height="200"
                fill="#fff"
              ></div>
              <div
                class="parte derecha"
                x="0"
                y="0"
                width="200"
                height="200"
                fill="#fff"
              ></div>
            </div>
          </div>
        </span>
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
      emitAlgorithmEvent,
    } = toolbar();

    setDropdownSelections(algorithmsTypes[0]);

    return {
      ...toolbarState,
      algorithmsTypes,
      toggleMobileMenu,
      setDropdownSelections,
      setAlgorthim,
      emitAlgorithmEvent,
    };
  },
};
</script>

<style scoped>
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
/* ----------------- */
.disable-btn-pointer {
  pointer-events: none;
}

.disable-btn {
  transition: 1s;
  background: goldenrod;
  height: 40px;
  width: 40px;
  position: absolute;
  border-radius: 50%;
  box-shadow: 0 1px 2.2px rgba(0, 0, 0, 0.051),
    0 2.3px 5.3px rgba(0, 0, 0, 0.059), 0 4.4px 10px rgba(0, 0, 0, 0.06),
    0 7.8px 17.9px rgba(0, 0, 0, 0.059), 0 14.6px 33.4px rgba(0, 0, 0, 0.059),
    0 35px 80px rgba(0, 0, 0, 0.07);
}

.btn {
  align-items: center;
  display: flex;
  justify-content: center;
  cursor: pointer;
}

.fondo {
  background: #09c372;
  border-radius: 50%;
  box-shadow: 0 1px 2.2px rgba(0, 0, 0, 0.051),
    0 2.3px 5.3px rgba(0, 0, 0, 0.059), 0 4.4px 10px rgba(0, 0, 0, 0.06),
    0 7.8px 17.9px rgba(0, 0, 0, 0.059), 0 14.6px 33.4px rgba(0, 0, 0, 0.059),
    0 35px 80px rgba(0, 0, 0, 0.07);
  height: 40px;
  width: 40px;
  position: absolute;
}

.icono {
  height: 65px;
  width: 65px;
  transform: rotate(-120deg);
}
.parte {
  background: white;
  height: 65px;
  width: 65px;
  position: absolute;
}

.izquierda {
  clip-path: polygon(
    43.77666% 55.85251%,
    43.77874% 55.46331%,
    43.7795% 55.09177%,
    43.77934% 54.74844%,
    43.77855% 54.44389%,
    43.77741% 54.18863%,
    43.77625% 53.99325%,
    43.77533% 53.86828%,
    43.77495% 53.82429%,
    43.77518% 53.55329%,
    43.7754% 53.2823%,
    43.77563% 53.01131%,
    43.77585% 52.74031%,
    43.77608% 52.46932%,
    43.7763% 52.19832%,
    43.77653% 51.92733%,
    43.77675% 51.65633%,
    43.77653% 51.38533%,
    43.7763% 51.11434%,
    43.77608% 50.84334%,
    43.77585% 50.57235%,
    43.77563% 50.30136%,
    43.7754% 50.03036%,
    43.77518% 49.75936%,
    43.77495% 49.48837%,
    44.48391% 49.4885%,
    45.19287% 49.48865%,
    45.90183% 49.48878%,
    46.61079% 49.48892%,
    47.31975% 49.48906%,
    48.0287% 49.4892%,
    48.73766% 49.48934%,
    49.44662% 49.48948%,
    50.72252% 49.48934%,
    51.99842% 49.4892%,
    53.27432% 49.48906%,
    54.55022% 49.48892%,
    55.82611% 49.48878%,
    57.10201% 49.48865%,
    58.3779% 49.4885%,
    59.6538% 49.48837%,
    59.57598% 49.89151%,
    59.31883% 50.28598%,
    58.84686% 50.70884%,
    58.12456% 51.19714%,
    57.11643% 51.78793%,
    55.78697% 52.51828%,
    54.10066% 53.42522%,
    52.02202% 54.54581%,
    49.96525% 55.66916%,
    48.3319% 56.57212%,
    47.06745% 57.27347%,
    46.11739% 57.79191%,
    45.42719% 58.14619%,
    44.94235% 58.35507%,
    44.60834% 58.43725%,
    44.37066% 58.41149%,
    44.15383% 58.27711%,
    43.99617% 58.0603%,
    43.88847% 57.77578%,
    43.82151% 57.43825%,
    43.78608% 57.06245%,
    43.77304% 56.66309%,
    43.773% 56.25486%
  );
}
.derecha {
  clip-path: polygon(
    43.77666% 43.83035%,
    43.77874% 44.21955%,
    43.7795% 44.59109%,
    43.77934% 44.93442%,
    43.77855% 45.23898%,
    43.77741% 45.49423%,
    43.77625% 45.68961%,
    43.77533% 45.81458%,
    43.77495% 45.85858%,
    43.77518% 46.12957%,
    43.7754% 46.40056%,
    43.77563% 46.67156%,
    43.77585% 46.94255%,
    43.77608% 47.21355%,
    43.7763% 47.48454%,
    43.77653% 47.75554%,
    43.77675% 48.02654%,
    43.77653% 48.29753%,
    43.7763% 48.56852%,
    43.77608% 48.83952%,
    43.77585% 49.11051%,
    43.77563% 49.38151%,
    43.7754% 49.65251%,
    43.77518% 49.9235%,
    43.77495% 50.1945%,
    44.48391% 50.19436%,
    45.19287% 50.19422%,
    45.90183% 50.19408%,
    46.61079% 50.19394%,
    47.31975% 50.1938%,
    48.0287% 50.19366%,
    48.73766% 50.19353%,
    49.44662% 50.19338%,
    50.72252% 50.19353%,
    51.99842% 50.19366%,
    53.27432% 50.1938%,
    54.55022% 50.19394%,
    55.82611% 50.19408%,
    57.10201% 50.19422%,
    58.3779% 50.19436%,
    59.6538% 50.1945%,
    59.57598% 49.79136%,
    59.31883% 49.39688%,
    58.84686% 48.97402%,
    58.12456% 48.48572%,
    57.11643% 47.89493%,
    55.78697% 47.16458%,
    54.10066% 46.25764%,
    52.02202% 45.13705%,
    49.96525% 44.01371%,
    48.3319% 43.11074%,
    47.06745% 42.4094%,
    46.11739% 41.89096%,
    45.42719% 41.53667%,
    44.94235% 41.3278%,
    44.60834% 41.24561%,
    44.37066% 41.27137%,
    44.15383% 41.40575%,
    43.99617% 41.62256%,
    43.88847% 41.90709%,
    43.82151% 42.24461%,
    43.78608% 42.62041%,
    43.77304% 43.01978%,
    43.773% 43.428%
  );
}
</style>
