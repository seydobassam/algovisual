import { createApp } from "vue";
import App from "./App.vue";
import { clickOutside } from "./directives/click-outside";

createApp(App).directive("click-outside", clickOutside).mount("#app");
