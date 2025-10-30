<template>
    <div class='container'>
        <div class="header-container">
            <div class='header'>
                <div class="header-content">
                    <div class="header-title-section">
                        <h1 class="club-title">大猩猩的俱乐部(第234期)</h1>
                    </div>

                </div>
                <div class="dashboard">
                    <div class="header-dashboard" v-for="item in clubCount" :key="item.title">

                        <t-statistic :title="item.title" :value="item.value" :unit="item.unit" :trend="item.trend" />
                    </div>
                </div>
            </div>
            <div class="head-line"></div>
            <div class="club-description">
                <div class="club-description-item">
                    <div class="label">打卡时间：</div>
                    <div class="time">2025-10-30 23:27:39~2025-10-30 23:27:59</div>
                </div>
                <div class="club-description-item">
                    <div class="label">描述：</div>
                    <div class="time">本期主题是健康, 我们将通过打卡和评论来分享知识和经验。</div>
                </div>
            </div>
        </div>
        <div class="club-group">
            <t-card :title="group.title" header-bordered v-for="group in signInGroups" :key="group.title">
                <template #content>
                    <div class="club-item">
                        <div v-for="member in group.members" :key="member.name">
                            <t-badge dot size="small" :count="member.count" color="#66b278">
                                <t-avatar :image="member.avatar" />
                            </t-badge>
                        </div>
                    </div>
                </template>
                <template #actions>
                    <t-button>加入俱乐部</t-button>
                </template>

                <template #subtitle>
                    <t-progress theme="line" :color="{ from: '#0052D9', to: '#00A870' }" :percentage="group.percentage"
                        style="width: 200px;" :status="'active'" />
                    <div>{{group.members.filter(member => member.count > 0).length}}/{{ group.members.length }}
                    </div>

                </template>
            </t-card>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue';
// 统计数据
const clubCount = ref([
    { value: 342, title: '总人数', unit: '人', trend: 'increase' },
    { value: 234, title: '总打卡', unit: '人', trend: 'decrease' },
    { value: 78, title: '总评论', unit: '条', trend: 'increase' },
    { value: 80, title: '总进度', unit: '%', trend: 'increase' },
]);

// 签到人员按组进行展会
const signInGroups = ref([
    {
        title: 'A组',
        percentage: 60,

        members: [
            { name: '张三', avatar: 'https://tdesign.gtimg.com/site/avatar.jpg', count: 1 },
            { name: '李四', avatar: 'https://tdesign.gtimg.com/site/avatar.jpg', count: 1 },
            { name: '王二', avatar: 'https://tdesign.gtimg.com/site/avatar.jpg', count: 0 },
            { name: '王二', avatar: 'https://tdesign.gtimg.com/site/avatar.jpg', count: 1 },
            { name: '赵六', avatar: 'https://tdesign.gtimg.com/site/avatar.jpg', count: 1 },
            { name: '王二', avatar: 'https://tdesign.gtimg.com/site/avatar.jpg', count: 1 },
            { name: '赵六', avatar: 'https://tdesign.gtimg.com/site/avatar.jpg', count: 1 },
        ],
    },
    {
        title: 'B组',
        percentage: 80,
        members: [
            { name: '王五', avatar: 'https://tdesign.gtimg.com/site/avatar.jpg', count: 1 },
            { name: '赵六', avatar: 'https://tdesign.gtimg.com/site/avatar.jpg', count: 0 },
            { name: '王二', avatar: 'https://tdesign.gtimg.com/site/avatar.jpg', count: 1 },
            { name: '赵六', avatar: 'https://tdesign.gtimg.com/site/avatar.jpg', count: 1 },
            { name: '王二', avatar: 'https://tdesign.gtimg.com/site/avatar.jpg', count: 1 },
            { name: '赵六', avatar: 'https://tdesign.gtimg.com/site/avatar.jpg', count: 1 },
        ],
    },
    {
        title: 'C组',
        percentage: 40,
        members: [
            { name: '赵六', avatar: 'https://tdesign.gtimg.com/site/avatar.jpg', count: 1 },
            { name: '王二', avatar: 'https://tdesign.gtimg.com/site/avatar.jpg', count: 1 },
            { name: '赵六', avatar: 'https://tdesign.gtimg.com/site/avatar.jpg', count: 1 },
            { name: '王二', avatar: 'https://tdesign.gtimg.com/site/avatar.jpg', count: 1 },
            { name: '赵六', avatar: 'https://tdesign.gtimg.com/site/avatar.jpg', count: 1 },
            { name: '王二', avatar: 'https://tdesign.gtimg.com/site/avatar.jpg', count: 1 },
            { name: '赵六', avatar: 'https://tdesign.gtimg.com/site/avatar.jpg', count: 1 },
            { name: '王二', avatar: 'https://tdesign.gtimg.com/site/avatar.jpg', count: 1 },
            { name: '赵六', avatar: 'https://tdesign.gtimg.com/site/avatar.jpg', count: 1 },
            { name: '王二', avatar: 'https://tdesign.gtimg.com/site/avatar.jpg', count: 1 },
            { name: '赵六', avatar: 'https://tdesign.gtimg.com/site/avatar.jpg', count: 1 },
            { name: '王二', avatar: 'https://tdesign.gtimg.com/site/avatar.jpg', count: 1 },
            { name: '赵六', avatar: 'https://tdesign.gtimg.com/site/avatar.jpg', count: 1 },
            { name: '王二', avatar: 'https://tdesign.gtimg.com/site/avatar.jpg', count: 1 },
        ],
    },
    {
        title: 'D组',
        percentage: 50,
        members: [
            { name: '赵六', avatar: 'https://tdesign.gtimg.com/site/avatar.jpg', count: 1 },
            { name: '王二', avatar: 'https://tdesign.gtimg.com/site/avatar.jpg', count: 1 },
        ],
    },
    {
        title: 'E组',
        percentage: 70,
        members: [
            { name: '赵六', avatar: 'https://tdesign.gtimg.com/site/avatar.jpg', count: 1 },
            { name: '王二', avatar: 'https://tdesign.gtimg.com/site/avatar.jpg', count: 1 },
            { name: '赵六', avatar: 'https://tdesign.gtimg.com/site/avatar.jpg', count: 1 },
            { name: '王二', avatar: 'https://tdesign.gtimg.com/site/avatar.jpg', count: 1 },
            { name: '赵六', avatar: 'https://tdesign.gtimg.com/site/avatar.jpg', count: 1 },
            { name: '王二', avatar: 'https://tdesign.gtimg.com/site/avatar.jpg', count: 1 },
            { name: '赵六', avatar: 'https://tdesign.gtimg.com/site/avatar.jpg', count: 1 },
            { name: '王二', avatar: 'https://tdesign.gtimg.com/site/avatar.jpg', count: 1 },
            { name: '赵六', avatar: 'https://tdesign.gtimg.com/site/avatar.jpg', count: 1 },
        ],
    },
    {
        title: 'F组',
        percentage: 90,
        members: [
            { name: '赵六', avatar: 'https://tdesign.gtimg.com/site/avatar.jpg', count: 1 },
            { name: '王二', avatar: 'https://tdesign.gtimg.com/site/avatar.jpg', count: 1 },
        ],
    },
]);
</script>
<style lang='scss' scoped>
.container {
    background-color: #f5f7fa;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 50px;
}

.header-container {
    display: flex;

    .header {
        display: flex;
        flex-direction: column;
        // margin: 0 auto;
        gap: 16px;

        .header-content {
            display: flex;
            flex-direction: column;
            gap: 16px;


        }

        .dashboard {
            display: flex;
            margin: 0 auto;
            gap: 16px;
        }

    }

    .head-line {
        background-color: green;
        width: 2px;
        margin: 5px 30px;

    }

    .club-time {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.6);

    }

}

.club-group {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(4, 1fr);

    .club-item {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 8px;
    }
}
</style>
