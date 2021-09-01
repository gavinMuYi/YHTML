<template>
    <div class="y-table_example">
        <y-table :count="2" :multiple="true" :contentMaxHeight="250">
            <y-table-column label="keyLabel" columnKey="key" />
            <y-table-column label="keyLabelRight" columnKey="key" fixed="right" />
            <y-table-column label="一级" fixed="left">
                <div slot="header">header-111-一级</div>
                <y-table-column label="二级" columnKey="label" width="200px">
                </y-table-column>
                <y-table-column label="二级">
                    <y-table-column label="三级" columnKey="label" width="200px">
                        <div>111</div>
                    </y-table-column>
                    <y-table-column label="三级" columnKey="label" width="200px">
                        <div slot="header">header-111-三级</div>
                    </y-table-column>
                    <y-table-column label="三级" columnKey="label" width="200px">
                    </y-table-column>
                </y-table-column>
                <y-table-column label="Labelin1" columnKey="label" width="200px" />
                <y-table-column label="Labelin2" columnKey="label" width="200px" />
            </y-table-column>
        </y-table>
    </div>
</template>

<script>
import YTable from './src/index';
import YTableColumn from './src/components/table-column';
export default {
    name: 'YTableExample',
    components: {
        YTable,
        YTableColumn
    },
    data() {
        return {
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
