<template>
    <div class='container'>
        <div class="content">
            <div class='slider'>
                <div class="user"> <t-avatar image="https://tdesign.gtimg.com/site/avatar.jpg" size="68px" />
                </div>
                <div class="menu">
                    <div class="menu-item">
                        <t-icon name="music" size="40" />
                        <div class="menu-item-text">音乐</div>
                    </div>
                    <div class="menu-item">
                        <t-icon name="video" size="40" />
                        <div class="menu-item-text">视频</div>
                    </div>
                    <div class="menu-item">
                        <t-icon name="video-camera-music" size="40" />
                        <div class="menu-item-text">直播</div>
                    </div>
                    <div class="menu-item">
                        <t-icon name="music-2" size="40" />
                        <div class="menu-item-text">K歌</div>
                    </div>
                    <div class="menu-item">
                        <t-icon name="user" size="40" />
                        <div class="menu-item-text">我的</div>
                    </div>
                </div>
                <div class="blank"></div>
            </div>
            <div class="body"></div>

        </div>
        <div class="footer">
            <div>底部内容</div>

        </div>
    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue';
</script>
<style lang='scss' scoped>
.container {
    background-color: #dbd6d6;
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
        background-color: red;
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

        background-color: green;
    }
}

.footer {
    height: 50px;
    background-color: #dbd6d6;
}
</style>