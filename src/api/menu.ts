import { ref } from "vue";

export const HeadMenuList = ref([
  {
    value: "index",
    to: "/",
    label: "首页",
    icon: "app",
  },
  {
    value: "research",
    to: "/research",
    label: "研究",
    icon: "command",
  },
]);

export const LeftMenuList = ref([
  {
    type: "group",
    title: "主导航",
    children: [
      {
        type: "item",
        value: "dashboard",
        label: "仪表盘",
        icon: "app",
      },
    ],
  },
  {
    type: "group",
    title: "研究",
    children: [
      {
        type: "submenu",
        value: "research-grid",
        label: "网格",
        icon: "code",
        children: [
          { type: "item", value: "/research/taobao", label: "淘宝首页" },
        ],
      },
      {
        type: "submenu",
        value: "research-chart",
        label: "图表",
        icon: "chart",
        children: [
          { type: "item", value: "/research/echarts", label: "Echarts" },
        ],
      },
    ],
  },
  {
    type: "group",
    title: "模仿",
    children: [
      {
        type: "submenu",
        value: "imitate-blog",
        label: "博客类",
        icon: "education",
        children: [{ type: "item", value: "/research/csdn", label: "CSDN" }],
      },
      {
        type: "submenu",
        value: "imitate-finance",
        label: "金融类",
        icon: "education",
        children: [
          { type: "item", value: "/research/tonghuasun", label: "同花顺" },
        ],
      },
    ],
  },
  {
    type: "group",
    title: "更多",
    children: [
      { type: "item", value: "/user", label: "个人页", icon: "user" },
      { type: "item", value: "/login", label: "登录页", icon: "login" },
      { type: "item", value: "/setting", label: "设置", icon: "setting" },
      {
        type: "item",
        value: "/research/about",
        label: "关于",
        icon: "info-circle",
      },
    ],
  },
]);
