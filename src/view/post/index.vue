<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { GetNotionPageDataOutput } from "@/api";
import RandomCover from "@/components/post/random-cover.vue"
import { generateTagColors, TagColorMap } from "@/utils/tagColor"
import dayjs from 'dayjs';
import { useRouter } from 'vue-router';
import CusSpin from '@/components/cus-spin.vue';
import { useNotionStore } from '@/store/notion';
const notionStore = useNotionStore()

const router = useRouter()

const allData = ref<GetNotionPageDataOutput[]>([])
const dataList = ref<GetNotionPageDataOutput[]>([])
const coverErrorList = ref<boolean[]>([])

const currentPageNum = ref<number>(1)
const pageSize = 6
const startIndex = computed(() => {
    return currentPageNum.value * pageSize
})

const tagColorMap = ref<TagColorMap>({})
const onPageNumChange = (page: number) => {
    dataList.value = allData.value.slice((page - 1) * pageSize, page * pageSize)
}
const loading = ref(true)
const loadData = async () => {
    loading.value = true

    allData.value = await notionStore.getNotionPageData()
    onPageNumChange(1)
    coverErrorList.value = Array(allData.value.length).fill(false)
    tagColorMap.value = generateTagColors(allData.value.map(x => x.tags).flat())

    loading.value = false
}
const stopWatch = ref<() => void>()

onMounted(async () => {
    if (notionStore.loadFinish) {
        await loadData()
        return
    }
    stopWatch.value = watch(
        () => notionStore.loadFinish,
        async (newVal) => {
            if (newVal) {
                await loadData()
                stopWatch.value?.()
            }
        },
        { immediate: true }
    )
})

onUnmounted(() => {
    stopWatch.value?.()
})
const toPage = (id: string) => {
    router.push(`post/${id}`)
}
</script>
<template>
    <CusSpin v-if="loading" />
    <div v-else>
        <a-flex vertical justify="space-between" class="page-content-item" v-if="dataList.length > 0">
            <a-row :gutter="[20, 20]" style="padding: 20px;">
                <a-col :lg="{ span: 8 }" :xs="{ span: 24 }" v-for="(item, index) in dataList">
                    <a-card size="small" hoverable style="width: 100%" @click="toPage(item.page_id)">
                        <template #cover>
                            <a-image :preview="false" alt="cover" :src="item.cover_url"
                                v-if="item.cover_url && !coverErrorList[startIndex + index]"
                                style="object-fit: cover; height: 200px;"
                                @error="() => coverErrorList[startIndex + index] = true" />
                            <div v-else
                                style="display: flex;height: 200px;justify-content: center;align-items: center;">
                                <div>
                                    <RandomCover />
                                </div>
                            </div>
                        </template>
                        <a-card-meta :title="item.title">
                            <template #description>
                                <span class="text-container">{{ item.excerpt }}</span>
                            </template>
                        </a-card-meta>
                        <div style="padding: 4px 0;font-size: 10px;font-size:smaller;color: gray;">
                            {{ dayjs(item.last_edited_time).format("YYYY年M月D日 HH:mm:ss") }}
                        </div>
                        <div class="tags-area" v-if="item.tags.length > 0">
                            <a-tag v-for="(t, i) in item.tags" :bordered="false" :color="tagColorMap[t]">{{ t }}</a-tag>
                        </div>
                        <div class="tags-area" v-else>
                            <a-tag>无标签</a-tag>
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
</template>
<style>
.text-container {
    /* 固定5行高度 */
    height: calc(4 * 1.5em);
    line-height: 1.5em;

    /* 文本溢出处理 */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    line-clamp: 4;
    -webkit-line-clamp: 4;
    overflow: hidden;
    text-overflow: ellipsis;

    /* 首行缩进 */
    text-indent: 2em;
}

.random-image {
    border-radius: 0 !important;
}

.tags-area {
    display: flex;
    flex-wrap: wrap;
    font-size: 10px;
}
</style>