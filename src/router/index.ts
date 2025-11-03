import { createRouter, createWebHistory,createWebHashHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
        { path: "dashboard", name: "research-dashboard", component: () => import("@/views/Research/DashboardView.vue"), },
        // 研究-网格-淘宝
        { path: "taobao", name: "research-taobao", component: () => import("@/views/Research/Grid/TaobaoIndex.vue"), },
        // 研究-图表-组件
        { path: "echarts", name: "research-echarts", component: () => import("@/views/Research/Charts/EchartsView.vue") },

        // 模仿-博客-CSDN
        { path: "csdn", name: "research-csdn", component: () => import("@/views/Research/Imitate/CSDNView.vue"), },
        // 模仿-博客-知乎
        { path: "zhihu", name: "research-zhihu", component: () => import("@/views/Research/Imitate/ZhiHuView.vue"), },
        // 模仿-金融-同花顺
        { path: "tonghuasun", name: "research-tonghuasun", component: () => import("@/views/Research/Imitate/TongHuaSunView.vue"), },
        // 模仿-电商-SuperBuy
        { path: "superbuy", name: "research-superbuy", component: () => import("@/views/Research/Imitate/SuperBuyView.vue"), },
        // 模仿-电商-BuckyDrop
        { path: "buckydrop", name: "research-buckydrop", component: () => import("@/views/Research/Imitate/BuckyDropView.vue"), },
        // 模仿-电商-咸鱼
        { path: "xianyu-home", name: "research-xianyu-home", component: () => import("@/views/Research/Imitate/XianYuHomeView.vue"), },
        // 模仿-电商-京东
        { path: "jd-home", name: "research-jd-home", component: () => import("@/views/Research/Imitate/JDHomeView.vue"), },
        // 模仿-电商-淘宝
        { path: "tabbao-home", name: "research-tabbao-home", component: () => import("@/views/Research/Imitate/TaoBaoHomeView.vue"), },
        // 模仿-金融-华尔街见闻
        { path: "wallstreetcn", name: "research-wallstreetcn", component: () => import("@/views/Research/Imitate/HuaErJieView.vue"), },
        // 模仿-金融-雪球网
        { path: "xueqiu", name: "research-xueqiu", component: () => import("@/views/Research/Imitate/XueQiuWangView.vue"), },
        // 工具-日常-待办事项
        { path: "todo", name: "research-todo", component: () => import("@/views/Research/Tools/ToDOView.vue"), },
        // 研究-关于
        { path: "about", name: "research-about", component: () => import("@/views/Research/AboutView.vue"), },
        // 模仿-音乐-QQPad
        { path: "qq-pad-music", name: "research-qq-pad-music", component: () => import("@/views/Research/Imitate/QQPadMusic.vue"), },
        // 模仿-音乐-酷狗Pad
        { path: "kugou-pad-music", name: "research-kugou-pad-music", component: () => import("@/views/Research/Imitate/KuGouPadMusic.vue"), },
        // 模仿-音乐-网易Pad
        { path: "netease-pad-music", name: "research-netease-pad-music", component: () => import("@/views/Research/Imitate/NetEasePadMusic.vue"), },
      ],
    },
    {
      path: "/game",
      name: "game",
      redirect: "/game/dashboard",
      component: () => import("@/views/Game/GameView.vue"),
      children: [
        // 游戏-主导航
        { path: "dashboard", name: "game-dashboard", component: () => import("@/views/Game/Dashboard.vue"), },
        // 游戏-益智-俄罗斯方块
        { path: "tetrominoes", name: "game-tetrominoes", component: () => import("@/views/Game/Puzzle/Tetrominoes.vue") },
        // 游戏-益智-五子棋
        { path: "gomoku", name: "game-gomoku", component: () => import("@/views/Game/Puzzle/Gomoku.vue") },
        // 游戏-益智-中国象棋
        { path: "chinesechess", name: "game-chinesechess", component: () => import("@/views/Game/Puzzle/ChineseChess.vue") },
        // 游戏-益智-消消乐
        { path: "match3", name: "game-match3", component: () => import("@/views/Game/Puzzle/Match3Game.vue") },
      ],
    }, {
      path: "/app",
      name: "readcloub",
      redirect: "/app/dashboard",
      component: () => import("@/views/Applications/ApplicationsView.vue"),
      children: [
        // 应用-主导航
        { path: "dashboard", name: "app-dashboard", component: () => import("@/views/Applications/Dashboard.vue"), },
        // 应用-读书会-打卡
        { path: "club-clockin", name: "app-club-clockin", component: () => import("@/views/Applications/ReadClub/ClockIn.vue"), },
        // 应用-读书会-打卡数据
        { path: "club-clockdashboard", name: "app-club-clockdashboard", component: () => import("@/views/Applications/ReadClub/ClockDashboard.vue"), },
      ],
    }, {
      path: "/science",
      name: "science",
      redirect: "/science/dashboard",
      component: () => import("@/views/Science/ScienceView.vue"),
      children: [
        // 应用-主导航
        { path: "dashboard", name: "science-dashboard", component: () => import("@/views/Science/Dashboard.vue"), },
      ],
    }, {
      path: "/economy",
      name: "economy",
      redirect: "/economy/dashboard",
      component: () => import("@/views/Economy/EconomyView.vue"),
      children: [
        // 应用-主导航
        { path: "dashboard", name: "economy-dashboard", component: () => import("@/views/Economy/Dashboard.vue"), },
      ],
    }, {
      path: "/history",
      name: "history",
      redirect: "/history/dashboard",
      component: () => import("@/views/History/HistoryView.vue"),
      children: [
        // 应用-主导航
        { path: "dashboard", name: "history-dashboard", component: () => import("@/views/History/Dashboard.vue"), },
      ],
    },
    { path: "/about", name: "about", component: () => import("@/views/AboutView.vue"), },
    { path: "/setting", name: "setting", component: () => import("@/views/Setting.vue"), },
    { path: "/user", name: "user", component: () => import("@/views/User.vue"), },
    { path: "/login", name: "login", component: () => import("@/views/Login.vue"), },
    { path: "/logout", name: "logout", component: () => import("@/views/Logout.vue"), },
  ],
});

export default router;
