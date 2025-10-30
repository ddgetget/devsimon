<template>
    <div class='container'>
        <div class="content">
            <div class='slider'>
                <div class="user"> <t-avatar image="https://tdesign.gtimg.com/site/avatar.jpg" size="68px" />
                </div>
                <div class="menu">
                    <div class="menu-item" @click="switchBody('music')">
                        <t-icon name="music" size="40" />
                        <div class="menu-item-text">音乐</div>
                    </div>

                    <div class="menu-item" @click="switchBody('video')">
                        <t-icon name="video" size="40" />
                        <div class="menu-item-text">视频</div>
                    </div>
                    <div class="menu-item" @click="switchBody('live')">
                        <t-icon name="video-camera-music" size="40" />
                        <div class="menu-item-text">直播</div>
                    </div>
                    <div class="menu-item" @click="switchBody('kge')">
                        <t-icon name="music-2" size="40" />
                        <div class="menu-item-text">K歌</div>
                    </div>
                    <div class="menu-item" @click="switchBody('user')">
                        <t-icon name="user" size="40" />
                        <div class="menu-item-text">我的</div>
                    </div>
                </div>
                <div class="blank"></div>
            </div>
            <div class="body">
                <div v-if="showBodyTag === 'music'" class="music-body">
                    <div class="music-header">

                        <t-tabs :default-value="1" size="large" class="music-tabs" @change="handleChange">
                            <t-tab-panel :value="1" label="推荐">

                            </t-tab-panel>
                            <t-tab-panel :value="2" label="频道">

                            </t-tab-panel>
                            <t-tab-panel :value="3" label="歌单">

                            </t-tab-panel>
                            <t-tab-panel :value="4" label="歌手">

                            </t-tab-panel>
                        </t-tabs>

                        <div class="music-search">
                            <div class="search-bar">
                                <t-input placeholder="搜索">
                                    <template #prefix-icon>
                                        <t-icon name="search" />
                                    </template>
                                </t-input>
                            </div>
                            <t-icon name="microphone" class="search-mic" size="30" />
                        </div>
                    </div>
                    <div class="music-content">
                        <div v-if="activeMusicTab === 1">
                            <div class="recommend-container">
                                <div class="recommend-item" style="background-color: #ff7b64;">

                                    <h2 class="recommend-item-text">猜你喜欢</h2>
                                    <div>根据你的额听歌口味推荐</div>

                                </div>
                                <div class="recommend-item" style="background-color: #168ddb;">

                                    <h2 class="recommend-item-text">每日推荐</h2>
                                    <div>精选30首</div>
                                </div>
                                <div class="recommend-item" style="background-color: #168ddb;">

                                    <h2 class="recommend-item-text">排行榜</h2>
                                    <div>热门之选，潮流必备</div>
                                </div>
                                <div class="recommend-item" style="background-color: #ff7b64;">
                                    <h2 class="recommend-item-text">百万收藏</h2>
                                    <div>时下最受喜爱好歌</div>
                                </div>
                                <div class="recommend-item" style="background-color: #6bc7ff;">

                                    <h2 class="recommend-item-text">分类</h2>
                                    <div>精选风格随身听</div>

                                </div>

                            </div>
                        </div>
                        <div v-else-if="activeMusicTab === 2">频道内容</div>
                        <div v-else-if="activeMusicTab === 3">歌单内容</div>
                        <div v-else-if="activeMusicTab === 4">歌手内容</div>
                    </div>


                </div>
                <div v-else-if="showBodyTag === 'video'">
                    <div>视频内容</div>
                </div>
                <div v-else-if="showBodyTag === 'live'">
                    <div>直播内容</div>
                </div>
                <div v-else-if="showBodyTag === 'kge'">
                    <div>K歌内容</div>
                </div>
                <div v-else-if="showBodyTag === 'user'">
                    <div>我的内容</div>
                </div>
            </div>

        </div>
        <div class="footer">
            <div>底部内容</div>

        </div>
    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue';
// 控制右侧内容的开关
const showBodyTag = ref("music");

// 左侧-菜单切换之右侧内容
const switchBody = (tag: string) => {
    showBodyTag.value = tag;
}

// 音乐-处理选项卡切换
// 变量
const activeMusicTab = ref(1);
// 函数
const handleChange = (value: number) => {
    activeMusicTab.value = value;
}
</script>
<style lang='scss' scoped>
.container {
    background-color: #f5f7fa;
    max-width: 1400px;
    min-height: 800px;
    // display: flex;
    margin: 10px auto;
    // direction: column;
    display: block;
}

.content {
    display: flex;
    flex-direction: row;
    width: 100%;

    height: 80vh;

    .slider {
        display: flex;
        flex-direction: column;
        width: 120px;

        justify-content: space-between;
        align-items: center;
        padding: 30px 0;

        .menu {
            display: flex;
            flex-direction: column;
            gap: 10px;

            .menu-item-text {
                display: flex;
                justify-content: center;
            }
        }
    }

    .body {
        flex: 1;

        // background-color: green;
    }
}

.music-body {
    .music-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .music-tabs {
            background-color: #f5f7fa;
        }

        .music-search {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin: 0 20px;
            gap: 10px;
        }
    }

    .music-content {
        margin: 20px 30px;

        .recommend-container {
            display: flex;

            justify-content: space-between;
            align-items: center;
            gap: 20px;


            .recommend-item {
                border-radius: 10px;
                width: 100%;
                padding: 10px;

                background-color: green;
                height: 140px;
            }
        }
    }
}

.footer {
    height: 50px;
    background-color: #dbd6d6;
}
</style>