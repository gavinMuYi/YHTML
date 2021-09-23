<template>
    <div :style="{height: lll + 'px'}" @click="lll = 200">332323</div>
</template>

<script>
export default {
    name: 'HeaderEx',
    data() {
        return {
            lll: 100
        };
    },
};
</script>
