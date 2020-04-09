import Vue from 'vue'
import App from './App.vue'

import Ionic from "@ionic/vue"
import "@ionic/core/css/core.css"
import "@ionic/core/css/ionic.bundle.css"

import router from "./router"


Vue.config.productionTip = false;
Vue.use(Ionic);


// router
import { IonicVueRouter } from "@ionic/vue";
Vue.use(IonicVueRouter);



new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
