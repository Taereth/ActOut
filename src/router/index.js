import Vue from "vue";

import { IonicVueRouter } from "@ionic/vue";
Vue.use(IonicVueRouter);


export default new IonicVueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [

      { path: "/", redirect: "/home" },
      {
        path: "/home",
        name: "home",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/components/HomePage"),
      },
      {
        path: "/new-item",
        name: "new-item",
        component: () =>
          import(/* webpackChunkName: "new-item" */ "@/components/NewItemPage"),
      },
      {
        path: "/signup",
        name: "signup",
        component: () =>
          import(/* webpackChunkName: "new-item" */ "@/components/Register"),
      },
      {
        path: "/dashboard",
        name: "dashboard",
        component: () =>
          import(/* webpackChunkName: "new-item" */ "@/components/Dashboard"),
      },
      {
        path: "/profile",
        name: "profile",
        component: () =>
          import(/* webpackChunkName: "new-item" */ "@/components/Profile"),
      },

  ]
});
