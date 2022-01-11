<template>
    <div class="y-row" :style="alignStyle">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'YRow',
    props: {
        gutter: {
            type: Number,
            default: 0
        },
        alignItems: {
            type: String,
            default: 'center'
        }
    },
    computed: {
        alignStyle() {
            return {
                'align-items': this.alignItems
            };
        }
    },
    watch: {
        gutter() {
            this.$children.forEach(comp => {
                if (comp.setGutter) {
                    comp.setGutter();
                }
            });
        }
    }
};
</script>

<style lang="less">
    .y-row {
        display: flex;
        height: 100%;
    }
</style>
