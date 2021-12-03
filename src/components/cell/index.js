import YCell from './src/index';

YCell.install = function (Vue) {
    Vue.component(YCell.name, YCell);
};

export default YCell;
