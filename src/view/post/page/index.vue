<script lang="ts" setup>
import NotionPage from "@/components/notion-page.vue"
const props = defineProps({
    id: {
        type: String,
        required: true
    },
})
</script>
<template>
    <div>
        <NotionPage :id="props.id"  class="page-content-item"/>
    </div>
</template>