<template>
    <div class="y-table_example">
        <y-tree-table :options="options" :columnConfig="columnConfig" :count="2" :multiple="true"
                      :contentMaxHeight="250">
            <div slot="table-row-2" slot-scope="props" @click="props.extend">{{ props }}111</div>
            <y-tree-table-column label="keyLabel" columnKey="key" />
            <y-tree-table-column label="一级">
                <y-tree-table-column label="二级" columnKey="label" width="200px">
                </y-tree-table-column>
                <y-tree-table-column label="二级">
                    <y-tree-table-column label="三级" columnKey="label" width="200px">
                    </y-tree-table-column>
                    <y-tree-table-column label="三级" columnKey="label" width="200px">
                    </y-tree-table-column>
                    <y-tree-table-column label="三级" columnKey="label" width="200px">
                    </y-tree-table-column>
                </y-tree-table-column>
                <y-tree-table-column label="Labelin1" columnKey="label" width="200px" />
                <y-tree-table-column label="Labelin2" columnKey="label" width="200px" />
            </y-tree-table-column>
        </y-tree-table>
        <y-tree-table :lazyLoad="lazyLoad" :columnConfig="columnConfig" :count="2" :multiple="true" />
    </div>
</template>

<script>
import YTreeTableColumn from './src/components/table-column';
import YTreeTable from './src/index';
export default {
    name: 'YTableExample',
    components: {
        YTreeTable,
        YTreeTableColumn
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
