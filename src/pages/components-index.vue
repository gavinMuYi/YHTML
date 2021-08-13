<template>
    <div class="components-index">
        <div class="components-page-title">YUI - 网站快速成型组件库</div>
        <div class="components-page-body">
            <div class="components-page-menu"></div>
            <div class="components-page-content"><router-view></router-view></div>
        </div>
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
        height: 100%;
        .components-page-title {
            // background: #a8f2ed;
            height: 80px;
            display: flex;
            align-items: center;
            padding-left: 20px;
            color: #39a9a1;
            border-bottom: 1px solid #efefef;
            font-size: 20px;
            box-sizing: border-box;
        }
        .components-page-body {
            display: flex;
            min-height: ~'calc(100% - 80px)';
            .components-page-menu {
                width: 200px;
                border-right: 1px solid #efefef;
                box-sizing: border-box;
            }
            .components-page-content {
                flex: 1;
                box-sizing: border-box;
                padding:  100px 80px;
            }
        }
    }
</style>
