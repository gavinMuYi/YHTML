<template>
    <div class="y-message_example"></div>
</template>

<script>
export default {
    name: 'YMessageExample',
    mounted() {
        this.$message.success('232');
        console.log(this.$message);
    }
};
</script>

<style lang="less">
    .y-message_example {

    }
</style>
