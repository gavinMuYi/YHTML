<template>
    <div
        :class="['y-popper', clazz]"
        v-show="show"
        ref="selfPop"
        @mouseenter.stop="hover = true"
        @mouseleave.stop="hover = false">
        <slot></slot>
    </div>
</template>
<script>
import Vue from 'vue';
import createPopperDirective from './createPopperDirective';
Vue.directive('ypop', createPopperDirective());

export default {
    name: 'YPopper',
    props: {
        clazz: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            show: false,
            hover: false,
            waitToClose: false,
            cantCloseByOthers: false
        };
    },
    watch: {
        hover(nVal) {
            if (this.waitToClose && !nVal) {
                this.waitToClose = false;
                this.closePop();
            }
        }
    },
    created() {
        // window上存一份用来跨级取pop
        let name = this.$vnode.data.ref;
        if (!window.pops) {
            window['pops'] = {};
        }
        name && (window.pops[name] = this);
    },
    mounted() {
        let that = this;
        document.addEventListener('click', (e) => {
            if (that.cantCloseByOthers) return;
            if (!that.$el.contains(e.target)) that.closePop();
        });
        this.$nextTick(() => {
            const body = document.querySelector('body');
            if (body.append) {
                body.append(this.$el);
            } else {
                body.appendChild(this.$el);
            }
        });
    },
    beforeDestroy() {
        this.$el.remove();
    },
    methods: {
        closePop() {
            this.show = false;
        }
    }
};
</script>

<style lang="less">
    .y-popper {
        z-index: 100000;
        position: absolute;
        background: #FFF;
        border: 1px solid #ededed;
        border-radius: 3px;
        padding: 10px;
        box-shadow: 2px 4px 10px 0 rgba(30, 35, 48, 0.08);
    }
</style>
