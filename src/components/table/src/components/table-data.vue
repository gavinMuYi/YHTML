<template>
    <div class="y-table-data">
    </div>
</template>

<script>
export default {
    name: 'YTableData',
    props: {
        lazyLoad: {
            type: Function,
            default: () => {
                return new Promise((resolve, reject) => {
                    resolve();
                }).then(() => {
                    return [];
                });
            }
        }
    }
};
</script>
