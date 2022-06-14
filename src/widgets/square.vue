<template>
  <div
    class="square"
    :class="{
      'middle-square': square.isMid,
      'discard-square': square.isDiscard,
      'found-square': square.isFound,
    }"
  >
    <span
      :class="{
        strike: square.isDiscard,
      }"
      >{{ square.value }}</span
    >
  </div>
</template>

<script>
import Square from "../models/square-model";

export default {
  name: "Square",
  props: {
    square: {
      type: Square,
    },
  },
};
</script>

<style scoped>
.square-index {
  text-align: center;
}

.square {
  height: 125px;
  width: 125px;
  font-size: larger;
  color: white;
  background-color: rgb(77, 77, 77);
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.min {
  background-color: blueviolet;
}

.max {
  background-color: brown;
}

.mid {
  background-color: green;
}

.leaved {
  background-color: #dddddd;
  color: red;
}

.selected {
  background-color: cornflowerblue;
}

.found {
  background-color: chocolate;
}

.strike {
  color: red;
  position: relative;
  display: inline-block;
}

.strike::before {
  content: "";
  border-bottom: 2px solid red;
  width: 110%;
  position: absolute;
  left: -2px;
  top: 46%;
}

.middle-square {
  animation-name: middleSqaure;
  animation-duration: 1.5s;
  animation-timing-function: ease-out;
  animation-delay: 0;
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-play-state: running;
}

@keyframes middleSqaure {
  0% {
    transform: scale(1);
    background-color: rgb(61, 178, 255);
    border-radius: 20%;
  }

  100% {
    transform: scale(1.1);
    background-color: rgb(61, 178, 255);
  }
}

.found-square {
  animation-name: foundSquare;
  animation-duration: 1.5s;
  animation-timing-function: ease-out;
  animation-delay: 0;
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-play-state: running;
}

@keyframes foundSquare {
  0% {
    transform: scale(1.1);
    background-color: rgb(61, 178, 255);
  }

  20% {
    transform: scale(0.3);
    background-color: rgb(61, 178, 255);
  }

  50% {
    background-color: green;
    transform: scale(1.1);
  }

  100% {
    background-color: green;
    transform: scale(1.1);
  }
}

.discard-square {
  animation-name: discardSquare;
  animation-duration: 900ms;
  animation-timing-function: ease-in;
  animation-delay: 0;
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-play-state: running;
}

@keyframes discardSquare {
  0% {
    transform: scale(1);
    background-color: #dddddd;
    border-radius: 20%;
  }

  100% {
    transform: scale(0.9);
    background-color: #dddddd;
  }
}



.square:hover {
  cursor: pointer;
  background-color: aqua;
}
</style>
