<template>
    <div class="y-echart" ref="eChart"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
    name: 'YEchart',
    props: {
        options: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            echartsInstanse: null
        };
    },
    watch: {
        options(nval) {
            this.echartsInstanse && this.echartsInstanse.clear();
            this.echartsInstanse.setOption(nval);
            this.echartsInstanse.resize();
        }
    },
    mounted() {
        this.echartsInstanse = echarts.init(this.$refs.eChart);
        this.echartsInstanse.setOption(this.options);
    },
    methods: {
    }
};
</script>

<style lang="less">
    .y-echart {
        width: 100%;
        height: 100%;
        min-width: 1px;
        min-height: 1px;
    }
</style>
