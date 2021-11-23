<template>
    <div class="y-select_example">
        <y-select
            :treeSize="[300, 400]" :multiple="true" cascadeMode="hover"
            :lazyLoad="lazyLoad" :count="1"
            @change="val => {singleValue = val}" :value="singleValue" />
        <y-select :options="options" @change="val => {singleValue = val}" :value="singleValue" />
    </div>
</template>

<script>
import YSelect from './src/index';
export default {
    name: 'YSelectExample',
    components: {
        YSelect
    },
    data() {
        return {
            singleValue: [],
            options: [{
                label: 'sqwerd',
                key: 'asqewqwrd',
                disable: true
            }, {
                label: 'sd',
                key: 'asd',
                extend: true,
                children: [{
                    key: 'we',
                    label: 'sdaf',
                    children: [{
                        key: 'wasdffe',
                        label: 'sgdafgfddaf',
                        disable: true,
                        children: [{
                            key: 'we21',
                            label: 'sd32af'
                        }]
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
            }, {
                label: 'sd324',
                key: 'asqwd',
                extend: true,
                children: [{
                    key: 'w4e',
                    label: 'sda43f',
                    children: [{
                        key: 'wasd1234ffe',
                        label: 'sgdaf4gfddaf',
                        disable: true,
                        children: [{
                            key: 'w3e21',
                            label: 'sd3342af'
                        }]
                    }, {
                        key: 'was3343133dffe',
                        label: 'sg4444dafgg3fddaf'
                    }]
                }, {
                    key: 'wesad312344f',
                    label: 'sda212fr',
                    children: [{
                        key: 'wasd312fferbe',
                        label: 'sgdaf3123gfdd7af'
                    }]
                }]
            }]
        };
    },
    methods: {
        lazyLoad(index, count, highlight, self) {
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
        }
    }
};
</script>

<style lang="less">
    .y-select_example {

    }
</style>
