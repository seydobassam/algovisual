<template>
  <div class="list-container">
    <div class="list-view">
      <div class="view" v-bind:style="{ width: getListWidth() + 'px' }">
        <div class="list-info">
          <div v-show="left !== null" class="info">
            Min = <span>{{ left }}</span>
          </div>
          <div v-show="middle !== null" class="info">
            Middle = <span>{{ middle }}</span>
          </div>
           <div v-show="jump !== null" class="info-found">
            Jump At = <span>{{ jump }}</span>
          </div>
          <div v-show="right !== null" class="info">
            High = <span>{{ right }}</span>
          </div>
          <div v-show="foundAt !== null" class="info-found">
            Found At = <span>{{ foundAt }}</span>
          </div>
        </div>
        <div class="square-list-container">
          <div class="list">
            <td v-for="(square, index) in squareList" :key="index">
              <Square class="list-item" :square="square" />
            </td>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Square from "../../../widgets/square.vue";
import searchList from "../../../modules/views-modules/virtual-view-modules/searchList";

export default {
  name: "List",
  components: {
    Square,
  },

  setup() {
    const { squareListsState, getListWidth } = searchList();

    return { ...squareListsState, getListWidth };
  },
};
</script>

<style>
.list-container {
  margin-top: 0.5%;
  overflow-x: auto;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.list-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.list-info {
  display: flex;
  justify-content: space-around;
}

.list-info > .info ~ .info {
  margin-left: 10%;
}

.info-found {
  margin-left: 10%;
  font-size: larger;
  color: black;
  -webkit-animation: fadein 3s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 3s; /* Firefox < 16 */
  -ms-animation: fadein 3s; /* Internet Explorer */
  -o-animation: fadein 3s; /* Opera < 12.1 */
  animation: fadein 3s;
}

.info {
  font-size: larger;
  color: black;
  -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 2s; /* Firefox < 16 */
  -ms-animation: fadein 2s; /* Internet Explorer */
  -o-animation: fadein 2s; /* Opera < 12.1 */
  animation: fadein 2s;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Firefox < 16 */
@-moz-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Internet Explorer */
@-ms-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.info-found > span {
  color: #09c372;
}

.info > span {
  color: cornflowerblue;
}

.square-list-container {
  margin-top: 15px;
  border-style: solid;
  border-color: #333;
}

.list {
  margin: 10px;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(auto-fit, minmax(min(125px, 100%), 1fr));
  grid-gap: 15px;
  grid-auto-flow: dense;
}
</style>
