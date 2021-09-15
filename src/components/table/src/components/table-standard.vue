<template>
    <div class="y-table-standard">
        <table>
            <thead>
                <tr v-for="(r, rindex) in standardTable.header" :key="'thr' + rindex" ref="thr">
                    <th v-for="(th, tindex) in r" :key="tindex + 'th' + rindex"
                        :style="{ height: th.height + 'px' }" :rowspan="th.rowspan">
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(r, rindex) in standardTable.body" :key="'tdr' + rindex" ref="tdr">
                    <td v-for="(td, tindex) in r" :key="tindex + 'td' + rindex"
                        :style="{ height: td.height + 'px' }" :rowspan="td.rowspan">
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'YTableStandard',
    props: {
        standardTable: {
            type: Object,
            default: () => {
                return {
                    header: [],
                    body: []
                };
            }
        }
    },
    data() {
        return {
            lastHeight: {
                header: [],
                body: []
            }
        };
    },
    watch: {
        standardTable: {
            handler: function () {
                this.$nextTick(() => {
                    let headerRow = this.$refs.thr || [];
                    let bodyRow = this.$refs.tdr || [];
                    let headerRowHeight = [];
                    headerRow.forEach(row => {
                        headerRowHeight.push(row.offsetHeight - 2);
                    });
                    let BodyRowHeight = [];
                    bodyRow.forEach(row => {
                        BodyRowHeight.push(row.offsetHeight - 2);
                    });
                    let rowHeights = {
                        header: headerRowHeight,
                        body: BodyRowHeight
                    };
                    if (rowHeights.header.toString() !== this.lastHeight.header.toString()
                    || rowHeights.body.toString() !== this.lastHeight.body.toString()
                    ) {
                        this.$set(this, 'lastHeight', rowHeights);
                        this.$emit('rowHeightChange', rowHeights);
                    }
                });
            },
            deep: true
        }
    }
};
</script>
