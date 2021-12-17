<script>
    export default {
        data() {
            return {
                options: {
                    title: {
                        text: 'ECharts 示例'
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
## EChart

```info
对echart进行了一层简单封装，使其能实时响应容器大小变化并重新绘制，支持延时渲染。
```

### 基本用法

::: demo
```html
<template>
    <div>
        <div class="md-box">缩放窗口查看实时重绘效果</div>
        <div style="height: 300px;" class="md-box">
            <y-echart :options="options" />
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                options: {
                    title: {
                        text: 'ECharts 示例'
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

