<template>
    <div class="y-table_example">
        <y-table :options="options" :columnConfig="columnConfig" />
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
    }
};
</script>

<style lang="less">
    .y-table_example {

    }
</style>
