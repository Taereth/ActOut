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
          meta: {
                  requiresAuth: true
              }
      },
      {
        path: "/profiles/:id",
        name: "profiles",
        component: () =>
          import(/* webpackChunkName: "new-item" */ "@/components/Profile"),
          meta: {
                  requiresAuth: true
              }
      },
      {
        path: "/edit",
        name: "editProfile",
        component: () =>
          import(/* webpackChunkName: "new-item" */ "@/components/Edit_Profile"),
        meta: {
                requiresAuth: true
            }
      },
      {
        path: "/skills",
        name: "skills",
        component: () =>
          import(/* webpackChunkName: "new-item" */ "@/components/Skills"),
        meta: {
                requiresAuth: true
            }
      },
      {
        path: "/previousexperiences",
        name: "previousexperiences",
        component: () =>
          import(/* webpackChunkName: "new-item" */ "@/components/PreviousExperiences"),
        meta: {
                requiresAuth: true
            }
      },
      {
        path: "/description",
        name: "description",
        component: () =>
          import(/* webpackChunkName: "new-item" */ "@/components/Description"),
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
      {
        path: "/searchusers",
        name: "searchusers",
        component: () =>
          import(/* webpackChunkName: "new-item" */ "@/components/AllUsers"),
        meta: {
                requiresAuth: true
            }
      },
      {
        path: "/chats",
        name: "chats",
        component: () =>
          import(/* webpackChunkName: "new-item" */ "@/components/Chats"),
        meta: {
                requiresAuth: true
            }
      },
      {
        path: "/updates",
        name: "updates",
        component: () =>
          import(/* webpackChunkName: "new-item" */ "@/components/Updates"),
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

//Counter Navigation Duplicate Error

const originalPush = router.push;
router.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

export default router;
