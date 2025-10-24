import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 首页
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    // 研究
    {
      path: "/research",
      name: "research",
      redirect: "/research/dashboard",
      component: () => import("@/views/Research/ResearchView.vue"),
      children: [
        // 主导航
        {
          path: "dashboard",
          name: "research-dashboard",
          component: () => import("@/views/Research/DashboardView.vue"),
        },
        // 研究-网格
        {
          path: "taobao",
          name: "research-taobao",
          component: () => import("@/views/Research/Grid/TaobaoIndex.vue"),
        },
        // 研究-图表
        {
          path: "echarts",
          name: "research-echarts",
          component: () => import("@/views/Research/Charts/EchartsView.vue"),
        },
        // 研究-关于
        {
          path: "about",
          name: "research-about",
          component: () => import("@/views/Research/AboutView.vue"),
        },
        // 模仿-CSDN
        {
          path: "csdn",
          name: "research-csdn",
          component: () => import("@/views/Research/Imitate/CSDNView.vue"),
        },
        // 模仿-同花顺
        {
          path: "tonghuasun",
          name: "research-tonghuasun",
          component: () =>
            import("@/views/Research/Imitate/TongHuaSunView.vue"),
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
    {
      path: "/logout",
      name: "logout",
      component: () => import("@/views/Logout.vue"),
    },
  ],
});

export default router;
