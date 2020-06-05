//Vue
import Vue from 'vue'
import App from './App.vue'
//Enables popovers
import Popover from 'vue-js-popover'
Vue.use(Popover)
//Ionic
import Ionic from "@ionic/vue"
import "@ionic/core/css/core.css"
import "@ionic/core/css/ionic.bundle.css"
//Router
import router from "./router"
//Enables Cookies in Vue
var VueCookies = require('vue-cookies');
Vue.use(VueCookies);
Vue.$cookies.config('7d');
Vue.$cookies.set('theme','default');
Vue.$cookies.set('hover-time','1s');
//Enables SessionStorage in Vue
import VueSessionStorage from 'vue-sessionstorage'
Vue.use(VueSessionStorage)


Vue.config.productionTip = false;
Vue.use(Ionic);

// router
import { IonicVueRouter } from "@ionic/vue";
Vue.use(IonicVueRouter);



new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
