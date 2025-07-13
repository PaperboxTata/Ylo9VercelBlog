<script lang="ts" setup>
import CusSpin from '@/components/cus-spin.vue';
import { onMounted, ref } from 'vue';
import dayjs from "dayjs"
import { useRssStore } from '@/store/rss';
const rssStore = useRssStore()
interface RssItem {
    title: string;
    link: string;
    pubDate: string;
    isoDate?: string;
    feedTitle: string;
    feedUrl: string;
    creator?: string;
    image?: string;
}
const allData = ref<RssItem[]>([])
const dataList = ref<RssItem[]>([])
const loading = ref(true)

const currentPageNum = ref<number>(1)
const pageSize = 8

const loadData = async () => {
    loading.value = true
    allData.value = await rssStore.getRssData()
    onPageNumChange(1)
    loading.value = false
}
const onPageNumChange = (page: number) => {
    dataList.value = allData.value.slice((page - 1) * pageSize, page * pageSize)
}
const toPage = (url: string) => {
    window.open(url);
}
onMounted(async () => {
    await loadData()
})
</script>
<template>
    <CusSpin v-if="loading" />
    <div v-else>
        <a-flex vertical justify="space-between" class="page-content-item" v-if="dataList.length > 0">
            <a-row :gutter="[20, 20]" style="padding: 20px;">
                <a-col :span="24">
                    <div style="display: flex;justify-content: center;">
                        <a-alert type="info" show-icon>
                            <template #message>
                                <div style="display: flex;flex-direction: column;font-size: small;">
                                    <span>本页展示内容来自公开RSS源，所有权利归属原作者。</span>
                                    <span>展示数据包含：文章标题、网站名称、更新时间</span>
                                    <span>如为您造成不便请联系移除。</span>
                                </div>
                            </template>
                        </a-alert>
                    </div>
                </a-col>
                <a-col :lg="{ span: 12 }" :xs="{ span: 24 }" v-for="(item, index) in dataList">
                    <a-card size="small" hoverable style="width: 100%" @click="toPage(item.link)">
                        <a-card-meta :title="item.title">
                            <template #description>
                                <div style="display: flex;align-items: center;">
                                    <img v-if="item.image" :src="item.image" style="height: 15px;width: 15px;" />
                                    <span>{{ item.feedTitle + (item.creator ? " - " + item.creator : "") }}</span>
                                </div>
                            </template>
                        </a-card-meta>
                        <div style="padding: 4px 0;font-size: 10px;font-size:smaller;color: gray;">
                            {{ dayjs(item.isoDate).format("YYYY年M月D日 HH:mm:ss") }}
                        </div>
                    </a-card>
                </a-col>
            </a-row>
            <div style="display: flex;justify-content: center;">
                <a-pagination v-model:current="currentPageNum" :total="allData.length" show-less-items
                    @change="onPageNumChange" />
            </div>
        </a-flex>
    </div>
    <!-- 施工中🏗... -->
</template>
<style>
.ant-card-meta-title {
    margin: 0 !important;
}
</style>