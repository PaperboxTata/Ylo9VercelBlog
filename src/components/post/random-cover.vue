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
const list = ['quill.png',
    'r_alchent.png',
    'r_alchman.png',
    'r_alchmult.png',
    'r_artifice.png',
    'r_aspects.png',
    'r_aurapreserve.png',
    'r_crucible.png',
    'r_eldritch.png',
    'r_eldritchmajor.png',
    'r_eldritchminor.png',
    'r_enchant.png',
    'r_golemancy.png',
    'r_inf_enchant.png',
    'r_inf_heart.png',
    'r_nodes_2.png',
    'r_nodes.png',
    'r_nodetap1.png',
    'r_nodetap2.png',
    'r_outer.png',
    'r_researcher1.png',
    'r_researcher2.png',
    'r_runicupg.png',
    'r_thaumaturgy.png',
    'r_warp.png']
// 获取随机文件
const getRandomFiles = (count: number = 4) => {
    return shuffleArray(list).slice(0, count)
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
                <a-image class="image" :preview="false" :src="'/random_image/' + randomFiles[0]"></a-image>
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
                <a-image class="image" :preview="false" :src="'/random_image/' + randomFiles[1]"></a-image>
            </a-col>
            <a-col span="4" class="center">
                <ArrowLeftOutlined />
            </a-col>
            <a-col span="4">
                <a-image class="image" :preview="false" src="/favicon.ico"></a-image>
            </a-col>
            <a-col span="4" class="center">
                <ArrowRightOutlined />
            </a-col>
            <a-col span="4">
                <a-image class="image" :preview="false" :src="'/random_image/' + randomFiles[2]"></a-image>
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
                <a-image class="image" :preview="false" :src="'/random_image/' + randomFiles[3]"></a-image>
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