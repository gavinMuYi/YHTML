<template>
    <div class="y-popper_example">
        <y-popper ref="tips1">delay pop</y-popper>
        <y-popper ref="tips2">hover pop</y-popper>
        <y-popper ref="tips3">rightClick pop</y-popper>
        <y-popper ref="tips5" :inline="true"
                  placement="bottom-end" :priority="['top-middle', 'bottom-start', 'left-middle']">show pop</y-popper>
        <y-popper ref="tips7"><div v-ypop:tips4.click class="exbox">嵌套</div></y-popper>
        <y-popper ref="tips4">click pop</y-popper>
        <y-popper ref="tips6">manual pop</y-popper>
        <div v-ypop:tips1.hover.delay class="exbox">delay</div>
        <div v-ypop:tips2.hover class="exbox">hover</div>
        <div v-ypop:tips2.hover class="exbox">hover2</div>
        <div v-ypop:tips3.rightClick class="exbox">rightClick</div>
        <div v-ypop:tips4.click class="exbox">click</div>
        <div v-ypop:tips4.click class="exbox">click2</div>
        <div v-ypop:tips5.show class="exbox">show inline</div>
        <button @click="trigger">trigger</button>
        <div v-ypop:tips6.manual class="exbox">manual</div>
        <div v-ypop:tips7.click class="exbox">嵌套</div>
    </div>
</template>

<script>
import YPopper from './src/index';

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
        position: relative;
        .exbox {
            height: 50px;
            width: 100px;
            margin: 50px;
            border: 1px solid @commonGray;
        }
    }
</style>
