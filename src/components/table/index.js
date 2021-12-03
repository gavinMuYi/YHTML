import YTable from './src/index.vue';
import YTableColumn from './src/components/table-column';

YTable.install = function (Vue) {
    Vue.component(YTable.name, YTable);
    Vue.component(YTableColumn.name, YTableColumn);
};

export default YTable;
