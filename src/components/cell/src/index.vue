<template>
    <div class="y-cell">
        <span v-for="(label, index) in labelGroup" :key="index + '-' + label"
              :style="{color : label.highlight ? highlightColor : '#1d1d1d'}"
              class="y-cell-label">
            {{ label.label }}
        </span>
    </div>
</template>

<script>
export default {
    name: 'YCell',
    props: {
        label: {
            type: String,
            default: ''
        },
        highlight: {
            type: String,
            default: ''
        },
        // 高亮文本是否模糊匹配大小写
        highlightCaseConvert: {
            type: Boolean,
            default: false
        },
        highlightColor: {
            type: String,
            default: '#00cc26'
        }
    },
    data() {
        return {
            labelGroup: []
        };
    },
    mounted() {
        if (this.highlight) {
            this.labelGroup = this.getTemplate(this.label, this.highlight);
        }
        else {
            this.labelGroup.push({
                label: this.label,
                highlight: false
            });
        }
    },
    methods: {
        // 将字段高亮转化为数组
        getTemplate(label, hl) {
            let raw = label;
            let target = hl;
            if (this.highlightCaseConvert) {
                raw = raw.toLowerCase();
                if (typeof target === 'string') {
                    target = target.toLowerCase();
                }
            }
            const groups = [];
            const re = typeof target === 'string' ? new RegExp(target, 'g') : target;
            let lastIndex = 0;
            let match = re.exec(raw);
            while (match) {
                groups.push({
                    label: label.slice(lastIndex, match.index),
                    highlight: false
                });
                groups.push({
                    label: label.slice(match.index, re.lastIndex),
                    highlight: true
                });
                lastIndex = re.lastIndex;
                match = re.exec(raw);
            }
            groups.push({
                label: label.slice(lastIndex),
                highlight: false
            });
            return groups;
        }
    }
};
</script>

<style lang="less">
   .y-cell {
       font-size: 0;
       display: inline-block;
       .y-cell-label {
            font-size: 14px;
            float: left;
       }
   }
</style>
