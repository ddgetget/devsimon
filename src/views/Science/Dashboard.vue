<template>
    <div class="quantum-dashboard">
        <t-page-header title="量子力学学习路径" />

        <div class="dashboard-layout">
            <!-- 左侧：Anchor 容器（不可滚动！） -->
            <div class="anchor-sidebar">
                <!-- 关键：这个容器不能有任何 overflow: auto/scroll -->
                <div class="anchor-wrapper">
                    <t-anchor :container="scrollContainer" :offset-top="20">
                        <t-anchor-item v-for="(stage, index) in stages" :key="index" :href="`#stage-${index}`"
                            :title="`第${index + 1}阶段：${stage.name}`" />
                    </t-anchor>
                </div>
            </div>

            <!-- 右侧：独立滚动内容区 -->
            <div ref="scrollContainer" class="content-scrollable" @scroll="handleScroll">
                <div v-for="(stage, index) in stages" :key="index" :id="`stage-${index}`" class="stage-section">
                    <t-card :title="`🌱 第${index + 1}阶段：${stage.name}`"
                        :subtitle="`⏱ ${stage.duration} | 📅 每周 ${stage.hours} 小时 | 🎯 ${stage.keyGoal}`" bordered
                        shadow="never" class="stage-card">
                        <div v-for="(section, secIndex) in stage.sections" :key="secIndex" class="section">
                            <h4 class="section-title">{{ section.title }}</h4>
                            <ul class="content-list">
                                <li v-for="(item, itemIndex) in section.items" :key="itemIndex">
                                    {{ item }}
                                </li>
                            </ul>
                        </div>
                        <div class="books">
                            <strong>📚 推荐教材：</strong>
                            {{ stage.books.join('、') }}
                        </div>
                    </t-card>
                </div>

                <!-- 回到顶部按钮 -->
                <transition name="fade">
                    <t-button v-show="showBackTop" theme="default" shape="square" size="medium" @click="scrollToTop"
                        class="local-back-top">
                        <t-icon name="arrow-up" />
                    </t-button>
                </transition>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Section {
    title: string;
    items: string[];
}

interface Stage {
    name: string;
    duration: string;
    hours: string;
    keyGoal: string;
    sections: Section[];
    books: string[];
}

const scrollContainer = ref<HTMLDivElement | null>(null);
const showBackTop = ref(false);

const stages = ref<Stage[]>([
    {
        name: '预备知识',
        duration: '1-3个月',
        hours: '10-15',
        keyGoal: '数学过关',
        sections: [
            {
                title: '数学基础',
                items: [
                    '线性代数：向量空间、矩阵、特征值、狄拉克符号',
                    '微积分与多元微积分：偏导、梯度、拉普拉斯算子',
                    '常微分方程：简谐振子等',
                    '傅里叶分析：变换、波包、δ函数'
                ]
            },
            {
                title: '经典物理回顾',
                items: [
                    '牛顿力学、能量动量守恒',
                    '拉格朗日与哈密顿力学（重点）',
                    '麦克斯韦方程组、光的波动性'
                ]
            }
        ],
        books: ['《线性代数应该这样学》', '《托马斯微积分》', '《费曼物理学讲义 第1卷》']
    },
    {
        name: '量子现象与早期量子论',
        duration: '1-2个月',
        hours: '8-10',
        keyGoal: '理解“为什么需要量子力学”',
        sections: [
            {
                title: '核心实验与概念',
                items: [
                    '黑体辐射、光电效应、康普顿散射',
                    '玻尔模型、德布罗意波、电子衍射',
                    '不确定性原理（直观理解）'
                ]
            }
        ],
        books: ['《量子之谜》', '《费曼物理学讲义 第3卷》', '3Blue1Brown 视频']
    },
    {
        name: '非相对论量子力学基础',
        duration: '3-6个月',
        hours: '12-15',
        keyGoal: '掌握薛定谔方程',
        sections: [
            {
                title: '核心内容',
                items: [
                    '波函数与概率解释 |ψ|²',
                    '薛定谔方程：势阱、隧穿、谐振子',
                    '算符、对易关系 [x,p]=iℏ',
                    '狄拉克符号与希尔伯特空间'
                ]
            }
        ],
        books: ['《量子力学导论》Griffiths', '《现代量子力学》樱井纯']
    },
    {
        name: '三维与多体系统',
        duration: '3-4个月',
        hours: '10',
        keyGoal: '氢原子与自旋',
        sections: [
            {
                title: '重点内容',
                items: [
                    '角动量、球谐函数、氢原子解',
                    '自旋1/2、泡利矩阵、斯特恩-格拉赫实验',
                    '全同粒子、泡利不相容原理'
                ]
            }
        ],
        books: ['《量子力学：概念与应用》Zettili']
    },
    {
        name: '进阶主题与数学深化',
        duration: '4-6个月',
        hours: '10-12',
        keyGoal: '掌握进阶工具',
        sections: [
            {
                title: '进阶内容',
                items: [
                    '表象理论、密度矩阵',
                    '微扰理论：塞曼效应、氦原子',
                    '变分法、散射理论初步',
                    '量子纠缠、贝尔不等式'
                ]
            }
        ],
        books: ['《现代量子力学》Sakurai', '《量子力学与路径积分》Feynman']
    },
    {
        name: '现代发展与拓展方向',
        duration: '持续学习',
        hours: '按兴趣',
        keyGoal: '深入专研',
        sections: [
            {
                title: '可选方向',
                items: [
                    '量子计算：量子比特、Shor算法',
                    '量子场论入门：二次量子化',
                    '凝聚态：能带、拓扑绝缘体',
                    '量子诠释：多世界、退相干'
                ]
            }
        ],
        books: ['Nielsen & Chuang', 'A. Zee', 'Chaikin']
    }
]);

const handleScroll = () => {
    if (scrollContainer.value) {
        showBackTop.value = scrollContainer.value.scrollTop > 300;
    }
};

const scrollToTop = () => {
    scrollContainer.value?.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<style lang="scss" scoped>
.quantum-dashboard {
    display: flex;
    flex-direction: column;
    height: 100%;

    .dashboard-layout {
        display: flex;
        // flex: 1;
        min-height: 0;
        gap: 24px;
        padding: 16px 24px 0;
    }

    .anchor-sidebar {
        flex-shrink: 0;
        width: 220px;
        /* 关键：不要设置 overflow，也不要限制高度 */
        /* 让它自然撑开，不可滚动 */
    }

    .anchor-wrapper {
        /* 确保这个 wrapper 不可滚动 */
        overflow: visible;
        /* 默认就是 visible，但显式声明更安全 */
        /* 不要设置 height 或 max-height，除非你确定不会 overflow */
    }

    .content-scrollable {
        position: relative;
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        padding-right: 52px;
    }

    .stage-section {
        scroll-margin-top: 20px;
        margin-bottom: 24px;
    }

    .stage-card {
        :deep(.t-card__header) {
            padding: 16px 20px;
        }

        :deep(.t-card__body) {
            padding: 12px 20px 16px;
        }
    }

    .section-title {
        font-size: 15px;
        font-weight: 600;
        margin: 12px 0 8px;
        color: var(--td-text-color-primary);
    }

    .content-list {
        padding-left: 20px;
        margin: 6px 0;
        list-style-type: circle;
        color: var(--td-text-color-secondary);
        font-size: 14px;
    }

    .books {
        margin-top: 12px;
        padding-top: 12px;
        border-top: 1px dashed var(--td-border-level_1-color);
        font-size: 14px;
        color: var(--td-text-color-secondary);
    }

    .local-back-top {
        position: sticky;
        bottom: 24px;
        right: 0;
        margin-left: auto;
        z-index: 10;
        box-shadow: var(--td-shadow-4);
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
}
</style>