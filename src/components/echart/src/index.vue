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
        },
        wait: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            echartsInstanse: null
        };
    },
    watch: {
        options(nval) {
            if (this.echartsInstanse) {
                this.echartsInstanse && this.echartsInstanse.clear();
                this.echartsInstanse.setOption(nval);
                this.echartsInstanse.resize();
            } else {
                this.init();
            }
        }
    },
    mounted() {
        setTimeout(() => {
            this.init();
        }, this.wait);
    },
    methods: {
        init() {
            if (this.$refs.eChart.clientHeight && this.$refs.eChart.clientWidth) {
                this.echartsInstanse = echarts.init(this.$refs.eChart);
                this.echartsInstanse.setOption(this.options);
            }
        }
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
