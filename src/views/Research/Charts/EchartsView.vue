<template>
    <div class="echart-page">
        <t-card class="config-card" header="图表配置">
            <!-- 移除 :data="formData"，因为我们直接用 ref -->
            <t-form>
                <t-form-item label="模式:">
                    <t-radio-group v-model="input_mode">
                        <t-radio value="data">数据</t-radio>
                        <t-radio value="url">URL</t-radio>

                    </t-radio-group>
                </t-form-item>

                <t-form-item v-show="input_mode === 'data'" label="数据:">
                    <t-textarea v-model="input_data"
                        placeholder='请输入JSON格式的图表数据，例如：{"categories": ["A", "B", "C"], "values": [10, 20, 30]}'
                        :autosize="{ minRows: 4, maxRows: 6 }" />
                </t-form-item>

                <t-form-item v-show="input_mode === 'url'" label="URL:">
                    <t-input v-model="input_url" placeholder="请输入数据源地址" clearable />
                </t-form-item>

                <t-divider />

                <div class="submit">
                    <t-button @click="updateChart" :loading="loading">更新</t-button>
                    <t-button @click="resetChart">重置</t-button>
                    <t-button @click="randomChart">随机</t-button>
                </div>

                <div v-show="random_tag" class="random_tag">
                    <div>名称: {{ random_info.name }}</div>
                    <t-button @click="toRandomUrl(random_info.url)" size="small">
                        打开链接
                    </t-button>
                </div>
            </t-form>
        </t-card>

        <t-card class="chart-card" header="数据可视化">
            <!-- 确保 chartOptions 有初始值 -->
            <MyEchartsEChart :options="chartOptions as any" width="80%" height="500px" class="echart-container" />
        </t-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MyEchartsEChart from '@/components/MyEcharts.vue'
import type { EChartsOption } from 'echarts'
import { MessagePlugin } from 'tdesign-vue-next'
import { random_echarts_datas } from '@/views/Research/Charts/charts_random_data'

// 定义 random_info 的类型（根据你的数据结构调整）
interface RandomChartInfo {
    name: string
    url: string
    option: EChartsOption
}

// 初始化 chartOptions 为默认值，避免 undefined
const chartOptions = ref<EChartsOption>({
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
        }
    ]
})

const input_mode = ref<'data' | 'url'>('data')
const input_data = ref('')
const input_url = ref('')
const loading = ref(false)

const random_tag = ref(false)
const random_info = ref<RandomChartInfo>({
    name: '',
    url: '',
    option: {}
})

const updateChart = () => {
    random_tag.value = false
    loading.value = true
    try {
        if (input_mode.value === 'data' && input_data.value) {
            const parsedData = JSON.parse(input_data.value)
            chartOptions.value = parsedData
            MessagePlugin.success('图表更新成功')
        } else if (input_mode.value === 'url' && input_url.value) {
            MessagePlugin.info('URL数据源功能开发中')
        } else {
            MessagePlugin.warning('请输入数据或URL')
        }
    } catch (error) {
        console.error('数据解析错误:', error)
        MessagePlugin.error('数据格式错误，请检查输入')
    } finally {
        loading.value = false
    }
}

const resetChart = () => {
    random_tag.value = false
    input_data.value = ''
    input_url.value = ''
    // 重置为默认配置
    chartOptions.value = chartOptions.value
    MessagePlugin.info('图表已重置')
}

const randomChart = () => {
    random_tag.value = true
    const randomIndex = Math.floor(Math.random() * random_echarts_datas.length)
    const selected = random_echarts_datas[randomIndex]
    // @ts-ignore
    random_info.value = selected

    // @ts-ignore
    chartOptions.value = selected.option
    // @ts-ignore
    input_data.value = JSON.stringify(selected.option, null, 2)
    MessagePlugin.success('随机图表更新成功')
}

const toRandomUrl = (url: string) => {
    window.open(url, '_blank')
}


</script>

<style lang="scss" scoped>
.echart-page {
    padding: 2px;
    display: flex;
    margin: 0 auto;
    gap: 5px;
}

.config-card {
    border-radius: 5px;
    width: 350px; // 固定配置面板宽度，避免挤压
    flex-shrink: 0;

    .submit {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        gap: 10px;
    }

    .random_tag {
        margin-top: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 10px;
    }
}

.chart-card {
    flex: 1;
    border-radius: 5px;
    display: flex;
    flex-direction: column;

    .echart-container {
        margin: 0 auto;
        width: 80%;
        height: 500px;
    }
}
</style>