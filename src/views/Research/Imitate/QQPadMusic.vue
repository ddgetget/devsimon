<template>
    <div class='container'>
        <div class='qq-left'>
            <div class='user'>
                <t-avatar image="https://tdesign.gtimg.com/site/avatar.jpg" size="medium" />
                <div class="user-info">
                    <div class="name">Herbert·Simon</div>
                    <div class="status">
                        <div>VIP1</div>
                        <t-icon name="user-vip" size="medium" />
                        <div>20勋章🎖️</div>
                    </div>
                </div>
                <div class="btn">
                    <t-icon name="chevron-down" size="medium" />
                </div>
            </div>
            <div class="vip">
                <div>会员畅听VIP曲库</div>
                <div class="vip-btn">¥10续费</div>
            </div>
            <div class="menu">
                <div class="menu-item"><t-icon name="music" size="large" /></div>
                <div class="menu-item"><t-icon name="folder" size="large" /></div>
                <div class="menu-item"><t-icon name="cloud" size="large" /></div>
                <div class="menu-item"><t-icon name="airplay-wave" size="large" /></div>
                <div class="menu-item"><t-icon name="cd" size="large" /></div>
            </div>
            <div class="file">
                <div class="file-item">
                    <t-icon name="heart" class="item-icon" />
                    <div class="item-count">喜欢·249</div>
                </div>
                <div class="file-item">
                    <t-icon name="time" class="item-icon" />
                    <div class="item-count">最近·500</div>
                </div>
                <div class="file-item">
                    <t-icon name="download" class="item-icon" />
                    <div class="item-count">本地·249</div>
                </div>
                <div class="file-item">
                    <t-icon name="cloud" class="item-icon" />
                    <div class="item-count">微云·249</div>
                </div>
            </div>
            <div class="music-list">
                <div class="music-list-header">
                    <div>自建歌单 ｜ 收藏歌单</div>
                    <t-icon name="plus" size="medium" />
                </div>
                <div class="music-item">
                    <t-image src="https://tdesign.gtimg.com/site/avatar.jpg" class="music-cover" />
                    <div>2024年度歌单</div>
                </div>
                <div class="music-item">
                    <t-image src="https://tdesign.gtimg.com/site/avatar.jpg" class="music-cover" />
                    <div>炫动心生</div>
                </div>
            </div>
        </div>
        <div class="qq-right">
            dhsj
        </div>
    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue';
</script>
<style lang='scss' scoped>
.container {

    border-radius: 5px;
    width: 80%;
    margin: 0 auto;
    gap: 5px;
}

.qq-left {
    background-color: #F6F6F6;
    width: 200px;

    float: left;
    padding: 10px;
}

.user {
    display: flex;
    gap: 10px;

    .user-info {
        flex: 1;

        .status {
            display: flex;
            gap: 10px;
        }
    }


}

.vip {
    background-color: #EAEAEA;
    display: flex;
    gap: 5px;
    margin: 5px;

    .vip-btn {
        background-color: #39F26E;
        border-radius: 10px;
        min-width: 70px;
        text-align: center;

    }
}

.menu {
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    gap: 5px;

    .menu-item {
        background-color: #EAEAEA;
        border-radius: 10px;
        padding: 10px;

        text-align: center;
    }
}

.file {
    padding: 10px;

    .file-item {
        display: flex;
        gap: 20px;
        align-items: center;
        margin: 10px 0;

        .item-icon {
            font-size: 20px;
        }
    }
}

.music-list {
    padding: 10px;

    .music-list-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .music-item {
        display: flex;
        gap: 20px;
        align-items: center;
        // margin: 10px 0;

        .music-cover {
            width: 40px;
            height: 40px;
        }
    }
}



.qq-right {
    background-color: #F6F6F6;
    width: calc(100% - 200px);
    float: left;
}
</style>