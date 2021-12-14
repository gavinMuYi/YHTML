<template>
    <div class="key-index-chart"
         :style="`height: ${chartStyle.height === 65 ? 45 : chartStyle.height}px;width: ${chartStyle.width}px`">
        <!-- <v-chart :kind="kind" :series="series" :options="style">
        </v-chart> -->
        {{ series }}
    </div>
</template>

<script>
import { defaultColors } from '../utils';

export default {
    name: 'KeyIndexChart',
    inject: ['_cache'],
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
        let style = {
            colors: defaultColors,
            chart: {
                spacing: [0, 0, 0, 0],
                ...this.chartStyle
            },
            tooltip: {
                enabled: this.options.tooltip
            }
        };
        this.options.type === 'cycle' && (
            style.plotOptions = {
                pie: {
                    innerSize: '80%'
                }
            }
        );
        return {
            series: [],
            style: style,
            kind: this.options.type === 'cycle' ? 'pie' : this.options.type
        };
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
                        data: [],
                        showInLegend: false
                    });
                    this.options.index.forEach(index => {
                        /* eslint-disable */
                        for (let key in data[0]) {
                            index.key === key && this.series[0].data.push({
                                name: index.label,
                                y: data[0][key]
                            });
                        }
                    });
                    break;
                }
                case 'line':
                case 'column': {
                    this.series = [];
                    this.options.index.forEach(index => {
                        let vals = [];
                        data.forEach(item => {
                            vals.push(item[index.key]);
                        });
                        this.series.push({
                            name: index.label,
                            data: vals
                        });
                    });
                    let categories = [];
                    data.forEach(item => {
                        categories.push(item[this.options.dimension[0].key]);
                    });
                    this.$set(this.style, 'xAxis', {
                        categories: categories
                    });
                    this.style.chart.spacing = [20, 0, 5, 0];
                    break;
                }
            }
        }
    },
}
</script>

<style lang="less">
.key-index-chart {
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
