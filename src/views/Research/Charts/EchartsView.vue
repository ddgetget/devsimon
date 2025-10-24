<template>
    <div class="echart-page">
        <t-card class="config-card" header="图表配置">
            <t-form :data="formData">
                <t-form-item label="模式:">
                    <t-radio-group v-model="input_mode">
                        <t-radio value="data">数据输入</t-radio>
                        <t-radio value="url">URL输入</t-radio>
                    </t-radio-group>
                </t-form-item>

                <t-form-item v-show="input_mode === 'data'" label="数据:">
                    <t-textarea v-model="input_data"
                        placeholder="请输入JSON格式的图表数据，例如：{&quot;categories&quot;: [&quot;A&quot;, &quot;B&quot;, &quot;C&quot;], &quot;values&quot;: [10, 20, 30]}"
                        :autosize="{ minRows: 4, maxRows: 6 }" />
                </t-form-item>

                <t-form-item v-show="input_mode === 'url'" label="URL:">
                    <t-input v-model="input_url" placeholder="请输入数据源地址" clearable></t-input>
                </t-form-item>

                <t-divider />


            </t-form>
            <div class="submit">
                <t-button @click="updateChart" :loading="loading">
                    更新
                </t-button>
                <t-button @click="resetChart">
                    重置
                </t-button>
            </div>
        </t-card>

        <t-card class="chart-card" header="数据可视化">
            <MyEchartsEChart :options="chartOptions" width="80%" height="500px" class="echart-container" />
        </t-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import MyEchartsEChart from '@/components/MyEcharts.vue'
import type { EChartsOption } from 'echarts'
import { MessagePlugin } from 'tdesign-vue-next'

const chartOptions = ref<EChartsOption>()
const input_mode = ref('data')
const input_data = ref('')
const input_url = ref('')
const loading = ref(false)

const formData = reactive({
    mode: input_mode,
    data: input_data,
    url: input_url
})
const defaultOptions = ref<EChartsOption>({
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
}
)

const updateChart = () => {
    loading.value = true
    try {
        if (input_mode.value === 'data' && input_data.value) {
            // 解析输入的数据
            const parsedData = JSON.parse(input_data.value)
            console.log("先使用本地的测试")
            // @ts-ignore
            chartOptions.value = defaultOptions.value


            MessagePlugin.success('图表更新成功')
        } else if (input_mode.value === 'url' && input_url.value) {
            // 这里可以实现从URL获取数据的逻辑
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
    input_data.value = ''
    input_url.value = ''

    // 恢复默认图表
    // @ts-ignore
    chartOptions.value = defaultOptions.value


    MessagePlugin.info('图表已重置')
}

onMounted(async () => {
    // 模拟接口请求
    await new Promise(resolve => setTimeout(resolve, 100))
    // @ts-ignore
    chartOptions.value = defaultOptions.value

})
</script>

<style lang="scss" scoped>
.echart-page {
    padding: 2px;
    display: flex;
    margin: 0 auto;
    gap: 5px;

    .config-card {
        border-radius: 5px;

        .submit {
            margin-top: 20px;
            display: flex;
            justify-content: center;
            gap: 10px;
        }
    }

    .chart-card {
        flex: 1;
        border-radius: 5px;

        align-items: center;


        .echart-container {
            display: flex;
            margin: 0 auto;
        }
    }
}
</style>