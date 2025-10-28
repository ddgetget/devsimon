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
        // 研究-网格-淘宝
        {
          path: "taobao",
          name: "research-taobao",
          component: () => import("@/views/Research/Grid/TaobaoIndex.vue"),
        },
        // 研究-图表-组件
        {
          path: "echarts",
          name: "research-echarts",
          component: () => import("@/views/Research/Charts/EchartsView.vue"),
        },

        // 模仿-博客-CSDN
        {
          path: "csdn",
          name: "research-csdn",
          component: () => import("@/views/Research/Imitate/CSDNView.vue"),
        },
        // 模仿-博客-知乎
        {
          path: "zhihu",
          name: "research-zhihu",
          component: () => import("@/views/Research/Imitate/ZhiHuView.vue"),
        },
        // 模仿-金融-同花顺
        {
          path: "tonghuasun",
          name: "research-tonghuasun",
          component: () =>
            import("@/views/Research/Imitate/TongHuaSunView.vue"),
        },
        // 模仿-电商-SuperBuy
        {
          path: "superbuy",
          name: "research-superbuy",
          component: () => import("@/views/Research/Imitate/SuperBuyView.vue"),
        },
        // 模仿-电商-BuckyDrop
        {
          path: "buckydrop",
          name: "research-buckydrop",
          component: () => import("@/views/Research/Imitate/BuckyDropView.vue"),
        },
        // 模仿-电商-咸鱼
        {
          path: "xianyu",
          name: "research-xianyu",
          component: () => import("@/views/Research/Imitate/XianYuView.vue"),
        },
        // 模仿-电商-京东
        {
          path: "jd",
          name: "research-jd",
          component: () => import("@/views/Research/Imitate/JDView.vue"),
        },
        // 模仿-电商-淘宝
        {
          path: "tabbao",
          name: "research-tabbao",
          component: () => import("@/views/Research/Imitate/TaoBaoView.vue"),
        },
        // 模仿-金融-华尔街见闻
        {
          path: "wallstreetcn",
          name: "research-wallstreetcn",
          component: () => import("@/views/Research/Imitate/HuaErJieView.vue"),
        },
        // 模仿-金融-雪球网
        {
          path: "xueqiu",
          name: "research-xueqiu",
          component: () =>
            import("@/views/Research/Imitate/XueQiuWangView.vue"),
        },
        // 工具-日常-待办事项
        {
          path: "todo",
          name: "research-todo",
          component: () => import("@/views/Research/Tools/ToDOView.vue"),
        },
        // 研究-关于
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
    {
      path: "/logout",
      name: "logout",
      component: () => import("@/views/Logout.vue"),
    },
  ],
});

export default router;
