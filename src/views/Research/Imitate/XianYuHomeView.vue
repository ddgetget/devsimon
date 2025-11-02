<template>
    <div class='container'>
        <a href='https://www.goofish.com/?spm=a21ybx.personal.logo.1.1b866ac2uwSB3u' target='_blank'>
            咸鱼首页</a>
        <div class="header">
            <div class="header-content">
                <div class="header-left">
                    闲鱼
                </div>
                <div class="header-center">

                    <t-input class="search-input" size="large">
                        <template #suffix>
                            <t-icon name="search"></t-icon>
                        </template>
                    </t-input>
                    <div class="hot-search">
                        <div class="hot-item">戴尔5070wyse</div>
                        <div class="hot-item">电陶瓷</div>
                        <div class="hot-item">升腾c92</div>
                        <div class="hot-item">carplay车机</div>
                        <div class="hot-item">煮茶炉</div>
                        <div class="hot-item">电脑主机台式</div>
                        <div class="hot-item">云主机</div>
                        <div class="hot-item">绿砖</div>
                        <div class="hot-item">小度智能音箱</div>
                    </div>

                </div>
                <div class="header-right">
                    <t-avatar
                        image="https://img.alicdn.com/bao/uploaded/i4/O1CN01tKRglu1uxgL29hs0j_!!0-mtopupload.jpg_110x10000Q90.jpg_.webp"
                        size="large" />
                    <div class="user-name">爱吃花椒的小龙</div>
                    <div class="order">订单</div>
                </div>
            </div>
        </div>
        <div class="category-menu">
            <div class="category-item">全部</div>
            <div class="category-item">电脑主机台式</div>
            <div class="category-item">云主机</div>
            <div class="category-item">绿砖</div>
            <div class="category-item">小度智能音箱</div>
            <div class="category-item">其他</div>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue';
</script>
<style lang='scss' scoped>
.container {
    display: block;
    background-color: #F5F7F9;

}

.header {
    background-color: #FFE430;

    .header-content {

        display: flex;
        align-items: center;
        width: 1200px;
        margin: 0 auto;
        gap: 20px;
        height: 80px;

        .header-left {
            font-size: 40px;
            width: 200px;
            display: flex;
            justify-content: center;
        }

        .header-center {
            width: 800px;
            display: block;


            .hot-search {
                display: flex;
                margin-top: 5px;
                gap: 8px;
            }
        }

        .header-right {
            align-items: center;
            width: 200px;
            display: flex;
            gap: 10px;
        }
    }
}

.category-menu {
    background-color: #FFFFFF;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 1200px;
    margin: 0 auto;
}
</style>