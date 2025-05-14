<script setup lang="ts">
import { AnchorLinkItemProps } from "ant-design-vue/es/anchor"
import DynamicIcon from "../dynamic-icon.vue"
import { GithubOutlined, TwitterOutlined } from '@ant-design/icons-vue';
import { inject, Ref, ref, watch } from "vue"
import { useRouter } from "vue-router";
const router=useRouter()
const to = ref()
const getCurrentAnchor = () => {
    if (to.value) return to.value
    return window.location.pathname
}
const anchorItems = ref<AnchorLinkItemProps[]>([
    { key: '/', href: '/', title: '首页' },
    { key: '/post', href: '/post', title: '文章' },
    { key: '/record', href: '/record', title: '动态' },
])
const getAnchorItems = () => {
    return anchorItems.value as AnchorLinkItemProps[]
}
const handleAnchorClick = async (e: MouseEvent, link: any) => {
    e.preventDefault()
    to.value = link.href || '/'
    await router.push(link.href)
}
const titleIconDic: { [key: string]: string } = {
    '首页': 'HomeOutlined',
    '文章': 'BookOutlined',
    '动态': 'ContactsOutlined',
}
const getCurrentIcon = (title: string) => {
    return titleIconDic[title] as any
}
const toUrl = (url: string) => {
    window.open(url);
}

const headerScrollTarget = inject('headerScrollTarget') as Ref<boolean, boolean>;
watch(headerScrollTarget, () => {

})
</script>
<template>
    <a-row style="width: 100%">
        <a-col :span="headerScrollTarget ? 4 : 0"></a-col>
        <a-col :span="headerScrollTarget ? 16 : 24">
            <a-anchor direction="horizontal" @click="handleAnchorClick" :getCurrentAnchor="getCurrentAnchor"
                :items="getAnchorItems()" wrapperClass="anchor page-header">
                <template #customTitle="{ key, title }">
                    <a-space v-if="key[0] == '/'">
                        <span>
                            <DynamicIcon :iconName="getCurrentIcon(title)" />
                        </span>
                        <span style="padding-left:2px">{{ title }}</span>
                    </a-space>
                </template>
            </a-anchor>
        </a-col>
        <a-col :span="headerScrollTarget ? 3 : 0">
            <a-row :gutter="8" justify="end" align="middle" style="height: 100%;">
                <a-col>
                    <GithubOutlined style="font-size: 20px;" @click="toUrl(`https://github.com/PaperboxTata`)" />
                </a-col>
                <a-col>
                    <TwitterOutlined style="font-size: 20px;" />
                </a-col>
            </a-row>
        </a-col>
    </a-row>
</template>
<style>
.anchor {
    display: flex;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border-bottom-width: 0px !important;

    .ant-anchor {
        /* margin: 7px 0 2px 0; */
        padding: 0 25px 0 25px;
        background-color: rgba(255, 255, 255, 0.4);
        border-radius: 50px;
    }
}

.anchor::before {
    border-bottom: none !important;
}
</style>