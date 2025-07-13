<script lang="ts" setup>
import Giscus from '@giscus/vue';
const props = defineProps({
    id: {
        type: String,
        default: () => ""
    },
})
</script>
<template>
    <Giscus id="comments" repo="PaperboxTata/Ylo9VercelBlog" repoId="R_kgDOOqB8-A" categoryId="DIC_kwDOOqB8-M4Cs3aH"
        mapping="pathname" :term="props.id" reactionsEnabled="1" emitMetadata="0" inputPosition="bottom" theme="light"
        lang="zh-CN" loading="lazy" />
</template>