import Vue from "vue";

import { IonicVueRouter } from "@ionic/vue";
Vue.use(IonicVueRouter);


let router = new IonicVueRouter({
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
        path: "/profiles/:id",
        name: "profiles",
        component: () =>
          import(/* webpackChunkName: "new-item" */ "@/components/Profile"),
      },
      {
        path: "/profiles/:id/edit",
        name: "editProfile",
        component: () =>
          import(/* webpackChunkName: "new-item" */ "@/components/Edit_Profile"),
        meta: {
                requiresAuth: true
            }
      },
      {
        path: "/profiles/:id/friends",
        name: "friends",
        component: () =>
          import(/* webpackChunkName: "new-item" */ "@/components/Friends"),
        meta: {
                requiresAuth: true
            }
      },
      {
        path: "/profiles/:id/projects",
        name: "projects",
        component: () =>
          import(/* webpackChunkName: "new-item" */ "@/components/ProjectSummary"),
        meta: {
                requiresAuth: true
            }
      },
      {
        path: "/projects/:id",
        name: "project",
        component: () =>
          import(/* webpackChunkName: "new-item" */ "@/components/Project"),
        meta: {
                requiresAuth: true
            }
      },
      {
        path: "/searchprojects",
        name: "searchprojects",
        component: () =>
          import(/* webpackChunkName: "new-item" */ "@/components/AllProjects"),
        meta: {
                requiresAuth: true
            }
      },

  ]
});

//Only allow people with Authentication to access routes with the requiresAuth metatag

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (sessionStorage.getItem("User") == null) {
          console.log("No Auth");
            next({
                path: '/home',
                params: { nextUrl: to.fullPath }
            })
        }
        else {

            next()
        }
    }
    else {

        next()
    }
})

export default router;
