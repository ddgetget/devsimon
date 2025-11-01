<template>
    <div class='container'>
        <div class="content">
            <div class='slider'>
                <div class="user">
                    <t-avatar image="https://tdesign.gtimg.com/site/avatar.jpg" size="68px" />
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
                            <div class="zhuanshu-recommend-item">
                                <h3>专属推荐</h3>
                                <div class="zhuanshu-recommend-item-btn">
                                    <t-icon name="refresh" size="medium" />
                                    <t-icon name="arrow-right" size="medium" />
                                    <div>更多</div>
                                </div>
                            </div>
                            <div class="zhuanshu-list">
                                <div class="zhuanshu-item-container">
                                    <div class="zhuanshu-item">
                                        <t-image class="zhuanshu-item-img"
                                            src="https://imgessl.kugou.com/custom/150/20200723/20200723025423301714.jpg"
                                            size="medium" />
                                        <div class="zhuanshu-item-name">2025痘印最上头的DJ劲舞</div>
                                    </div>
                                    <div class="zhuanshu-item">
                                        <t-image class="zhuanshu-item-img"
                                            src="https://imgessl.kugou.com/custom/150/20240615/20240615215758191064.jpg"
                                            size="medium" />
                                        <div class="zhuanshu-item-name">2025痘印最上头的DJ劲舞</div>
                                    </div>
                                    <div class="zhuanshu-item">
                                        <t-image class="zhuanshu-item-img"
                                            src="https://imgessl.kugou.com/custom/150/20200723/20200723025423301714.jpg"
                                            size="medium" />
                                        <div class="zhuanshu-item-name">2025痘印最上头的DJ劲舞</div>
                                    </div>
                                    <div class="zhuanshu-item">
                                        <t-image class="zhuanshu-item-img"
                                            src="https://imgessl.kugou.com/custom/150/20240615/20240615215758191064.jpg"
                                            size="medium" />
                                        <div class="zhuanshu-item-name">2025痘印最上头的DJ劲舞</div>
                                    </div>
                                    <div class="zhuanshu-item">
                                        <t-image class="zhuanshu-item-img"
                                            src="https://imgessl.kugou.com/custom/150/20200723/20200723025423301714.jpg"
                                            size="medium" />
                                        <div class="zhuanshu-item-name">2025痘印最上头的DJ劲舞</div>
                                    </div>
                                    <div class="zhuanshu-item">
                                        <t-image class="zhuanshu-item-img"
                                            src="https://imgessl.kugou.com/custom/150/20240615/20240615215758191064.jpg"
                                            size="medium" />
                                        <div class="zhuanshu-item-name">2025痘印最上头的DJ劲舞</div>
                                    </div>
                                    <div class="zhuanshu-item">
                                        <t-image class="zhuanshu-item-img"
                                            src="https://imgessl.kugou.com/custom/150/20200723/20200723025423301714.jpg"
                                            size="medium" />
                                        <div class="zhuanshu-item-name">2025痘印最上头的DJ劲舞</div>
                                    </div>
                                    <div class="zhuanshu-item">
                                        <t-image class="zhuanshu-item-img"
                                            src="https://imgessl.kugou.com/custom/150/20240615/20240615215758191064.jpg"
                                            size="medium" />
                                        <div class="zhuanshu-item-name">2025痘印最上头的DJ劲舞</div>
                                    </div>
                                    <div class="zhuanshu-item">
                                        <t-image class="zhuanshu-item-img"
                                            src="https://imgessl.kugou.com/custom/150/20240615/20240615215758191064.jpg"
                                            size="medium" />
                                        <div class="zhuanshu-item-name">2025痘印最上头的DJ劲舞</div>
                                    </div>
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
            <div class="play-icon">
                <t-avatar image="https://tdesign.gtimg.com/site/avatar.jpg" size="large" />
            </div>
            <div class="play-control">
                <t-icon name="chevron-left-circle" class="play-control-icon" />
                <t-icon name="play-circle" class="play-control-icon play-middle-icon" />
                <t-icon name="chevron-right-circle" class="play-control-icon" />

            </div>
            <div class="process">

                <div class="progress-info">
                    <div class="process-info-item">Romeo's Tune - Pajaro Sunrise</div>
                    <div class="process-info-item">0:09 / 3:15</div>
                </div>
                <t-progress theme="line" :color="{ from: '#0052D9', to: '#00A870' }" :percentage="60"
                    :status="'active'" />
            </div>

            <div class="play-process-icon">
                <t-icon name="heart" class="play-process-icon-item" />
                <t-icon name="download" class="play-process-icon-item" />
                <t-icon name="chevron-right-double" class="play-process-icon-item" />
                <t-icon name="indent-right" class="play-process-icon-item" />
            </div>
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
    background-color: #F5F7FA;
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


    }

    .body {
        flex: 1;

        // background-color: green;
    }
}

.menu {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .menu-item-text {
        display: flex;
        justify-content: center;
    }
}

.music-body {
    .music-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .music-tabs {
            background-color: #F5F7FA;
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

        .zhuanshu-recommend-item {
            display: flex;

            justify-content: space-between;
            align-items: center;

            .zhuanshu-recommend-item-btn {
                display: flex;
                gap: 10px;
                align-items: center;
            }
        }

        .zhuanshu-list {

            margin: 0 auto;
            display: flex;


            .zhuanshu-item-container {
                gap: 20px;
                flex-wrap: wrap;
                display: flex;
                justify-content: flex-start;
                align-items: center;




                .zhuanshu-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;

                    .zhuanshu-item-img {
                        width: 150px;
                        height: 150px;
                    }

                    .zhuanshu-item-name {
                        font-weight: 700;
                        max-width: 140px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }
        }
    }
}

.footer {
    height: 50px;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;

    .play-control {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        margin: 0 20px;

        .play-control-icon {
            font-size: 24px;
        }

        .play-middle-icon {
            font-size: 38px;
        }
    }

    .process {
        width: 70%;

        .progress-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }

    .play-process-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;

        .play-process-icon-item {
            font-size: 24px;
        }
    }
}
</style>