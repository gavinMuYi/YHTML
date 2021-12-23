<script>
    export default {
        data() {
            return {
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
## Popconfirm

### 基本用法

::: demo
```html
<template>
    <div>
        <div class="md-box">
            <y-button v-ypopconfirm:pop.click>
                trigger
            </y-button>
            <y-popconfirm ref="pop" content="这是一个基础确认框，确认关闭？" />
        </div>
        <div class="md-box">
            <y-button v-ypopconfirm:pop2.click>
                slot trigger
            </y-button>
            <y-popconfirm ref="pop2">
                这是一个基础确认框Slot，确认关闭？
            </y-popconfirm>
        </div>
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

### 状态

::: demo
```html
<template>
    <div>
        <div class="md-box">
            <y-button v-ypopconfirm:pop3.click>
                删除trigger
            </y-button>
            <y-popconfirm ref="pop3" content="警告，继续执行删除？" :with-close="false" status="error" confirm-text="我已知晓"  cancel-text="算了" />
        </div>
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

### 复用

::: demo
```html
<template>
    <div>
        <div class="md-box">
            <y-button v-ypopconfirm:pop4.click>
                trigger A
            </y-button>
            <y-button v-ypopconfirm:pop4.click>
                trigger B
            </y-button>
            <y-popconfirm ref="pop4" content="这是一个AB公用确认框" :with-close="false" confirm-text="我已知晓" />
        </div>
        <div class="md-box">
            <y-button v-ypopconfirm:pop5.click="{data: {msg: 'C', withClose: true, confirmText: '同意'}}">
                trigger C
            </y-button>
            <y-button v-ypopconfirm:pop5.click="{data: {msg: 'D', status: 'error'}}">
                trigger D
            </y-button>
            <y-popconfirm ref="pop5" :with-close="false" confirm-text="我已知晓">
                <div slot-scope="props">这是一个CD公用确认框, 但是展示不同的来源, 来源: {{ props.data.msg }}</div>
            </y-popconfirm>
        </div>
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

### 属性

| 参数      | 说明                             | 类型      | 可选值       | 默认值 |
| -------- | -------------------------------- | -------- | ----------- | ----- |
| clazz   | 弹窗自定义类名 | string    | - | '' |
| placement     | 弹窗位置  | string   | 见popper | bottom-start |
| priority  | 弹窗位置适配优先级  | array   | 见popper  | [] |
| status | 确认按钮状态   | string   | default, primary, warning, error  | primary |
| withClose | 是否展示叉   | boolean   | -           | true |
| content | 确认内容   | string   | -           | '' |
| confirmText | 确认按钮文案   | string   | -           | 确定 |
| cancelText | 取消按钮文案   | string   | -           | 取消 |

### Slot

| Slot名称  | 说明                             |
| -------- | -------------------------------- |
| default  | scope slot，默认的slot，作为确认框的内容，参数来源于指令 |

### 事件

| 事件名称  | 说明                              | 事件参数  |
| -------- | -------------------------------- | -------- |
| confirm    | 确认事件 | - |
| cancel    | 取消事件 | - |
