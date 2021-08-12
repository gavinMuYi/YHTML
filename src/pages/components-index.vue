<template>
    <div class="components-index">
        <div class="components-page-title">YUI - 网站快速成型组件库</div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'ComponentsIndex',
    data() {
        return {
        };
    }
};
</script>

<style lang="less">
    .components-index {
        .components-page-title {
            background: #a8f2ed;
            height: 80px;
            display: flex;
            align-items: center;
            margin-bottom: 50px;
            padding-left: 20px;
            color: #ffffff;
            font-size: 20px;
        }
    }
</style>
