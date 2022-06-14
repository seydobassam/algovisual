<template>
  <div
    class="square"
    :class="{
      'middle-square':
        square.type === 'middle' ||
        square.type === 'left' ||
        square.type === 'jump',
      'discard-square': square.type === 'discard',
      'found-square': square.type === 'found',
    }"
  >
    <span
      :class="{
        strike: square.type === 'discard',
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
  height: 100px;
  width: 100px;
  font-size: larger;
  color: white;
  background-color: rgb(77, 77, 77);
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.selected {
  background-color: cornflowerblue;
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
    background-color: #ffeba7;
    border-radius: 20%;
    color: black;
  }

  100% {
    transform: scale(1.1);
    background-color: #ffeba7;
    color: black;
  }
}

.found-square {
  animation-name: foundSquare;
  animation-duration: 2.5s;
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
    background-color: #ffeba7;
  }

  20% {
    transform: scale(0.3);
    background-color: #ffeba7;
  }

  50% {
    background-color: #09c372;
    transform: scale(1.1);
  }

  100% {
    background-color: #09c372;
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
