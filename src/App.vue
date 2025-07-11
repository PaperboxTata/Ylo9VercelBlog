<script setup lang="ts">
import Layout from './components/layout/default-layout.vue';
import { useNotionStore } from '@/store/notion';
const notionStore = useNotionStore()

notionStore.getNotionPageData()
</script>

<template>
  <Layout />
</template>
