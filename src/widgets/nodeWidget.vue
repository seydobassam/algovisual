<template>
  <div
    @mousedown="onMouseDown(nodeProp, $event)"
    @mouseup="onMouseUp($event)"
    @mouseenter="onMouseEnter(nodeProp, $event)"
    @mouseleave="onMouseLeave(nodeProp, $event)"
    class="node"
    v-bind:class="{
      'node-start': nodeProp.type === 'start',
      'node-finish': nodeProp.type === 'end',
      'node-block': nodeProp.type === 'block',
    }"
  ></div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

// FIXME: Refactor below code
export default {
  name: "nodeWidget",
  props: {
    nodeProp: {
      type: [Object],
    },
  },

  setup() {
    const store = useStore();
    const isMouseEvent = computed(() => store.state.isMouseEvent);
    const currentNodeType = computed(() => store.state.selectedNodeType);

    function onMouseDown(node, event) {
      event.preventDefault();
      if (isMouseEvent.value === false) {
        store.commit("triggerMouse", true);
        store.commit("setSelectedNodeType", node.type);
        store.commit("onMouseDown", node);
      }
    }

    function onMouseEnter(node, event) {
      event.preventDefault();
      if (isMouseEvent.value) {
        store.commit("onMouseEnter", {currentNode: node, newType: currentNodeType.value});
      }
    }

    function onMouseLeave(pervNode, event) {
      event.preventDefault();
      if (isMouseEvent.value) {
        store.commit("onMouseLeave", pervNode);
      }
    }

    function onMouseUp(event) {
      event.preventDefault();
      store.commit("triggerMouse", false);
    }

    return { onMouseDown, onMouseUp, onMouseEnter, onMouseLeave };
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
