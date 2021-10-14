<template>
    <div class="y-popper_example">
        <y-popper ref="tips1">delay pop</y-popper>
        <y-popper ref="tips2">hover pop</y-popper>
        <y-popper ref="tips3">rightClick pop</y-popper>
        <y-popper ref="tips4">click pop</y-popper>
        <y-popper ref="tips5">show pop</y-popper>
        <y-popper ref="tips6">manual pop</y-popper>
        <div v-ypop:tips1.hover.delay class="exbox">delay</div>
        <div v-ypop:tips2.hover class="exbox">hover</div>
        <div v-ypop:tips2.hover class="exbox">hover2</div>
        <div v-ypop:tips3.rightClick class="exbox">rightClick</div>
        <div v-ypop:tips4.click class="exbox">click</div>
        <div v-ypop:tips5.show class="exbox">show</div>
        <button @click="trigger">trigger</button>
        <div v-ypop:tips6.manual class="exbox">manual</div>
    </div>
</template>

<script>
import Vue from 'vue';
import YPopper from './src/index';
import createPopperDirective from './src/createPopperDirective';
Vue.directive('ypop', createPopperDirective());

export default {
    name: 'YPopperExample',
    components: {
        YPopper
    },
    data() {
        return {
            popStatus: false
        };
    },
    methods: {
        trigger() {
            if (!this.popStatus) {
                this.$refs.tips6.showPop();
            } else {
                this.$refs.tips6.hidePop();
            }
            this.popStatus = !this.popStatus;
        }
    }
};
</script>

<style lang="less">
    .y-popper_example {
        .exbox {
            height: 50px;
            width: 100px;
            margin: 50px;
            border: 1px solid #ededed;
        }
    }
</style>
