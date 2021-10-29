<template>
    <div class="components-index">
        <div class="components-page-title">YUI - 网站快速成型组件库</div>
        <div class="components-page-body">
            <div class="components-page-menu">
                <router-link v-for="name in routes" :key="name" :to="'/components/' + name"
                             :class="{'selected': name === pageName}">
                    {{ name }}
                </router-link>
            </div>
            <div class="components-page-content"><router-view></router-view></div>
        </div>
    </div>
</template>

<script>
const req = require.context('../components', true, /index.js$/);
export default {
    name: 'ComponentsIndex',
    data() {
        return {
            routes: req.keys().map(item => {
                return item.replace('./', '').replace('/index.js', '');
            })
        };
    },
    computed: {
        pageName() {
            return this.$route.path.replace('/components/', '');
        }
    }
};
</script>

<style lang="less">
    .components-index {
        height: 100%;
        .components-page-title {
            height: 80px;
            display: flex;
            align-items: center;
            padding-left: 20px;
            color: @title;
            border-bottom: 1px solid @gray;
            font-size: 20px;
            box-sizing: border-box;
            position: fixed;
            top: 0;
            width: 100%;
            background: #ffffff;
            z-index: 10000000000;
            box-shadow: -1px -2px 8px @backgroundGreen;
        }
        .components-page-body {
            display: flex;
            min-height: ~'calc(100% - 80px)';
            margin-top: 80px;
            .components-page-menu {
                width: 200px;
                box-sizing: border-box;
                padding-top: 30px;
                border-right: 1px solid @gray;
                box-shadow: -1px -2px 8px @backgroundGreen;
                a {
                    display: flex;
                    height: 40px;
                    color: #5e6d82;
                    align-items: center;
                    padding-left: 40px;
                    &:hover {
                        color: @fontHighLight;
                        cursor: pointer;
                    }
                }
                .selected {
                    color: @fontHighLight;
                    &:hover {
                        color: @fontHighLight;
                        cursor: pointer;
                    }
                }
            }
            .components-page-content {
                flex: 1;
                overflow: hidden;
                box-sizing: border-box;
                padding:  120px 150px 120px 100px;
            }
        }
    }
</style>
