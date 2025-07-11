<script setup>
import { onMounted, ref } from "vue";
import { NotionRenderer } from "vue-notion";
import { NotionService } from "@/api";
import CusSpin from '@/components/cus-spin.vue';

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
    <a-row justify="center" align="middle" v-if="blockMap">
        <NotionRenderer :blockMap="blockMap.recordMap.block" fullPage />
    </a-row>
    <CusSpin v-else />
</template>
<style>
@import "vue-notion/src/styles.css";
</style>