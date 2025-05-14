<script lang="ts" setup>
import { onMounted, ref, provide } from 'vue';
import Header from "./header.vue"
const loading = ref(true)

const headerScrollTarget = ref(false);
provide('headerScrollTarget', headerScrollTarget);
onMounted(() => {
    loading.value = false
    const observer = new window.IntersectionObserver((e: IntersectionObserverEntry[]) => {
        headerScrollTarget.value = e[0].isIntersecting
    })
    observer.observe(document.querySelector('#headerTarget') as Element);
})
</script>
<template>
    <a-layout>
        <Header />
        <div style="width: 100%;height: 1px;" id="headerTarget"></div>
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </a-layout>
</template>
<style lang="less">
body {
    padding: 0;
    margin: 0;
}

.page-content {
    min-height: calc(100vh - 75px);
    background-color: white;
    margin: 8px;

    .page-content-item {
        padding: 8px;
        min-height: 200px;

        .page-content-title {
            font-size: 25px;
            padding-bottom: 4px;
        }
    }
}

.page-header {
    max-height: 5vh !important;
}

::-webkit-scrollbar {
    width: 0px;
}
</style>
