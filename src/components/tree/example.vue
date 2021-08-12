<template>
    <div class="y-tree_example">
        <div class="box-out">
            <div>同步单选<button @click="reshow">回显测试</button></div>
            <div class="box">
                <y-tree :options="options" :key="singleKey" @change="val => {singleValue = val}" :value="singleValue" />
            </div>
        </div>
        <div class="box-out">
            <div>同步单选无轨迹</div>
            <div class="box">
                <y-tree :options="options" :track="false">
                    <div slot="item" slot-scope="props">{{ props.level }}{{ props.data.label }}</div>
                </y-tree>
            </div>
        </div>
        <div class="box-out">
            <div>异步单选</div>
            <div class="box">
                <y-tree :lazyLoad="lazyLoad" :count="1" />
            </div>
        </div>
        <div class="box-out">
            <div>无数据</div>
            <div class="box">
                <y-tree />
            </div>
        </div>
        <div class="box-out">
            <div>同步多选</div>
            <div class="box">
                <y-tree :options="options" :multiple="true" />
            </div>
        </div>
        <div class="box-out">
            <div>同步多选无轨迹</div>
            <div class="box">
                <y-tree :options="options" :multiple="true"
                        :value="[{key: 'wasdffe', label: 'sgdafgfddaf'}]" :track="false" />
            </div>
        </div>
        <div class="box-out">
            <div>异步多选</div>
            <div class="box">
                <y-tree :lazyLoad="lazyLoad" :count="1" :multiple="true" />
            </div>
        </div>
        <div class="box-out">
            <div>异步多选无轨迹</div>
            <div class="box">
                <y-tree :lazyLoad="lazyLoad" :count="1" :multiple="true" :track="false" />
            </div>
        </div>
    </div>
</template>

<script>
import YTree from './index';

export default {
    name: 'YTreeExample',
    components: {
        YTree
    },
    data() {
        return {
            singleValue: [],
            singleKey: 0,
            options: [{
                label: 'sqwerd',
                key: 'asqewqwrd'
            }, {
                label: 'sd',
                key: 'asd',
                extend: true,
                children: [{
                    key: 'we',
                    label: 'sdaf',
                    children: [{
                        key: 'wasdffe',
                        label: 'sgdafgfddaf'
                    }, {
                        key: 'was3333dffe',
                        label: 'sg4444dafgfddaf'
                    }]
                }, {
                    key: 'wesad3123f',
                    label: 'sda212f',
                    children: [{
                        key: 'wasd312ffe',
                        label: 'sgdaf3123gfddaf'
                    }]
                }]
            }, {
                label: 'sd2',
                key: 'as3d',
                children: [{
                    key: 'wde',
                    label: 'sdwaf'
                }]
            }]
        };
    },
    methods: {
        lazyLoad(index, count, highlight, self) {
            console.log(index, count, highlight, self);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, 1000);
            }).then(() => {
                return [{
                    label: 'sqwerd' + Math.floor(Math.random() * 1000),
                    key: 'asqewqwrd' + Math.floor(Math.random() * 1000),
                    hasChildren: true
                }];
            });
        },
        reshow() {
            this.singleKey++;
        }
    },
};
</script>

<style lang="less">
.y-tree_example {
    .box-out {
        display: inline-block;
        margin: 20px;
    }
    .box {
        width: 350px;
        height: 450px;
        overflow: auto;
        display: inline-block;
        border: 1px solid #000000;
    }
}
</style>
