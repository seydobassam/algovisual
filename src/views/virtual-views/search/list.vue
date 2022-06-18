<template>
  <div class="list-details-container">
    <div class="list-details" v-bind:style="{ width: getListWidth() + 'px'}">
      <div>
        <img src="../../../assets/list/squares/sem-middle-square.png" />
        <span>Start / Jump / Middle Square</span>
      </div>
      <div>
        <img src="../../../assets/list/squares/discard-square.png" />
        <span>Discard Square</span>
      </div>
      <div>
        <img src="../../../assets/list/squares/selected-square.png" />
        <span>Selected Square</span>
      </div>
      <div>
        <img src="../../../assets/list/squares/unvisited-square.png" />
        <span>Unvisited Square</span>
      </div>
      <div>
        <img src="../../../assets/list/squares/found-square.png" />
        <span>Found Square</span>
      </div>
      <div>
        <button
          @click="resetList"
          :class="[isFreeze === true ? 'disable-button' : 'btn-10']"
        >
          Reset List
        </button>
        <button
          @click="newList"
          :class="[isFreeze === true ? 'disable-button' : 'btn-10']"
        >
          New List
        </button>
      </div>
    </div>
  </div>
  <div class="list-container">
    <div class="list-view">
      <div class="view" v-bind:style="{ width: getListWidth() + 'px', height: getListHeight() + 'px'}">
        <div class="list-info">
          <div v-show="left !== null" class="info">
            Min = <span>{{ left }}</span>
          </div>
          <div v-show="start !== null" class="info">
            Start At = <span>{{ start }}</span>
          </div>
          <div v-show="middle !== null" class="info">
            Middle = <span>{{ middle }}</span>
          </div>
          <div v-show="jump !== null" class="info">
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
              <Square
                @click="selectSquare(square)"
                class="list-item"
                :square="square"
                :selected-square="selectedSquare"
              />
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
    const { squareListsState, resetList, newList, selectSquare, getListWidth, getListHeight } =
      searchList();

    return {
      ...squareListsState,
      resetList,
      newList,
      selectSquare,
      getListWidth,
      getListHeight
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap");

.list-details-container {
  width: 100;
  display: flex;
  justify-content: center;
  margin-top: 1%;
}

.list-details {
  width: 1632px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.list-details :first-of-type {
  margin-left: 10px;
}

.list-details > div {
  display: flex;
  align-items: center;
}

.list-details > div > span {
  font-family: "Roboto", sans-serif;
  font-weight: 450;
  font-size: 17px;
  margin-left: 13px;
}

button {
  margin: 20px;
  outline: none;
}

.disable-button {
  cursor: not-allowed;
  pointer-events: none;
  transition: 1s;
  border: 3px solid goldenrod;
  font-family: "Lato", sans-serif;
  width: 130px;
  height: 40px;
  cursor: pointer;
  background-color: goldenrod;
  color: #dddddd;
  font-weight: bold;
  border-radius: 3px;
}

.btn-10 {
  border-radius: 3px;
  transition: 1s;
  border: 3px solid #1d1f1d;
  font-family: "Lato", sans-serif;
  width: 130px;
  height: 40px;
  cursor: pointer;
  background: #1d1f1d;
  color: white;
  font-weight: bold;
}
.btn-10:hover {
  color: #ffeba7;
  font-weight: bold;
}

.list-container {
  margin-top: 1.5%;
  margin-bottom: 2%;
  overflow-x: auto;
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
  grid-template-columns: repeat(auto-fit, minmax(min(130px, 100%), 1fr));
  grid-gap: 15px;
  grid-auto-flow: dense;
}

@media only screen and (max-width: 1500px) {
  .list-details > div > span {
    font-size: 15px;
  }
  .btn-10 {
    width: 115px;
    height: 40px;
  }
}
</style>
