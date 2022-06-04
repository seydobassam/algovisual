<template>
  <div
    @mousedown.prevent="onMouseDown(nodeProp)"
    @mouseenter.prevent="onMouseEnter(nodeProp)"
    @mouseleave.prevent="onMouseLeave(nodeProp)"
    @mouseup.prevent="onMouseUp()"
    class="node"
    v-bind:class="{
      'node-start': nodeProp.type === 'start',
      'node-finish': nodeProp.type === 'end',
      'node-block': nodeProp.type === 'block',
    }"
  ></div>
</template>

<script>
import node from "../modules/widget-mouldes/node.js";

export default {
  name: "node",
  emits: ["selectStartNode", "selectFinishNode"],
  props: {
    nodeProp: {
      type: [Object],
    },
  },

  setup() {
    const { onMouseDown, onMouseEnter, onMouseLeave, onMouseUp } = node();

    return { onMouseDown, onMouseEnter, onMouseLeave, onMouseUp };
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
  background-color: green;
}

.node-finish {
  background-color: red;
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
  background-color: rgb(12, 53, 71);
}

@keyframes visitedAnimation {
  0% {
    transform: scale(0.3);
    background-color: rgba(0, 0, 66, 0.75);
    border-radius: 100%;
  }

  50% {
    background-color: rgba(17, 104, 217, 0.75);
  }

  75% {
    transform: scale(1.2);
    background-color: rgba(0, 217, 159, 0.75);
  }

  100% {
    transform: scale(1);
    background-color: rgba(0, 190, 218, 0.75);
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
    transform: scale(0.6);
    background-color: rgb(255, 254, 106);
  }

  50% {
    transform: scale(1.2);
    background-color: rgb(255, 254, 106);
  }

  100% {
    transform: scale(1);
    background-color: rgb(255, 254, 106);
  }
}
</style>
