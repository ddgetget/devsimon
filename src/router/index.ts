import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/research",
      name: "research",
      redirect: "/research/dashboard",
      component: () => import("@/views/Research/ResearchView.vue"),
      children: [
        {
          path: "dashboard",
          name: "research-dashboard",
          component: () => import("@/views/Research/DashboardView.vue"),
        },
        {
          path: "taobao",
          name: "research-taobao",
          component: () => import("@/views/Research/grid/TaobaoIndex.vue"),
        },
        {
          path: "about",
          name: "research-about",
          component: () => import("@/views/Research/AboutView.vue"),
        },
      ],
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/AboutView.vue"),
    },
    {
      path: "/setting",
      name: "setting",
      component: () => import("@/views/Setting.vue"),
    },
    {
      path: "/user",
      name: "user",
      component: () => import("@/views/User.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue"),
    },
  ],
});

export default router;
