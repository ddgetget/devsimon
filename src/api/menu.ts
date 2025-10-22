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
        value: "/research/dashboard",
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
          { type: "item", value: "/research/menu/tag", label: "标签管理" },
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
        // value: "/buckydrop",
        label: "博客类",
        icon: "education",
        children: [
          { type: "item", value: "/research/menu/bdquick", label: "BD快捷" },
        ],
      },
      {
        type: "submenu",
        value: "/buckydrop",
        label: "金融类",
        icon: "education",
        children: [
          { type: "item", value: "/research/menu/bdquick", label: "BD快捷" },
        ],
      },
    ],
  },
  {
    type: "group",
    title: "更多",
    children: [
      {
        type: "item",
        value: "/user",
        label: "个人页",
        icon: "user",
      },
      {
        type: "item",
        value: "/login",
        label: "登录页",
        icon: "login",
      },
      {
        type: "item",
        value: "/setting",
        label: "设置",
        icon: "setting",
      },
      {
        type: "item",
        value: "/research/about",
        label: "关于",
        icon: "info-circle",
      },
    ],
  },
]);
