<script lang="ts" setup>
import { BilibiliService } from '@/api';
import { onMounted, ref } from 'vue';
import { message } from "ant-design-vue"
import {
    LeftOutlined,
    RightOutlined
} from '@ant-design/icons-vue';
type DataType = {
    picUrl: string,
    ownerName: string,
    title: string,
    link: string
}
const data = ref<DataType[][]>()
const loadData = async () => {
    try {
        const response = await BilibiliService.getBilibiliLike()
        data.value = response.data.list.map(item => {
            return {
                picUrl: item.pic.split("/")[5],
                ownerName: item.owner.name,
                title: item.title,
                link: item.short_link_v2
            }
        }).reduce((acc, val, i) => {
            if (i % 4 === 0) acc.push([]);
            acc[acc.length - 1].push(val);
            return acc;
        }, [] as DataType[][])
    } catch (e) {
        message.error("bilibili接口失效惹~")
    }
}
const proxyPicUrlHeader = "/bilibili/image/"
onMounted(async () => {
    await loadData()
})
const toLink = (link: string) => {
    window.open(link);
}
</script>
<template>
    <div class="page-content-item">
        <div class="page-content-title">📺️</div>
        <a-carousel arrows :dots="false">
            <template #prevArrow>
                <div class="custom-slick-arrow" style="left: 10px;">
                    <LeftOutlined />
                </div>
            </template>
            <template #nextArrow>
                <div class="custom-slick-arrow" style="right: 10px">
                    <RightOutlined />
                </div>
            </template>
            <a-space v-for="item in data">
                <a-row :gutter="[8, 8]">
                    <a-col :span="6" v-for="_item in item" @click="toLink(_item.link)">
                        <a-flex :vertical="true" style="cursor: pointer;">
                            <a-image :src="proxyPicUrlHeader + _item.picUrl" :preview="false" />
                            <a-space class="bilibili-title">
                                {{ _item.title }}
                            </a-space>
                            <a-space class="bilibili-ownerName">
                                {{ _item.ownerName }}
                            </a-space>
                        </a-flex>
                    </a-col>
                </a-row>
            </a-space>
        </a-carousel>
    </div>
</template>
<style>
.bilibili-title {
    font-size: smaller;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    /* 限制显示的行数 */
    overflow: hidden;
    text-overflow: ellipsis;
}

.bilibili-ownerName {
    color: gray;
    font-size: 10px;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
<style scoped>
:deep(.slick-arrow.custom-slick-arrow) {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: white;
    background-color: black;
    transition: ease all 0.3s;
    opacity: 0.8;
    z-index: 1;
}

:deep(.slick-arrow.custom-slick-arrow:before) {
    display: none;
}

:deep(.slick-arrow.custom-slick-arrow:hover) {
    color: white;
    opacity: 0.8;
}
</style>