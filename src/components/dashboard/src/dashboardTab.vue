<template>
    <div :class="['dashboard-tab', {'with-tab-title': options.tabTitle}]">
        <div class="tab-title" v-if="options.tabTitle">{{ options.tabTitle }}</div>
        <level-one ref="levelOne" :options="options.levelOne" :moreFunction="options.moreFunctions"
                   @innerEmit="handleInnerEmit" />
        <level-two ref="levelTwo" :options="options.levelTwoColumns" :chartOptions="options.levelTwoChart"
                   :chartFields="options.levelTwoChartFields" />
        <level-three ref="levelThree" :options="options.levelThree" :chartOptions="options.levelThreeChart"
                     v-if="options.levelThree.length"
                     :colors="options.levelThreeChart[0] ? options.levelThreeChart[0].colors: []" />
    </div>
</template>

<script>
import LevelOne from './components/levelOne';
import LevelTwo from './components/levelTwo';
import LevelThree from './components/LevelThree';

export default {
    name: 'DashboardTab',
    components: {
        LevelOne,
        LevelTwo,
        LevelThree
    },
    props: {
        options: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    mounted() {
        this.$emit('stepHeight',
            this.$refs.levelOne.$el.offsetHeight + (this.$refs.levelThree ? this.$refs.levelThree.$el.offsetHeight : 0),
            (this.$refs.levelTwo ? this.$refs.levelTwo.$el.offsetHeight : 0)
            + (this.options.levelTwoChart.length
                ? ((this.$refs.levelTwo ? this.$refs.levelTwo.$el.offsetWidth : 0) * 0.45) : 0)
        );
    },
    methods: {
        handleInnerEmit(val) {
            this.$emit('innerEmit', val);
        }
    },
};
</script>

<style lang="less">
.dashboard-tab {
    padding: 0 24px;
    box-sizing: border-box;
    height: 100%;
    overflow: hidden;
    > .level-three {
        margin-bottom: -10px;
    }
}
.with-tab-title {
    .tab-title {
        font-family: PingFangSC-Regular;
        font-size: 16px;
        line-height: 16px;
        height: 16px;
        color: #000000;
        margin-bottom: 18px;
        width: ~'calc(100% - 20px)';
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .more-func {
        position: relative;
        top: -35px;
    }
}
</style>
