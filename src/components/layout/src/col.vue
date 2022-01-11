<template>
    <div class="y-col" :style="{...selfStyle, ...gutterStyle}">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'YCol',
    props: {
        span: {
            type: Number,
            default: 0
        },
        leftSpan: {
            type: Number,
            default: 0
        },
        rightSpan: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            left: null,
            right: null,
            gutterStyle: {}
        };
    },
    computed: {
        selfStyle() {
            if (!this.span) {
                return {
                    display: 'none'
                };
            }
            return {
                display: 'block',
                flex: this.span
            };
        }
    },
    watch: {
        rightSpan(nval) {
            this.setSpan('right', nval);
        },
        leftSpan(nval) {
            this.setSpan('left', nval);
        }
    },
    mounted() {
        if (this.rightSpan) {
            this.setSpan('right', this.rightSpan);
        }
        if (this.leftSpan) {
            this.setSpan('left', this.leftSpan);
        }
        this.$nextTick(() => {
            let gutter = this.$parent._props.gutter;
            if (this.$parent.$children[this.$parent.$children.length - 1]._uid === this._uid) {
                this.$set(this, 'gutterStyle', { 'margin-right': '0px' });
            } else {
                this.$set(this, 'gutterStyle', { 'margin-right': gutter + 'px' });
            }
        });
    },
    methods: {
        setSpan(position, span) {
            if (this[position]) {
                if (span) {
                    this[position].style.flex = span;
                    this[position].style.display = 'block';
                } else {
                    this[position].style.display = 'none';
                }
            } else {
                let parent = this.$el.parentNode;
                this[position] = window.document.createElement('div');
                this[position].className = 'y-layout-col__' + position;
                if (span) {
                    this[position].style.flex = span;
                    this[position].style.display = 'block';
                } else {
                    this[position].style.display = 'none';
                }
                if (position === 'right') {
                    if (parent.lastChild === this.$el) {
                        parent.appendChild(this[position]);
                    } else {
                        parent.insertBefore(this[position], this.$el.nextSibling);
                    }
                } else {
                    parent.insertBefore(this[position], this.$el);
                }
            }
        }
    }
};
</script>

<style lang="less">
    .y-col {

    }
</style>
