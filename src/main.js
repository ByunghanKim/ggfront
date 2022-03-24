import Vue from 'vue'
import App from './App.vue'
import { store } from "./store/store";
import vuetify from './plugins/vuetify'
import router from "@/router";
import axios from "axios";
import VueAuthImage from "vue-auth-image";

Vue.config.productionTip = false

Vue.prototype.$axios = axios;

Vue.use(VueAuthImage);

new Vue({
  render: h => h(App),
  router,
  vuetify,
  store: store,
}).$mount('#app')