<script lang="ts" setup>
import { onMounted } from 'vue';
import BilibiliLike from "@/components/home/bilibili-like.vue"
import MusicHistory from "@/components/home/music163-history.vue"

onMounted(async () => {
})
</script>
<template>
    <div class="page-content">
        <a-row>
            <a-col :span="12">
                <BilibiliLike />
            </a-col>
            <a-col :span="12">
                <MusicHistory />
            </a-col>
        </a-row>
    </div>
</template>