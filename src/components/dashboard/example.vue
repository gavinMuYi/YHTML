<!-- <template>
    <div class="y-dashboard_example"></div>
</template>

<script>
import YDashboard from './src/index';
export default {
    name: 'YDashboardExample',
    components: {
        YDashboard
    },
    data() {
        return {
        };
    },
    methods: {
    }
};
</script>

<style lang="less">
    .y-dashboard_example {

    }
</style> -->
<template>
    <div class="dashboard-example">
        <div>
            <y-dashboard :options="goptions" v-if="goptions.name" @eventEmit="eventEmit" />
        </div>
        <div>
            <y-dashboard :options="gopptions" v-if="gopptions.name" @eventEmit="eventEmit" />
        </div>
        <div>
            <y-dashboard :options="golptions" v-if="golptions.name" @eventEmit="eventEmit" />
        </div>
        <div>
            <y-dashboard :options="i_options" v-if="i_options.name" @eventEmit="eventEmit" />
        </div>
        <div>
            <y-dashboard :options="i_options" v-if="i_options.name" @eventEmit="eventEmit" />
        </div>
        <div>
            <y-dashboard :options="m_options" v-if="m_options.name" @eventEmit="eventEmit" />
        </div>
        <div>
            <y-dashboard :options="s_options" v-if="s_options.name" @eventEmit="eventEmit" />
        </div>
        <div>
            <y-dashboard :options="options" v-if="options.name" @eventEmit="eventEmit" />
        </div>
        <div style="height: 300px;">
            <y-dashboard :options="l_options" v-if="l_options.name" @eventEmit="eventEmit" />
        </div>
        <div>
            <y-dashboard :options="e_options" v-if="e_options.name" @eventEmit="eventEmit" />
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import YDashboard from './index';
import { options, e_options, i_options, l_options, m_options, goptions, golptions, gopptions } from './mock';
import clone from 'clone';

export default {
    components: {
        YDashboard
    },
    provide() {
        return {
            data__: {}
        };
    },
    data() {
        let options_copy = clone(options);
        options_copy.tabGroup.reverse();
        options.moreFunctions = [];
        // i_options.tabGroup[0].tabs.length = 3;
        return {
            options: options,
            s_options: {
                ...options_copy,
                separate: true,
                separateWidth: 20
            },
            e_options: e_options,
            i_options: i_options,
            l_options: l_options,
            m_options: m_options,
            goptions: goptions,
            golptions: golptions,
            gopptions: gopptions
        };
    },
    methods: {
        eventEmit() {
            console.log('eventEmit');
        }
    },
}
</script>

<style lang="less">
.dashboard-example {
    width: 100%;
    background-color: @white;
    .component-title {
        font-size: 45px;
    }
    > div {
        margin: 50px 0px;
    }
}
</style>
