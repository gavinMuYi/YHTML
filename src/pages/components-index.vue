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
            color: #39a9a1;
            border-bottom: 1px solid #e3f0ef;
            font-size: 20px;
            box-sizing: border-box;
        }
        .components-page-body {
            display: flex;
            min-height: ~'calc(100% - 80px)';
            .components-page-menu {
                width: 200px;
                border-right: 1px solid #e3f0ef;
                box-sizing: border-box;
                padding-top: 30px;
                a {
                    display: flex;
                    height: 40px;
                    color: #5e6d82;
                    align-items: center;
                    padding-left: 30px;
                    &:hover {
                        background: #e2fffd;
                        cursor: pointer;
                    }
                }
                .selected {
                    background: #b8f5f1;
                    &:hover {
                        background: #b8f5f1;
                        cursor: pointer;
                    }
                }
            }
            .components-page-content {
                flex: 1;
                box-sizing: border-box;
                padding:  100px 120px;
            }
        }
    }
</style>
