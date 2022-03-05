<template>
  <div class="grid-container">
    <div class="grid">
      <tr v-for="(record, rowIndex) in gridData" :key="rowIndex">
        <td v-for="(col, index) in record" :key="index">
          <NodeWidget :nodeProp="col"> </NodeWidget>
        </td>
      </tr>
    </div>
  </div>
</template>

<script>
import NodeWidget from "../widgets/nodeWidget.vue";
import {useStore} from "vuex";
import {computed} from '@vue/runtime-core';
import {onMounted} from 'vue'


export default {
  name: "GridView",
  components: {
    NodeWidget,
  },

  setup() {
    const store = useStore();
    const gridData = computed(()=> store.state.gridData);

    onMounted(() => {
      store.commit('createGrid');
    })

    return {gridData}
  },
};
</script>

<style>
.grid-container {
  display: flex;
  justify-content: center;
}

.grid {
  margin: 100px 0 0;
}
</style>
