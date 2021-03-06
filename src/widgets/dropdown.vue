<template>
  <div class="dropdown-container" v-click-outside="() => hideDropdown()">
    <div class="sec-center">
      <input
        :checked="isChecked"
        class="dropdown"
        type="checkbox"
        name="dropdown"
      />
      <label
        @click="onDropdown()"
        class="for-dropdown"
        for="dropdown"
        v-bind:class="{ hover: isChecked }"
      >
        <div class="selection-name">{{ title ? title : selection.name }}</div>
        <i class="uil uil-arrow-down"></i>
      </label>
      <div
        class="section-dropdown"
        v-bind:class="{ 'section-display': isChecked }"
      >
        <a
          class="selection"
          v-for="(selectOption, index) in selections"
          :key="index"
          @click="onSelect(selectOption)"
          :class="{ 'active-selection': selectOption.id === selection.id }"
          >{{ selectOption.name }} <i class="uil uil-arrow-right"></i
        ></a>
      </div>
    </div>
  </div>
</template>

<script>
import dropdown from "../modules/widget-mouldes/dropdown";
import { watch } from "vue";

export default {
  name: "Dropdown",
  props: {
    title: {
      type: String,
    },
    selections: {
      type: [Object],
      required: true,
    },
    width: {
      type: String,
      default: "100%",
    },
    dropdownContentWidth: {
      type: String,
      default: "max-content",
    },
  },
  emits: ["select"],
  setup(props) {
    const { dropdownState, setSelection, onDropdown, hideDropdown, onSelect } =
      dropdown();

    watch(
      () => props.selections,
      (updatedProps) => {
        setSelection(updatedProps[0]);
      }
    );

    setSelection(props.selections[0]);

    return {
      ...dropdownState,
      onDropdown,
      hideDropdown,
      onSelect,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap");

.active-selection {
  color: #102770;
  background-color: #ffeba7;
}

.selection {
  float: left;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  margin: 5px;
}

.dropdown-container {
  display: flex;
}

.dropdown-container:hover {
  background-color: #ffeba7;
}

.dropdown-container:hover .selection-name {
  color: #102770;
}

.sec-center {
  position: relative;
  max-width: 100%;
  text-align: center;
  z-index: 200;
  width: 100%;
}
[type="checkbox"]:checked,
[type="checkbox"]:not(:checked) {
  position: absolute;
  left: -9999px;
  opacity: 0;
  pointer-events: none;
}
.dark-light:checked + label,
.dark-light:not(:checked) + label {
  position: fixed;
  top: 40px;
  right: 40px;
  z-index: 20000;
  display: block;
  border-radius: 50%;
  width: 46px;
  height: 46px;
  cursor: pointer;
  transition: all 100ms linear;
  box-shadow: 0 0 25px rgba(255, 235, 167, 0.45);
}
.dark-light:checked + label {
  transform: rotate(360deg);
}
.dark-light:checked + label:after,
.dark-light:not(:checked) + label:after {
  position: absolute;
  content: "";
  top: 1px;
  left: 1px;
  overflow: hidden;
  z-index: 2;
  display: block;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  background-color: #102770;
  background-image: url("https://assets.codepen.io/1462889/moon.svg");
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-position: center;
  transition: all 200ms linear;
  opacity: 0;
}
.dark-light:checked + label:after {
  opacity: 1;
}
.dark-light:checked + label:before,
.dark-light:not(:checked) + label:before {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 1;
  display: block;
  border-radius: 50%;
  width: 46px;
  height: 46px;
  background-color: #48dbfb;
  background-image: url("https://assets.codepen.io/1462889/sun.svg");
  background-size: 25px 25px;
  background-repeat: no-repeat;
  background-position: center;
  transition: all 200ms linear;
}
.dark-light:checked + label:before {
  background-color: #000;
}
.light-back {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: #fff;
  overflow: hidden;
  background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat-back.svg");
  background-position: center;
  background-repeat: repeat;
  background-size: 4%;
  height: 100%;
  width: 100%;
  transition: all 200ms linear;
  opacity: 0;
}
.dark-light:checked ~ .light-back {
  opacity: 1;
}
.dropdown:checked + label,
.dropdown:not(:checked) + label {
  position: relative;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 2;
  height: 50px;
  transition: all 200ms linear;
  width: v-bind(width);
  letter-spacing: 1px;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-align-items: center;
  -moz-align-items: center;
  -ms-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  -ms-justify-content: center;
  justify-content: center;
  -ms-flex-pack: center;
  text-align: center;
  border: none;
  cursor: pointer;
}

.dropdown:not(:checked) + label {
  color: white;
}

.hover {
  background-color: #ffeba7;
  color: #102770;
}

.dark-light:checked ~ .sec-center .for-dropdown {
  background-color: #102770;
  color: #ffeba7;
  box-shadow: 0 12px 35px 0 rgba(16, 39, 112, 0.25);
}

.section-dropdown {
  margin-top: 10px;
  position: absolute;
  background-color: #111;
  top: 60px;
  left: 0;
  width: v-bind(dropdownContentWidth);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 14px 35px 0 rgb(9 9 12 / 40%);
  z-index: 2;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-15px);
  transition: all 200ms linear;
}

.section-display {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}
.dark-light:checked ~ .sec-center .section-dropdown {
  background-color: #fff;
  box-shadow: 0 14px 35px 0 rgba(9, 9, 12, 0.15);
}
.section-dropdown:before {
  position: absolute;
  top: -20px;
  left: 0;
  width: 100%;
  height: 20px;
  content: "";
  display: block;
  z-index: 1;
}
.section-dropdown:after {
  position: absolute;
  top: -7px;
  left: 30px;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid #111;
  content: "";
  display: block;
  z-index: 2;
  transition: all 70ms linear;
}
.dark-light:checked ~ .sec-center .section-dropdown:after {
  border-bottom: 8px solid #fff;
}

a {
  position: relative;
  color: #fff;
  transition: all 200ms linear;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 15px;
  border-radius: 2px;
  padding: 5px 0;
  padding-left: 20px;
  padding-right: 15px;
  text-align: left;
  text-decoration: none;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -moz-align-items: center;
  -ms-align-items: center;
  align-items: center;
  justify-content: space-between;
  -ms-flex-pack: distribute;
}
.dark-light:checked ~ .sec-center .section-dropdown a {
  color: #102770;
}
a:hover {
  color: #102770;
  background-color: #ffeba7;
  cursor: pointer;
}
.dark-light:checked ~ .sec-center .section-dropdown a:hover {
  color: #ffeba7;
  background-color: #102770;
}
a .uil {
  font-size: 22px;
}
.dropdown-sub:checked + label,
.dropdown-sub:not(:checked) + label {
  position: relative;
  color: #fff;
  transition: all 200ms linear;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 15px;
  border-radius: 2px;
  padding: 5px 0;
  padding-left: 20px;
  padding-right: 15px;
  text-align: left;
  text-decoration: none;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -moz-align-items: center;
  -ms-align-items: center;
  align-items: center;
  justify-content: space-between;
  -ms-flex-pack: distribute;
  cursor: pointer;
}
.dropdown-sub:checked + label .uil,
.dropdown-sub:not(:checked) + label .uil {
  font-size: 22px;
}
.dropdown-sub:not(:checked) + label .uil {
  transition: transform 200ms linear;
}
.dropdown-sub:checked + label .uil {
  transform: rotate(135deg);
  transition: transform 200ms linear;
}
.dropdown-sub:checked + label:hover,
.dropdown-sub:not(:checked) + label:hover {
  color: #102770;
  background-color: #ffeba7;
}
.dark-light:checked ~ .sec-center .section-dropdown .for-dropdown-sub {
  color: #102770;
}
.dark-light:checked ~ .sec-center .section-dropdown .for-dropdown-sub:hover {
  color: #ffeba7;
  background-color: #102770;
}

.section-dropdown-sub {
  position: relative;
  display: block;
  width: 100%;
  pointer-events: none;
  opacity: 0;
  max-height: 0;
  padding-left: 10px;
  padding-right: 3px;
  overflow: hidden;
  transition: all 200ms linear;
}
.dropdown-sub:checked ~ .section-dropdown-sub {
  pointer-events: auto;
  opacity: 1;
  max-height: 999px;
}
.section-dropdown-sub a {
  font-size: 14px;
}
.section-dropdown-sub a .uil {
  font-size: 20px;
}
.dark-light:checked ~ .logo img {
  filter: brightness(10%);
}

@media screen and (max-width: 991px) {
  .dark-light:checked + label,
  .dark-light:not(:checked) + label {
    top: 20px;
    right: 20px;
  }
}
</style>
