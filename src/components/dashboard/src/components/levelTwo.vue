<template>
    <div class="level-two">
        <y-tip ref="fieldInfoTip" kind="large" clazz="field-info-tip" placement="bottom-middle">
            <div slot-scope="props">
                <div v-if="props.data">
                    <info-content :info="props.data" />
                </div>
            </div>
        </y-tip>
        <y-tip ref="fieldlevelTip" kind="large" clazz="field-level-tip" placement="bottom-middle">
            <div slot-scope="props">
                <div v-if="props.data">
                    <level-three
                        :inTip="true"
                        :options="props.data.levelThreeFields"
                        :chartOptions="props.data.levelThreeChart"
                        :colors="props.data.levelThreeChart[0] ? props.data.levelThreeChart[0].colors : []" />
                </div>
            </div>
        </y-tip>
        <div class="level-two-content" ref="levelTwoContent">
            <div class="level-two-columns">
                <div
                    class="level-two-column"
                    v-for="(column, coli) in options"
                    :key="'column' + coli + Math.random()"
                    :style="{
                        'margin-right': options.length > 1 && !coli ? '20px' : '0',
                        'margin-left': options.length > 1 && coli ? '20px' : '0',
                        'max-width': `calc(${100/options.length}% - ${options.length > 1 ? 20 : 0}px)`
                }">
                    <div
                        class="col-title"
                        v-if="column.columnTitle"
                        :title="column.columnTitle">
                        {{ column.columnTitle }}
                    </div>
                    <div class="level-two-fields">
                        <div class="level-two-field" v-for="(field, i) in column.fields" :key="i">
                            <div class="label-box">
                                <div class="label" :title="field.label"
                                     :style="`max-width: calc(100% - ${field.child ? 15 : 0}px - ${field.info.length ? 20 : 0}px)`">
                                    {{ field.label }}
                                </div>
                                <y-icon name="question" v-if="field.info.length" class="info-tip"
                                        v-ytip:fieldInfoTip.hover.delay="{data: field.info}" />
                                <y-icon name="double-arrow-up" v-ytip:fieldlevelTip.hover.delay="{data: field.child}"
                                        v-if="field.child" class="arrow-down-tip" />
                            </div>
                            <div class="value">
                                <span v-if="field.kind">
                                    <span :style="{'padding-right': '13px'}" :title="Math.abs(computeField(field))"
                                          class="value-text">
                                        <span :style="bindStyle(field)">
                                            {{ computeUnit(computeField(field)) }}
                                            {{ Math.abs(computeField(field)) || '-' }}
                                        </span>
                                    </span>
                                    <span class="value-unit" :style="{...bindStyle(field), 'width': '13px'}">%</span>
                                </span>
                                <span v-else>
                                    <span :style="{'padding-right': field.unit ? (field.unit.length * 13 + 'px') : '0'}"
                                          :title="_cache.dataSource[field.url]
                                              && _cache.dataSource[field.url].records[0]
                                              ? valueFormatter(_cache.dataSource[field.url].records[0][field.key],
                                                               field.format, field.formatter)
                                          : '-'" class="value-text">
                                        <span :style="bindStyle(field)">
                                            {{ _cache.dataSource[field.url] && _cache.dataSource[field.url].records[0]
                                                ? valueFormatter(
                                                    _cache.dataSource[field.url].records[0][field.key],
                                                    field.format, field.formatter)
                                                : '-'
                                            }}
                                        </span>
                                    </span>
                                    <span class="value-unit" v-if="field.unit"
                                          :style="{'width': field.unit.length * 13 + 'px'}">{{ field.unit }}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="level-two-chart" ref="levelTwoChart">
                <dashboard-chart :options="chartOptions[0]" :chartStyle="chartStyle"
                                 v-if="getSpace && chartOptions.length" />
                <div class="level-two-chart-field" v-if="chartFields.length" ref="levelTwoChartFields">
                    <level-three ref="levelThree" :options="chartFields" :levelHight="levelHight"
                                 :colors="chartOptions[0].colors" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DashboardChart from './dashboardChart';
import LevelThree from './LevelThree';
import InfoContent from './infoContent';
import { valueFormatter, computeData } from '../processData';

export default {
    name: 'LevelTwo',
    components: {
        DashboardChart,
        LevelThree,
        InfoContent
    },
    inject: ['_cache'],
    props: {
        options: {
            type: Array,
            default: () => {
                return [];
            }
        },
        chartOptions: {
            type: Array,
            default: () => {
                return [];
            }
        },
        chartFields: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    data() {
        return {
            chartStyle: {
                height: 0
            },
            getSpace: false,
            levelHight: 'hidden',
            valueFormatter: valueFormatter
        };
    },
    mounted() {
        if (this.$refs.levelTwoChartFields) {
            // this.$refs.levelTwoChartFields.style.height = this.$refs.levelTwoChart.offsetWidth * 0.45 + 'px';
            this.levelHight = this.$refs.levelTwoChart.offsetWidth * 0.45 + 'px';
            this.$refs.levelTwoChartFields.style.width
                = `calc(100% - ${this.$refs.levelTwoChart.offsetWidth * 0.45}px)`;
        }
        this.chartStyle.height = this.$refs.levelTwoChart.offsetWidth * 0.45;
        this.chartFields.length && (this.chartStyle.width = this.$refs.levelTwoChart.offsetWidth * 0.45);
        this.getSpace = true;
    },
    methods: {
        computeField(field) {
            if (!this._cache.dataSource[field.url]) {
                return '-';
            }
            /* eslint-disable */
            let { total, ...args } = this._cache.dataSource[field.url];
            let computedData = computeData(args, [field.kind]);
            return computedData['result-' + field.kind][field.key];
        },
        computeUnit(data) {
            return data > 0 ? '↑' : (data < 0 ? '↓' : '');
        },
        bindStyle(field) {
            if (!this._cache.dataSource[field.url]) {
                return;
            }
            let _baseStyle = { 'color': field.color };
            let fontColor = {};
            if (field.kind) {
                fontColor = {'color': this.computeField(field) > 0
                                ? '#F75559' : (this.computeField(field) < 0 ? '#00D48A' : '#1E2330')};
            }

            return { ..._baseStyle, ...fontColor };
        }
    }
};
</script>

<style lang="less">
.level-two {
    box-sizing: border-box;
    position: relative;
    .level-two-content {
        width: 100%;
        padding-top: 20px;
        .level-two-columns {
            display: flex;
            .level-two-column {
                flex: 1;
                box-sizing: border-box;
                .col-title {
                    display: inline-block;
                    font-size: 13px;
                    height: 13px;
                    line-height: 14px;
                    color: @fontGray;
                    margin-bottom: 8px;
                    max-width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .level-two-fields {
                    width: 100%;
                    .level-two-field {
                        font-size: 0;
                        height: 13px;
                        line-height: 14px;
                        margin-bottom: 10px;
                        .label-box {
                            font-size: 13px;
                            box-sizing: border-box;
                            padding-right: 6.6px;
                            display: inline-block;
                            width: 55%;
                            overflow: hidden;
                            height: 14px;
                            .arrow-down-tip {
                                position: relative;
                                top: -2px;
                            }
                            .label {
                                font-size: 13px;
                                box-sizing: border-box;
                                color: @fontGray;
                                display: inline-block;
                                max-width: 100%;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                            .y-icon-content {
                                display: inline-block;
                                position: relative;
                                top: 0px;
                            }
                            .y-icon {
                                display: inline-block;
                                width: 10px;
                                height: 10px;
                                color: @fontGray;
                            }
                            .info-tip {
                                top: -1px;
                                width: 13px;
                                height: 13px;
                            }
                        }
                        .value {
                            text-align: right;
                            font-size: 13px;
                            box-sizing: border-box;
                            padding-left: 5.4px;
                            display: inline-block;
                            width: 45%;
                            overflow: hidden;
                            white-space: nowrap;
                            position: relative;
                            .value-text {
                                display: inline-block;
                                width: 100%;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                box-sizing: border-box;
                            }
                            .value-unit {
                                position: absolute;
                                right: 0;
                                display: inline-block;
                                text-align: center;
                            }
                        }
                    }
                }
            }
        }
    }
    .level-two-chart {
        width: 100%;
        font-size: 0;
        overflow: hidden;
        .level-two-chart-field {
            display: inline-block;
            overflow: auto;
            font-size: 13px;
        }
    }
}
.field-level-tip {
    width: 300px;
    background: @lightGray;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-weight: 200;
    .level-three {
        .left-side-chart {
            min-height: auto;
        }
    }
}
</style>
