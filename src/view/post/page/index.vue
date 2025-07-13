<script lang="ts" setup>
import NotionPage from "@/components/notion-page.vue"
import Comments from "@/components/comments.vue"
import { ref } from "vue"
const props = defineProps({
    id: {
        type: String,
        required: true
    },
})
const commentsVisible = ref(false)
const loadComments = () => {
    commentsVisible.value = true
}
</script>
<template>
    <div>
        <NotionPage :id="props.id" class="page-content-item" @load-finished="loadComments" />
        <Comments :id="props.id" v-if="commentsVisible" />
    </div>
</template>