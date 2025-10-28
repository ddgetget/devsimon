import type { EChartsOption } from 'echarts';
/**
 * 生成用于 ECharts 的 Bump Chart（排名变化图）配置项
 * @returns {Object} ECharts 配置对象
 */

function createBumpChartOption() {
    const names = [
        'Orange',
        'Tomato',
        'Apple',
        'Sakana',
        'Banana',
        'Iwashi',
        'Snappy Fish',
        'Lemon',
        'Pasta'
    ];
    const years = ['2001', '2002', '2003', '2004', '2005', '2006'];

    // Fisher-Yates 洗牌算法
    const shuffle = (array: any[]) => {
        const arr = [...array]; // 避免修改原数组
        let currentIndex = arr.length;
        let randomIndex;

        while (currentIndex > 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
        }
        return arr;
    };

    // 生成每个名称在各年份的排名数据
    const generateRankingData = () => {
        const map = new Map();
        const defaultRanking = Array.from({ length: names.length }, (_, i) => i + 1);

        for (const _ of years) {
            const shuffledRanking = shuffle(defaultRanking);
            names.forEach((name, i) => {
                const current = map.get(name) || [];
                map.set(name, [...current, shuffledRanking[i]]);
            });
        }
        return map;
    };

    // 生成 ECharts series 列表
    const generateSeriesList = () => {
        const seriesList: any[] = [];
        const rankingMap = generateRankingData();

        rankingMap.forEach((data, name) => {
            seriesList.push({
                name,
                symbolSize: 20,
                type: 'line',
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
                endLabel: {
                    show: true,
                    formatter: '{a}',
                    distance: 20
                },
                lineStyle: {
                    width: 4
                },
                data
            });
        });

        return seriesList;
    };

    // 返回完整的 ECharts 配置
    return {
        title: {
            text: 'Bump Chart (Ranking)'
        },
        tooltip: {
            trigger: 'item'
        },
        grid: {
            left: 30,
            right: 110,
            bottom: 30,
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            splitLine: {
                show: true
            },
            axisLabel: {
                margin: 30,
                fontSize: 16
            },
            boundaryGap: false,
            data: years
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                margin: 30,
                fontSize: 16,
                formatter: '#{value}'
            },
            inverse: true,
            interval: 1,
            min: 1,
            max: names.length
        },
        series: generateSeriesList()
    };
}


// 生成用于 ECharts 的 Polar Chart（极坐标图）配置项
/**
 * 生成用于 ECharts 的 Polar Chart（极坐标图）配置项
 * @returns {Object} ECharts 配置对象
 */

function createPolarChartOption(): any {
    const data: number[][] = [];

    for (let i = 0; i <= 360; i++) {
        const t = (i / 180) * Math.PI;
        const r = Math.sin(2 * t) * Math.cos(2 * t);
        data.push([r, i]);
    }

    return {
        title: {
            text: 'Two Value-Axes in Polar'
        },
        legend: {
            data: ['line']
        },
        polar: {
            center: ['50%', '54%']
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        angleAxis: {
            type: 'value',
            startAngle: 0
        },
        radiusAxis: {
            min: 0
        },
        series: [
            {
                coordinateSystem: 'polar',
                name: 'line',
                type: 'line',
                showSymbol: false,
                data: data
            }
        ],
        animationDuration: 2000
    };
}




/**
 * 生成 GitHub 风格的 Punch Card（打卡图）ECharts 配置
 * @param hours - 小时标签数组，如 ['12a', '1a', ..., '11p']
 * @param days - 星期标签数组，如 ['Saturday', 'Friday', ..., 'Sunday']
 * @param data - 三维数据数组，格式为 [dayIndex, hourIndex, commitCount][]
 * @returns ECharts 配置对象
 */

function createGithubPunchCardOption(

): EChartsOption {
    // ===== 示例使用 =====
    const hours = [
        '12a', '1a', '2a', '3a', '4a', '5a', '6a',
        '7a', '8a', '9a', '10a', '11a',
        '12p', '1p', '2p', '3p', '4p', '5p',
        '6p', '7p', '8p', '9p', '10p', '11p'
    ];

    const days = [
        'Saturday', 'Friday', 'Thursday',
        'Wednesday', 'Tuesday', 'Monday', 'Sunday'
    ];

    const data: [number, number, number][] = [
        [0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2],
        [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5],
        [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2],
        [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2],
        [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2],
        [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4],
        [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4],
        [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1],
        [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4],
        [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0],
        [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1],
        [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0],
        [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0],
        [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]
    ];
    return {
        title: {
            text: 'Punch Card of Github'
        },
        legend: {
            data: ['Punch Card'],
            left: 'right'
        },
        polar: {},
        tooltip: {
            formatter: (params: any) => {
                // params.value 类型为 [dayIndex, hourIndex, count]
                const val = params.value as [number, number, number];
                return `${val[2]} commits in ${hours[val[1]]} of ${days[val[0]]}`;
            }
        },
        angleAxis: {
            type: 'category',
            data: hours,
            boundaryGap: false,
            splitLine: {
                show: true
            },
            axisLine: {
                show: false
            }
        },
        radiusAxis: {
            type: 'category',
            data: days,
            axisLine: {
                show: false
            },
            axisLabel: {
                rotate: 45
            }
        },
        series: [
            {
                name: 'Punch Card',
                type: 'scatter',
                coordinateSystem: 'polar',
                symbolSize: (val: [number, number, number]) => val[2] * 2,
                data,
                animationDelay: (idx: number) => idx * 5
            }
        ]
    };
}



/**
 * 生成 AQI 雷达图的 ECharts 配置
 * @returns ECharts 配置对象
 */
function createAQIRadarChartOption(

): EChartsOption {
    // ===== 示例数据（保持原始格式）=====
    const dataBJ: number[][] = [
        [55, 9, 56, 0.46, 18, 6, 1],
        [25, 11, 21, 0.65, 34, 9, 2],
        // ...（其余数据保持不变）
        [31, 12, 30, 0.5, 32, 16, 24],
        [42, 27, 43, 1, 53, 22, 25],
        [154, 117, 157, 3.05, 92, 58, 26],
        [234, 185, 230, 4.09, 123, 69, 27],
        [160, 120, 186, 2.77, 91, 50, 28],
        [134, 96, 165, 2.76, 83, 41, 29],
        [52, 24, 60, 1.03, 50, 21, 30],
        [46, 5, 49, 0.28, 10, 6, 31]
    ];

    const dataGZ: number[][] = [
        [26, 37, 27, 1.163, 27, 13, 1],
        [85, 62, 71, 1.195, 60, 8, 2],
        // ...（其余数据保持不变）
        [81, 48, 62, 1.619, 26, 3, 27],
        [56, 48, 68, 1.336, 37, 9, 28],
        [82, 92, 174, 3.29, 0, 13, 29],
        [106, 116, 188, 3.628, 101, 16, 30],
        [118, 50, 0, 1.383, 76, 11, 31]
    ];

    const dataSH: number[][] = [
        [91, 45, 125, 0.82, 34, 23, 1],
        [65, 27, 78, 0.86, 45, 29, 2],
        // ...（其余数据保持不变）
        [93, 68, 96, 1.05, 79, 29, 28],
        [188, 143, 197, 1.66, 99, 51, 29],
        [174, 131, 174, 1.55, 108, 50, 30],
        [187, 143, 201, 1.39, 89, 53, 31]
    ];
    const lineStyle = {
        width: 1,
        opacity: 0.5
    };

    return {
        backgroundColor: '#161627',
        title: {
            text: 'AQI - Radar',
            left: 'center',
            textStyle: {
                color: '#eee'
            }
        },
        legend: {
            bottom: 5,
            data: ['Beijing', 'Shanghai', 'Guangzhou'],
            itemGap: 20,
            textStyle: {
                color: '#fff',
                fontSize: 14
            },
            selectedMode: 'single'
        },
        radar: {
            indicator: [
                { name: 'AQI', max: 300 },
                { name: 'PM2.5', max: 250 },
                { name: 'PM10', max: 300 },
                { name: 'CO', max: 5 },
                { name: 'NO2', max: 200 },
                { name: 'SO2', max: 100 }
            ],
            shape: 'circle',
            splitNumber: 5,
            axisName: {
                color: 'rgb(238, 197, 102)'
            },
            splitLine: {
                lineStyle: {
                    color: [
                        'rgba(238, 197, 102, 0.1)',
                        'rgba(238, 197, 102, 0.2)',
                        'rgba(238, 197, 102, 0.4)',
                        'rgba(238, 197, 102, 0.6)',
                        'rgba(238, 197, 102, 0.8)',
                        'rgba(238, 197, 102, 1)'
                    ].reverse()
                }
            },
            splitArea: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(238, 197, 102, 0.5)'
                }
            }
        },
        series: [
            {
                name: 'Beijing',
                type: 'radar',
                lineStyle,
                data: dataBJ,
                symbol: 'none',
                itemStyle: {
                    color: '#F9713C'
                },
                areaStyle: {
                    opacity: 0.1
                }
            },
            {
                name: 'Shanghai',
                type: 'radar',
                lineStyle,
                data: dataSH,
                symbol: 'none',
                itemStyle: {
                    color: '#B3E4A1'
                },
                areaStyle: {
                    opacity: 0.05
                }
            },
            {
                name: 'Guangzhou',
                type: 'radar',
                lineStyle,
                data: dataGZ,
                symbol: 'none',
                itemStyle: {
                    color: 'rgb(238, 197, 102)'
                },
                areaStyle: {
                    opacity: 0.05
                }
            }
        ]
    };
}

import * as echarts from 'echarts';


/**
 * 生成指定年份的日历热力图（Calendar Heatmap）ECharts 配置
 * @param year - 年份字符串，如 '2017'
 * @param maxValue - 随机数据的最大值（默认 10000）
 * @returns ECharts 配置对象
 */
function createCalendarHeatmapOption(
    year: string,
    maxValue: number = 10000
): EChartsOption {
    const getVirtualData = (): [string, number][] => {
        const startDate = +echarts.time.parse(`${year}-01-01`);
        const endDate = +echarts.time.parse(`${year}-12-31`);
        const dayMs = 24 * 3600 * 1000;
        const data: [string, number][] = [];

        for (let time = startDate; time <= endDate; time += dayMs) {
            data.push([
                echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
                Math.floor(Math.random() * maxValue)
            ]);
        }
        return data;
    };

    return {
        visualMap: {
            show: false,
            min: 0,
            max: maxValue
        },
        calendar: {
            range: year
        },
        series: [{ // 👈 必须是数组！
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: getVirtualData()
        }]
    };
}



export const random_echarts_datas = [
    { "name": "凹凸图", "url": "https://echarts.apache.org/examples/zh/editor.html?c=bump-chart&lang=ts", "option": createBumpChartOption() },
    { "name": "Polar", "url": "https://echarts.apache.org/examples/zh/editor.html?c=line-polar2&lang=ts", "option": createPolarChartOption() },
    { "name": "Punch Card", "url": "https://echarts.apache.org/examples/zh/editor.html?c=scatter-polar-punchCard&lang=ts", "option": createGithubPunchCardOption() },
    { "name": "AQI Radar", "url": "https://echarts.apache.org/examples/zh/editor.html?c=radar-aqi&lang=ts", "option": createAQIRadarChartOption() },
    { "name": "Calendar Heatmap", "url": "https://echarts.apache.org/examples/zh/editor.html?c=calendar-simple&lang=ts", "option": createCalendarHeatmapOption('2025') },

]