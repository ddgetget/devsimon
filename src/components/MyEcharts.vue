<template>
    <div ref="chartRef" class="echart-container" :style="{ width, height }"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted, unref } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

interface Props {
    /**
     * 静态 ECharts 配置项（响应式）
     */
    options?: EChartsOption
    /**
     * 异步获取配置项的函数（优先级高于 options）
     */
    fetchOptions?: () => Promise<EChartsOption>
    width?: string
    height?: string
}

const props = withDefaults(defineProps<Props>(), {
    width: '100%',
    height: '400px'
})

const chartRef = ref<HTMLDivElement | null>(null)
let chartInstance: echarts.ECharts | null = null

// 安全设置 option，防止格式错误导致崩溃
const safeSetOption = (option: unknown) => {
    if (!chartInstance) return

    if (typeof option !== 'object' || option === null) {
        console.warn('[EChart] Invalid options: not an object')
        chartInstance.clear()
        return
    }

    const opt = option as EChartsOption
    if (!Array.isArray(opt.series)) {
        console.warn('[EChart] Invalid options: missing or invalid "series"')
        chartInstance.clear()
        return
    }

    try {
        chartInstance.setOption(opt, true) // true 表示不合并，避免旧数据残留
    } catch (err) {
        console.error('[EChart] setOption failed:', err)
        chartInstance.clear()
    }
}

// 渲染图表主逻辑
const renderChart = async () => {
    if (!chartRef.value) return

    if (!chartInstance) {
        chartInstance = echarts.init(chartRef.value)
    }

    // 判断是否有有效配置
    const hasStaticOptions = props.options !== undefined && props.options !== null
    const isUsingAsync = !!props.fetchOptions

    // 只要没有 ready 的 options，就显示 loading
    if (!hasStaticOptions || isUsingAsync) {
        chartInstance.showLoading({
            text: '加载中...',
            color: '#409eff',
            textColor: '#666',
            maskColor: 'rgba(255, 255, 255, 0.8)'
        })
    }

    try {
        let finalOptions: EChartsOption | undefined

        if (props.fetchOptions) {
            // 优先使用异步方式
            finalOptions = await props.fetchOptions()
        } else if (props.options) {
            // 使用静态 options
            finalOptions = unref(props.options)
        }

        chartInstance.hideLoading()

        if (finalOptions) {
            safeSetOption(finalOptions)
        } else {
            chartInstance.clear()
        }
    } catch (error) {
        console.error('[EChart] Failed to load chart options:', error)
        chartInstance.hideLoading()
        chartInstance.clear()
    }
}

// 监听 options 变化（深度监听，因为 EChartsOption 是嵌套对象）
watch(
    () => props.options,
    () => {
        renderChart()
    },
    { deep: true }
)

// 如果 fetchOptions 是 ref 函数，也可以监听（一般不需要，除非动态切换函数）
// watch(() => props.fetchOptions, renderChart)

onMounted(() => {
    renderChart()
    window.addEventListener('resize', handleResize)
})

const handleResize = () => {
    chartInstance?.resize()
}

onUnmounted(() => {
    if (chartInstance) {
        chartInstance.dispose()
        chartInstance = null
    }
    window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.echart-container {
    width: 100%;
    height: 100%;
    min-height: 200px;
}
</style>