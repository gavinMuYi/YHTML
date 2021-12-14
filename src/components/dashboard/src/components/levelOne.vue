<template>
    <div class="level-one">
        <y-tip ref="fieldInfoTip" kind="large" clazz="field-info-tip">
            <div slot-scope="props">
                <div v-if="props.data">
                    <info-content :info="props.data" />
                </div>
            </div>
        </y-tip>
        <div class="level-one-labels">
            <div
                class="level-one-label"
                v-for="(field, index) in options"
                :key="'level-one' + index + Math.random()"
                :style="{'max-width': `calc(${100/options.length}% - ${28/options.length}px)`}">
                <span v-if="index">/</span>
                <span :title="field.label" class="label" :style="{
                    'padding-right': field.info.length ? '15px' : '0',
                    'width': index ? 'calc(100% - 12px)' :'100%'
                }">{{ field.label }}</span>
                <y-icon name="question" v-if="field.info.length" class="info-tip"
                        v-ytip:fieldInfoTip.hover.delay="{data: field.info}" />&nbsp;
            </div>
            <div class="more-func" v-if="moreFunction.length" v-ypopmenu:more.click><y-icon name="more" /></div>
            <y-popmenu v-if="moreFunction.length" ref="more" placement="bottom-end"
                       :options="moreFunc(moreFunction)" @select="handleMore($event, moreFunction)" />
        </div>
        <div class="level-one-values">
            <div
                class="level-one-value"
                v-for="(field, index) in options"
                :key="'level-one-value' + index + Math.random()"
                :style="{'max-width': `calc(${100/options.length}%`}">
                <span class="value-text"
                      :style="{'padding-right': field.unit ? (field.unit.length * 20 + 'px') : '10px'}">
                    <span v-if="index">/</span>
                    <span
                        :title="_cache.dataSource[field.url] && _cache.dataSource[field.url].records[0]
                            ? valueFormatter(
                                _cache.dataSource[field.url].records[0][field.key],
                                field.format,
                                field.formatter
                            )
                        : '-'"
                        :style="bindStyle(field)">
                        {{ _cache.dataSource[field.url] && _cache.dataSource[field.url].records[0]
                            ? valueFormatter(
                                _cache.dataSource[field.url].records[0][field.key],
                                field.format, field.formatter
                            )
                        : '-' }}
                    </span>
                </span>
                <span class="value-unit" v-if="field.unit"
                      :style="{'width': field.unit.length * 20 + 'px'}">{{ field.unit }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { moreFunc } from '../utils';
import { valueFormatter } from '../processData';
import InfoContent from './infoContent';

export default {
    name: 'LevelOne',
    components: {
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
        moreFunction: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    data() {
        return {
            moreFunc: moreFunc,
            valueFormatter: valueFormatter
        };
    },
    methods: {
        handleMore(val, options) {
            options[val.index].goto && window.open(options[val.index].goto);
            options[val.index].eventName && this.$emit('innerEmit', {
                eventName: options[val.index].eventName,
                payload: {
                    levelOne: this
                }
            });
        },
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
.level-one {
    .level-one-labels {
        height: 14px;
        .level-one-label {
            display: inline-block;
            box-sizing: border-box;
            overflow: hidden;
            font-size: 14px;
            line-height: 15px;
            position: relative;
            vertical-align: top;
            .label {
                vertical-align: top;
                display: inline-block;
                box-sizing: border-box;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .y-icon {
                vertical-align: top;
                display: inline-block;
                width: 15px;
                height: 15px;
                position: absolute;
                right: 5px;
                top: 0;
                color: #C5CCDB;
            }
        }
        .more-func {
            float: right;
            width: 18px;
            .y-icon {
                width: 18px;
                height: 18px;
            }
        }
    }
    .level-one-values {
        height: 32px;
        margin-top: 12px;
        .level-one-value {
            font-family: PingFangSC-Medium;
            display: inline-block;
            box-sizing: border-box;
            overflow: hidden;
            white-space: nowrap;
            font-size: 32px;
            line-height: 33px;
            position: relative;
            .value-text {
                display: inline-block;
                max-width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                box-sizing: border-box;
            }
            .value-unit {
                position: absolute;
                right: 0px;
                font-size: 20px;
                line-height: 38px;
                display: inline-block;
                text-align: center;
            }
        }
    }
}
</style>
