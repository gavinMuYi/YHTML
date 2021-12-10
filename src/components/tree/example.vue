<template>
    <div class="y-tree_example">
        <div class="box-out">
            <div class="title">异步多选级联
            </div>
            <div class="box-no">
                <y-tree
                    :treeSize="[300, 400]" :multiple="true" cascadeMode="hover"
                    :lazyLoad="lazyLoad" :count="1" :key="singleKey"
                    @change="val => {singleValue = val}" :value="singleValue" />
            </div>
        </div>
        <div class="box-out">
            <div class="title">同步多选级联
            </div>
            <div class="box-no">
                <y-tree
                    :treeSize="[300, 400]" :multiple="true" cascadeMode="hover"
                    :options="options1" :key="singleKey" @change="val => {singleValue = val}" :value="singleValue" />
            </div>
        </div>
        <div class="box-out">
            <div class="title">同步单选级联
            </div>
            <div class="box-no">
                <y-tree
                    :treeSize="[300, 400]" cascadeMode="click"
                    :options="options1" :key="singleKey" @change="val => {singleValue = val}" :value="singleValue" />
            </div>
        </div>
        <div class="box-out">
            <div class="title">同步单选
                <!-- <button @click="reshow">回显测试</button> -->
            </div>
            <div class="box">
                <y-tree :options="options" :key="singleKey" @change="val => {singleValue = val}" :value="singleValue" />
            </div>
        </div>
        <div class="box-out">
            <div class="title">同步单选无轨迹</div>
            <div class="box">
                <y-tree :options="options" :track="false" accordion>
                    <div slot="item" slot-scope="props">{{ props.level }}{{ props.data.label }}</div>
                </y-tree>
            </div>
        </div>
        <div class="box-out">
            <div class="title">异步单选</div>
            <div class="box">
                <y-tree :lazyLoad="lazyLoad" :count="1" />
            </div>
        </div>
        <div class="box-out">
            <div class="title">无数据</div>
            <div class="box">
                <y-tree>
                    <div slot="nodata" class="no-data">
                        暂无数据slot
                    </div>
                </y-tree>
            </div>
        </div>
        <div class="box-out">
            <div class="title">同步多选</div>
            <div class="box">
                <y-tree :options="options" :multiple="true" />
            </div>
        </div>
        <div class="box-out">
            <div class="title">同步多选无轨迹</div>
            <div class="box">
                <y-tree :options="options" :multiple="true"
                        :value="[{key: 'wasdffe', label: 'sgdafgfddaf'}]" :track="false" />
            </div>
        </div>
        <div class="box-out">
            <div class="title">异步多选</div>
            <div class="box">
                <y-tree :lazyLoad="lazyLoad" :count="1" :multiple="true" />
            </div>
        </div>
        <div class="box-out">
            <div class="title">异步多选无轨迹</div>
            <div class="box">
                <y-tree :lazyLoad="lazyLoad" :count="1" :multiple="true" :track="false" />
            </div>
        </div>
    </div>
</template>

<script>
import YTree from './index';

export default {
    name: 'YTreeExample',
    components: {
        YTree
    },
    data() {
        return {
            singleValue: [],
            singleKey: 0,
            options: [{
                label: 'sqwerd',
                key: 'asqewqwrd',
                disable: true
            }, {
                label: 'sd',
                key: 'asd',
                extend: true,
                children: [{
                    key: 'we',
                    label: 'sdaf',
                    children: [{
                        key: 'wasdffe',
                        label: 'sgdafgfddaf',
                        disable: true,
                        children: [{
                            key: 'we21',
                            label: 'sd32af'
                        }]
                    }, {
                        key: 'was3333dffe',
                        label: 'sg4444dafgfddaf'
                    }]
                }, {
                    key: 'wesad3123f',
                    label: 'sda212f',
                    children: [{
                        key: 'wasd312ffe',
                        label: 'sgdaf3123gfddaf'
                    }]
                }]
            }, {
                label: 'sd2',
                key: 'as3d',
                children: [{
                    key: 'wde',
                    label: 'sdwaf'
                }]
            }],
            options1: [{
                label: 'sqwerd',
                key: 'asqewqwrd'
            }, {
                label: 'sqwerd',
                key: 'asqewqwrd'
            }, {
                label: 'sqwerd',
                key: 'asqewqwrd'
            }, {
                label: 'sqwerd',
                key: 'asqewqwrd'
            }, {
                label: 'sqwerd',
                key: 'asqewqwrd'
            }, {
                label: 'sqwerd',
                key: 'asqewqwrd'
            }, {
                label: 'sqwerd',
                key: 'asqewqwrd'
            }, {
                label: 'sqwerd',
                key: 'asqewqwrd'
            }, {
                label: 'sqwerd',
                key: 'asqewqwrd'
            }, {
                label: 'sqwerd',
                key: 'asqewqwrd',
                children: [{
                    label: 'sqwerd',
                    key: 'asqewqwrd'
                }]
            }, {
                label: 'sd',
                key: 'asd',
                extend: false,
                cascade: 'fixed',
                children: [{
                    key: 'we',
                    label: 'sdaf',
                    children: [{
                        key: 'wasdffe',
                        label: 'sgdafgfddaf',
                        cascade: 'fixed',
                        children: [{
                            key: 'we21',
                            label: 'sd32af'
                        }]
                    }, {
                        key: 'was3333dffe',
                        label: 'sg4444dafgfddaf'
                    }]
                }, {
                    key: 'wesad3123f',
                    label: 'sda212f',
                    children: [{
                        key: 'wasd312ffe',
                        label: 'sgdaf3123gfddaf'
                    }]
                }, {
                    key: 'wesad3123f',
                    label: 'sda212f',
                    children: [{
                        key: 'wasd312ffe',
                        label: 'sgdaf3123gfddaf'
                    }]
                }, {
                    key: 'wesad3123f',
                    label: 'sda212f',
                    children: [{
                        key: 'wasd312ffe',
                        label: 'sgdaf3123gfddaf'
                    }]
                }, {
                    key: 'wesad3123f',
                    label: 'sda212f',
                    children: [{
                        key: 'wasd312ffe',
                        label: 'sgdaf3123gfddaf'
                    }]
                }, {
                    key: 'wesad3123f',
                    label: 'sda212f',
                    children: [{
                        key: 'wasd312ffe',
                        label: 'sgdaf3123gfddaf'
                    }]
                }, {
                    key: 'wesad3123f',
                    label: 'sda212f',
                    children: [{
                        key: 'wasd312ffe',
                        label: 'sgdaf3123gfddaf'
                    }]
                }, {
                    key: 'wesad3123f',
                    label: 'sda212f',
                    children: [{
                        key: 'wasd312ffe',
                        label: 'sgdaf3123gfddaf'
                    }]
                }, {
                    key: 'wesad3123f',
                    label: 'sda212f',
                    children: [{
                        key: 'wasd312ffe',
                        label: 'sgdaf3123gfddaf'
                    }]
                }, {
                    key: 'wesad3wet123f',
                    label: 'sda21uyj2f',
                    children: [{
                        key: 'wasdkytuk312ffe',
                        label: 'sgdaf3ki123gfddaf'
                    }]
                }, {
                    key: 'wesad31kuy23f',
                    label: 'sda21ku2f',
                    children: [{
                        key: 'wasd31ku2ffe',
                        label: 'sgdaf31uyki,23gfddaf'
                    }]
                }, {
                    key: 'wesad,uy3123f',
                    label: 'sda2,u,12f',
                    children: [{
                        key: 'wasd31,uk2ffe',
                        label: 'sgdaf3ku,123gfddaf'
                    }]
                }, {
                    key: 'wesad31rwt23f',
                    label: 'sda212rwgwrgf',
                    children: [{
                        key: 'wasd312fwgwrfe',
                        label: 'sgdaf312wrtgr3gfddaf'
                    }]
                }, {
                    key: 'wesad3wt123f',
                    label: 'sda2grt12f',
                    children: [{
                        key: 'wasd31gtrw2ffe',
                        label: 'sgdaf31grwg23gfddaf'
                    }]
                }, {
                    key: 'wesad31fe23f',
                    label: 'sda2frfrb12f',
                    children: [{
                        key: 'wasd312fefffe',
                        label: 'sgdaf3ef123gfddaf'
                    }]
                }, {
                    key: 'wesad3fer123f',
                    label: 'sda21fer2f',
                    children: [{
                        key: 'wasd312ferffe',
                        label: 'sgdaf3e123gfddaf'
                    }]
                }, {
                    key: 'wesad3er123f',
                    label: 'sda21fre2f',
                    children: [{
                        key: 'wasd312ffewre',
                        label: 'sgdaf3fe123gfddaf'
                    }]
                }, {
                    key: 'wesad312ev3f',
                    label: 'sda21f2f',
                    children: [{
                        key: 'wasd312frrfe',
                        label: 'sgdaf3123vwgfddaf'
                    }]
                }, {
                    key: 'wesad3123f',
                    label: 'sda212f',
                    children: [{
                        key: 'wasd31gwe2ffe',
                        label: 'sgdafwerf3123gfddaf'
                    }]
                }, {
                    key: 'wesadwrew3123f',
                    label: 'sda2vfdwv12f',
                    children: [{
                        key: 'wasd31fe2ffe',
                        label: 'sgdaffe3123gfddaf'
                    }]
                }, {
                    key: 'wes12ad3123f',
                    label: 'sda313212f',
                    children: [{
                        key: 'wasd3fre12ffe',
                        label: 'sgdafref3123gfddaf'
                    }]
                }, {
                    key: 'wasdf223fe',
                    label: 'sgdaf232343gfddaf',
                    cascade: 'fixed',
                    children: [{
                        key: 'we232321',
                        label: 'sd3434342af'
                    }]
                }]
            }, {
                label: 'sd2',
                key: 'as3d',
                children: [{
                    key: 'wde',
                    label: 'sdwaf'
                }]
            }, {
                label: 'sqwerd',
                key: 'asqewqwrd'
            }, {
                label: 'sqwerd',
                key: 'asqewqwrd'
            }, {
                label: 'sqwerd',
                key: 'asqewqwrd'
            }, {
                label: 'sqwerd',
                key: 'asqewqwrd'
            }, {
                label: 'sqwerd',
                key: 'asqewqwrd'
            }, {
                label: 'sqwerd',
                key: 'asqewqwrd'
            }, {
                label: 'sqwerd',
                key: 'asqewqwrd'
            }, {
                label: 'sqwerd',
                key: 'asqewqwrd'
            }, {
                label: 'sqwerd',
                key: 'asqewqwrd'
            }]
        };
    },
    methods: {
        lazyLoad(index, count, highlight, self) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, 1000);
            }).then(() => {
                return [{
                    label: 'sqwerd' + Math.floor(Math.random() * 1000),
                    key: 'asqewqwrd' + Math.floor(Math.random() * 1000),
                    hasChildren: true
                }];
            });
        },
        reshow() {
            this.singleKey++;
        }
    },
};
</script>

<style lang="less">
.y-tree_example {
    .box-out {
        margin-bottom: 100px;
        .title {
            color: @title;
            margin-bottom: 20px;
            font-size: 20px;
        }
    }
    .box-no {
        height: 450px;
        overflow: auto;
    }
    .box {
        height: 450px;
        overflow: auto;
        border: 1px solid @gray;
    }
}
</style>
