<template>
    <div class="dashboard-chart"
         :style="`height: ${localStyle.height || 45}px;width: ${localStyle.width || 45}px`">
        <y-echart
            :wait="100"
            :options="currentOptions"
            :style="`height: ${localStyle.height || 45}px;width: ${localStyle.width || 45}px`">
        </y-echart>
    </div>
</template>

<script>
import { defaultColors } from '../utils';
import YEchart from '@/components/echart';

export default {
    name: 'DashboardChart',
    inject: ['_cache'],
    components: {
        YEchart
    },
    props: {
        options: {
            type: Object,
            default: () => {
                return {};
            }
        },
        chartStyle: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    data() {
        let localStyle = {
            height: this.chartStyle.height,
            width: this.chartStyle.width,
        };
        if (this.chartStyle.height === 65) {
            localStyle.height = 45;
            localStyle.width = 45;
        }
        let style = {
            color: defaultColors,
            legend: {
                padding: [0, 0, 0, 0],
                bottom: 10,
                ...this.chartStyle,
                ...localStyle,
                type: 'scroll'
            },
            grid: {
                top: 10
            },
            tooltip: {
                show: this.options.tooltip
            }
        };
        return {
            series: [],
            style: style,
            localStyle: localStyle,
            kind: this.options.type === 'cycle' ? 'pie' : this.options.type
        };
    },
    computed: {
        currentOptions() {
            return {
                series: this.series,
                ...this.style
            };
        }
    },
    watch: {
        '_cache.dataSource': {
            handler: function (newValue, oldValue) {
                newValue[this.options.url] && this.processChartData(newValue[this.options.url].records);
            },
            deep: true
        }
    },
    mounted() {
        this._cache.dataSource[this.options.url]
            && this.processChartData(this._cache.dataSource[this.options.url].records);
    },
    methods: {
        processChartData(data) {
            switch (this.options.type) {
                case 'pie':
                case 'cycle': {
                    this.series = [];
                    this.series.push({
                        type: 'pie',
                        data: [],
                        label: {
                            show: false
                        }
                    });
                    this.style.legend.show = false;
                    this.options.type === 'cycle' && this.$set(this.series[0], 'radius', ['50%', '80%']);
                    this.options.index.forEach(index => {
                        /* eslint-disable */
                        for (let key in data[0]) {
                            index.key === key && this.series[0].data.push({
                                name: index.label,
                                value: data[0][key]
                            });
                        }
                    });
                    break;
                }
                case 'line':
                case 'bar': {
                    this.series = [];
                    this.options.index.forEach(index => {
                        let vals = [];
                        data.forEach(item => {
                            vals.push(item[index.key]);
                        });
                        this.series.push({
                            name: index.label,
                            data: vals,
                            type: this.options.type
                        });
                    });
                    let categories = [];
                    data.forEach(item => {
                        categories.push(item[this.options.dimension[0].key]);
                    });
                    this.$set(this.style, 'xAxis', {
                        data: categories
                    });
                    this.$set(this.style, 'yAxis', {});
                    this.style.legend.padding = [0, 0, 0, 0];
                    break;
                }
            }
        }
    },
}
</script>

<style lang="less">
.dashboard-chart {
    width: 100%;
    overflow: hidden;
    text-align: center;
    font-size: 14px;
    display: inline-block;
    vertical-align: bottom;
    .v-chart {
        height: 100%;
        .v-chart__chart {
            height: 100%;
        }      
    }
}
</style>
