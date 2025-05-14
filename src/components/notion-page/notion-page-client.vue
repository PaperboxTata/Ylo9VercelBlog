<script setup>
import { onMounted, ref } from "vue";
import { NotionRenderer } from "vue-notion";
import { NotionService } from "@/api";
import { LoadingOutlined } from '@ant-design/icons-vue';
import { h } from 'vue';
const indicator = h(LoadingOutlined, {
    style: {
        fontSize: '24px',
    },
    spin: true,
});
const props = defineProps({
    id: {
        type: String,
        required: true
    },
})
const blockMap = ref(undefined)
onMounted(async () => {
    blockMap.value = await NotionService.getNotionPage(props.id);
})
</script>
<template>
    <a-row class="page-content" justify="center" align="middle">
        <NotionRenderer v-if="blockMap" :blockMap="blockMap.recordMap.block" fullPage />
        <a-spin tip="月光光，心慌慌..." :indicator="indicator" v-else />
    </a-row>
</template>
<style>
@import "vue-notion/src/styles.css";
</style>