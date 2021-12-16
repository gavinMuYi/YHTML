<template>
    <div
        :class="['y-popper', clazz, {'y-nosee-popper': opacity}]"
        v-show="show"
        ref="selfPop"
        @mouseenter.stop="hover = true"
        @mouseleave.stop="hover = false">
        <slot :data="contentData"></slot>
    </div>
</template>
<script>
import clone from 'clone';

export default {
    name: 'YPopper',
    props: {
        clazz: {
            type: String,
            default: ''
        },
        placement: {
            type: String,
            default: 'bottom-middle'
        },
        priority: {
            type: Array,
            default: () => {
                return [];
            }
        },
        inline: {
            type: Boolean,
            default: false
        },
        resizeable: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            opacity: false,
            show: false,
            hover: false,
            waitToClose: false,
            cantCloseByOthers: false,
            contentData: null
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
        if (!this.inline) {
            this.$nextTick(() => {
                const body = document.querySelector('body');
                if (body.append) {
                    body.append(this.$el);
                } else {
                    body.appendChild(this.$el);
                }
            });
        }
    },
    beforeDestroy() {
        this.$el.remove();
    },
    methods: {
        closePop() {
            this.show = false;
        },
        setData(data) {
            this.$set(this, 'contentData', clone(data));
        }
    }
};
</script>

<style lang="less">
    .y-popper {
        z-index: 100000;
        position: absolute;
        background: @white;
        border: 1px solid @commonGray;
        border-radius: 3px;
        padding: 10px;
        box-shadow: 2px 4px 10px 0 rgba(30, 35, 48, 0.08);
    }
    .y-nosee-popper {
        opacity: 0;
    }
</style>
