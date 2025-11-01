<template>
    <view class='container'>
        <div class="book-clock-in">
            <div class="comment-in">
                <t-radio-group :default-value="bookChatpter[0]?.chapter_id" class="chapter-radio-group">
                    <t-radio-button :value="item.chapter_id" v-for="(item, index) in bookChatpter"
                        :key="item.chapter_id">{{ item.chapter_id }}-{{ item.chapter_name
                        }}</t-radio-button>
                </t-radio-group>
                <div class="comment-input">

                    <t-textarea v-model="commentContent" placeholder="进入打卡，输入打卡内容" name="description"
                        :autosize="{ minRows: 9, maxRows: 9 }" />
                    <div class="comment-btn">
                        <div class="left-btn">
                            <t-icon name="apple" class="btn-icon-item" />
                            <t-icon name="setting" class="btn-icon-item" />
                        </div>
                        <div class="right-btn">
                            <t-icon name="send" class="btn-icon-item" @click="handleSendComment" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="books">
                <t-image :src="selectedBook.image" fit="cover" shape="round" style="width: 90px; margin: 10px auto;" />
                <t-list split stripe size="small">
                    <t-list-item v-for="item in bookList" :key="item.title" @click="handleselectedBook(item)">
                        <t-list-item-meta :image="item.image" :title="item.title" />
                    </t-list-item>
                </t-list>

            </div>
        </div>
        <div class="book-comment">
            <t-table :data="commentContents" :columns="commentColumns" row-key="property" :pagination="pagination"
                resizable stripe>
            </t-table>
        </div>
    </view>
</template>
<script setup lang='ts'>
import { ref } from 'vue';

// 临时变量
// const avatarUrl = ref("https://piccdn2.umiwi.com/uploader/image/cms_ebook/2025102716/1891454544337008652/102716.jpeg?x-oss-process=image/resize,w_300")

type bookListType = {
    book_code: string,
    title: string,
    description: string,
    image: string
}
// 参与打卡的书籍
const bookList = ref<bookListType[]>([
    {
        book_code: "10000000000000000000000000000000",
        title: "元朝理财记：从成吉思汗的崛起到元朝的衰亡",
        description: "【得到独家首发】知名历史作家郭建龙新作，从成吉思汗的崛起到元朝的衰亡，一本书写尽盛世王朝短短百余年的跌宕起落。",
        image: "https://piccdn2.umiwi.com/uploader/image/cms_ebook/2025010321/1863920446378874216/010321.jpeg?x-oss-process=image/resize,m_fill,h_224,w_168"
    },
    {
        book_code: "10000000000000000000000000000001",
        title: "问道全球 1",
        description: "【得到独家首发】一部关于趋势、机会与方向的出海笔记。",
        image: "https://piccdn2.umiwi.com/uploader/image/cms_ebook/2025102716/1891454544337008652/102716.jpeg?x-oss-process=image/resize,m_fill,h_320,w_240"
    },
    {
        book_code: "10000000000000000000000000000002",
        title: "理论最小值：量子力学",
        description: "弦论之父莱昂纳德·萨斯坎德量子力学入门之作，清晰揭示量子力学的根本。",
        image: "https://piccdn2.umiwi.com/uploader/image/cms_ebook/2023021517/1800079290134461476/021517.jpeg?x-oss-process=image/resize,m_fill,h_320,w_240"
    },
    {
        book_code: "10000000000000000000000000000003",
        title: "张朝阳的物理课（第三卷）",
        description: "带你穿梭微观世界，领略量子物理之美。",
        image: "https://piccdn2.umiwi.com/uploader/image/cms_ebook/2024103011/1857852338341988264/103011.jpeg?x-oss-process=image/resize,m_fill,h_320,w_240"
    }
])
// 当前选中的书籍
const selectedBook = ref<bookListType>(bookList.value[0]!)
const handleselectedBook = (item: bookListType) => {
    selectedBook.value = item
}

const bookChatpter = ref([
    {
        book_code: "10000000000000000000000000000002", chapter_name: "01 波包及其演化", chapter_id: 1, description: `如何完整描述一个微观粒子
一、从偏微分方程的角度重新看薛定谔方程 \n
二、用偏微分方程的“三板斧”处理薛定谔方程\n
小结 Summary \n
微观粒子能被视为一个质点吗 \n
一、存在“点粒子”吗 \n
二、一个高斯波包的自由演化 \n
小结 Summary \n
势场中的粒子会消失或者突然跃迁吗 \n
一、势场中微观粒子波函数的一般形式 \n
二、正交归一条件与测量公设 \n
三、定态波函数——以无限深方势阱为例 \n
四、一个实例：无限深方势阱 \n
小结 Summary \n
运动的波包如何演化（上） \n
一、描述匀速向前传播的粒子 \n
二、刻画波包的运动：群速度与相速度 \n
三、波包的速度可以超光速吗 \n
小结 Summary \n
运动的波包如何演化（下） \n
一、向前运动的高斯波包 \n
二、高斯波包的反射与自我干涉 \n
小结 Summary \n
02 量子隧穿效应与α衰变 \n
量子力学如何理解电流 \n
一、量子力学中的概率密度与概率流及其守恒方程 \n
二、概率流的若干实例 \n
小结 Summary \n
氢原子的轨道磁矩 \n
一、氢原子本征波函数的概率流和磁矩 \n
二、与经典电子轨道模型的对应 \n
小结 Summary \n
波函数的反射 \n
三、定态波函数——以无限深方势阱为例
四、一个实例：无限深方势阱
小结 Summary
运动的波包如何演化（上）
一、描述匀速向前传播的粒子
二、刻画波包的运动：群速度与相速度
三、波包的速度可以超光速吗
小结 Summary`},
    {
        book_code: "10000000000000000000000000000002", chapter_name: "02 量子隧穿效应与α衰变", chapter_id: 2, description: `量子力学如何理解电流
一、量子力学中的概率密度与概率流及其守恒方程
二、概率流的若干实例
小结 Summary
氢原子的轨道磁矩
一、氢原子本征波函数的概率流和磁矩
二、与经典电子轨道模型的对应
小结 Summary
波函数的反射
一、粒子动能小于阶梯势垒高度时的反射
二、穿透和延迟相位的物理意义
小结 Summary
量子隧穿效应
一、一维方势垒的散射
二、原子核的α衰变
小结 Summary`},
    {
        book_code: "10000000000000000000000000000002", chapter_name: "03 粒子的散射", chapter_id: 3, description: `粒子的散射
中心力场下粒子的散射（上）
一、散射定态的渐近行为
二、散射截面及其物理意义
小结 Summary
中心力场下粒子的散射（中）
一、利用球面波展开平面波
二、一般势场的讨论
小结 Summary
附录
中心力场下粒子的散射（下）
小结 Summary`},
    {
        book_code: "10000000000000000000000000000002", chapter_name: "04 自旋及二能级系统", chapter_id: 4, description: `线性代数如何帮助我们理解量子力学
一、波函数与态矢
二、算符与矩阵
小结 Summary
微观粒子的磁矩是量子化的吗（上）
一、银原子在不均匀磁场中的运动
二、自旋算符和自旋态
小结 Summary
微观粒子的磁矩是量子化的吗（下）
一、任意方向上的自旋算符
二、自旋随时间演化
小结 Summary
最简单的量子体系是什么
一、二能级系统的定义
二、受扰动的二能级系统
小结 Summary
受扰动的二能级系统如何演化
一、基矢的选择：表象变换
二、方阵的对角化
三、二能级系统的含时演化和拉比振荡
小结 Summary`},
    {
        book_code: "10000000000000000000000000000002", chapter_name: "05 核磁共振", chapter_id: 5, description: `核磁共振是如何实现的
一、粒子自旋与磁场相互作用的直观图像
二、自旋在圆磁场中的演化与共振
三、核磁共振级数带来结构化学的新认知
小结 Summary`},
    {
        book_code: "10000000000000000000000000000002", chapter_name: "06 再访谐振子", chapter_id: 6, description: `再访谐振子
为何谐振子能量是分立的
一、薛定谔方程的渐近行为
二、谐振子的能谱——量子化是束缚态的必然结果
三、弥散的基态波函数阻止液氦凝固
小结 Summary
可以用代数方法求解谐振子吗
一、一维谐振子的哈密顿算符与升降算符
二、能谱与能量本征态
小结 Summary
三维谐振子的能量本征态是简并的吗
一、分解三维谐振子以得到能级表达式
二、用整数的分解求得各向同性谐振子的简并度
小结 Summary
如何求解相互作用的谐振子
一、经典耦合谐振子的运动的模式分解
二、量子化的耦合谐振子及其能级
小结 Summary`},
    {
        book_code: "10000000000000000000000000000002", chapter_name: "07 晶体的晶格与比热", chapter_id: 7, description: `晶体的晶格与比热
什么是谐振子链
一、排列在格点上的一维谐振子系统
二、谐振子链的集体模式分解
三、格点上的傅里叶分析
小结 Summary
谐振子链可以被量子化吗
一、谐振子链的正则量子化
二、算符的对易关系
小结 Summary
什么是声子
一、谐振子链上的升降算符
二、升降算符的作用与模式激发
三、谐振子链上的波粒二象性
小结 Summary
声子如何影响晶体的比热
一、固体比热的爱因斯坦模型
二、固体比热的德拜模型
小结 Summary`},
    {
        book_code: "10000000000000000000000000000002", chapter_name: "08 电子气体的简并压与白矮星", chapter_id: 8, description: `电子气体的简并压与白矮星
零温电子气体也存在压强吗
一、白矮星内部电子气体的特性
二、从微观视角理解压强来源
三、零温电子气体的简并压
小结 Summary
如何估算白矮星中心处的压强
一、恒星的演化末期
二、流体静平衡方程
三、估算白矮星中心处的压强
小结 Summary
具有1倍太阳质量的白矮星有多大
一、根据平衡条件得到白矮星的半径
二、分析具有1倍太阳质量的白矮星的情况
小结 Summary`},
    {
        book_code: "10000000000000000000000000000002", chapter_name: "09 电子气体的相对论修正与钱德拉塞卡极限", chapter_id: 9, description: `电子气体的相对论修正与钱德拉塞卡极限
相对论性粒子的量子力学是怎样的
一、相对论性粒子的色散关系
二、薛定谔方程与克莱因 - 戈尔登方程
三、相对论性粒子在一维无穷深势阱中的能级
小结 Summary
零温电子气体为什么有相对论效应
一、零温电子气体为什么会受相对论效应的影响
二、推导相对论性电子气体的压强公式
小结 Summary
白矮星的质量上限是多少
一、为什么估算白矮星半径时需要考虑相对论效应
二、极端相对论性电子气体的简并压
三、估算白矮星的质量上限：钱德拉塞卡极限
小结 Summary`},
    {
        book_code: "10000000000000000000000000000002", chapter_name: "10 氢原子基态能级的相对论修正", chapter_id: 10, description: `氢原子基态能级的相对论修正
相对论效应会怎么影响氢原子基态能级
一、氢原子的薛定谔方程、基态能级与基态波函数
二、非简并能级的微扰计算
三、氢原子基态能级的相对论修正
小结 Summary`},
    {
        book_code: "10000000000000000000000000000002", chapter_name: "11 奥本海默近似与化学键", chapter_id: 11, description: `奥本海默近似与化学键
怎么理解双原子分子的比热阶梯
一、玻恩 - 奥本海默近似：以氢分子为例
二、利用变分法求解基态波函数与基态能量的数学原理
小结 Summary
化学键的本质是什么
一、根据对称性选择试探波函数
二、求试探波函数的能量均值
三、化学键的物理成因
小结 Summary`},
    {
        book_code: "10000000000000000000000000000002", chapter_name: "12 用变分法计算氦原子的能级", chapter_id: 12, description: `用变分法计算氦原子的能级
氦原子的基态能量怎么求
一、多电子间的屏蔽效应
二、构造两个电子的试探波函数
三、初步计算试探波函数的能量均值
四、利用积分技巧计算能量均值的交叉项
五、氦原子的基态能量
小结 Summary`},
    {
        book_code: "10000000000000000000000000000002", chapter_name: "13 分析力学与双单摆", chapter_id: 13, description: `分析力学与双单摆
拉格朗日力学
一、几何光学的费马原理
二、从牛顿力学到变分原理
三、从变分原理到运动方程
四、拉格朗日力学
小结 Summary
从天体到弹簧摆
一、牛顿引力势下的质点运动
二、弹簧摆的动力学
小结 Summary
耦合双摆
一、耦合双摆系统
二、耦合双摆的运动方程
三、小角度耦合双摆的简正模式
四、小角度近似的合法性
小结 Summary
从拉格朗日力学到哈密顿力学
一、从拉格朗日力学到哈密顿力学
二、天体力学中的哈密顿函数
三、电磁场中带电粒子的拉格朗日函数
四、带电粒子在电磁场中运动的正则方程
小结 Summary`}])

// 评论内容
const commentContent = ref('');



// 评论列表
const commentColumns = ref([
    { title: '评论内容', colKey: 'description', key: 'description' },
    { title: '书籍名称', colKey: 'book_name', key: 'book_name' },
    { title: '章节名称', colKey: 'chapter_name', key: 'chapter_name' },
    { title: '创建时间', colKey: 'create_at', key: 'create_at' },
    { title: '更新时间', colKey: 'update_at', key: 'update_at' },
])
const commentContents = ref([
    { description: '这是一条评论', book_name: '《原子与分子》', chapter_name: '08 电子气体的简并压与白矮星', create_at: '2023-01-01 00:00:00', update_at: '2023-01-01 00:00:00' },
    { description: '这是另一条评论', book_name: '《原子与分子》', chapter_name: '09 电子气体的相对论修正与钱德拉塞卡极限', create_at: '2023-01-02 00:00:00', update_at: '2023-01-02 00:00:00' },
    { description: '这是第三条评论', book_name: '《原子与分子》', chapter_name: '10 氢原子基态能级的相对论修正', create_at: '2023-01-03 00:00:00', update_at: '2023-01-03 00:00:00' },
    { description: '这是第四条评论', book_name: '《原子与分子》', chapter_name: '11 奥本海默近似与化学键', create_at: '2023-01-04 00:00:00', update_at: '2023-01-04 00:00:00' },
    { description: '这是第五条评论', book_name: '《原子与分子》', chapter_name: '12 用变分法计算氦原子的能级', create_at: '2023-01-05 00:00:00', update_at: '2023-01-05 00:00:00' },
    { description: '这是第六条评论', book_name: '《原子与分子》', chapter_name: '13 分析力学与双单摆', create_at: '2023-01-06 00:00:00', update_at: '2023-01-06 00:00:00' },
    { description: '这是第七条评论', book_name: '《原子与分子》', chapter_name: '14 从拉格朗日力学到哈密顿力学', create_at: '2023-01-07 00:00:00', update_at: '2023-01-07 00:00:00' },
])

// 分页
const pagination = ref({
    total: commentContents.value.length,
    defaultCurrent: 1,
    defaultPageSize: 5,
    current: 1, // 添加当前页码控制
})

// 评论提交函数
const handleSendComment = () => {
    if (commentContent.value.trim() === '') {
        // ElMessage.warning('请输入评论内容');
        return;
    }
    // 提交评论逻辑
    commentContents.value.unshift({
        description: commentContent.value,
        book_name: selectedBook.value.title,
        chapter_name: '暂时是假数据',
        create_at: new Date().toLocaleString(),
        update_at: new Date().toLocaleString(),
    })

    // 更新分页信息，确保表格总数据量正确
    pagination.value.total = commentContents.value.length;
    
    // 重置到第一页，确保新添加的评论立即显示
    pagination.value.current = 1;
    
    // 清空评论内容
    commentContent.value = '';
}
</script>
<style lang='scss' scoped>
.container {
    display: block;
    width: 95%;
    margin: 0 auto;
    background-color: #F5F7FA;


}

// 打卡区域
.book-clock-in {
    display: flex;
    direction: column;

    // 评论输入区域
    .comment-in {
        display: flex;
        flex-direction: column;

        margin: 10px;
        padding: 10px;
        gap: 30px;
        max-width: 75%;

        .chapter-radio-group {
            gap: 10px;
        }

        .comment-input {
            display: block;

            .comment-btn {
                border: 1px solid #d3cfcf;
                display: flex;
                justify-content: space-between;
                padding: 0 10px;

                .btn-icon-item {
                    font-size: 20px;
                    margin: 5px 8px;
                }

            }
        }
    }



    // 书籍区域
    .books {
        flex: 1;

        // max-width: 400px;
    }
}

// 评论区域
.book-comment {

    margin: 10px;

}
</style>
