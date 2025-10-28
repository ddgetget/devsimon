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
        value: "grid",
        label: "网格",
        icon: "code",
        children: [
          { type: "item", value: "/research/taobao", label: "淘宝首页" },
        ],
      },
      {
        type: "submenu",
        value: "chart",
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
        value: "blog",
        label: "博客类",
        icon: "education",
        children: [
          { type: "item", value: "/research/csdn", label: "CSDN" },
          { type: "item", value: "/research/zhihu", label: "知乎" },
        ],
      },
      {
        type: "submenu",
        value: "finance",
        label: "金融类",
        icon: "education",
        children: [
          { type: "item", value: "/research/tonghuasun", label: "同花顺" },
          {
            type: "item",
            value: "/research/wallstreetcn",
            label: "华尔街见闻",
          },
          {
            type: "item",
            value: "/research/xueqiu",
            label: "雪球网",
          },
        ],
      },
      {
        type: "submenu",
        value: "ecommerce",
        label: "电商类",
        icon: "education",
        children: [
          { type: "item", value: "/research/superbuy", label: "SuperBuy" },
          { type: "item", value: "/research/buckydrop", label: "BuckyDrop" },
          { type: "item", value: "/research/xianyu", label: "咸鱼" },
          { type: "item", value: "/research/jd", label: "京东" },
          { type: "item", value: "/research/tabbao", label: "淘宝" },
        ],
      },
    ],
  },
  {
    type: "group",
    title: "工具",
    children: [
      {
        type: "submenu",
        value: "tools",
        label: "日常",
        icon: "education",
        children: [
          { type: "item", value: "/research/todo", label: "待办事项" },
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
