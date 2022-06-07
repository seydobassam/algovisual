<template>
  <div
    class="node"
    v-bind:class="{
      'node-start': node.type === 'start',
      'node-finish': node.type === 'finish',
      'node-block': node.type === 'block',
      'node-visited': node.isAnimate,
      'node-shortest-path': node.isShortPath,
    }"
  ></div>
</template>

<script>
export default {
  name: "node",
  props: {
    node: {
      type: [Object],
    },
  },
};
</script>

<style>
.node {
  width: 30px;
  height: 30px;
  outline: 1px solid rgb(175, 216, 248);
}

.node-start {
  background-image: url("../assets/point.png");
  background-repeat: no-repeat;
}

.node-finish {
  background-image: url("../assets/city.png");
  background-repeat: no-repeat;
  background-position: center;
}

.node-visited {
  animation-name: visitedAnimation;
  animation-duration: 1.5s;
  animation-timing-function: ease-out;
  animation-delay: 0;
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-play-state: running;
}

.node-block {
  background-color: rgb(235, 83, 83);
}

@keyframes visitedAnimation {
  0% {
    transform: scale(0.4);
    background-color: rgb(61, 178, 255);
    border-radius: 20%;
  }

  75% {
    transform: scale(1.1);
    background-color: rgb(0, 168, 181);
  }

  100% {
    transform: scale(1);
    background-color: #ffeba7;
  }
}

.node-shortest-path {
  animation-name: shortestPath;
  animation-duration: 1.5s;
  animation-timing-function: ease-out;
  animation-delay: 0;
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-play-state: running;
}

@keyframes shortestPath {
  0% {
    transform: scale(0.3);
    background-color: #09c372;
    border-radius: 50%;
  }

  50% {
    transform: scale(1.2);

    background-color: rgb(255, 254, 106);
  }

  100% {
    transform: scale(1);
    background-color: #f9b4ab;
  }
}
</style>
