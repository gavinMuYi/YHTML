<template>
    <colgroup>
        <col :style="{width: '0px',minWidth: '0px',maxWidth: '0px'}">
        <col v-for="(col, index) in colgroup" :key="'col' + index" :style="headerCellStyle(col.width)">
    </colgroup>
</template>

<script>
export default {
    name: 'YTableColgroup',
    props: {
        colgroup: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    methods: {
        headerCellStyle(width) {
            if (!width) {
                return {
                    width: '200px',
                    minWidth: '200px'
                };
            }
            return {
                width: width,
                minWidth: width
            };
        }
    }
};
</script>
