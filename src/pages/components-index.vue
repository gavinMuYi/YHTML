<template>
    <div class="components-index">
        <div class="components-page-title">YUI - 网站快速成型组件库</div>
        <div class="components-page-body">
            <div class="components-page-menu">
                <div v-if="viewDoc">
                    <div v-for="block in docs" :key="block.title">
                        <div class="block-title">{{ block.title }}</div>
                        <router-link v-for="name in block.children" :key="name" :to="'/components/' + name + '.md'"
                                     :class="{'selected': name + '.md' === pageName}">
                            {{ name }}
                        </router-link>
                    </div>
                </div>
                <div v-else>
                    <router-link v-for="name in routes" :key="name" :to="'/components/' + name"
                                 :class="{'selected': name === pageName}">
                        {{ name.replace('.md', '') }}
                    </router-link>
                </div>
                <div class="change-mode" @click="modeChange">
                    <y-icon name="double-arrow-right" class="first-arrow" />
                    <y-icon name="double-arrow-right" />
                    {{ viewDoc ? '开发调试' : '查看文档' }}
                </div>
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
            viewDoc: true,
            routes: req.keys().map(item => {
                return item.replace('./', '').replace('/index.js', '');
            }),
            docs: [{
                title: 'Basic',
                children: ['button', 'cell', 'icon']
            }, {
                title: 'Form',
                children: ['checkbox', 'input']
            }, {
                title: 'Picker',
                children: ['select', 'cascade']
            }, {
                title: 'Navigation',
                children: ['pagination']
            }, {
                title: 'Pop',
                children: ['popper', 'popmenu']
            }, {
                title: 'Data Display',
                children: ['tree', 'table', 'chart', 'dashboard']
            }]
        };
    },
    computed: {
        pageName() {
            return this.$route.path.replace('/components/', '');
        }
    },
    methods: {
        modeChange() {
            this.viewDoc = !this.viewDoc;
            this.$router.push({ name: this.viewDoc ? (this.docs[0].children[0] + '.md') : this.routes[0] });
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
            background: @white;
            z-index: 10000000000;
            box-shadow: -1px -2px 8px @backgroundGreen;
        }
        .components-page-body {
            display: flex;
            min-height: ~'calc(100% - 80px)';
            margin-top: 80px;
            height: 100%;
            .components-page-menu {
                overflow: auto;
                width: 200px;
                min-width: 200px;
                box-sizing: border-box;
                padding-top: 30px;
                border-right: 1px solid @gray;
                box-shadow: -1px -2px 8px @backgroundGreen;
                position: relative;
                .block-title {
                    padding: 10px 20px;
                    font-size: 12px;
                    color: @fontGray;
                }
                .change-mode {
                    position: absolute;
                    bottom: 10px;
                    font-size: 12px;
                    right: 20px;
                    display: inline-block;
                    cursor: pointer;
                    .first-arrow {
                        left: 7px;
                    }
                    .y-icon {
                        width: 12px;
                        height: 12px;
                        position: relative;
                        fill: @font;
                        top: 2px;
                    }
                    &:hover {
                        color: @fontHighLight;
                        .y-icon {
                            fill: @fontHighLight;
                        }
                    }
                }
                a {
                    display: flex;
                    height: 40px;
                    color: @font;
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
                overflow: auto;
                flex: 1;
                box-sizing: border-box;
                padding:  40px 150px 120px 100px;
                min-width: 800px;
            }
        }
    }
</style>
