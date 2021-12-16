<template>
    <div class="level-three" :style="{
        'height': levelHight === 'hidden' ? '0px' : (levelHight ? levelHight : ''),
        'padding-top': levelHight === 'hidden' || inTip ? '0px' : '20px',
        'border-top': levelHight || inTip ? 'none': '1px solid #EBEDF2',
        'margin-bottom': inTip || !levelHight ? '-10px' : '0'
    }">
        <y-tip ref="fieldInfoTip" kind="large" clazz="field-info-tip" placement="bottom-middle">
            <div slot-scope="props">
                <div v-if="props.data">
                    <info-content :info="props.data" />
                </div>
            </div>
        </y-tip>
        <div v-if="chartOptions.length" class="left-side-chart">
            <dashboard-chart :options="chartOptions[0]" :chartStyle="chartStyle" />
        </div>
        <div class="field-content" ref="fieldContent">
            <div class="level-three-fields">
                <div class="level-three-field" v-for="(field, index) in options"
                     :key="'level-three' + index + Math.random()">
                    <div class="level-three-field-line">
                        <div class="label" :title="field.label">
                            <span :style="`background: ${fieldColors[index]}`"
                                  v-if="chartOptions.length || levelHight" class="flag-color"></span>
                            <span class="label-text" :style="`max-width: calc(100% - ${chartOptions.length || levelHight ? 17 : 0}px - ${field.info.length ? 18 : 0}px);`">
                                {{ field.label }}
                            </span>
                            <y-icon name="question" v-if="field.info.length" class="info-tip"
                                    v-ytip:fieldInfoTip.hover.delay="{data: field.info}" />
                        </div>
                        <div class="value">
                            <span class="value-text"
                                  :style="{'padding-right': field.unit ? (field.unit.length * 13 + 'px') : '0'}"
                                  :title="_cache.dataSource[field.url] && _cache.dataSource[field.url].records[0]
                                      ? valueFormatter(
                                          _cache.dataSource[field.url].records[0][field.key],
                                          field.format, field.formatter) : '-'">
                                <span :style="bindStyle(field)">
                                    {{ _cache.dataSource[field.url] && _cache.dataSource[field.url].records[0]
                                        ? valueFormatter(
                                            _cache.dataSource[field.url].records[0][field.key],
                                            field.format, field.formatter)
                                    : '-' }}
                                </span>
                            </span>
                            <span class="value-unit" v-if="field.unit"
                                  :style="{'width': field.unit.length * 13 + 'px'}">
                                {{ field.unit }}</span>
                        </div>
                    </div>
                    <div class="level-four-fields" v-if="field.levelFour.length">
                        <div
                            class="level-four-field"
                            v-for="(field, fouri) in field.levelFour"
                            :key="'level-four' + fouri + Math.random()"
                            :style="`margin-left: 16px;`">
                            <div class="label" :title="field.label">
                                <span class="label-text"
                                      :style="`max-width: calc(100%  - ${field.info.length ? 17 : 0}px);`">
                                    {{ field.label }}
                                </span>
                                <y-icon name="question" v-if="field.info.length" class="info-tip"
                                        v-ytip:fieldInfoTip.hover.delay="{data: field.info}" />
                            </div>
                            <div class="value">
                                <span class="value-text"
                                      :style="{'padding-right': field.unit ? (field.unit.length * 13 + 'px') : '0'}"
                                      :title="_cache.dataSource[field.url] && _cache.dataSource[field.url].records[0]
                                          ? valueFormatter(
                                              _cache.dataSource[field.url].records[0][field.key],
                                              field.format,
                                              field.formatter
                                          )
                                      : '-'">
                                    <span :style="bindStyle(field)">
                                        {{ _cache.dataSource[field.url] && _cache.dataSource[field.url].records[0]
                                            ? valueFormatter(
                                                _cache.dataSource[field.url].records[0][field.key],
                                                field.format, field.formatter
                                            )
                                        : '-' }}
                                    </span>
                                </span>
                                <span class="value-unit" v-if="field.unit"
                                      :style="{'width': field.unit.length * 13 + 'px'}">{{ field.unit }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DashboardChart from './dashboardChart';
import InfoContent from './infoContent';
import { defaultColors } from '../utils';
import { valueFormatter } from '../processData';

export default {
    name: 'LevelThree',
    components: {
        DashboardChart,
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
        levelHight: {
            type: String,
            default: ''
        },
        colors: {
            type: Array,
            default: () => {
                return [];
            }
        },
        inTip: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            fieldColors: this.colors.length ? this.colors : defaultColors,
            chartStyle: {
                height: 65,
                width: 65,
                plotBackgroundColor: this.inTip ? '#F8FAFB' : '#FFFFFF'
            },
            valueFormatter: valueFormatter
        };
    },
    mounted() {
        this.chartOptions[0] && (this.$refs.fieldContent.style.width = 'calc(100% - 70px)');
    },
    methods: {
        bindStyle(field) {
            if (!this._cache.dataSource[field.url]) {
                return;
            }
            let _baseStyle = { 'color': field.color };

            return _baseStyle;
        }
    }
};
</script>

<style lang="less">
.level-three {
    box-sizing: border-box;
    width: 100%;
    font-size: 0;
    .left-side-chart {
        display: inline-block;
        width: 70px;
        overflow: hidden;
        padding-right: 24px;
        box-sizing: border-box;
        min-height: 55px;
        .highcharts-container {
            margin-left: -10px;
            margin-top: -10px;
        }
        .y-chart__empty {
            font-size: 12px;
        }
    }
    .field-content {
        vertical-align: top;
        display: inline-block;
        width: 100%;
        .label-text {
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            vertical-align: top;
        }
        .y-icon-content {
            position: relative;
            top: 0px;
            display: inline-block;
        }
        .y-icon {
            display: inline-block;
            width: 13px;
            height: 13px;
            color: @fontGray;
        }
        .level-three-fields {
            width: 100%;
            .level-three-field {
                font-size: 0;
                line-height: 14px;
                .level-three-field-line {
                    height: 13px;
                    margin-bottom: 12px;
                    .label {
                        font-size: 13px;
                        box-sizing: border-box;
                        padding-right: 6px;
                        color: @fontGray;
                        display: inline-block;
                        width: 50%;
                        overflow: hidden;
                        .flag-color {
                            display: inline-block;
                            width: 8px;
                            height: 8px;
                            border-radius: 50%;
                            margin-right: 4px;
                            position: relative;
                            top: -1px;
                        }
                    }
                    .value {
                        text-align: right;
                        font-size: 13px;
                        box-sizing: border-box;
                        padding-left: 6px;
                        display: inline-block;
                        width: 50%;
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
                .level-four-fields {
                    font-size: 13px;
                    .level-four-field {
                        font-size: 0;
                        line-height: 14px;
                        height: 14px;
                        margin-bottom: 10px;
                        .label {
                            font-size: 13px;
                            box-sizing: border-box;
                            padding-right: 6px;
                            color: @fontGray;
                            display: inline-block;
                            width: 50%;
                            overflow: hidden;
                            white-space: nowrap;
                            vertical-align: top;
                        }
                        .value {
                            text-align: right;
                            font-size: 13px;
                            box-sizing: border-box;
                            padding-left: 6px;
                            display: inline-block;
                            width: 50%;
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
}
</style>
