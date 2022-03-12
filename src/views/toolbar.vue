<template>
  <div class="topnav">
    <div class="title">Algovirtual</div>
    <Dropdown/>
  </div>
</template>

<script>
import Dropdown from "../widgets/dropdown.vue";

export default {
  name: "Toolbar",
  components: {
    Dropdown,
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

.title{
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 10px 20px;
  text-decoration: none;
  font-size: 27px;
}

.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #04aa6d;
  color: white;
}
</style>
