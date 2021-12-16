<template>
    <div class="info-content dashboard-info_content">
        <div v-for="(line, index) in info" :key="'line' + index + Math.random()">
            <div v-if="line.type === 'text'">{{ line.value }}</div>
            <img v-else :src="line.value" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'InfoContent',
    props: {
        info: {
            type: Array,
            default: () => {
                return [];
            }
        }
    }
};
</script>

<style lang="less">
.dashboard-info_content {
    width: 400px;
    img {
        width: 400px;
    }
}
</style>
