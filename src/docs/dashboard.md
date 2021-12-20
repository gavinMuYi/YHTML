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
        computed: {
            ml_options() {
                let res = clone(this.m_options);
                res.tabGroup[0].mainPart = false;
                return res
            }
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
.md-config-box {
    height: 100px;
    overflow: auto;
    border: 1px solid #ebebeb;
    padding: 0px 10px 10px;
}
</style>
## Dashboard

### 基本用法 - 分割布局

::: demo
```html
<template>
    <y-dashboard :options="i_options" />
</template>
<script>
    export default {
        data() {
            return {
                options: {
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

### 布局方式 - 合并布局

::: demo
```html
<template>
    <div>
        <div class="md-box">合并布局 - 并列</div>
        <div class="md-box">
            <y-dashboard :options="ml_options" />
        </div>
        <div class="md-box">合并布局 - 总分</div>
        <div class="md-box">
            <y-dashboard :options="m_options" />
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                options: {
                    separate: false,
                    separateWidth: 0,
                    moreFunctions: [],
                    tabGroup: [{
                        tabTitle: '',
                        mainPart: true, // 是否总分
                        tabs: [...]
                    }]
                }
            };
        }
    }
</script>
```
:::

### 布局方式 - 列布局

::: demo
```html
<template>
    <div>
        <div class="md-box">列布局</div>
        <div class="md-box">
            <y-dashboard :options="goptions" />
        </div>
        <div class="md-box">
            <y-dashboard :options="gopptions" />
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                options: {
                    separate: true,
                    separateWidth: 20,
                    moreFunctions: [],
                    tabGroup: [{
                        tabTitle: '',
                        mainPart: false,
                        columns: 4, // 分为4列
                        tabs: [...]
                    }]
                }
            };
        }
    }
</script>
```
:::

###  TAB切换

::: demo
```html
<template>
    <div>
        <div class="md-box">
            <y-dashboard :options="e_options" />
        </div>
        <div class="md-box">
            <y-dashboard :options="golptions" />
        </div>
        <div class="md-box">
            <y-dashboard :options="options" />
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                options: {
                    separate: true,
                    separateWidth: 20,
                    moreFunctions: [],
                    tabGroup: [{  // 多个tab切换
                        tabTitle: '',
                        mainPart: false,
                        tabs: [...]
                    }, {
                        tabTitle: '',
                        mainPart: false,
                        tabs: [...]
                    }]
                }
            };
        }
    }
</script>
```
:::

### 限制高度

::: demo
```html
<template>
    <div style="height: 300px;">
        <y-dashboard :options="l_options" />
    </div>
</template>
<script>
    export default {
        data() {
            return {
            };
        }
    }
</script>
```
:::

### 完整配置

::: demo
```html
<template>
    <y-dashboard :options="s_options" />
</template>
<script>
    export default {
        data() {
            return {
            };
        }
    }
</script>
```
:::

### 用例详细配置

::: demo
```html
<template>              
    <div>           
        <div class="md-config-box">
            <pre>options: {{ options }}</pre>
        </div>
        <div class="md-config-box">
            <pre>s_options: {{ s_options }}</pre>
        </div>
        <div class="md-config-box">
            <pre>e_options: {{ e_options }}</pre>
        </div>
        <div class="md-config-box">
            <pre>i_options: {{ i_options }}</pre>
        </div>
        <div class="md-config-box">
            <pre>l_options: {{ l_options }}</pre>
        </div>
        <div class="md-config-box">
            <pre>m_options: {{ m_options }}</pre>
        </div>
        <div class="md-config-box">
            <pre>goptions: {{ goptions }}</pre>
        </div>
        <div class="md-config-box">
            <pre>golptions: {{ golptions }}</pre>
        </div>
        <div class="md-config-box">
            <pre>gopptions: {{ gopptions }}</pre>
        </div>
        <div class="md-config-box">
            <pre>ml_options: {{ ml_options }}</pre>
        </div>
    </div>
</template>
```
:::

### 属性

| 参数      | 说明                             | 类型      | 可选值       | 默认值 |
| -------- | -------------------------------- | -------- | ----------- | ----- |
| options   | dashboard配置 | object    | - | {} |
| params   | 请求公共参数 | object    | - | {} |


### 事件

| 事件名称  | 说明                              | 事件参数  |
| -------- | -------------------------------- | -------- |
| eventName（自定义）    | 更多自定义事件 | 点击实例 |
