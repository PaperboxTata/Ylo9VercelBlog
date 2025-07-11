<script lang="ts" setup>
import { ArrowUpOutlined, ArrowLeftOutlined, ArrowRightOutlined, ArrowDownOutlined } from '@ant-design/icons-vue';
import { ref, onMounted } from 'vue'

const randomFiles = ref<string[]>([])

// Fisher-Yates 洗牌算法
const shuffleArray = <T>(array: T[]): T[] => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
}

// 获取随机文件
const getRandomFiles = (count: number = 4) => {
    const modules = import.meta.glob('/public/random_image/*.{jpg,png,webp}')
    const allPossibleFiles = Object.keys(modules).map(path =>
        path.replace('/public/random_image/', '')
    )
    return shuffleArray(allPossibleFiles).slice(0, count)
}

onMounted(() => {
    randomFiles.value = getRandomFiles()
})
</script>
<template>
    <div style="width: 100%;">
        <a-row justify="center" :gutter="[8, 8]">
            <a-col span="8">
            </a-col>
            <a-col span="4">
                <a-image class="image" :preview="false" :src="'/public/random_image/' + randomFiles[0]"></a-image>
            </a-col>
            <a-col span="8">
            </a-col>
        </a-row>

        <a-row justify="center" :gutter="[8, 8]">
            <a-col span="8">
            </a-col>
            <a-col span="4" class="center">
                <ArrowUpOutlined />
            </a-col>
            <a-col span="8">
            </a-col>
        </a-row>

        <a-row justify="center" :gutter="[8, 8]">
            <a-col span="4">
                <a-image class="image" :preview="false" :src="'/public/random_image/' + randomFiles[1]"></a-image>
            </a-col>
            <a-col span="4" class="center">
                <ArrowLeftOutlined />
            </a-col>
            <a-col span="4">
                <a-image class="image" :preview="false" src="/public/favicon.ico"></a-image>
            </a-col>
            <a-col span="4" class="center">
                <ArrowRightOutlined />
            </a-col>
            <a-col span="4">
                <a-image class="image" :preview="false" :src="'/public/random_image/' + randomFiles[2]"></a-image>
            </a-col>
        </a-row>

        <a-row justify="center" :gutter="[8, 8]">
            <a-col span="8">
            </a-col>
            <a-col span="4" class="center">
                <ArrowDownOutlined />
            </a-col>
            <a-col span="8">
            </a-col>
        </a-row>

        <a-row justify="center" :gutter="[8, 8]">
            <a-col span="8">
            </a-col>
            <a-col span="4">
                <a-image class="image" :preview="false" :src="'/public/random_image/' + randomFiles[3]"></a-image>
            </a-col>
            <a-col span="8">
            </a-col>
        </a-row>
    </div>
</template>
<style>
.center {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    color: gray;
}

.image {
    border-radius: 0 !important;
}
</style>