import { ref } from "vue";

export const HeadMenuList = ref([
  { value: "index", to: "/", label: "首页", icon: "home", },
  { value: "research", to: "/research", label: "研究", icon: "command", },
  { value: "game", to: "/game", label: "游戏", icon: "gamepad", },
  { value: "application", to: "/app", label: "应用", icon: "app", },
  { value: "economy", to: "/economy", label: "经济政治", icon: "wallet", },
  { value: "science", to: "/science", label: "理学科技", icon: "system-sum", },
  { value: "history", to: "/history", label: "历史研究", icon: "history", },
]);

export const LeftResearchMenuList = ref([
  {
    type: "group",
    title: "主导航",
    children: [
      { type: "item", value: "dashboard", label: "仪表盘", icon: "app", },
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
          { type: "item", value: "/research/wallstreetcn", label: "华尔街见闻" },
          { type: "item", value: "/research/xueqiu", label: "雪球网" },
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
          { type: "item", value: "/research/xianyu-home", label: "咸鱼" },
          { type: "item", value: "/research/jd-home", label: "京东" },
          { type: "item", value: "/research/tabbao-home", label: "淘宝" },
        ],
      }, {
        type: "submenu",
        value: "music",
        label: "音乐类",
        icon: "education",
        children: [
          { type: "item", value: "/research/qq-pad-music", label: "QQPad" },
          { type: "item", value: "/research/kugou-pad-music", label: "酷狗Pad" },
          { type: "item", value: "/research/netease-pad-music", label: "网易Pad" },
        ],
      }
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


export const LeftGameMenuList = ref([
  {
    type: "group",
    title: "主导航",
    children: [
      { type: "item", value: "dashboard", label: "仪表盘", icon: "app", },
    ],
  }, {
    type: "group",
    title: "益智",
    children: [
      { type: "item", value: "tetrominoes", label: "俄罗斯方块", icon: "app", },
      { type: "item", value: "gomoku", label: "五子棋", icon: "app", },
      { type: "item", value: "chinesechess", label: "中国象棋", icon: "app", },
      { type: "item", value: "match3", label: "消消乐", icon: "app", },
    ],
  },
])



export const LeftApplicationMenuList = ref([
  {
    type: "group",
    title: "主导航",
    children: [
      { type: "item", value: "dashboard", label: "仪表盘", icon: "app", },
    ],
  },
  {
    type: "group",
    title: "阅读类",
    children: [
      {
        type: "submenu",
        value: "grid",
        label: "读书会",
        icon: "address-book",
        children: [
          { type: "item", value: "/app/club-clockdashboard", label: "读书会-打卡看板" },
          { type: "item", value: "/app/club-clockin", label: "读书会-打卡" },
        ],
      },
    ],
  }
]);


export const LeftEconomyMenuList = ref([
  {
    type: "group",
    title: "主导航",
    children: [
      { type: "item", value: "dashboard", label: "仪表盘", icon: "app", },
    ],
  },
  {
    type: "group",
    title: "阅读类",
    children: [
      {
        type: "submenu",
        value: "grid",
        label: "读书会",
        icon: "address-book",
        children: [
          { type: "item", value: "/app/club-clockdashboard", label: "读书会-打卡看板" },
          { type: "item", value: "/app/club-clockin", label: "读书会-打卡" },
        ],
      },
    ],
  }
]);

export const LeftScienceMenuList = ref([
  {
    type: "group",
    title: "主导航",
    children: [
      { type: "item", value: "dashboard", label: "仪表盘", icon: "app", },
    ],
  },
  {
    type: "group",
    title: "预备知识",
    children: [
      {
        type: "submenu",
        value: "math",
        label: "数学基础",
        icon: "address-book",
        children: [
          { type: "item", value: "/science/linear-algebra", label: "线性代数" },
          { type: "item", value: "/science/calculus", label: "微积分与多元微积分" },
          { type: "item", value: "/science/ode", label: "常微分方程（ODE）" },
          { type: "item", value: "/science/fourier-analysis", label: "傅里叶分析" },
        ],
      },
      {
        type: "submenu",
        value: "physics",
        label: "经典物理",
        icon: "address-book",
        children: [
          { type: "item", value: "/science/mechanics", label: "经典力学" },
          { type: "item", value: "/science/electromagnetism", label: "电磁学" },
        ],
      },
      {
        type: "submenu",
        value: "textbooks",
        label: "推荐教材",
        icon: "address-book",
        children: [
          { type: "item", value: "/science/textbook-linear-algebra", label: "《线性代数应该这样学》（Sheldon Axler）" },
          { type: "item", value: "/science/textbook-calculus", label: "《托马斯微积分》或《普林斯顿微积分读本》" },
          { type: "item", value: "/science/textbook-physics", label: "《费曼物理学讲义 第1卷》（经典物理部分）" },
        ],
      }
    ],
  },
  {
    type: "group",
    title: "量子现象与早期量子论",
    children: [
      {
        type: "submenu",
        value: "quantum",
        label: "核心实验与概念",
        icon: "address-book",
        children: [
          { type: "item", value: "/science/blackbody-radiation", label: "黑体辐射与普朗克量子假说" },
          { type: "item", value: "/science/photoelectric-effect", label: "光电效应与爱因斯坦光量子" },
          { type: "item", value: "/science/compton-scattering", label: "康普顿散射（光的粒子性）" },
          { type: "item", value: "/science/atomic-radiation", label: "原子光谱与玻尔模型" },
          { type: "item", value: "/science/debroglie-wave", label: "德布罗意物质波" },
          { type: "item", value: "/science/davisson-germer", label: "戴维森 - 革末实验（电子衍射）" },
          { type: "item", value: "/science/heisenberg-uncertainty", label: "不确定性原理（海森堡）的直观理解" },
        ],
      },
      {
        type: "submenu",
        value: "quantum-books",
        label: "推荐教材",
        icon: "address-book",
        children: [
          { type: "item", value: "/science/book-quantum-mystery", label: "《量子之谜》（布鲁斯·罗森布鲁姆）" },
          { type: "item", value: "/science/book-feynman-3", label: "《费曼物理学讲义 第3卷》" },
          { type: "item", value: "/science/resource-3b1b", label: "3Blue1Brown" },
        ],
      }
    ]
  },
  {
    type: "group",
    title: "非相对论量子力学",
    children: [
      {
        type: "submenu",
        value: "wave-function",
        label: "波函数与概率解释",
        icon: "address-book",
        children: [
          { type: "item", value: "/science/wave-function-meaning", label: "波函数 ψ(x, t) 的物理意义" },
          { type: "item", value: "/science/probability-density", label: "概率密度与归一化" },
          { type: "item", value: "/science/expectation-values", label: "期望值与算符" },
          { type: "item", value: "/science/momentum-energy-operators", label: "动量算符、能量算符的引入" },
        ],
      },
      {
        type: "submenu",
        value: "schrodinger",
        label: "薛定谔方程",
        icon: "address-book",
        children: [
          { type: "item", value: "/science/time-dependent-schrodinger", label: "时间依赖与时间独立薛定谔方程" },
          { type: "item", value: "/science/one-dimensional-stationary", label: "一维定态问题求解" },
        ],
      },
      {
        type: "submenu",
        value: "operators",
        label: "算符与可观测量",
        icon: "address-book",
        children: [
          { type: "item", value: "/science/operator-properties", label: "算符的线性与厄米性" },
          { type: "item", value: "/science/commutation-relations", label: "对易关系" },
          { type: "item", value: "/science/measurement-collapse", label: "测量与坍缩" },
          { type: "item", value: "/science/uncertainty-principle", label: "不确定性原理的数学推导" },
        ],
      },
      {
        type: "submenu",
        value: "dirac-notation",
        label: "狄拉克符号与态空间",
        icon: "address-book",
        children: [
          { type: "item", value: "/science/state-vectors", label: "态矢量 |ψ⟩ 在希尔伯特空间中的表示" },
          { type: "item", value: "/science/inner-product", label: "内积 ⟨φ | ψ⟩" },
          { type: "item", value: "/science/projection-operators", label: "投影算符与完备性" },
        ],
      }
    ]
  },
  {
    type: "group",
    title: "三维与多体系统",
    children: [
      {
        type: "submenu",
        value: "angular-momentum",
        label: "角动量与氢原子",
        icon: "address-book",
        children: [
          { type: "item", value: "/science/angular-momentum-operators", label: "角动量算符" },
          { type: "item", value: "/science/lowering-operators", label: "升降算符方法" },
          { type: "item", value: "/science/spherical-harmonics", label: "球谐函数" },
          { type: "item", value: "/science/hydrogen-atom", label: "氢原子的薛定谔解" },
          { type: "item", value: "/science/quantum-numbers", label: "量子数" },
        ],
      },
      {
        type: "submenu",
        value: "spin",
        label: "自旋",
        icon: "address-book",
        children: [
          { type: "item", value: "/science/stern-gerlach", label: "斯特恩-格拉赫实验" },
          { type: "item", value: "/science/spin-half", label: "自旋1/2系统" },
          { type: "item", value: "/science/pauli-matrices", label: "泡利矩阵" },
          { type: "item", value: "/science/spin-states", label: "自旋态的叠加与测量" },
        ],
      },
      {
        type: "submenu",
        value: "multi-particle",
        label: "多粒子系统",
        icon: "address-book",
        children: [
          { type: "item", value: "/science/identical-particles", label: "全同粒子：玻色子 vs 费米子" },
          { type: "item", value: "/science/symmetric-antisymmetric", label: "对称与反对称波函数" },
          { type: "item", value: "/science/pauli-exclusion", label: "泡利不相容原理" },
          { type: "item", value: "/science/two-electron-system", label: "两电子系统" },
        ],
      },
      {
        type: "submenu",
        value: "advanced-books",
        label: "推荐教材",
        icon: "address-book",
        children: [
          { type: "item", value: "/science/book-quantum-concepts", label: "《量子力学：概念与应用》（Nouredine Zettili）" },
        ],
      }
    ]
  },
  {
    type: "group",
    title: "进阶主题与数学深化",
    children: [
      {
        type: "submenu",
        value: "matrix-mechanics",
        label: "矩阵力学与表象理论",
        icon: "address-book",
        children: [
          { type: "item", value: "/science/position-momentum-representation", label: "位置表象、动量表象、能量表象" },
          { type: "item", value: "/science/wavefunction-transformation", label: "波函数在不同表象下的变换" },
          { type: "item", value: "/science/density-matrix", label: "密度矩阵初步" },
        ],
      },
      {
        type: "submenu",
        value: "perturbation-theory",
        label: "微扰理论",
        icon: "address-book",
        children: [
          { type: "item", value: "/science/non-degenerate-perturbation", label: "非简并与简并微扰" },
          { type: "item", value: "/science/helium-ground-state", label: "氦原子基态能量估算" },
          { type: "item", value: "/science/zeeman-stark-effect", label: "塞曼效应、斯塔克效应" },
        ],
      },
      {
        type: "submenu",
        value: "variational-methods",
        label: "变分法与数值方法",
        icon: "address-book",
        children: [
          { type: "item", value: "/science/variational-principle", label: "变分原理求基态能量" },
          { type: "item", value: "/science/hydrogen-molecule-ion", label: "氢分子离子 H₂⁺ 的近似解" }
        ],
      },
      {
        type: "submenu",
        value: "scattering-theory",
        label: "散射理论",
        icon: "address-book",
        children: [
          { type: "item", value: "/science/partial-wave", label: "分波法简介" },
          { type: "item", value: "/science/scattering-cross-section", label: "势散射截面" },
        ],
      },
      {
        type: "submenu",
        value: "quantum-entanglement",
        label: "量子纠缠与贝尔不等式",
        icon: "address-book",
        children: [
          { type: "item", value: "/science/epr-paradox", label: "EPR佯谬" },
          { type: "item", value: "/science/bell-inequality", label: "贝尔不等式的推导与实验验证" },
          { type: "item", value: "/science/quantum-nonlocality", label: "量子非定域性" },
        ],
      },
      {
        type: "submenu",
        value: "advanced-quantum-books",
        label: "推荐教材",
        icon: "address-book",
        children: [
          { type: "item", value: "/science/book-modern-quantum", label: "《现代量子力学》（J.J. Sakurai）" },
          { type: "item", value: "/science/book-quantum-path-integral", label: "《量子力学与路径积分》（Feynman）" },
        ],
      }
    ],
  },
  {
    type: "group",
    title: "现代发展与拓展方向",
    children: [
      {
        type: "submenu",
        value: "quantum-information",
        label: "量子信息与量子计算",
        icon: "address-book",
        children: [
          { type: "item", value: "/science/qubit-quantum-gates", label: "量子比特、量子门、纠缠态" },
          { type: "item", value: "/science/quantum-algorithms", label: "量子算法（Deutsch, Shor, Grover）" },
          { type: "item", value: "/science/quantum-communication", label: "量子通信与密码学" },
        ]
      },
      {
        type: "submenu",
        value: "quantum-field-theory",
        label: "量子场论（QFT）入门",
        icon: "address-book",
        children: [
          { type: "item", value: "/science/second-quantization", label: "二次量子化" },
          { type: "item", value: "/science/field-quantization", label: "场的量子化（如电磁场）" },
          { type: "item", value: "/science/particles-excitations", label: "粒子即激发态" },
        ]
      },
      {
        type: "submenu",
        value: "condensed-matter",
        label: "凝聚态物理中的量子理论",
        icon: "address-book",
        children: [
          { type: "item", value: "/science/band-theory", label: "能带理论" },
          { type: "item", value: "/science/topological-insulators", label: "拓扑绝缘体" },
          { type: "item", value: "/science/bcs-theory", label: "超导的BCS理论" },
        ]
      },
      {
        type: "submenu",
        value: "quantum-interpretation",
        label: "量子测量问题与诠释",
        icon: "address-book",
        children: [
          { type: "item", value: "/science/copenhagen-interpretation", label: "  哥本哈根诠释" },
          { type: "item", value: "/science/many-worlds", label: "  多世界诠释" },
          { type: "item", value: "/science/decoherence-theory", label: "  退相干理论" },
        ]
      },
      {
        type: "submenu",
        value: "modern-physics-books",
        label: "推荐教材",
        icon: "address-book",
        children: [
          { type: "item", value: "/science/book-quantum-computation", label: "《量子计算与量子信息》（Nielsen & Chuang）" },
          { type: "item", value: "/science/book-quantum-field-theory", label: "《量子场论简明教程》（A. Zee）" },
          { type: "item", value: "/science/book-condensed-matter", label: "《凝聚态物理学》（P. M. Chaikin）" },
        ],
      }
    ],
  }

]);

export const LeftHistoryMenuList = ref([
  {
    type: "group",
    title: "主导航",
    children: [
      { type: "item", value: "dashboard", label: "仪表盘", icon: "app", },
    ],
  },
  {
    type: "group",
    title: "阅读类",
    children: [
      {
        type: "submenu",
        value: "grid",
        label: "读书会",
        icon: "address-book",
        children: [
          { type: "item", value: "/app/club-clockdashboard", label: "读书会-打卡看板" },
          { type: "item", value: "/app/club-clockin", label: "读书会-打卡" },
        ],
      },
    ],
  }
]);