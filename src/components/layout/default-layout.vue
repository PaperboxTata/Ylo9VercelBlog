<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import Header from "./header.vue"
import { useRoute, useRouter } from 'vue-router';

const loading = ref(true)

const route = useRoute()
const router = useRouter()
const refreshKey = ref(0)
let isProgrammaticNavigation = false

const originalPush = router.push
router.push = async function (...args) {
    isProgrammaticNavigation = true
    try {
        return await originalPush.apply(this, args);
    } finally {
        isProgrammaticNavigation = false;
    }
}
watch(
    () => route.fullPath,
    (newPath, oldPath) => {
        if (!isProgrammaticNavigation && newPath !== oldPath) {
            refreshKey.value++
        }
    }
)

onMounted(() => {
    loading.value = false
})
</script>
<template>
    <a-layout>
        <Header class="page-header" :key="refreshKey" />
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" class="page-content" :key="$route.fullPath" />
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
    min-height: calc(100vh - 35px);
    background-color: white;
    margin: 0 10px;
    border-radius: 15px;
    padding: 10px;

    .page-content-item {
        padding: 8px;
        min-height: calc(100vh - 55px);

        .page-content-title {
            font-size: 25px;
            padding-bottom: 4px;
        }
    }
}

.page-header {
    height: 35px !important;
}

::-webkit-scrollbar {
    width: 0px;
}
</style>
