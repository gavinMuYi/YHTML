<template>
    <div class="y-table_example">
        <y-table :options="options" :columnConfig="columnConfig" :count="2"/>
        <y-table :lazyLoad="lazyLoad" :columnConfig="columnConfig" :count="2" />
    </div>
</template>

<script>
import YTable from './src/index';
export default {
    name: 'YTableExample',
    components: {
        YTable
    },
    data() {
        return {
            columnConfig: [{
                key: 'label',
                label: 'column1'
            }, {
                key: 'key',
                label: 'column2',
                width: '80%'
            }, {
                key: 'label',
                label: 'column3'
            }],
            options: [{
                label: 'sqwerd',
                key: 'asqewqwrd'
            }, {
                label: 'sd',
                key: 'asd',
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
                let res = [];
                for (let i = 0; i < count; i++) {
                    res.push({
                        label: 'sqwerd' + Math.floor(Math.random() * 1000),
                        key: 'asqewqwrd' + Math.floor(Math.random() * 1000),
                        hasChildren: true
                    });
                }
                return {
                    options: res,
                    total: 100
                };
            });
        },
    }
};
</script>

<style lang="less">
    .y-table_example {

    }
</style>
