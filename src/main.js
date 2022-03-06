import 'vuetify/styles' // Global CSS has to be imported
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import App from './App.vue'
import store from './store/store'

const vuetify = createVuetify() // Replaces new Vuetify(...)

createApp(App)
  .use(vuetify)
  .use(store)
  .mount('#app')