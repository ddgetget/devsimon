<template>
    <div class='container'>
        <div class="left-pannel">
            <div class="user">
                <div class="user-avator">
                    <div class="avator"> <t-avatar image="https://tdesign.gtimg.com/site/avatar.jpg" /></div>
                    <div class="user-info">
                        <div class="username">@Mike@</div>
                        <div class="other-info">
                            <div class="level">博客等级 2 </div>
                            <div class="age">码龄8天</div>
                        </div>
                    </div>
                </div>
                <div class="dashbord">
                    <div class="dashbord-item">
                        <div class="dashbord-item-title">文章数</div>
                        <div class="dashbord-item-number">100</div>
                    </div>
                    <div class="dashbord-item">
                        <div class="dashbord-item-title">评论数</div>
                        <div class="dashbord-item-number">100</div>
                    </div>
                    <div class="dashbord-item">
                        <div class="dashbord-item-title">关注数</div>
                        <div class="dashbord-item-number">100</div>
                    </div>
                    <div class="dashbord-item">
                        <div class="dashbord-item-title">粉丝数</div>
                        <div class="dashbord-item-number">100</div>
                    </div>
                </div>
            </div>
            <div class="hot-artical">
                <h4>热门文章</h4>
                <div class="hot-artical-item">
                    移动应用开发实验室移动应用开发实验室2025 979
                </div>
                <div class="hot-artical-item">
                    移动应用开发实验室2025 789
                </div>
                <div class="hot-artical-item">
                    移动应用开发实验室2025 8970
                </div>
            </div>
            <div class="new-comment">最新评论</div>
            <div class="all-see">大家在看</div>
        </div>
        <div class="center-pannel">sdsad</div>
        <div class="right-pannel">
            <div class="mulu">目录</div>
            <div class="new-artical">最新文章</div>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue';
</script>
<style lang='scss' scoped>
.container {
    width: 70%;
    display: flex;
    margin: 0 auto;
    background-color: rgb(186, 184, 184);
}

.left-pannel {
    display: flex-block;
    width: 22%;

    .user {

        background-color: #fff;
        border-radius: 5px;
        margin: 5px;
        padding: 5px;
        min-height: 100px;

        .user-avator {
            display: flex;
            justify-content: space-between;
            padding: 0 10px;

            .user-info {
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .other-info {
                    display: flex;
                    justify-content: space-between;
                }
            }
        }

        .dashbord {
            display: flex;
            justify-content: space-between;

            .dashbord-item {
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .dashbord-item-number {
                    display: flex;
                    justify-content: center;
                }
            }
        }

    }

    .hot-artical {
        background-color: #fff;
        border-radius: 5px;
        margin: 5px;
        padding: 5px;
        min-height: 150px;

        .hot-artical-item {

            padding: 5px;
        }
    }

    .new-comment {
        background-color: #fff;
        border-radius: 5px;
        margin: 5px;
        padding: 5px;
        min-height: 100px;
    }

    .all-see {
        background-color: #fff;
        border-radius: 5px;
        margin: 5px;
        min-height: 100px;
        padding: 5px;
    }

}

.center-pannel {
    flex: 1;
    background-color: #fff;
    border-radius: 5px;
    margin: 5px;
    padding: 5px;
}

.right-pannel {
    display: flex-block;
    width: 22%;

    .mulu {
        background-color: #fff;
        border-radius: 5px;
        margin: 5px;
        min-height: 100px;
        padding: 5px;
    }

    .new-artical {
        background-color: #fff;
        border-radius: 5px;
        margin: 5px;
        min-height: 200px;
        padding: 5px;
    }
}
</style>s