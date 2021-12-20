<script>
    import clone from 'clone';
    import { options, e_options, i_options, l_options, m_options, goptions, golptions, gopptions } from '@/components/dashboard/mock';
    export default {
        provide() {
            return {
                data__: {}
            };
        },
        data() {
            let options_copy = clone(options);
            options_copy.tabGroup.reverse();
            options.moreFunctions = [];
            return {
                options: options,
                s_options: {
                    ...options_copy,
                    separate: true,
                    separateWidth: 20
                },
                e_options: e_options,
                i_options: i_options,
                l_options: l_options,
                m_options: m_options,
                goptions: goptions,
                golptions: golptions,
                gopptions: gopptions
            };
        },
        methods: {
        }
    }
</script>
<style>
.md-box {
    margin-bottom: 20px;
}
.md-box:last-child {
    margin-bottom: 0px;
}
</style>
## Dashboard

### 基本用法

::: demo
```html
<template>
    <y-dashboard :options="i_options" />
</template>
<script>
    export default {
        data() {
            return {
                i_options: {
                    name: 'dashboard',
                    separate: true,
                    separateWidth: 20,
                    moreFunctions: [],
                    tabGroup: [{
                        tabTitle: '',
                        mainPart: false,
                        tabs: [{
                            moreFunctions: [],
                            levelOne: [{
                                key: 'dashboard26',
                                label: '指标',
                                color: '',
                                format: 'Default',
                                unit: '万元',
                                formatter: '',
                                url: "/examples/dashboard/333",
                                info: [],
                            }],
                            levelTwoColumns: [],
                            levelTwoChart: [],
                            levelThree: [],
                            levelThreeChart: []
                        }, {
                            moreFunctions: [],
                            levelOne: [{
                                key: 'dashboard26',
                                label: '指标',
                                color: '',
                                format: 'Default',
                                unit: '%',
                                formatter: '',
                                url: "/examples/dashboard/333",
                                info: [],
                            }],
                            levelTwoColumns: [],
                            levelTwoChart: [],
                            levelThree: [],
                            levelThreeChart: []
                        }...]
                    }]
                }
            };
        }
    }
</script>
```
:::

### 属性

| 参数      | 说明                             | 类型      | 可选值       | 默认值 |
| -------- | -------------------------------- | -------- | ----------- | ----- |
| options   | 参考echart配置文档 | object    | - | {} |
| autoResize     | 实时重绘      | boolean   | - | true |
| wait  | 延时绘制（ms）    | number   | -           | 0 |

