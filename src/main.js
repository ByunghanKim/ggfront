import Vue from 'vue'
import App from './App.vue'
import { store } from "./store";
import vuetify from './plugins/vuetify'
import router from "@/router";
import axios from "axios";

Vue.config.productionTip = false

Vue.prototype.$axios = axios;

new Vue({
  render: h => h(App),
  router,
  vuetify,
  store: store
}).$mount('#app')
