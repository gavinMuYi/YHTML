import YTree from './src/index';

YTree.install = function (Vue) {
    Vue.component(YTree.name, YTree);
};

export default YTree;
