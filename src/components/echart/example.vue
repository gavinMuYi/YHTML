<template>
    <div class="y-echart_example">
        <div class="chart-box">
            <y-echart :options="options" />
        </div>
    </div>
</template>

<script>
import YEchart from './src/index';
export default {
    name: 'YEchartExample',
    components: {
        YEchart
    },
    data() {
        return {
            options: {
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [
                    {
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }
                ]
            }
        };
    },
    methods: {
    }
};
</script>

<style lang="less">
    .y-echart_example {
        .chart-box {
            height: 300px;
        }
    }
</style>
